# Rythm Raj Studio

Rythm Raj Studio is a free DJ/music dashboard inspired by QuickieMusic, Lexicon DJ, and DJ.Studio, built for live deck experiences with Indian music genres.

## Features

- Online + offline-ready PWA layout
- installable app mode for supported browsers
- local track upload support for a real music library
- dual-deck DJ dashboard
- waveform editor with drag-to-move cue points
- realistic dark dashboard styling inspired by modern DJ software

## Run locally

Open the folder in a browser, or run a local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Local music library

Use the Add Tracks button to load your own MP3 files. They are added to the library instantly and can be played locally without a backend.

## Offline support

The app includes a service worker for caching the shell files so the UI remains available offline after the first visit.

## Design direction

This layout pushes closer to the premium DJ dashboard look of the references you listed:

- QuickieMusic: quick-access library and music browsing
- Lexicon DJ: clean catalog and metadata feel
- DJ.Studio: polished deck and mixer styling

This version adds waveform editing and drag cue markers, making it much closer to a real DJ software dashboard.

## Legal note

For personal use, the included demo audio is fine. For commercial distribution, use your own licensed audio files.
