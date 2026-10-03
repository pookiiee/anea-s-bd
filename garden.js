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
      // ضبط وقت البداية عند الثانية 30 إذا لم تبدأ من قبل
      if (!GardenState.musicStarted || audio.currentTime < 29) {
        audio.currentTime = 30;
        GardenState.musicStarted = true;
      }
      audio.volume = 1.0;
      
      const promise = audio.play();
      if (promise !== undefined) {
        promise.then(() => {
          GardenState.musicPlaying = true;
          updateMusicUI(true);
        }).catch((error) => {
          console.log("Autoplay prevented or format issue:", error);
          // محاولة تشغيل احتياطية عند أول تفاعل
          document.addEventListener('click', () => {
            if (!GardenState.musicPlaying && !GardenState.userPaused) {
              audio.play().then(() => {
                GardenState.musicPlaying = true;
                updateMusicUI(true);
              });
            }
          }, { once: true });
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
