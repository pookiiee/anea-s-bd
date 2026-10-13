/**
 * ==========================================================================
 * THE BIRTHDAY GARDEN - INTERACTION ENGINE
 * Features:
 *  - Strict Sequential Progression (Surprise Box -> Maze Path -> The Birthday Garden)
 *  - High-Fidelity Audio playback (starts @ 0:30)
 *  - Confetti explosion cannon
 *  - Maze Game with controls placed on the left side (character: "anea")
 *  - Real Botanical Garden with 7 friends' blooming flowers & long English letters
 *  - Expandable polaroid keepsake gallery with lightbox & video support
 * ==========================================================================
 */

// Global State with strict unlock tracking
const GardenState = {
  currentPhase: 'gift', // 'gift', 'maze', 'garden'
  unlockedPhases: new Set(['gift']),
  boxOpened: false,
  mazeCompleted: false,
  musicPlaying: false,
  musicStarted: false,
  openedLetters: new Set(),
  activePhotoIndex: 0,
  dockCollapsed: false,
  userPaused: false
};

// 7 Friends' Long English Birthday Letters
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

// Gallery Keepsakes Data
const GalleryPhotos = [
  {
    title: "Olive Grove Golden Hour",
    date: "Golden memories together",
    caption: "Quiet evenings under the olive trees, laughing until our faces hurt.",
    svgType: "grove"
  },
  {
    title: "Late Night Teatime Talks",
    date: "Warm cups & endless stories",
    caption: "When minutes turned into hours and every secret felt safe.",
    svgType: "tea"
  },
  {
    title: "The Starlit Picnic",
    date: "Under the summer constellations",
    caption: "Blankets on the grass, cozy sweaters, and dreams whispered to the sky.",
    svgType: "stars"
  },
  {
    title: "Flower Crown Afternoons",
    date: "Spring in full bloom",
    caption: "Weaving wild daisies and moss blooms into silly little crowns.",
    svgType: "blooms"
  },
  {
    title: "Laughter in the Soft Rain",
    date: "Dancing through misty puddles",
    caption: "Not caring that we were soaked, because we were together.",
    svgType: "rain"
  },
  {
    title: "Cozy Books & Warm Wool",
    date: "Autumn reading sessions",
    caption: "Quiet companionship where silence is just as sweet as conversation.",
    svgType: "books"
  },
  {
    title: "Aseel",
    date: "our wedding day",
    caption: "our wedding day",
    svgType: "img:assets/wedding.jpg"
  },
  {
    title: "ary",
    date: "",
    caption: "",
    svgType: "img:assets/ary.webp"
  },
  {
    title: "madi",
    date: "Special Video",
    caption: "Fun memories with Madi",
    svgType: "video:assets/madi_video.mp4"
  }
];

// ==========================================================================
// AUDIO INTEGRATION (Starts @ 0:30)
// ==========================================================================
function getAudioElement() {
  return document.getElementById('main-birthday-audio');
}

function startMusicPlayback() {
  GardenState.userPaused = false;
  const audio = getAudioElement();

  if (audio) {
    try {
      if (!GardenState.musicStarted || audio.currentTime < 29) {
        audio.currentTime = 30; // البدء من الثانية 30
        GardenState.musicStarted = true;
      }
      audio.volume = 1.0;
      
      const promise = audio.play();
      if (promise !== undefined) {
        promise.then(() => {
          GardenState.musicPlaying = true;
          updateMusicUI(true);
        }).catch((err) => {
          console.log("Audio play error:", err);
        });
      }
    } catch(e) {
      console.log("Audio exception:", e);
    }
  }
}

function toggleMusic() {
  const audio = getAudioElement();

  if (GardenState.musicPlaying) {
    GardenState.userPaused = true;
    if (audio && !audio.paused) audio.pause();
    GardenState.musicPlaying = false;
    updateMusicUI(false);
  } else {
    GardenState.userPaused = false;
    startMusicPlayback();
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

      ctx
