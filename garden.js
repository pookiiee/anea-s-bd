/**
 * ==========================================================================
 * THE BIRTHDAY GARDEN - INTERACTION ENGINE
];
// ==========================================================================
// YOUTUBE AUDIO INTEGRATION (Starts @ 0:30)
// Video ID: B1kcMvb3qKA (Nod-Krai / Columbina Song)
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
function onPlayerReady(event) {
  ytApiReady = true;
  console.log("YouTube Player is ready. Start time set to 0:30.");
  if (shouldPlayOnReady) {
  if (shouldPlayOnReady && !GardenState.musicStarted) {
    startMusicPlayback();
  }
}
  if (event.data === YT.PlayerState.PLAYING) {
    GardenState.musicPlaying = true;
    GardenState.musicStarted = true;
    GardenState.userPaused = false;
    updateMusicUI(true);
