const demoTracks = [
  { id: 1, title: 'BollyBeat Rush', artist: 'Aarav Shah', genre: 'Bollywood', bpm: 128, mood: 'High Energy', duration: '03:28', source: 'remote', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', cuePoints: { left: 14, right: 62, playhead: 22 } },
  { id: 2, title: 'Punjab Sunset', artist: 'Jass Singh', genre: 'Bhangra', bpm: 132, mood: 'Festive', duration: '03:44', source: 'remote', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', cuePoints: { left: 18, right: 66, playhead: 38 } },
  { id: 3, title: 'Silver Dhols', artist: 'Riya Kaur', genre: 'Punjali', bpm: 126, mood: 'Glow', duration: '04:09', source: 'remote', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', cuePoints: { left: 24, right: 58, playhead: 26 } },
  { id: 4, title: 'Temple Pulse', artist: 'Mithran V', genre: 'Tamil', bpm: 118, mood: 'Groove', duration: '03:52', source: 'remote', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', cuePoints: { left: 16, right: 70, playhead: 30 } },
  { id: 5, title: 'Saffron Dreams', artist: 'Nisha Rao', genre: 'Telugu', bpm: 121, mood: 'Warm', duration: '04:16', source: 'remote', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', cuePoints: { left: 20, right: 64, playhead: 35 } },
  { id: 6, title: 'Rain in Pune', artist: 'Aditya Kale', genre: 'Marathi', bpm: 110, mood: 'Smooth', duration: '03:42', source: 'remote', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', cuePoints: { left: 12, right: 60, playhead: 28 } },
  { id: 7, title: 'Midnight Ghazal', artist: 'Sameera Ali', genre: 'Ghazal', bpm: 92, mood: 'Dreamy', duration: '05:01', source: 'remote', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', cuePoints: { left: 30, right: 72, playhead: 42 } },
  { id: 8, title: 'Jazzantra Mix', artist: 'The Fusion Club', genre: 'Fusion', bpm: 124, mood: 'Club', duration: '04:08', source: 'remote', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', cuePoints: { left: 21, right: 68, playhead: 31 } },
  { id: 9, title: 'Diwali Lights', artist: 'Roshaan', genre: 'Bollywood', bpm: 130, mood: 'Epic', duration: '03:58', source: 'remote', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', cuePoints: { left: 15, right: 64, playhead: 23 } },
  { id: 10, title: 'Balle Balle Echo', artist: 'Harnoor', genre: 'Punjabi', bpm: 134, mood: 'Crowd', duration: '03:31', source: 'remote', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', cuePoints: { left: 28, right: 70, playhead: 44 } }
];

const genreColors = {
  Bollywood: 'linear-gradient(135deg, #ff7ba4, #ffb84d, #4cc9ff)',
  Bhangra: 'linear-gradient(135deg, #ff9a3d, #ffe66d, #ff5fa2)',
  Punjabi: 'linear-gradient(135deg, #ef476f, #ffd166, #06d6a0)',
  Tamil: 'linear-gradient(135deg, #3a86ff, #7ec8e3, #90f1ef)',
  Telugu: 'linear-gradient(135deg, #9d7ef5, #4cc9ff, #d4d4d8)',
  Marathi: 'linear-gradient(135deg, #4957f7, #2ec4b6, #f4d35e)',
  Ghazal: 'linear-gradient(135deg, #b5179e, #ff7096, #ffd166)',
  Fusion: 'linear-gradient(135deg, #00f5d4, #00bbf9, #9b5de5)',
};

const state = {
  activeGenre: 'all',
  query: '',
  selectedTrackId: 1,
  offline: !navigator.onLine,
  crossfaderValue: 52,
  deferredPrompt: null,
  library: [...demoTracks],
  audioContext: null,
  engine: null,
};

const refs = {
  libraryList: document.getElementById('libraryList'),
  queueList: document.getElementById('queueList'),
  trackCount: document.getElementById('trackCount'),
  queueCount: document.getElementById('queueCount'),
  queueTotal: document.getElementById('queueTotal'),
  searchInput: document.getElementById('searchInput'),
  genreButtons: [...document.querySelectorAll('.genre-chip')],
  crossfader: document.getElementById('crossfader'),
  installAppBtn: document.getElementById('installAppBtn'),
  addTracksBtn: document.getElementById('addTracksBtn'),
  trackUploadInput: document.getElementById('trackUploadInput'),
  connectionStatus: document.getElementById('connectionStatus'),
  audioA: document.getElementById('audioA'),
  audioB: document.getElementById('audioB'),
  deckATitle: document.getElementById('deckATitle'),
  deckBTitle: document.getElementById('deckBTitle'),
  deckAArtist: document.getElementById('deckAArtist'),
  deckBArtist: document.getElementById('deckBArtist'),
  deckAGenre: document.getElementById('deckAGenre'),
  deckBGenre: document.getElementById('deckBGenre'),
  deckABpm: document.getElementById('deckABpm'),
  deckBBpm: document.getElementById('deckBBpm'),
  globalTempo: document.getElementById('globalTempo'),
  playA: document.getElementById('playA'),
  playB: document.getElementById('playB'),
  cueA: document.getElementById('cueA'),
  cueB: document.getElementById('cueB'),
  syncA: document.getElementById('syncA'),
  syncB: document.getElementById('syncB'),
  gainA: document.getElementById('gainA'),
  gainB: document.getElementById('gainB'),
  tempoA: document.getElementById('tempoA'),
  tempoB: document.getElementById('tempoB'),
  lowA: document.getElementById('lowA'),
  lowB: document.getElementById('lowB'),
  midA: document.getElementById('midA'),
  midB: document.getElementById('midB'),
  highA: document.getElementById('highA'),
  highB: document.getElementById('highB'),
};

function inferGenreFromText(text) {
  const value = (text || '').toLowerCase();
  if (value.includes('bhangra') || value.includes('dhol') || value.includes('punjabi')) return 'Punjabi';
  if (value.includes('bollywood') || value.includes('movie') || value.includes('masti')) return 'Bollywood';
  if (value.includes('tamil') || value.includes('song') || value.includes('temple')) return 'Tamil';
  if (value.includes('telugu') || value.includes('saffron') || value.includes('drama')) return 'Telugu';
  if (value.includes('marathi') || value.includes('rain') || value.includes('pune')) return 'Marathi';
  if (value.includes('ghazal') || value.includes('sufi') || value.includes('midnight')) return 'Ghazal';
  if (value.includes('fusion') || value.includes('mix') || value.includes('club')) return 'Fusion';
  return 'Fusion';
}

function autoOrganizeLibrary() {
  state.library = [...state.library].sort((a, b) => {
    const order = ['Bollywood', 'Punjabi', 'Bhangra', 'Fusion', 'Tamil', 'Telugu', 'Marathi', 'Ghazal'];
    return (order.indexOf(a.genre) - order.indexOf(b.genre)) || a.title.localeCompare(b.title);
  });
}

function getVisibleTracks() {
  const searchValue = state.query.trim().toLowerCase();
  return state.library.filter((track) => {
    const matchesGenre = state.activeGenre === 'all' || track.genre === state.activeGenre;
    const matchesSearch = !searchValue || `${track.title} ${track.artist} ${track.genre}`.toLowerCase().includes(searchValue);
    return matchesGenre && matchesSearch;
  });
}

function updateConnectionStatus() {
  refs.connectionStatus.textContent = state.offline ? 'Offline' : 'Online';
  refs.connectionStatus.classList.toggle('online', !state.offline);
  refs.connectionStatus.classList.toggle('offline', state.offline);
}

function getWaveformBars(count = 48) {
  const result = [];
  for (let i = 0; i < count; i += 1) {
    const height = 12 + Math.random() * 56;
    result.push({ height, delay: i * 0.05 });
  }
  return result;
}

function buildWaveform(targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = '';

  getWaveformBars().forEach((bar) => {
    const element = document.createElement('span');
    element.style.height = `${bar.height}px`;
    element.style.animationDelay = `${bar.delay}s`;
    container.appendChild(element);
  });
}

function updateDeckText(track) {
  const nextTrack = state.library.find((item) => item.id !== track.id) || track;

  refs.deckATitle.textContent = track.title;
  refs.deckBTitle.textContent = nextTrack.title;
  refs.deckAArtist.textContent = track.artist;
  refs.deckBArtist.textContent = nextTrack.artist;
  refs.deckAGenre.textContent = track.genre;
  refs.deckBGenre.textContent = nextTrack.genre;
  refs.deckABpm.textContent = String(track.bpm || 128);
  refs.deckBBpm.textContent = String(nextTrack.bpm || 128);
  refs.globalTempo.textContent = `${track.bpm || 128} BPM`;

  const artA = document.querySelector('.artwork-a');
  const artB = document.querySelector('.artwork-b');
  artA.style.background = genreColors[track.genre] || genreColors.Fusion;
  artB.style.background = genreColors[nextTrack.genre] || genreColors.Fusion;

  buildWaveform('waveformA');
  buildWaveform('waveformB');
  updateWaveformMarkers('A');
  updateWaveformMarkers('B');
}

function updateWaveformMarkers(deckKey) {
  const shell = document.getElementById(`waveformShell${deckKey}`);
  if (!shell) return;

  const track = state.library.find((item) => item.id === state.selectedTrackId) || state.library[0];
  if (!track) return;

  const cueMarkers = shell.querySelectorAll('.cue-marker');
  cueMarkers.forEach((marker) => {
    const cueType = marker.dataset.cue;
    const value = track.cuePoints?.[cueType] ?? (cueType === 'left' ? 18 : 66);
    marker.style.left = `${value}%`;
  });

  const playhead = shell.querySelector('.playhead');
  if (playhead) {
    const left = track.cuePoints?.playhead ?? 30;
    playhead.style.left = `${left}%`;
  }

  const cueText = deckKey === 'A' ? refs.deckACuePoint : refs.deckBCuePoint;
  if (cueText) {
    cueText.textContent = `${track.cuePoints?.playhead ?? 30}%`;
  }
}

function renderLibrary() {
  const visibleTracks = getVisibleTracks();
  refs.libraryList.innerHTML = '';
  refs.trackCount.textContent = String(visibleTracks.length);

  if (!visibleTracks.length) {
    refs.libraryList.innerHTML = '<div class="empty-state">No tracks found.</div>';
    return;
  }

  visibleTracks.forEach((track) => {
    const item = document.createElement('div');
    item.className = `track-item ${track.id === state.selectedTrackId ? 'selected' : ''}`;
    item.dataset.trackId = track.id;

    item.innerHTML = `
      <div class="track-art">${track.genre === 'Bollywood' ? '🎶' : track.genre === 'Bhangra' ? '🥁' : track.genre === 'Punjabi' ? '🎧' : track.genre === 'Tamil' ? '🌙' : track.genre === 'Telugu' ? '✨' : track.genre === 'Marathi' ? '🌧️' : track.genre === 'Ghazal' ? '🎼' : '🎛️'}</div>
      <div class="track-details">
        <h4>${track.title}</h4>
        <p>${track.artist} • ${track.genre}</p>
      </div>
      <div class="track-bpm">${track.bpm} BPM</div>
    `;

    item.addEventListener('click', () => {
      state.selectedTrackId = track.id;
      const currentTrack = state.library.find((entry) => entry.id === track.id) || state.library[0];
      updateDeckText(currentTrack);
      renderLibrary();
      syncAudioSources();
    });

    refs.libraryList.appendChild(item);
  });
}

function renderQueue() {
  const upcoming = state.library.slice(0, 5);
  refs.queueList.innerHTML = '';
  refs.queueCount.textContent = String(upcoming.length);
  refs.queueTotal.textContent = `${upcoming.length} Tracks`;

  upcoming.forEach((track) => {
    const item = document.createElement('div');
    item.className = 'queue-item';
    item.innerHTML = `
      <div class="queue-art">${track.genre === 'Bollywood' ? '🎶' : track.genre === 'Bhangra' ? '🥁' : track.genre === 'Punjabi' ? '🎧' : track.genre === 'Tamil' ? '🌙' : track.genre === 'Telugu' ? '✨' : track.genre === 'Marathi' ? '🌧️' : track.genre === 'Ghazal' ? '🎼' : '🎛️'}</div>
      <div>
        <h4>${track.title}</h4>
        <p>${track.artist}</p>
      </div>
      <div class="queue-time">${track.duration}</div>
    `;

    item.addEventListener('click', () => {
      state.selectedTrackId = track.id;
      const currentTrack = state.library.find((entry) => entry.id === track.id) || state.library[0];
      updateDeckText(currentTrack);
      renderLibrary();
      syncAudioSources();
    });

    refs.queueList.appendChild(item);
  });
}

function resumeAudio() {
  if (!state.audioContext) return Promise.resolve();
  if (state.audioContext.state === 'suspended') return state.audioContext.resume();
  return Promise.resolve();
}

function ensureAudioEngine() {
  if (!state.audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      return null;
    }

    const ctx = new AudioCtx();
    const masterGain = ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);

    state.audioContext = ctx;
    state.engine = {
      ctx,
      masterGain,
      decks: {
        A: null,
        B: null,
      },
    };
  }

  return state.engine;
}

function setupDeckEngine(deckKey, element) {
  const engine = ensureAudioEngine();
  if (!engine || !engine.ctx || !element) return;

  const { ctx } = engine;
  const map = engine.decks[deckKey];
  if (map) return map;

  const source = ctx.createMediaElementSource(element);
  const lowFilter = ctx.createBiquadFilter();
  const midFilter = ctx.createBiquadFilter();
  const highFilter = ctx.createBiquadFilter();
  const preGain = ctx.createGain();
  const postGain = ctx.createGain();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;

  lowFilter.type = 'lowshelf';
  midFilter.type = 'peaking';
  highFilter.type = 'highshelf';

  lowFilter.frequency.value = 180;
  midFilter.frequency.value = 1500;
  highFilter.frequency.value = 3500;

  source.connect(lowFilter);
  lowFilter.connect(midFilter);
  midFilter.connect(highFilter);
  highFilter.connect(preGain);
  preGain.connect(postGain);
  postGain.connect(analyser);
  analyser.connect(engine.masterGain);

  const deck = {
    source,
    lowFilter,
    midFilter,
    highFilter,
    preGain,
    postGain,
    analyser,
    gain: deckKey === 'A' ? 0.72 : 0.68,
    low: deckKey === 'A' ? 5 : 4,
    mid: deckKey === 'A' ? 2 : 1,
    high: deckKey === 'A' ? 3 : 2,
    playing: deckKey === 'A',
    bpm: 128,
    syncLocked: deckKey === 'A',
  };

  engine.decks[deckKey] = deck;
  return deck;
}

function applyDeckMetadataToEngine(deckKey, deck) {
  const engine = ensureAudioEngine();
  if (!engine || !engine.decks[deckKey]) return;

  const target = engine.decks[deckKey];
  const gainValue = deckKey === 'A' ? Number(refs.gainA.value) / 100 : Number(refs.gainB.value) / 100;
  target.gain = gainValue;
  target.postGain.gain.value = gainValue;

  const lowGain = deckKey === 'A' ? Number(refs.lowA.value) : Number(refs.lowB.value);
  const midGain = deckKey === 'A' ? Number(refs.midA.value) : Number(refs.midB.value);
  const highGain = deckKey === 'A' ? Number(refs.highA.value) : Number(refs.highB.value);

  target.lowFilter.gain.value = lowGain;
  target.midFilter.gain.value = midGain;
  target.highFilter.gain.value = highGain;
}

function applyCrossfader(value) {
  const left = (100 - value) / 100;
  const right = value / 100;
  const engine = state.engine;
  if (!engine) return;

  const deckA = engine.decks.A;
  const deckB = engine.decks.B;

  if (deckA) {
    deckA.postGain.gain.value = left * Number(refs.gainA.value || 72) / 100;
  }

  if (deckB) {
    deckB.postGain.gain.value = right * Number(refs.gainB.value || 65) / 100;
  }
}

function syncAudioSources() {
  const currentTrack = state.library.find((entry) => entry.id === state.selectedTrackId) || state.library[0];
  const nextTrack = state.library.find((entry) => entry.id !== state.selectedTrackId) || state.library[1] || state.library[0];

  const audioA = refs.audioA;
  const audioB = refs.audioB;

  if (currentTrack) {
    const sourceA = currentTrack.audioUrl || currentTrack.localUrl;
    if (sourceA && audioA.getAttribute('src') !== sourceA) {
      audioA.src = sourceA;
      audioA.load();
    }

    if (audioA) {
      setupDeckEngine('A', audioA);
      applyDeckMetadataToEngine('A');
    }
  }

  if (nextTrack) {
    const sourceB = nextTrack.audioUrl || nextTrack.localUrl;
    if (sourceB && audioB.getAttribute('src') !== sourceB) {
      audioB.src = sourceB;
      audioB.load();
    }

    if (audioB) {
      setupDeckEngine('B', audioB);
      applyDeckMetadataToEngine('B');
    }
  }

  updateDeckText(currentTrack || state.library[0]);
  updateCrossfaderUI();
  applyCrossfader(state.crossfaderValue);
}

function updateCrossfaderUI() {
  document.querySelector('.deck-a').style.filter = `brightness(${1 + (100 - state.crossfaderValue) / 220})`;
  document.querySelector('.deck-b').style.filter = `brightness(${1 + state.crossfaderValue / 220})`;
}

function handleTrackUpload(event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;

  files.forEach((file, index) => {
    if (!file.type.startsWith('audio/')) return;

    const objectUrl = URL.createObjectURL(file);
    const title = file.name.replace(/\.[^.]+$/, '');
    const genre = inferGenreFromText(title);
    const localTrack = {
      id: Date.now() + index,
      title,
      artist: 'Local Upload',
      genre,
      bpm: 120 + index,
      mood: 'Custom',
      duration: '03:00',
      source: 'local',
      localUrl: objectUrl,
      audioUrl: objectUrl,
      cuePoints: { left: 14 + index * 3, right: 58 + index * 4, playhead: 22 + index * 2 },
    };

    state.library.unshift(localTrack);
  });

  autoOrganizeLibrary();
  state.selectedTrackId = state.library[0].id;
  updateDeckText(state.library[0]);
  renderLibrary();
  renderQueue();
  syncAudioSources();

  event.target.value = '';
}

function handleInstallClick() {
  if (!state.deferredPrompt) return;

  state.deferredPrompt.prompt();
  state.deferredPrompt.userChoice.finally(() => {
    state.deferredPrompt = null;
    refs.installAppBtn.hidden = true;
  });
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.register('./service-worker.js').catch((error) => {
    console.warn('Service Worker registration failed:', error);
  });
}

function setupWaveformDragHandlers() {
  document.querySelectorAll('.waveform-shell').forEach((shell) => {
    shell.addEventListener('pointerdown', (event) => {
      const rect = shell.getBoundingClientRect();
      const percent = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
      const deckKey = shell.id.includes('A') ? 'A' : 'B';
      const track = state.library.find((item) => item.id === state.selectedTrackId) || state.library[0];

      if (!track) return;
      if (!track.cuePoints) track.cuePoints = { left: 14, right: 62, playhead: 22 };
      track.cuePoints.playhead = Number(percent.toFixed(1));
      if (deckKey === 'A') {
        refs.audioA.currentTime = (track.cuePoints.playhead / 100) * (refs.audioA.duration || 180);
      } else {
        refs.audioB.currentTime = (track.cuePoints.playhead / 100) * (refs.audioB.duration || 180);
      }
      updateWaveformMarkers(deckKey);
    });
  });

  document.querySelectorAll('.cue-marker').forEach((marker) => {
    marker.addEventListener('pointerdown', (event) => {
      const target = event.currentTarget;
      const shell = target.parentElement;
      const deckKey = target.dataset.deck;
      const track = state.library.find((item) => item.id === state.selectedTrackId) || state.library[0];
      if (!track) return;

      const move = (moveEvent) => {
        const rect = shell.getBoundingClientRect();
        const percent = Math.min(100, Math.max(0, ((moveEvent.clientX - rect.left) / rect.width) * 100));
        if (!track.cuePoints) track.cuePoints = { left: 14, right: 62, playhead: 22 };
        track.cuePoints[target.dataset.cue] = Number(percent.toFixed(1));
        target.style.left = `${percent}%`;
      };

      const up = () => {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      };

      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    });
  });
}

function bindEvents() {
  refs.searchInput.addEventListener('input', (event) => {
    state.query = event.target.value;
    renderLibrary();
  });

  refs.genreButtons.forEach((button) => {
    button.addEventListener('click', () => {
      refs.genreButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      state.activeGenre = button.dataset.genre;
      renderLibrary();
    });
  });

  refs.crossfader.addEventListener('input', (event) => {
    state.crossfaderValue = Number(event.target.value);
    updateCrossfaderUI();
    applyCrossfader(state.crossfaderValue);
  });

  refs.gainA.addEventListener('input', () => applyDeckMetadataToEngine('A'));
  refs.gainB.addEventListener('input', () => applyDeckMetadataToEngine('B'));
  refs.lowA.addEventListener('input', () => applyDeckMetadataToEngine('A'));
  refs.lowB.addEventListener('input', () => applyDeckMetadataToEngine('B'));
  refs.midA.addEventListener('input', () => applyDeckMetadataToEngine('A'));
  refs.midB.addEventListener('input', () => applyDeckMetadataToEngine('B'));
  refs.highA.addEventListener('input', () => applyDeckMetadataToEngine('A'));
  refs.highB.addEventListener('input', () => applyDeckMetadataToEngine('B'));

  refs.playA.addEventListener('click', async () => {
    await resumeAudio();
    if (refs.audioA.paused) {
      refs.audioA.play();
      refs.playA.textContent = 'Pause';
    } else {
      refs.audioA.pause();
      refs.playA.textContent = 'Play';
    }
  });

  refs.playB.addEventListener('click', async () => {
    await resumeAudio();
    if (refs.audioB.paused) {
      refs.audioB.play();
      refs.playB.textContent = 'Pause';
    } else {
      refs.audioB.pause();
      refs.playB.textContent = 'Play';
    }
  });

  refs.syncA.addEventListener('click', () => {
    const selectedTrack = state.library.find((item) => item.id === state.selectedTrackId) || state.library[0];
    if (!selectedTrack) return;
    refs.audioA.currentTime = (selectedTrack.cuePoints?.playhead || 22) / 100 * (refs.audioA.duration || 180);
    refs.audioA.play();
  });

  refs.syncB.addEventListener('click', () => {
    const selectedTrack = state.library.find((item) => item.id === state.selectedTrackId) || state.library[0];
    if (!selectedTrack) return;
    refs.audioB.currentTime = (selectedTrack.cuePoints?.playhead || 38) / 100 * (refs.audioB.duration || 180);
    refs.audioB.play();
  });

  refs.cueA.addEventListener('click', () => {
    const track = state.library.find((item) => item.id === state.selectedTrackId) || state.library[0];
    if (!track) return;
    track.cuePoints = track.cuePoints || { left: 14, right: 62, playhead: 22 };
    refs.audioA.currentTime = (track.cuePoints.left / 100) * (refs.audioA.duration || 180);
    updateWaveformMarkers('A');
  });

  refs.cueB.addEventListener('click', () => {
    const track = state.library.find((item) => item.id === state.selectedTrackId) || state.library[0];
    if (!track) return;
    track.cuePoints = track.cuePoints || { left: 18, right: 66, playhead: 38 };
    refs.audioB.currentTime = (track.cuePoints.left / 100) * (refs.audioB.duration || 180);
    updateWaveformMarkers('B');
  });

  refs.addTracksBtn.addEventListener('click', () => refs.trackUploadInput.click());
  refs.trackUploadInput.addEventListener('change', handleTrackUpload);

  window.addEventListener('online', () => {
    state.offline = false;
    updateConnectionStatus();
  });

  window.addEventListener('offline', () => {
    state.offline = true;
    updateConnectionStatus();
  });

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    state.deferredPrompt = event;
    refs.installAppBtn.hidden = false;
  });

  refs.installAppBtn.addEventListener('click', handleInstallClick);

  const animatePlaybackHeads = () => {
    if (refs.audioA) {
      const track = state.library.find((item) => item.id === state.selectedTrackId) || state.library[0];
      const percent = (refs.audioA.currentTime / (refs.audioA.duration || 180)) * 100;
      const playhead = document.querySelector('#playheadA');
      if (playhead) {
        playhead.style.left = `${Math.min(100, Math.max(0, percent))}%`;
      }
      if (track) track.cuePoints = track.cuePoints || { left: 14, right: 62, playhead: 22 };
      track.cuePoints.playhead = Number((percent || 22).toFixed(1));
    }

    if (refs.audioB) {
      const percent = (refs.audioB.currentTime / (refs.audioB.duration || 180)) * 100;
      const playhead = document.querySelector('#playheadB');
      if (playhead) {
        playhead.style.left = `${Math.min(100, Math.max(0, percent))}%`;
      }
    }

    requestAnimationFrame(animatePlaybackHeads);
  };

  requestAnimationFrame(animatePlaybackHeads);
}

function init() {
  autoOrganizeLibrary();
  updateConnectionStatus();
  bindEvents();
  setupWaveformDragHandlers();
  registerServiceWorker();

  buildWaveform('waveformA');
  buildWaveform('waveformB');
  updateWaveformMarkers('A');
  updateWaveformMarkers('B');
  renderLibrary();
  renderQueue();
  updateDeckText(state.library[0]);
  syncAudioSources();
  updateCrossfaderUI();
}

init();
