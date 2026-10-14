/**
 * ==========================================================================
 * THE BIRTHDAY GARDEN - INTERACTION ENGINE
 * Features:
 *  - Strict Sequential Progression (Surprise Box -> Maze Path -> The Birthday Garden)
 *  - YouTube IFrame API audio player (starts @ 0:30 upon opening gift)
 *  - Confetti explosion cannon
 *  - Maze Game with controls placed on the left side (character: "anea")
 *  - Real Botanical Garden with 7 friends' blooming flowers & long English letters
 *  - Expandable polaroid keepsake gallery with lightbox
 * ==========================================================================
 */

// Global State with sequential progression (locked until gift is opened)
const GardenState = {
  currentPhase: 'gift', // 'gift', 'maze', 'garden'
  unlockedPhases: new Set(['gift']),
  boxOpened: false,
  mazeCompleted: false,
  musicPlaying: false,
  musicStarted: false,
  openedLetters: new Set(),
  activePhotoIndex: 0,
  dockCollapsed: false
};

// 7 Friends' Long English Birthday Letters
const FriendsLetters = {
  aseel: {
    name: "Aseel",
    flowerName: "Velvet Olive Peony",
    signoff: "⎯⎯͟͟ৎ𝄢⡴　.　 ࣪　muah, Aseel",
    date: "October 2026",
    letterDecor: "assets/divider.png",
    letterImage: "assets/birthday_girl_24.png",
    letter: `꒰ my beautiful anea 🎂⟡﹒﹒

finally? your first birthday with me!! you have no idea how something so simple can mean so much to me. i’m genuinely so, so happy about it. i’m so happy that my love, my heart, my soul is celebrating her birthday, and i get to be there with her, celebrate her, make her happy, sing to her, and share her happiness ⠀૮ ∩´ ᵕ `∩ ྀིა

i love you so much, anea, and i’m so grateful for every little moment i’ve shared with you 🌺 ۫ ⑅

i can’t even begin to explain how you’ve been someone so different from everyone else in my life. you’ve been a sister, a friend, a mother, and everything i ever needed and felt was missing. you completed all those little pieces of me that i didn’t even know were missing. i love you more than words could ever explain  ೀ

happy birthday, my love. i hope you’re always happy, always smiling, and that sadness never finds its way into your life. you deserve all the happiness in this world and so much more. may every year of your life be filled with love, laughter, and beautiful moments. i hope i get to celebrate so many more birthdays with you. i love you endlessly, anea ⑅ 𓏼ׁ ׅ⠀`
  },

  ary: {
    name: "Ary",
    flowerName: "Sunlit Wild Daisy",
    signoff: "Love, Ary",
    date: "October 2026",
    letter: `Hbd to my dearest mommy and the only one
I love all of our memories and it was kinda hard to pick one, i hope ya loved this memory as much as I did along with the rest lovely memories I had with ya, a cherish every single one of em and I love em so much but ofc not as much as mommy, I love you to the moon and back (˶˃ ᵕ ˂˶)`
  },

  hiro: {
    name: "Hiro",
    flowerName: "Moonlit Night Lily",
    signoff: "❥Love always, Hiro",
    date: "October 2026",
    youtubeVideo: "M_X6DGjlw4M",
    letter: `Happy Birthday, Anea! (ﾉ^ヮ^)ﾉ*:・ﾟ✧
I am so incredibly happy to celebrate YOU today. Even though we met through a screen, our friendship means the absolute world to me. Whether we're teaming up in our games or just chatting, you always bring the absolute best energy. Thank you for the late-night talks, the endless laughs, and for being such an amazing friend every single day. I cherish every conversation and gaming session we share, and I'm so lucky to call you a friend. Wishing you a beautiful birthday filled with perfect moments and the best year ahead. ♡`
  },

  tuqa: {
    name: "Tuqa",
    flowerName: "Sparkling Meadow Bloom",
    signoff: "Love, Tuqa",
    date: "October 2026",
    letter: `Heyoo cutiee aneaa <33
Happy birthdayy and I wish you have a wonderful year just like you. I love youu smm and I’m so glad that I had the chance to know you this year.
You’re one of the most kindest and considerate ppl I met. I hope our friendship never ends and I’m really thankful for that day when we added each other by mistake <3`
  },

  luna: {
    name: "Luna",
    flowerName: "Starlight Moss Orchid",
    signoff: "Love, Luna ❤︎",
    date: "October 2026",
    letter: `Happy birthday to the best person i ever met hope your having the most wonderful birthday ever and hope you have a wonderful year ahead i may not really show it but i appreciate having you as a friend you helped me a lot even by just being there and i hope i did the same for you and don’t forget i am always here for you and the less hater club is too <3`
  },

  madi: {
    name: "Madi",
    flowerName: "Honey Meadow Jasmine",
    signoff: "Love, Madi",
    date: "October 2026",
    letter: `Happy Birthday my darlinggg, It’s been 4 years since we’ve met, and 4 years since we’ve been friends. ( ิ◕㉨◕ ิ)I can’t wait for the many more birthdays i’ll be able to count with you. You’re finally 24, an oldie like me, let us revel in our oldness. I really love and care about you, and am ever-so thankful that you will always be in my life as my dearest and closest friend (灬ºωº灬)`
  },

  reemy: {
    name: "Reemy",
    flowerName: "Golden Olive Lotus",
    signoff: "Love, Reemy",
    date: "October 2026",
    letter: `Happy birthday to my partner in crime (in gta), my money launderer (in gta), my traffic eradicator (in gta). Reemy appreciates you a lot even tho we don't talk as often as we used to but you are always the person who id go to if i had some trouble or drama. A great friend to all, a big sister to me. I love you so so much Anea i always have good thoughts about you and always wish you the best, have a nice birthday.`
  }
};

