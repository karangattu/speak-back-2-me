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

There are 32 practice examples in total, including 20 additional everyday
conversation lines:

- Greetings: ask about someone's day and reply politely.
- Directions: find a bus stop and explain a route.
- Bus travel: check the destination and explain where to get off.
- Work: ask when a meeting starts and give the time.
- Restaurants: ask for the check and respond to a request.
- Pharmacies: pick up a prescription and ask for identification.
- Appointments: request Friday and choose morning or afternoon.
- Shopping: ask for a smaller size and check availability.
- Home: ask for help with the dishes and agree to help.
- Clarification: ask someone to repeat slowly or explain a word.

Every example and tappable word is available in both Heart and Michael.

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

Microphone access is required for recording. Native playback uses bundled,
AI-generated American English recordings: Heart and Michael. Choose either
voice from the chart legend. Both voices cover every practice phrase and
individual word, including slow playback and the comparison loop. Speech does
not depend on installed system voices, an API key, or a live speech service.
Recordings of your voice stay in your browser.

See [audio/README.md](audio/README.md) to regenerate the audio after changing
phrases. The target chart curves are illustrative teaching guides; they are not
pitch measurements of the generated speech.

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
node scripts/check-native-audio.mjs
```

## Deployment

Every push to `main` runs the validation jobs and then deploys the site to
GitHub Pages. Pull requests run validation without deploying. The workflow can
also be started manually from the Actions tab.

- Workflow: `.github/workflows/deploy.yml`
- Pages source: GitHub Actions
- Dependabot checks for newer GitHub Actions versions every Monday.
