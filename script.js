const tracks = [
  { id: 1, title: 'BollyBeat Rush', artist: 'Aarav Shah', genre: 'Bollywood', bpm: 128, mood: 'High Energy', color: 'pink', duration: '03:28' },
  { id: 2, title: 'Punjab Sunset', artist: 'Jass Singh', genre: 'Bhangra', bpm: 132, mood: 'Festive', color: 'orange', duration: '03:44' },
  { id: 3, title: 'Silver Dhols', artist: 'Riya Kaur', genre: 'Punjabi', bpm: 126, mood: 'Glow', color: 'gold', duration: '04:09' },
  { id: 4, title: 'Temple Pulse', artist: 'Mithran V', genre: 'Tamil', bpm: 118, mood: 'Groove', color: 'teal', duration: '03:52' },
  { id: 5, title: 'Saffron Dreams', artist: 'Nisha Rao', genre: 'Telugu', bpm: 121, mood: 'Warm', color: 'purple', duration: '04:16' },
  { id: 6, title: 'Rain in Pune', artist: 'Aditya Kale', genre: 'Marathi', bpm: 110, mood: 'Smooth', color: 'blue', duration: '03:42' },
  { id: 7, title: 'Midnight Ghazal', artist: 'Sameera Ali', genre: 'Ghazal', bpm: 92, mood: 'Dreamy', color: 'rose', duration: '05:01' },
  { id: 8, title: 'Jazzantra Mix', artist: 'The Fusion Club', genre: 'Fusion', bpm: 124, mood: 'Club', color: 'cyan', duration: '04:08' },
  { id: 9, title: 'Diwali Lights', artist: 'Roshaan', genre: 'Bollywood', bpm: 130, mood: 'Epic', color: 'orange', duration: '03:58' },
  { id: 10, title: 'Balle Balle Echo', artist: 'Harnoor', genre: 'Punjabi', bpm: 134, mood: 'Crowd', color: 'red', duration: '03:31' }
];

const libraryList = document.getElementById('libraryList');
const queueList = document.getElementById('queueList');
const searchInput = document.getElementById('searchInput');
const genreButtons = document.querySelectorAll('.genre-chip');
const crossfader = document.getElementById('crossfader');

let activeGenre = 'all';
let selectedTrackId = 1;

function buildWaveform(targetId) {
  const container = document.getElementById(targetId);
  container.innerHTML = '';
  for (let i = 0; i < 30; i += 1) {
    const bar = document.createElement('span');
    const height = 18 + Math.random() * 48;
    bar.style.height = `${height}px`;
    bar.style.animationDelay = `${i * 0.08}s`;
    container.appendChild(bar);
  }
}

function getFilteredTracks() {
  const term = searchInput.value.trim().toLowerCase();
  return tracks.filter((track) => {
    const matchesGenre = activeGenre === 'all' || track.genre === activeGenre;
    const searchMatch = !term || `${track.title} ${track.artist} ${track.genre}`.toLowerCase().includes(term);
    return matchesGenre && searchMatch;
  });
}

function renderLibrary() {
  const filtered = getFilteredTracks();
  libraryList.innerHTML = '';

  filtered.forEach((track) => {
    const item = document.createElement('div');
    item.className = `track-item ${track.id === selectedTrackId ? 'selected' : ''}`;
    item.dataset.trackId = String(track.id);

    item.innerHTML = `
      <div class="track-art">${track.genre === 'Bollywood' ? '🎶' : track.genre === 'Bhangra' ? '🥁' : track.genre === 'Punjabi' ? '🎧' : track.genre === 'Tamil' ? '🌙' : track.genre === 'Telugu' ? '✨' : track.genre === 'Marathi' ? '🌧️' : track.genre === 'Ghazal' ? '🎼' : '🎛️'}</div>
      <div class="track-details">
        <h4>${track.title}</h4>
        <p>${track.artist} • ${track.genre}</p>
      </div>
      <div class="track-bpm">${track.bpm} BPM</div>
    `;

    item.addEventListener('click', () => {
      selectedTrackId = track.id;
      renderLibrary();
      updateDecks(track);
    });

    libraryList.appendChild(item);
  });
}

function renderQueue() {
  const upcoming = tracks.slice(0, 5);
  queueList.innerHTML = '';

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
    queueList.appendChild(item);
  });
}