// Gallery Keepsakes Data
const GalleryPhotos = [
  {
    title: "Hiro",
    date: "A special moment with Hiro",
    caption: "A special moment with Hiro",
    svgType: "img:assets/hiro.png"
  },
  {
    title: "Aseel",
    date: "A special moment with Aseel",
    caption: "A special moment with Aseel",
    svgType: "img:assets/wedding.jpg"
  },
  {
    title: "Ary",
    date: "A special moment with Ary",
    caption: "A special moment with Ary",
    svgType: "img:assets/ary.png"
  },
  {
    title: "Madi",
    date: "A special moment with Madi",
    caption: "Treasured video memory with Madi.",
    svgType: "video:assets/madi_video.mp4"
  },
  {
    title: "Luna",
    date: "A special moment with Luna",
    caption: "A special moment with Luna",
    svgType: "img:assets/luna.jpg"
  },
  {
    title: "Tuqa",
    date: "A special moment with Tuqa",
    caption: "A special moment with Tuqa",
    svgType: "img:assets/tuqa.jpg"
  }
];

// ==========================================================================
// AUDIO INTEGRATION (Starts @ 0:30 from uploaded song)
// Primary: Local High-Fidelity MP3 (assets/birthday_song.mp3)
// Fallback: YouTube IFrame API (B1kcMvb3qKA)
// ==========================================================================
let ytPlayer = null;
let ytApiReady = false;
let shouldPlayOnReady = false;
let initialSeekDone = false;

function getAudioElement() {
  return document.getElementById('main-birthday-audio');
}

window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player('youtube-audio-player', {
    height: '135',
    width: '240',
    videoId: 'B1kcMvb3qKA',
    playerVars: {
      autoplay: 0,
      controls: 1,
      disablekb: 0,
      fs: 0,
      rel: 0,
      modestbranding: 1,
      start: 30,
      playsinline: 1,
      enablejsapi: 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
};

let ytFailed = false;

function onPlayerReady(event) {
  ytApiReady = true;
  if (shouldPlayOnReady && !GardenState.musicStarted) {
    playYouTube();
  }
}

function onPlayerError() {
  ytFailed = true;
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    GardenState.musicPlaying = true;
    GardenState.musicStarted = true;
    updateMusicUI(true);
    const audio = getAudioElement();
    if (audio && !audio.paused) audio.pause();

    if (!initialSeekDone) {
      if (ytPlayer.getCurrentTime() < 29.5) ytPlayer.seekTo(30, true);
      initialSeekDone = true;
    }
  } else if (event.data === YT.PlayerState.ENDED) {
    ytPlayer.seekTo(30, true);
    ytPlayer.playVideo();
  } else if (event.data === YT.PlayerState.PAUSED && GardenState.userPaused) {
    GardenState.musicPlaying = false;
    updateMusicUI(false);
  }
}

function playYouTube() {
  try {
    ytPlayer.unMute();
    ytPlayer.setVolume(100);
    if (!initialSeekDone) ytPlayer.seekTo(30, true);
    ytPlayer.playVideo();
  } catch (e) {}
}

// YouTube is only used if the local file can't play
function fallbackToYouTube() {
  if (ytPlayer && ytApiReady && !ytFailed) playYouTube();
  else shouldPlayOnReady = true;
}

// Primary: local copy of the song (preloaded, so it starts instantly), from 0:30
function playLocalAudio() {
  const audio = getAudioElement();
  if (!audio) { fallbackToYouTube(); return; }
  if (audio.currentTime < 30) audio.currentTime = 30;
  audio.play().then(() => {
    GardenState.musicStarted = true;
    GardenState.musicPlaying = true;
    updateMusicUI(true);
  }).catch(() => fallbackToYouTube());
}

function startMusicPlayback() {
  GardenState.userPaused = false;
  playLocalAudio();
}

function toggleMusic() {
  const audio = getAudioElement();

  if (GardenState.musicPlaying) {
    GardenState.userPaused = true;
    if (audio && !audio.paused) audio.pause();
    if (ytPlayer && ytApiReady) ytPlayer.pauseVideo();
    GardenState.musicPlaying = false;
    updateMusicUI(false);
  } else {
    GardenState.userPaused = false;
    playLocalAudio();
  }
}
function updateMusicUI(isPlaying) {
  const btn = document.getElementById('music-toggle-btn');
  const label = document.getElementById('music-btn-label');
  if (!btn || !label) return;

  if (isPlaying) {
    btn.classList.add('playing');
    label.textContent = "Pause Music";
  } else {
    btn.classList.remove('playing');
    label.textContent = "Play Music";
  }
}

function toggleDockCollapse() {
  const widget = document.getElementById('music-dock-widget');
  const icon = document.getElementById('dock-collapse-icon');
  if (!widget) return;

  GardenState.dockCollapsed = !GardenState.dockCollapsed;
  if (GardenState.dockCollapsed) {
    widget.classList.add('collapsed');
    if (icon) icon.innerHTML = '<path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>';
  } else {
    widget.classList.remove('collapsed');
    if (icon) icon.innerHTML = '<path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>';
  }
}

// Fallback Chime
let fallbackAudioCtx = null;
function playAmbientChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!fallbackAudioCtx) fallbackAudioCtx = new AudioCtx();
    const osc = fallbackAudioCtx.createOscillator();
    const gain = fallbackAudioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, fallbackAudioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(659.25, fallbackAudioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.15, fallbackAudioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, fallbackAudioCtx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(fallbackAudioCtx.destination);
    osc.start();
    osc.stop(fallbackAudioCtx.currentTime + 0.6);
  } catch(e) {}
}

