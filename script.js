// تشغيل / إيقاف موسيقى يوتيوب من الثانية 30
let isPlaying = false;

function toggleMusic() {
    const iframe = document.getElementById("youtube-player");
    const btn = document.getElementById("music-btn").querySelector("span");
    
    if (!isPlaying) {
        // تشغيل الفيديو عبر السكربت من الثانية 30
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        btn.innerText = "Pause Music";
        isPlaying = true;
    } else {
        // إيقاف موقت
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        btn.innerText = "Play Music";
        isPlaying = false;
    }
}

// تعديل دالة فتح الهدية لتشغل الموسيقى تلقائياً من الثانية 30 عند الضغط
function openGift() {
    confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
    });

    // تشغيل الأغنية تلقائياً
    toggleMusic();

    setTimeout(() => {
        document.getElementById("gift-section").classList.remove("active-section");
        document.getElementById("gift-section").classList.add("hidden-section");

        document.getElementById("maze-section").classList.remove("hidden-section");
        document.getElementById("maze-section").classList.add("active-section");
    }, 800);
}
