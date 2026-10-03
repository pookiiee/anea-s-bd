const GardenState = {
  currentPhase: 'gift',
  unlockedPhases: new Set(['gift']),
  boxOpened: false,
  mazeCompleted: false,
  musicPlaying: false,
  musicStarted: false,
  openedLetters: new Set(),
  activePhotoIndex: 0
};

const FriendsLetters = {
  aseel: {
    name: "Aseel",
    flowerName: "Velvet Olive Peony",
    signoff: "Forever your safe haven, Aseel",
    date: "October 2026",
    letter: `My dearest,

Happy Birthday! Looking back on every single laugh, every midnight confession, and all the silent moments where we didn't even need words to understand one another, my heart overflows with gratitude.

You bring such a rare and steady kind of warmth into this world—the kind of gentleness that softens even the heaviest days. Whenever things get overwhelming, just talking to you reminds me of who I am. You have this quiet strength, this golden kindness, and an authenticity that everyone around you can feel the moment you walk into the room.

In this brand-new chapter of your life, I wish you endless mornings full of peace, dreams that unfold effortlessly before your eyes, and people who cherish your heart as deeply as you cherish theirs. May your days be painted in your favorite calm colors, and may you never forget how profoundly proud I am of the woman you are becoming.

I love you more than words can carry.`
  },

  ary: {
    name: "Ary",
    flowerName: "Sunlit Wild Daisy",
    signoff: "Your biggest cheerleader & partner in chaos, Ary",
    date: "October 2026",
    letter: `Happiest of birthdays to the one who makes everything a thousand times brighter!

Life with you is never dull. From the completely unhinged jokes that only the two of us find hilarious, to the impromptu debriefs about everything under the sun, you have been my constant source of joy and unfiltered laughter. 

Thank you for being so effortlessly yourself. In a world full of people trying to fit into molds, you are completely genuine, unapologetically funny, and so fiercely loyal. You have this unmatched superpower of making people feel seen and valued, even when you're just joking around.

I hope this year showers you with spontaneous adventures, answered prayers, good food, deep laughter that makes your stomach ache, and all the magical blessings you deserve. Keep shining like the brilliant soul you are!`
  },

  hiro: {
    name: "Hiro",
    flowerName: "Moonlit Night Lily",
    signoff: "With everlasting peace & affection, Hiro",
    date: "October 2026",
    letter: `Happy Birthday, beautiful soul.

If our friendship was a garden, you would be the ancient willow tree—the place where everyone comes to catch their breath, rest under the shade, and feel understood without any judgment.

Your presence has this grounding, soothing grace that is so rare to find. Thank you for listening to my thoughts even when they were tangled and messy, for offering clarity when everything felt cloudy, and for showing me what true, unconditional friendship looks like.

On your birthday, I pray that you receive all the gentle kindness you give so freely to others. May this year grant you deep inner quietude, healthy boundaries, inspiring opportunities, and quiet little pockets of happiness in every ordinary day. You deserve the absolute world.`
  },

  tuqa: {
    name: "Tuqa",
    flowerName: "Sparkling Meadow Bloom",
    signoff: "Hugging you tightly from the heart, Tuqa",
    date: "October 2026",
    letter: `HAPPY BIRTHDAY TO MY SWEETEST GIRL!

I hope today feels like the warmest hug! Every time I think of you, I picture your radiant smile and that infectious energy that lights up whatever space you're in. 

You give so much love, patience, and attention to everyone around you. You celebrate our little wins like they are monumental, and you stand beside us when things get rough. That kind of generosity of spirit is a blessing, and I never take a single second of our friendship for granted.

May this upcoming year be the chapter where every seed of hard work you planted blooms into something magnificent. May you be surrounded only by genuine love, gentle breezes, cozy evenings, and endless reasons to smile that wide, pure smile of yours. Happy birthday!`
  },

  luna: {
    name: "Luna",
    flowerName: "Starlight Moss Orchid",
    signoff: "Under every moon and sky, Luna",
    date: "October 2026",
    letter: `To my sweetest friend on her birthday,

There is something so celestial about who you are. You look at the world with an artist's heart and a dreamer's mind. You notice the delicate beauty in quiet moments that most people rush right past, and that makes being in your orbit feel like poetry.

Thank you for sharing your thoughts, your dreams, and your tender spirit with me. Knowing you has broadened the way I see kindness, patience, and love. You inspire me to be more mindful, more gentle with myself, and more appreciative of the little things in life.

I hope your birthday wraps you in the coziest embrace. May your creative sparks burn brighter than ever, may you stumble upon beautiful surprises in unexpected places, and may the stars always guide your steps toward everything that fills your heart with wonder.`
  },

  madi: {
    name: "Madi",
    flowerName: "Honey Meadow Jasmine",
    signoff: "Forever grateful for you, Madi",
    date: "October 2026",
    letter: `Happy Birthday, my dear!

Growing alongside you has been one of the greatest privileges of my life. From where we started to where we stand today, watching you flourish into such an inspiring, thoughtful, and resilient person has been an absolute honor.

Thank you for the countless memories we've built, the reassuring texts at the exact right moment, and the mutual understanding that time and distance could never touch. You are the kind of friend someone only gets once in a lifetime, and I thank God every day that our paths crossed.

I hope your birthday brings you pure, unadulterated happiness. May the year ahead bring doors swinging wide open for your aspirations, good health, and an abundance of sweet, peaceful moments that make you pause and say, 'life is good.'`
  },

  reemy: {
    name: "Reemy",
    flowerName: "Golden Olive Lotus",
    signoff: "With endless love & prayers, Reemy",
    date: "October 2026",
    letter: `Happiest of birthdays to our radiant queen!

Today we celebrate YOU—your elegance, your sharp wit, your generous heart, and the effortless way you carry yourself through life. You have an incredible gift for uplifting everyone around you while staying true to your own integrity.

Whenever we gather, your laughter is the spark that brings everything to life. Thank you for the endless advice, the honest truth delivered with love, and the loyalty that never wavers. Having you in my corner makes me feel ten times braver.

As you step into this new age, my prayer for you is boundless peace, divine protection, overflowing joy, and achievements that surpass even your wildest dreams. May your path always be lined with flowers and illuminated by joy. Love you so very much!`
  }
};

