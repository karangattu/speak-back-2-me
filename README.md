# Speak Back 2 Me — English Prosody for Spanish Speakers

A browser-only English pronunciation practice tool for Mexican Spanish speakers.
Pick an everyday phrase, listen to the native target, record yourself shadowing
it, and compare your pitch and rhythm against the target in real time.

**Live site:** https://karangattu.github.io/speak-back-2-me/

## Practice phrases

- Supermarket: asking where to find the milk and taco/burrito ingredients (tortillas, cilantro, ground beef, avocados).
- Checkout: paying with a card.
- Coffee shop: ordering a coffee with milk.
- Baby gift: buying a gift for a newborn.
- Kid's gift: buying a gift for a five-year-old.
- Doctor: describing a cough and falling-rhythm statements.
- Restaurant: ordering chicken with rice politely.
- Small talk: friendly greetings and introductions.

Each English word has its Mexican Spanish translation underneath, plus IPA.

## What it does

- Visualizes stressed and reduced syllables in each practice phrase.
- Shows a Mexican Spanish translation under every English word.
- Draws the target pitch contour and volume envelope on a canvas.
- Records your voice and overlays your live pitch and energy trace.
- Scores pitch match and rhythm/stress sync.
- Replays a native/your-voice ping-pong loop for comparison.
- Supports 0.75x slow practice.
- Processes all audio locally. Nothing is uploaded or stored.

Microphone access is required for recording. Speech playback uses the browser's
built-in `speechSynthesis` API, so voice availability varies by browser and OS.

## Mobile

The layout is tuned for phone screens: full-width tap targets, compact metrics,
and a shorter chart. Recording and ping-pong playback follow iOS Safari's audio
rules, so the audio context is created on tap and one unlocked audio element is
reused for replay.

## Run locally

No build step or dependencies are required.

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly also works, but
serving it over HTTP is closer to the deployed environment.

## Validation

```sh
npx --yes html-validate@11.17.0 index.html
node scripts/check-inline-js.mjs
```

## Deployment

Every push to `main` runs the validation jobs and then deploys the site to
GitHub Pages. Pull requests run validation without deploying. The workflow can
also be started manually from the Actions tab.

- Workflow: `.github/workflows/deploy.yml`
- Pages source: GitHub Actions
- Dependabot checks for newer GitHub Actions versions every Monday.
