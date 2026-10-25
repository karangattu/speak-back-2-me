# Natural reference voices

These MP3s are synthetic speech generated locally with
[Kokoro-82M v1.0](https://huggingface.co/hexgrad/Kokoro-82M), using the
`af_heart` and `am_michael` American English voices. No cloned user voices or
microphone recordings are used. The model weights are Apache-2.0 licensed.

Both voices include every phrase and each unique tappable word. The app serves
only the compressed audio, not the model or a speech API. Keep this directory
in the GitHub Pages artifact.

## Regenerate after changing phrases

Requires Python 3.12+, Node.js, and FFmpeg. In a Python virtual environment:

```sh
pip install kokoro-onnx==0.6.1 soundfile==0.14.0
mkdir -p /tmp/kokoro-model
curl -fL -o /tmp/kokoro-model/kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/kokoro-v1.0.onnx
curl -fL -o /tmp/kokoro-model/voices-v1.0.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/voices-v1.0.bin
python scripts/generate-native-audio.py /tmp/kokoro-model
node scripts/check-native-audio.mjs
```

The generator reads phrase text, voices, and word filenames directly from
`index.html`. It overwrites the corresponding MP3s. Listen to changed clips
before publishing; generated intonation may differ from the teaching hints.
The chart curves remain illustrative teaching targets, not measurements of
these recordings.
