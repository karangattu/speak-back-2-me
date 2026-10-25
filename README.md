# Speak Back 2 Me

A browser-only English pronunciation practice tool for Mexican Spanish speakers.
Pick an everyday phrase, listen to the native target, record yourself shadowing
it, and compare your pitch and rhythm against the target in real time.

Live site: https://karangattu.github.io/speak-back-2-me/

## Practice phrases

- Supermarket: asking where to find the milk and taco or burrito ingredients (tortillas, cilantro, ground beef, avocados).
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
- Bus travel: make sure that you know the destination and explain where to get off.
- Work: ask when a meeting starts and give the time.
- Restaurants: ask for the check and respond to a request.
- Pharmacies: pick up a prescription and ask for identification.
- Appointments: request Friday and choose morning or afternoon.
- Shopping: ask for a smaller size and check availability.
- Home: ask for help with the dishes and agree to help.
- Clarification: ask someone to repeat slowly or explain a word.

Every example and tappable word is available in both Heart and Michael.

Each English word has its Mexican Spanish translation underneath, plus IPA.

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
phrases. The target chart curves are visual teaching guides rather than pitch
measurements of the generated speech.

## Mobile

The layout fits phone screens with full-width tap targets, compact metrics,
and a shorter chart. Recording and ping-pong playback follow iOS Safari audio
rules. The browser creates the audio context on tap and reuses one unlocked audio
element for replay.

## Run locally

The project requires no build step or dependencies.

```sh
python3 -m http.server 8000
```

Open http://localhost:8000 in your browser. You can also open `index.html` directly,
but an HTTP server matches the deployed environment more closely.

## Validation

```sh
npx --yes html-validate@11.17.0 index.html
node scripts/check-inline-js.mjs
node scripts/check-native-audio.mjs
```

## Deployment

Every push to `main` runs the validation jobs and deploys the site to
GitHub Pages. Pull requests run validation without deploying. You can
also start the workflow manually from the Actions tab.

- Workflow: `.github/workflows/deploy.yml`
- Pages source: GitHub Actions
- Dependabot checks for newer GitHub Actions versions every Monday.