const GalleryPhotos = [
  { title: "Olive Grove Golden Hour", date: "Golden memories together", caption: "Quiet evenings under the olive trees, laughing until our faces hurt.", svgType: "grove" },
  { title: "Late Night Teatime Talks", date: "Warm cups & endless stories", caption: "When minutes turned into hours and every secret felt safe.", svgType: "tea" },
  { title: "The Starlit Picnic", date: "Under the summer constellations", caption: "Blankets on the grass, cozy sweaters, and dreams whispered to the sky.", svgType: "stars" },
  { title: "Flower Crown Afternoons", date: "Spring in full bloom", caption: "Weaving wild daisies and moss blooms into silly little crowns.", svgType: "blooms" },
  { title: "Laughter in the Soft Rain", date: "Dancing through misty puddles", caption: "Not caring that we were soaked, because we were together.", svgType: "rain" },
  { title: "Cozy Books & Warm Wool", date: "Autumn reading sessions", caption: "Quiet companionship where silence is just as sweet as conversation.", svgType: "books" }
];

let ytPlayer = null;

window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player('youtube-audio-player', {
    height: '0',
    width: '0',
    videoId: 'B1kcMvb3qKA',
    playerVars: {
      autoplay: 0,
      controls: 0,
      start: 30,
      loop: 1,
      playlist: 'B1kcMvb3qKA',
      enablejsapi: 1
    },
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
};

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    GardenState.musicPlaying = true;
    updateMusicUI(true);
  } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    GardenState.musicPlaying = false;
    updateMusicUI(false);
  }
}

function startMusicPlayback() {
  if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
    ytPlayer.unMute();
    ytPlayer.setVolume(100);
    ytPlayer.seekTo(30, true);
    ytPlayer.playVideo();
    GardenState.musicStarted = true;
    GardenState.musicPlaying = true;
    updateMusicUI(true);
  }
}

