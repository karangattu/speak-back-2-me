import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync("index.html", "utf8");
const phrases = html.match(/const PHRASES = ([\s\S]*?);\n/)[0];
const voices = html.slice(html.indexOf("// Pre-generated neural speech:"), html.indexOf("// 1. INITIALIZE UI"));
const playback = html.slice(html.indexOf("// 3. NATURAL REFERENCE AUDIO"), html.indexOf("// 4. FAST BOUNDED"));
const context = vm.createContext({ assert, statSync });
vm.runInContext(`
  const options = [];
  const voiceSelect = {
    value: "", replaceChildren() { options.length = 0; },
    appendChild(option) { options.push(option); }
  };
  const document = { createElement() { return {}; } };
  const localStorage = { getItem() { return "old-system-voice"; }, setItem() {} };
  let nativePlayheadFrameId = null;
  let currentPhrase, playbackRate = 0.75, isRecording = false;
  let status = "", completed = 0, frame, lastProgress;
  const setStatus = text => { status = text; };
  const drawCanvas = progress => { lastProgress = progress; };
  const cancelAnimationFrame = () => {};
  const requestAnimationFrame = fn => { frame = fn; return 1; };
  const stopPingPong = () => stopNativePlayback();
  class Audio {
    play() { return Promise.resolve(); }
    pause() { this.paused = true; }
  }
  ${phrases}
  ${voices}
  ${playback}
  refreshVoiceOptions();
  assert.equal(voiceSelect.value, "af_heart");
  assert.equal(options.length, 2);
  assert.equal(new Set(PHRASES.map(p => p.id)).size, PHRASES.length, "Phrase IDs must be unique");
  for (const phrase of PHRASES) {
    assert.ok(phrase.words.length > 0 && phrase.durationMs > 0, phrase.id);
    let end = 0;
    for (const word of phrase.words) {
      assert.ok(word.text && word.es && word.ipa, phrase.id + ": missing word annotation");
      assert.ok([0, 1, 2].includes(word.stress), phrase.id + ": invalid stress");
      assert.equal(word.slice[0], end, phrase.id + ": word slices must meet");
      assert.ok(word.slice[1] > end && word.slice[1] <= 1, phrase.id + ": invalid word slice");
      end = word.slice[1];
    }
    assert.equal(end, 1, phrase.id + ": word slices must cover the whole phrase");
    for (const curve of [phrase.pitchCurve, phrase.energyCurve]) {
      assert.ok(curve.length > 1 && curve.every(value => value >= 0 && value <= 1), phrase.id);
    }
  }
  let count = 0;
  for (const voice of NATIVE_VOICES) {
    for (const phrase of PHRASES) {
      const paths = ["phrases/" + phrase.id,
        ...phrase.words.map(w => "words/" + wordAudioKey(w.text))];
      for (const path of paths) {
        assert.ok(statSync("audio/" + voice.id + "/" + path + ".mp3").size > 1000);
        count++;
      }
    }
  }
  currentPhrase = PHRASES[0];
  speakNativePhrase(() => completed++);
  assert.equal(nativeAudio.src, "audio/af_heart/phrases/" + currentPhrase.id + ".mp3");
  assert.equal(nativeAudio.playbackRate, 0.75);
  assert.equal(nativeAudio.preservesPitch, true);
  nativeAudio.currentTime = 1;
  nativeAudio.duration = 4;
  nativeAudio.onplaying();
  frame();
  assert.equal(lastProgress, 0.25);
  const staleEnd = nativeAudio.onended;
  stopNativePlayback();
  staleEnd();
  assert.equal(completed, 0, "Cancelled audio must not advance the loop");
  voiceSelect.value = "am_michael";
  speakNativePhrase(() => completed++);
  nativeAudio.onended();
  assert.equal(completed, 1);
  assert.equal(nativeAudio.onended, null);
  speakSingleWord("five-year-old.");
  assert.equal(nativeAudio.src, "audio/am_michael/words/five_year_old.mp3");
  assert.equal(nativeAudio.playbackRate, 0.85);
  nativeAudio.onerror();
  assert.match(status, /Could not play/);
  assert.equal(completed, 1, "Audio errors must not advance the loop");
  globalThis.checkedPaths = count;
`, context);
await vm.runInContext(`(async () => {
  nativeAudio.play = () => Promise.reject(new Error("Playback blocked"));
  speakNativePhrase(() => completed++);
  await Promise.resolve();
  assert.match(status, /Could not play/);
  assert.equal(completed, 1);
  let rejectOldPlayback;
  nativeAudio.play = () => new Promise((resolve, reject) => { rejectOldPlayback = reject; });
  speakNativePhrase();
  nativeAudio.play = () => Promise.resolve();
  speakSingleWord("milk?");
  rejectOldPlayback(new Error("Cancelled playback"));
  await Promise.resolve();
  assert.equal(status, "Loading natural voice…", "Old failures must not stop new playback");
})()`, context);
console.log(`Checked ${context.checkedPaths} phrase/word references in both voices; playback, speed, timing, cancellation, and errors passed.`);
