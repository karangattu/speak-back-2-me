# Speak Back 2 Me

A browser-only English pronunciation practice tool for Mexican Spanish speakers.
Pick an everyday phrase, listen to the native target, record yourself shadowing
it, and compare your pitch and rhythm against the target in real time.

Live site: https://karangattu.github.io/speak-back-2-me/

## Features

- Visualizes stressed and reduced syllables in each practice phrase.
- Shows a Mexican Spanish translation under every English word.
- Draws the target pitch contour and volume envelope on a canvas.
- Records your voice and overlays your live pitch and energy trace.
- Scores pitch match and rhythm or stress sync.
- Replays a native and your-voice ping-pong loop for comparison.
- Supports 0.75x slow practice.
- Processes all audio locally without uploading or storing files.

Recording requires microphone access. Native playback uses bundled American English
recordings in two voices: Heart and Michael. Select either voice from the chart
legend. Both voices cover every practice phrase and individual word, including slow
playback and the comparison loop. Speech does not depend on installed system
voices, an API key, or an online service. Your voice recordings stay in your browser.

Read [audio/README.md](audio/README.md) to regenerate the audio after changing
phrases. The target chart curves reflect normalized pitch measurements
extracted from the bundled speech recordings.