// Confetti Blast Effect
function launchBirthdayConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiCount = 140;
  const particles = [];
  const colors = ['#92AA63', '#B2C49B', '#D4A373', '#F4EAD4', '#5C6E3E', '#FFFFFF', '#E5BE92'];

  for (let i = 0; i < confettiCount; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() * 80 - 40),
      y: canvas.height / 2 + (Math.random() * 40 - 20),
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 1.2) * 16 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      shape: Math.random() > 0.4 ? 'rect' : 'circle'
    });
  }

  let animationFrame;
  const startTime = Date.now();

  function renderConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28;
      p.vx *= 0.985;
      p.rotation += p.rotationSpeed;
      p.opacity = Math.max(0, 1 - elapsed / 3800);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (elapsed < 4000) {
      animationFrame = requestAnimationFrame(renderConfetti);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  renderConfetti();

  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#92AA63', '#D4A373', '#F4EAD4', '#B2C49B']
    });
  }
}

// ==========================================================================
// SEQUENTIAL UNLOCK & STAGE ROUTING
// ==========================================================================
function showToast(message) {
  let toast = document.getElementById('lock-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lock-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg class="svg-icon" style="width:16px;height:16px;color:#D4A373;" viewBox="0 0 24 24">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function requestSwitchPhase(phaseName) {
  const node = document.querySelector(`.step-node[data-step="${phaseName}"]`);

  if (!GardenState.unlockedPhases.has(phaseName)) {
    if (node) {
      node.classList.remove('shake');
      void node.offsetWidth;
      node.classList.add('shake');
    }

    if (phaseName === 'maze') {
      showToast("Open the surprise box first to unlock the maze path!");
    } else if (phaseName === 'garden') {
      showToast("Guide anea through the maze to unlock The Birthday Garden!");
    }
    return;
  }

  switchPhase(phaseName);
}

function unlockPhase(phaseName) {
  GardenState.unlockedPhases.add(phaseName);
  const node = document.querySelector(`.step-node[data-step="${phaseName}"]`);
  if (node) {
    node.classList.remove('locked');
  }
}

function switchPhase(phaseName) {
  GardenState.currentPhase = phaseName;

  document.querySelectorAll('.phase-section').forEach(sec => sec.classList.remove('active'));
  const targetSection = document.getElementById(`phase-${phaseName}`);
  if (targetSection) targetSection.classList.add('active');

  document.querySelectorAll('.step-node').forEach(node => {
    const step = node.getAttribute('data-step');
    node.classList.remove('active');
    if (step === phaseName) {
      node.classList.add('active');
    }
  });

  if (phaseName === 'maze') {
    initMazeGame();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open Gift Handler
function handleGiftOpen() {
  const wrapper = document.getElementById('gift-box-wrapper');
  const cta = document.getElementById('gift-cta-container');
  if (!wrapper) return;

  if (GardenState.boxOpened) return;

  GardenState.boxOpened = true;
  wrapper.classList.add('opened');

  unlockPhase('maze');
  const stepGift = document.querySelector('.step-node[data-step="gift"]');
  if (stepGift) stepGift.classList.add('completed');

  try { launchBirthdayConfetti(); } catch(e) {}
  try { playAmbientChime(); } catch(e) {}
  try { startMusicPlayback(); } catch(e) {}

  setTimeout(() => {
    if (cta) cta.style.display = 'block';
  }, 500);
}

// ==========================================================================
// PHASE 2: MAZE GAME ENGINE (Character: anea)
// ==========================================================================
const MAZE_GRID = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 1],
  [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
  [1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 3, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let mazeState = {
  grid: [],
  playerX: 1,
  playerY: 1,
  cellSize: 36,
  canvas: null,
  ctx: null,
  itemsFound: 0
};

function initMazeGame() {
  mazeState.canvas = document.getElementById('maze-canvas');
  if (!mazeState.canvas) return;
  mazeState.ctx = mazeState.canvas.getContext('2d');

  mazeState.grid = MAZE_GRID.map(row => [...row]);
  mazeState.playerX = 1;
  mazeState.playerY = 1;
  mazeState.itemsFound = 0;
  updateMazeStats();

  const containerWidth = window.innerWidth <= 960 ? Math.min(window.innerWidth - 175, 468) : Math.min(window.innerWidth - 64, 468);
  const size = Math.floor(containerWidth / 13) * 13;
  mazeState.canvas.width = size;
  mazeState.canvas.height = size;
  mazeState.cellSize = size / 13;

  renderMaze();
}

function updateMazeStats() {
  const el = document.getElementById('maze-seed-count');
  if (el) el.textContent = `${mazeState.itemsFound} / 3`;
}

const aneaImg = new Image();
aneaImg.onload = () => { if (mazeState.ctx) renderMaze(); };
aneaImg.src = 'assets/anea_girl.png';

function renderMaze() {
  const { ctx, canvas, grid, cellSize, playerX, playerY } = mazeState;
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < 13; r++) {
    for (let c = 0; c < 13; c++) {
      const cell = grid[r][c];
      const x = c * cellSize;
      const y = r * cellSize;

      if (cell === 1) {
        ctx.fillStyle = '#232D19';
        ctx.fillRect(x, y, cellSize, cellSize);

        ctx.fillStyle = '#3B4B27';
        ctx.fillRect(x + 2, y + 2, cellSize - 4, cellSize - 4);

        ctx.fillStyle = '#5A6F3C';
        ctx.beginPath();
        ctx.arc(x + cellSize * 0.5, y + cellSize * 0.5, cellSize * 0.18, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#1A1E1B';
        ctx.fillRect(x, y, cellSize, cellSize);

        ctx.strokeStyle = 'rgba(163, 177, 138, 0.05)';
        ctx.strokeRect(x, y, cellSize, cellSize);

        if (cell === 2) {
          drawCollectibleStar(ctx, x + cellSize / 2, y + cellSize / 2, cellSize * 0.32);
        } else if (cell === 3) {
          drawGardenGate(ctx, x, y, cellSize);
        }
      }
    }
  }

  // Draw Player Character: anea
  const px = playerX * cellSize + cellSize / 2, py = playerY * cellSize + cellSize / 2;
  if (aneaImg.complete && aneaImg.naturalWidth) {
    const d = cellSize * 0.92;
    ctx.save();
    ctx.shadowColor = 'rgba(244, 234, 212, 0.7)';
    ctx.shadowBlur = 8;
    ctx.drawImage(aneaImg, px - d / 2, py - d / 2, d, d);
    ctx.restore();
  } else {
    drawCurlyGirlCharacter(ctx, px, py, cellSize * 0.4);
  }
}

function drawCollectibleStar(ctx, cx, cy, radius) {
  ctx.save();
  ctx.fillStyle = '#D4A373';
  ctx.shadowColor = 'rgba(212, 163, 115, 0.7)';
  ctx.shadowBlur = 10;
  
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    ctx.lineTo(
      cx + Math.cos((18 + i * 72) * Math.PI / 180) * radius,
      cy - Math.sin((18 + i * 72) * Math.PI / 180) * radius
    );
    ctx.lineTo(
      cx + Math.cos((54 + i * 72) * Math.PI / 180) * (radius / 2.2),
      cy - Math.sin((54 + i * 72) * Math.PI / 180) * (radius / 2.2)
    );
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawGardenGate(ctx, x, y, size) {
  ctx.save();
  ctx.fillStyle = 'rgba(146, 170, 99, 0.35)';
  ctx.fillRect(x + 2, y + 2, size - 4, size - 4);

  ctx.strokeStyle = '#92AA63';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size * 0.4, size * 0.35, Math.PI, 0);
  ctx.lineTo(x + size * 0.85, y + size - 2);
  ctx.lineTo(x + size * 0.15, y + size - 2);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = '#D4A373';
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size * 0.55, size * 0.16, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCurlyGirlCharacter(ctx, cx, cy, r) {
  ctx.save();
  const skin = '#A8693E';
  const hair = '#2A180C';

  // Hair: a soft ring of curls hugging the head (sides + a little on top)
  const curls = [
    [-0.78, -0.1], [0.78, -0.1], [-0.8, 0.35], [0.8, 0.35],
    [-0.6, -0.5], [0.6, -0.5], [-0.25, -0.68], [0.25, -0.68], [0, -0.72]
  ];
  ctx.fillStyle = hair;
  curls.forEach(([dx, dy]) => {
    ctx.beginPath(); ctx.arc(cx + dx * r, cy + dy * r, r * 0.34, 0, Math.PI * 2); ctx.fill();
  });

  // Body
  ctx.fillStyle = '#556934';
  ctx.beginPath(); ctx.ellipse(cx, cy + r * 0.98, r * 0.6, r * 0.34, 0, 0, Math.PI * 2); ctx.fill();

  // Face
  ctx.fillStyle = skin;
  ctx.beginPath(); ctx.arc(cx, cy + r * 0.08, r * 0.6, 0, Math.PI * 2); ctx.fill();

  // Fringe curls on forehead
  ctx.fillStyle = hair;
  [-0.32, 0, 0.32].forEach(dx => {
    ctx.beginPath(); ctx.arc(cx + dx * r, cy - r * 0.5, r * 0.2, 0, Math.PI * 2); ctx.fill();
  });

  // Eyes
  ctx.fillStyle = '#1A0E07';
  [-1, 1].forEach(s => {
    ctx.beginPath(); ctx.ellipse(cx + s * r * 0.22, cy + r * 0.1, r * 0.07, r * 0.1, 0, 0, Math.PI * 2); ctx.fill();
  });

  // Blush + smile
  ctx.fillStyle = 'rgba(224, 110, 90, 0.4)';
  [-1, 1].forEach(s => {
    ctx.beginPath(); ctx.ellipse(cx + s * r * 0.36, cy + r * 0.28, r * 0.12, r * 0.07, 0, 0, Math.PI * 2); ctx.fill();
  });
  ctx.strokeStyle = '#7A3426'; ctx.lineWidth = Math.max(1, r * 0.06); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(cx, cy + r * 0.3, r * 0.14, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();

  ctx.restore();
}
function drawAvatarPortrait() {
  const c = document.getElementById('anea-avatar-canvas');
  if (!c) return;
  const g = c.getContext('2d');
  g.clearRect(0, 0, c.width, c.height);
  drawCurlyGirlCharacter(g, c.width / 2, c.height * 0.46, c.width * 0.3);
}
function movePlayer(dx, dy) {
  if (GardenState.currentPhase !== 'maze') return;

  const targetX = mazeState.playerX + dx;
  const targetY = mazeState.playerY + dy;

  if (targetX < 0 || targetX >= 13 || targetY < 0 || targetY >= 13) return;
  if (mazeState.grid[targetY][targetX] === 1) return;

  mazeState.playerX = targetX;
  mazeState.playerY = targetY;

  if (mazeState.grid[targetY][targetX] === 2) {
    mazeState.grid[targetY][targetX] = 0;
    mazeState.itemsFound++;
    updateMazeStats();
    playAmbientChime();
    launchBirthdayConfetti();
  }

  if (mazeState.grid[targetY][targetX] === 3) {
    renderMaze();
    setTimeout(() => {
      launchBirthdayConfetti();
      playAmbientChime();
      alertSuccessAndEnterGarden();
    }, 150);
    return;
  }

  renderMaze();
}

function alertSuccessAndEnterGarden() {
  GardenState.mazeCompleted = true;
  unlockPhase('garden');

  const step2 = document.querySelector('.step-node[data-step="maze"]');
  if (step2) step2.classList.add('completed');

  switchPhase('garden');
}

// Keyboard controls
window.addEventListener('keydown', (e) => {
  if (GardenState.currentPhase !== 'maze') return;

  switch (e.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      e.preventDefault();
      movePlayer(0, -1);
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      e.preventDefault();
      movePlayer(0, 1);
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      e.preventDefault();
      movePlayer(-1, 0);
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      e.preventDefault();
      movePlayer(1, 0);
      break;
  }
});

// ==========================================================================
// PHASE 3: REAL BOTANICAL GARDEN & LETTERS
// ==========================================================================
function openLetter(friendKey) {
  const data = FriendsLetters[friendKey];
  if (!data) return;

  GardenState.openedLetters.add(friendKey);
  const plantEl = document.querySelector(`.planted-flower-specimen[data-friend="${friendKey}"]`);
  if (plantEl) plantEl.classList.add('opened');

  const backdrop = document.getElementById('letter-modal-backdrop');
  const fromEl = document.getElementById('modal-letter-from');
  const typeEl = document.getElementById('modal-letter-flower-type');
  const bodyEl = document.getElementById('modal-letter-body');
  const signoffEl = document.getElementById('modal-letter-signoff');
  const dateEl = document.getElementById('modal-letter-date');

  if (!backdrop) return;

  fromEl.textContent = `Letter from ${data.name}`;
  typeEl.textContent = `Blooming: ${data.flowerName}`;
  
  let contentHtml = '';
  if (data.letterDecor) {
    const topDivider = `<div class="letter-decor-divider"><img src="${data.letterDecor}" alt="" /></div>`;
    const bottomDivider = `<div class="letter-decor-divider"><img src="${data.letterDecor}" alt="" /></div>`;
    const photoHtml = data.letterImage ? `<div class="letter-special-photo-wrap"><img src="${data.letterImage}" alt="" class="letter-special-photo" /></div>` : '';
    contentHtml = `${topDivider}<div class="letter-text-content">${data.letter}</div>${bottomDivider}${photoHtml}`;
  } else {
    contentHtml = `<div class="letter-text-content">${data.letter}</div>`;
  }

  if (data.youtubeVideo) {
    contentHtml += `
      <div class="letter-video-embed">
        <div class="letter-video-title">
          <svg class="svg-icon" style="width:16px;height:16px;color:var(--warm-gold);" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
          <span>A Song For You</span>
        </div>
        <div class="letter-video-wrapper">
          <iframe 
            src="https://www.youtube-nocookie.com/embed/${data.youtubeVideo}?enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}" 
            title="Hiro Song" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
          </iframe>
        </div>
      </div>
    `;
  }

  bodyEl.innerHTML = contentHtml;
  
  signoffEl.textContent = data.signoff;
  dateEl.textContent = data.date;

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLetterModal() {
  const backdrop = document.getElementById('letter-modal-backdrop');
  if (backdrop) {
    // Reset iframe to stop audio when modal is closed
    const iframe = backdrop.querySelector('iframe');
    if (iframe) iframe.src = '';
    backdrop.classList.remove('active');
  }
  document.body.style.overflow = '';
}

function openLightbox(index) {
  const photo = GalleryPhotos[index];
  if (!photo) return;

  GardenState.activePhotoIndex = index;
  const backdrop = document.getElementById('lightbox-modal-backdrop');
  const imgContainer = document.getElementById('lightbox-img-container');
  const captionEl = document.getElementById('lightbox-caption');
  const dateEl = document.getElementById('lightbox-date');

  if (!backdrop || !imgContainer) return;

  imgContainer.innerHTML = getGalleryArtworkSVG(photo.svgType, 800, 500);
  captionEl.textContent = photo.title;
  dateEl.textContent = photo.caption;

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightboxModal() {
  const backdrop = document.getElementById('lightbox-modal-backdrop');
  if (backdrop) {
    const video = backdrop.querySelector('video');
    if (video) video.pause();
    backdrop.classList.remove('active');
  }
  document.body.style.overflow = '';
}

function getGalleryArtworkSVG(type, width, height) {
  if (type.startsWith("video:")) {
    const src = type.slice(6);
    if (width > 400) {
      return `<video class="lightbox-video" src="${src}" controls autoplay playsinline style="max-width:100%;max-height:65vh;display:block;outline:none;background:#000;"></video>`;
    }
    return `<div style="position:relative;width:100%;height:100%;overflow:hidden;background:#000;">
      <video src="${src}#t=0.5" muted playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;"></video>
      <div style="position:absolute;inset:0;background:rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;">
        <div style="width:40px;height:40px;border-radius:50%;background:rgba(212,163,115,0.9);display:flex;align-items:center;justify-content:center;box-shadow:0 2px 10px rgba(0,0,0,0.5);">
          <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:#1A130E;margin-left:2px;"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
    </div>`;
  }
  if (type.startsWith("img:")) {
    const src = type.slice(4);
    if (width > 400) {
      return `<img class="lightbox-img" src="${src}" alt="" style="max-width:100%;max-height:65vh;object-fit:contain;display:block;" />`;
    }
    // Focus centering for character photos in cards
    let objPos = 'object-position: center;';
    if (src.includes('ary.png')) {
      objPos = 'object-position: 52% 65%;';
    } else if (src.includes('hiro.png')) {
      objPos = 'object-position: 50% 50%;';
    } else if (src.includes('luna.jpg')) {
      objPos = 'object-position: 50% 50%;';
    } else if (src.includes('tuqa.jpg')) {
      objPos = 'object-position: 50% 25%;';
    }
    return `<img class="polaroid-img" src="${src}" alt="" style="width:100%;height:100%;object-fit:cover;${objPos}display:block;" />`;
  }
  switch (type) {
    case 'grove':
      return `
        <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyGrove" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#2D3A24" />
              <stop offset="100%" stop-color="#1B2217" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="0.5" cy="0.4" r="0.4">
              <stop offset="0%" stop-color="#E5BE92" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#D4A373" stop-opacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="300" fill="url(#skyGrove)" />
          <circle cx="200" cy="140" r="90" fill="url(#sunGlow)" />
          <path d="M0,230 Q100,190 220,220 T400,210 L400,300 L0,300 Z" fill="#3D4B2A" />
          <path d="M0,250 Q160,220 280,245 T400,230 L400,300 L0,300 Z" fill="#29331C" />
          <circle cx="120" cy="190" r="35" fill="#5C6E3E" />
          <rect x="117" y="210" width="6" height="30" fill="#1C140E" rx="3" />
          <circle cx="280" cy="180" r="42" fill="#7E9455" />
          <rect x="277" y="205" width="7" height="35" fill="#1C140E" rx="3" />
          <circle cx="150" cy="160" r="3" fill="#F4EAD4" opacity="0.8" />
          <circle cx="240" cy="130" r="2.5" fill="#F4EAD4" opacity="0.7" />
          <circle cx="310" cy="160" r="3.5" fill="#F4EAD4" opacity="0.9" />
        </svg>
      `;

    case 'tea':
      return `
        <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#1E231F" />
          <ellipse cx="200" cy="240" rx="170" ry="50" fill="#2E372B" />
          <rect x="130" y="190" width="46" height="36" rx="8" fill="#5C6E3E" />
          <path d="M176,198 C185,198 185,214 176,214" stroke="#5C6E3E" stroke-width="4" fill="none" />
          <rect x="220" y="190" width="46" height="36" rx="8" fill="#A3B18A" />
          <path d="M266,198 C275,198 275,214 266,214" stroke="#A3B18A" stroke-width="4" fill="none" />
          <path d="M145,180 Q150,165 145,150" stroke="#ADC0AC" stroke-width="2" fill="none" opacity="0.6" stroke-linecap="round" />
          <path d="M160,175 Q165,160 160,145" stroke="#ADC0AC" stroke-width="2" fill="none" opacity="0.6" stroke-linecap="round" />
          <path d="M235,180 Q240,165 235,150" stroke="#ADC0AC" stroke-width="2" fill="none" opacity="0.6" stroke-linecap="round" />
          <ellipse cx="200" cy="170" rx="34" ry="26" fill="#D4A373" />
          <path d="M200,144 L200,138" stroke="#D4A373" stroke-width="4" stroke-linecap="round" />
        </svg>
      `;

    case 'stars':
      return `
        <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#131714" />
          <path d="M290,60 A32,32 0 0,0 260,95 A32,32 0 1,1 290,60" fill="#E5BE92" />
          <circle cx="80" cy="70" r="2.5" fill="#F4EAD4" />
          <circle cx="140" cy="50" r="1.5" fill="#F4EAD4" />
          <circle cx="210" cy="80" r="2" fill="#F4EAD4" />
          <circle cx="340" cy="100" r="2" fill="#F4EAD4" />
          <circle cx="100" cy="120" r="1.8" fill="#F4EAD4" />
          <circle cx="170" cy="110" r="3" fill="#F4EAD4" />
          <path d="M0,220 Q200,180 400,220 L400,300 L0,300 Z" fill="#242E1D" />
          <polygon points="140,240 260,240 280,270 120,270" fill="#5C6E3E" />
          <polygon points="150,245 250,245 268,265 132,265" fill="#A3B18A" opacity="0.4" />
        </svg>
      `;

    case 'blooms':
      return `
        <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#1A201B" />
          <circle cx="200" cy="150" r="75" stroke="#4C5E33" stroke-width="12" fill="none" />
          <circle cx="200" cy="75" r="16" fill="#D4A373" />
          <circle cx="200" cy="75" r="7" fill="#F4EAD4" />
          <circle cx="275" cy="150" r="18" fill="#92AA63" />
          <circle cx="275" cy="150" r="8" fill="#FFFFFF" />
          <circle cx="125" cy="150" r="18" fill="#B2C49B" />
          <circle cx="125" cy="150" r="8" fill="#FFFFFF" />
          <circle cx="200" cy="225" r="16" fill="#E5BE92" />
          <circle cx="200" cy="225" r="7" fill="#F4EAD4" />
          <path d="M250,100 Q265,90 260,110 Z" fill="#7E9455" />
          <path d="M150,100 Q135,90 140,110 Z" fill="#7E9455" />
          <path d="M250,200 Q265,210 260,190 Z" fill="#7E9455" />
          <path d="M150,200 Q135,210 140,190 Z" fill="#7E9455" />
        </svg>
      `;

    case 'rain':
      return `
        <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#181D1A" />
          <line x1="80" y1="40" x2="70" y2="70" stroke="#A3B18A" stroke-width="2" stroke-linecap="round" opacity="0.5" />
          <line x1="160" y1="30" x2="150" y2="60" stroke="#A3B18A" stroke-width="2" stroke-linecap="round" opacity="0.5" />
          <line x1="240" y1="50" x2="230" y2="80" stroke="#A3B18A" stroke-width="2" stroke-linecap="round" opacity="0.5" />
          <line x1="320" y1="35" x2="310" y2="65" stroke="#A3B18A" stroke-width="2" stroke-linecap="round" opacity="0.5" />
          <path d="M120,170 A50,50 0 0,1 220,170 Z" fill="#5C6E3E" />
          <line x1="170" y1="170" x2="170" y2="220" stroke="#D4A373" stroke-width="4" stroke-linecap="round" />
          <path d="M170,220 C170,230 160,230 160,220" stroke="#D4A373" stroke-width="4" fill="none" />
          <path d="M200,160 A52,52 0 0,1 304,160 Z" fill="#7E9455" />
          <line x1="252" y1="160" x2="252" y2="215" stroke="#D4A373" stroke-width="4" stroke-linecap="round" />
          <path d="M252,215 C252,225 242,225 242,215" stroke="#D4A373" stroke-width="4" fill="none" />
        </svg>
      `;

    case 'books':
    default:
      return `
        <svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="300" fill="#1C211E" />
          <rect x="140" y="210" width="130" height="24" rx="4" fill="#3D4B2A" />
          <rect x="145" y="214" width="120" height="16" fill="#F4EAD4" opacity="0.7" />
          <rect x="150" y="186" width="115" height="22" rx="4" fill="#92AA63" />
          <rect x="155" y="190" width="105" height="14" fill="#F4EAD4" opacity="0.7" />
          <rect x="160" y="164" width="95" height="20" rx="4" fill="#D4A373" />
          <rect x="200" y="130" width="16" height="32" rx="3" fill="#E5BE92" />
          <ellipse cx="208" cy="120" rx="4" ry="7" fill="#F4EAD4" />
          <circle cx="208" cy="120" r="10" fill="#D4A373" opacity="0.3" />
        </svg>
      `;
  }
}

// Ambient Floating Fireflies
function initAmbientFireflies() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const count = 35;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.6 + 0.2,
      dAlpha: (Math.random() - 0.5) * 0.015
    });
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      p.alpha += p.dAlpha;
      if (p.alpha <= 0.1 || p.alpha >= 0.7) p.dAlpha = -p.dAlpha;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = '#B2C49B';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(146, 170, 99, 0.3)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(loop);
  }

  loop();
}

// Populate Gallery Thumbnails
function populatePhotoGallery() {
  const container = document.getElementById('photo-gallery-grid');
  if (!container) return;

  container.innerHTML = '';
  GalleryPhotos.forEach((photo, idx) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    card.onclick = () => openLightbox(idx);

    card.innerHTML = `
      <div class="polaroid-img-wrapper${(photo.svgType.startsWith('img:') || photo.svgType.startsWith('video:')) ? ' square' : ''}">
        ${getGalleryArtworkSVG(photo.svgType, 280, 210)}
        <div class="polaroid-zoom-overlay">
          <svg class="svg-icon" viewBox="0 0 24 24">${photo.svgType.startsWith('video:') ? '<path d="M8 5v14l11-7z"/>' : '<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>'}</svg>
        </div>
      </div>
      <div class="polaroid-caption">${photo.title}</div>
      <div class="polaroid-date">${photo.date}</div>
    `;
    container.appendChild(card);
  });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initAmbientFireflies();
  drawAvatarPortrait();
  populatePhotoGallery();

  // Gift Box Click
  const giftBox = document.getElementById('gift-box-wrapper');
  if (giftBox) giftBox.addEventListener('click', handleGiftOpen);

  // Fallback: any first interaction on the gift section guarantees playback starts at 30s
  const giftSection = document.getElementById('phase-gift');
  if (giftSection) {
    giftSection.addEventListener('click', () => {
      if (!GardenState.musicStarted) {
        startMusicPlayback();
      }
    });
  }

  // Local Audio Loop & State Listeners
  const audio = getAudioElement();
  if (audio) {
    audio.addEventListener('loadedmetadata', () => { if (audio.currentTime < 30) audio.currentTime = 30; });
    audio.load();
    audio.addEventListener('ended', () => {
      audio.currentTime = 30;
      audio.play();
    });
    audio.addEventListener('play', () => {
      GardenState.musicPlaying = true;
      GardenState.musicStarted = true;
      updateMusicUI(true);
    });
    audio.addEventListener('pause', () => {
      if (GardenState.userPaused) {
        GardenState.musicPlaying = false;
        updateMusicUI(false);
      }
    });
  }

  // Music Button Click
  const musicBtn = document.getElementById('music-toggle-btn');
  if (musicBtn) musicBtn.addEventListener('click', toggleMusic);

  // Close modals on escape key or backdrop click
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLetterModal();
      closeLightboxModal();
    }
  });

  const letterBackdrop = document.getElementById('letter-modal-backdrop');
  if (letterBackdrop) {
    letterBackdrop.addEventListener('click', (e) => {
      if (e.target === letterBackdrop) closeLetterModal();
    });
  }

  const lightboxBackdrop = document.getElementById('lightbox-modal-backdrop');
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', (e) => {
      if (e.target === lightboxBackdrop) closeLightboxModal();
    });
  }
});
