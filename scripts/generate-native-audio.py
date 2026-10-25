"""Generate bundled speech with Kokoro 1.0; see audio/README.md for setup."""
import argparse
import io
import json
from pathlib import Path
import subprocess

import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parent.parent


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("model_dir", type=Path)
    args = parser.parse_args()
    # Read the app's manifest and word naming function so assets cannot drift.
    manifest = json.loads(subprocess.check_output([
        "node", "-e", r"""
        const fs = require('node:fs');
        const html = fs.readFileSync('index.html', 'utf8');
        const phrases = html.match(/const PHRASES = ([\s\S]*?);\n/)[0];
        const voices = html.match(/const NATIVE_VOICES = ([\s\S]*?);\n/)[0];
        const wordKey = html.match(/function wordAudioKey\(text\) \{[\s\S]*?\n\}/)[0];
        const data = new Function(phrases + voices + wordKey + `
          return { phrases: PHRASES, voices: NATIVE_VOICES,
            words: Object.fromEntries(PHRASES.flatMap(p => p.words.map(w =>
              [wordAudioKey(w.text), w.text.replace(/-/g, ' ').replace(/[^a-zA-Z' ]/g, '').trim()]
            ))) };
        `)();
        console.log(JSON.stringify(data));
        """
    ], cwd=ROOT, text=True))
    kokoro = Kokoro(str(args.model_dir / "kokoro-v1.0.onnx"),
                    str(args.model_dir / "voices-v1.0.bin"))
    for voice in manifest["voices"]:
        clips = {f"phrases/{p['id']}": " ".join(w["text"] for w in p["words"])
                 for p in manifest["phrases"]}
        clips.update({f"words/{key}": text for key, text in manifest["words"].items()})
        for key, text in clips.items():
            path = ROOT / "audio" / voice["id"] / f"{key}.mp3"
            path.parent.mkdir(parents=True, exist_ok=True)
            samples, rate = kokoro.create(text, voice=voice["id"], speed=1.0, lang="en-us")
            wav = io.BytesIO()
            sf.write(wav, samples, rate, format="WAV")
            subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
                            "-i", "pipe:0", "-codec:a", "libmp3lame", "-b:a", "96k", str(path)],
                           input=wav.getvalue(), check=True)
            print(f"{path.relative_to(ROOT)}: {len(samples) / rate:.2f}s", flush=True)


if __name__ == "__main__":
    main()