function updateDecks(track) {
  const deckA = document.getElementById('deckATitle');
  const deckB = document.getElementById('deckBTitle');
  const artistA = document.getElementById('deckAArtist');
  const artistB = document.getElementById('deckBArtist');
  const genreA = document.getElementById('deckAGenre');
  const genreB = document.getElementById('deckBGenre');

  const nextTrack = tracks.find((item) => item.id !== track.id) || track;

  deckA.textContent = track.title;
  deckB.textContent = nextTrack.title;
  artistA.textContent = track.artist;
  artistB.textContent = nextTrack.artist;
  genreA.textContent = track.genre;
  genreB.textContent = nextTrack.genre;

  const artA = document.querySelector('.artwork-a');
  const artB = document.querySelector('.artwork-b');
  artA.style.background = track.genre === 'Bollywood' ? 'linear-gradient(135deg, #ff7ba4, #ffb84d, #4cc9ff)' : track.genre === 'Bhangra' ? 'linear-gradient(135deg, #ff9a3d, #ffe66d, #ff5fa2)' : track.genre === 'Punjabi' ? 'linear-gradient(135deg, #ef476f, #ffd166, #06d6a0)' : track.genre === 'Tamil' ? 'linear-gradient(135deg, #3a86ff, #7ec8e3, #90f1ef)' : track.genre === 'Telugu' ? 'linear-gradient(135deg, #9d7ef5, #4cc9ff, #d4d4d8)' : track.genre === 'Marathi' ? 'linear-gradient(135deg, #4957f7, #2ec4b6, #f4d35e)' : track.genre === 'Ghazal' ? 'linear-gradient(135deg, #b5179e, #ff7096, #ffd166)' : 'linear-gradient(135deg, #00f5d4, #00bbf9, #9b5de5)';
  artB.style.background = nextTrack.genre === 'Bollywood' ? 'linear-gradient(135deg, #ff7ba4, #ffb84d, #4cc9ff)' : nextTrack.genre === 'Bhangra' ? 'linear-gradient(135deg, #ff9a3d, #ffe66d, #ff5fa2)' : nextTrack.genre === 'Punjabi' ? 'linear-gradient(135deg, #ef476f, #ffd166, #06d6a0)' : nextTrack.genre === 'Tamil' ? 'linear-gradient(135deg, #3a86ff, #7ec8e3, #90f1ef)' : nextTrack.genre === 'Telugu' ? 'linear-gradient(135deg, #9d7ef5, #4cc9ff, #d4d4d8)' : nextTrack.genre === 'Marathi' ? 'linear-gradient(135deg, #4957f7, #2ec4b6, #f4d35e)' : nextTrack.genre === 'Ghazal' ? 'linear-gradient(135deg, #b5179e, #ff7096, #ffd166)' : 'linear-gradient(135deg, #00f5d4, #00bbf9, #9b5de5)';

  buildWaveform('waveformA');
  buildWaveform('waveformB');
}

searchInput.addEventListener('input', renderLibrary);

genreButtons.forEach((button) => {
  button.addEventListener('click', () => {
    genreButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeGenre = button.dataset.genre;
    renderLibrary();
  });
});

document.getElementById('playA').addEventListener('click', () => {
  const btn = document.getElementById('playA');
  btn.textContent = btn.textContent === 'Play' ? 'Pause' : 'Play';
});

document.getElementById('playB').addEventListener('click', () => {
  const btn = document.getElementById('playB');
  btn.textContent = btn.textContent === 'Play' ? 'Pause' : 'Play';
});

document.getElementById('syncA').addEventListener('click', () => {
  document.getElementById('deckATitle').textContent = 'BollyBeat Rush';
  document.getElementById('deckBTitle').textContent = 'Punjab Sunset';
});

document.getElementById('syncB').addEventListener('click', () => {
  document.getElementById('deckATitle').textContent = 'BollyBeat Rush';
  document.getElementById('deckBTitle').textContent = 'Punjab Sunset';
});

crossfader.addEventListener('input', (event) => {
  const value = Number(event.target.value);
  const left = 100 - value;
  const right = value;
  document.querySelector('.deck-a').style.filter = `brightness(${1 + left / 200})`;
  document.querySelector('.deck-b').style.filter = `brightness(${1 + right / 200})`;
});

buildWaveform('waveformA');
buildWaveform('waveformB');
renderLibrary();
renderQueue();
updateDecks(tracks[0]);