function toggleMusic() {
  if (!ytPlayer) return;
  if (GardenState.musicPlaying) {
    ytPlayer.pauseVideo();
  } else {
    if (!GardenState.musicStarted) {
      ytPlayer.seekTo(30, true);
      GardenState.musicStarted = true;
    }
    ytPlayer.playVideo();
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

function launchBirthdayConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#92AA63', '#D4A373', '#F4EAD4', '#B2C49B']
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('lock-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'lock-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

function requestSwitchPhase(phaseName) {
  if (!GardenState.unlockedPhases.has(phaseName)) {
    if (phaseName === 'maze') showToast("Open the surprise box first!");
    if (phaseName === 'garden') showToast("Guide anea through the maze first!");
    return;
  }
  switchPhase(phaseName);
}

function unlockPhase(phaseName) {
  GardenState.unlockedPhases.add(phaseName);
  const node = document.querySelector(`.step-node[data-step="${phaseName}"]`);
  if (node) node.classList.remove('locked');
}

function switchPhase(phaseName) {
  GardenState.currentPhase = phaseName;
  document.querySelectorAll('.phase-section').forEach(sec => sec.classList.remove('active'));
  const targetSection = document.getElementById(`phase-${phaseName}`);
  if (targetSection) targetSection.classList.add('active');

  document.querySelectorAll('.step-node').forEach(node => {
    node.classList.remove('active');
    if (node.getAttribute('data-step') === phaseName) node.classList.add('active');
  });

  if (phaseName === 'maze') initMazeGame();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleGiftOpen() {
  const wrapper = document.getElementById('gift-box-wrapper');
  const cta = document.getElementById('gift-cta-container');
  if (!wrapper || GardenState.boxOpened) return;

  GardenState.boxOpened = true;
  wrapper.classList.add('opened');
  launchBirthdayConfetti();
  unlockPhase('maze');
  
  // تشغيل الصوت مباشرة من يوتيوب من الثانية 30
  startMusicPlayback();

  setTimeout(() => { if (cta) cta.style.display = 'block'; }, 600);
}

// MAZE ENGINE WITH IMAGE
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
  grid: [], playerX: 1, playerY: 1, cellSize: 36, canvas: null, ctx: null, itemsFound: 0
};

// تعديل المسار المباشر لصورة الشخصية المرفوعة بنفس الصفحة
const playerImage = new Image();
playerImage.src = 'anea.png';

function initMazeGame() {
  mazeState.canvas = document.getElementById('maze-canvas');
  if (!mazeState.canvas) return;
  mazeState.ctx = mazeState.canvas.getContext('2d');
  mazeState.grid = MAZE_GRID.map(row => [...row]);
  mazeState.playerX = 1; mazeState.playerY = 1; mazeState.itemsFound = 0;

  const containerWidth = Math.min(window.innerWidth - 64, 468);
  const size = Math.floor(containerWidth / 13) * 13;
  mazeState.canvas.width = size; mazeState.canvas.height = size;
  mazeState.cellSize = size / 13;
  renderMaze();
}

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
      } else {
        ctx.fillStyle = '#1A1E1B';
        ctx.fillRect(x, y, cellSize, cellSize);
        if (cell === 2) {
          ctx.fillStyle = '#D4A373';
          ctx.beginPath(); ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize * 0.2, 0, Math.PI * 2); ctx.fill();
        } else if (cell === 3) {
          ctx.fillStyle = '#92AA63';
          ctx.fillRect(x + 4, y + 4, cellSize - 8, cellSize - 8);
        }
      }
    }
  }

  drawCurlyGirlCharacter(ctx, playerX * cellSize + cellSize / 2, playerY * cellSize + cellSize / 2, cellSize * 0.44);
}

function drawCurlyGirlCharacter(ctx, cx, cy, r) {
  ctx.save();
  if (playerImage.complete && playerImage.naturalWidth !== 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(playerImage, cx - r, cy - r, r * 2, r * 2);
  } else {
    ctx.fillStyle = '#834925';
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.strokeStyle = '#D4A373';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}

playerImage.onload = () => { if (GardenState.currentPhase === 'maze') renderMaze(); };

function movePlayer(dx, dy) {
  if (GardenState.currentPhase !== 'maze') return;
  const targetX = mazeState.playerX + dx;
  const targetY = mazeState.playerY + dy;

  if (targetX < 0 || targetX >= 13 || targetY < 0 || targetY >= 13) return;
  if (mazeState.grid[targetY][targetX] === 1) return;

  mazeState.playerX = targetX; mazeState.playerY = targetY;

  if (mazeState.grid[targetY][targetX] === 2) {
    mazeState.grid[targetY][targetX] = 0;
    mazeState.itemsFound++;
    document.getElementById('maze-seed-count').textContent = `${mazeState.itemsFound} / 3`;
    launchBirthdayConfetti();
  }

  if (mazeState.grid[targetY][targetX] === 3) {
    renderMaze();
    setTimeout(() => {
      launchBirthdayConfetti();
      unlockPhase('garden');
      switchPhase('garden');
    }, 150);
    return;
  }
  renderMaze();
}

window.addEventListener('keydown', (e) => {
  if (GardenState.currentPhase !== 'maze') return;
  if (e.key === 'ArrowUp' || e.key === 'w') movePlayer(0, -1);
  if (e.key === 'ArrowDown' || e.key === 's') movePlayer(0, 1);
  if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer(-1, 0);
  if (e.key === 'ArrowRight' || e.key === 'd') movePlayer(1, 0);
});

function openLetter(friendKey) {
  const data = FriendsLetters[friendKey];
  if (!data) return;

  document.getElementById('modal-letter-from').textContent = `Letter from ${data.name}`;
  document.getElementById('modal-letter-flower-type').textContent = `Blooming: ${data.flowerName}`;
  document.getElementById('modal-letter-body').textContent = data.letter;
  document.getElementById('modal-letter-signoff').textContent = data.signoff;
  document.getElementById('modal-letter-date').textContent = data.date;

  document.getElementById('letter-modal-backdrop').classList.add('active');
}

function closeLetterModal() {
  document.getElementById('letter-modal-backdrop').classList.remove('active');
}

function closeLightboxModal() {
  document.getElementById('lightbox-modal-backdrop').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
  const giftBox = document.getElementById('gift-box-wrapper');
  if (giftBox) giftBox.addEventListener('click', handleGiftOpen);

  const musicBtn = document.getElementById('music-toggle-btn');
  if (musicBtn) musicBtn.addEventListener('click', toggleMusic);
});
