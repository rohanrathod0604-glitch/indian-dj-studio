# Rythm Raj Studio

Rythm Raj Studio is a free DJ/music app inspired by QuickieMusic, Lexicon DJ, and DJ.Studio, using Indian genres and a modern dashboard.

## What is included

- Online + offline-ready web app
- Installable app mode using a PWA manifest
- Local music library upload support
- Demo DJ deck layout with dual-deck controls
- Genre filters for Bollywood, Bhangra, Punjabi, Tamil, Telugu, Marathi, Ghazal, and Fusion
- Public demo audio fallback for immediate testing

## Installable app mode

This project supports install prompts in supported browsers. You can install it like an app on desktop or mobile, and it will continue working offline after the first load.

## Real DJ music library mode

The app allows users to upload their own MP3 tracks through the browser. Uploaded tracks are added to the DJ library and can be played locally without a backend.

## Run locally

Open the project in a browser, or run a local server:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Offline support

The app registers a service worker so the UI and audio cache can load offline after the first visit. Since browser security limits automatic audio download for local files, the app also supports adding your own tracks from disk for a real local DJ library.

## Notes

- This version is free to use for personal and learning projects.
- Replace demo tracks with your own licensed audio if you plan to distribute or publish the app commercially.
- For best offline performance, add your own MP3 files into the app via the Add Tracks button.

## Design inspiration

- QuickieMusic: fast track library feel
- Lexicon DJ: catalog-driven organization
- DJ.Studio: polished live mix presentation

This repo now supports the online + offline, installable app, and local DJ library workflow you requested.
