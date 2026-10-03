const friendMessages = {
    aseel: "Message from Aseel: Happy Birthday! I wanted to take a moment to wish you the most wonderful day. You bring so much calm, warmth, and peace into our lives, and having you as a friend is truly a blessing. I hope this new year of your life is filled with quiet joy, beautiful moments, and everything your heart desires. Stay amazing!",
    
    ary: "Message from Ary: Happy Birthday! On your special day, I just want to remind you how much you are appreciated. Your peaceful presence always makes everything better, and I am so grateful for all the quiet memories we share. May this year bring you all the quiet strength, happiness, and peace you deserve. Enjoy every single moment!",
    
    hiro: "Message from Hiro: Happy Birthday to one of the most gentle souls I know! Thank you for being such an incredible, reliable, and understanding friend. I hope your birthday brings you as much comfort and happiness as you constantly give to everyone around you. Wishing you a year full of success, peace, and beautiful surprises!",
    
    tuqa: "Message from Tuqa: Happy Birthday! Celebrating you today is so easy because you bring so much quiet light into our world. May your day be as peaceful, lovely, and kind as you are. I hope this coming year opens new doors to all the things you love and gives you endless reasons to smile. Have the happiest birthday!",
    
    luna: "Message from Luna: Happy Birthday! Wishing you a day filled with tranquility, laughter, and your favorite things. You have a special way of making the world feel a little calmer and brighter just by being yourself. I hope this year treats you with the utmost kindness and brings you closer to all your dreams!",
    
    madi: "Message from Madi: Happy Birthday! I'm so lucky to have a friend like you who understands the beauty of quiet and simple moments. Thank you for always being there and for being such a genuine friend. May your year ahead be full of peace, good energy, and wonderful memories!",
    
    reemy: "Message from Reemy: Happy Birthday to our amazing friend! Your calm vibe and kindness are truly irreplaceable. I hope today brings you continuous joy and a sense of deep peace. May all your goals for this year come true smoothly. Enjoy your special day to the fullest!"
};

let isPlaying = false;

function toggleMusic() {
    const iframe = document.getElementById("youtube-player");
    const btn = document.getElementById("music-btn").querySelector("span");
    
    if (!isPlaying) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        btn.innerText = "Pause Music";
        isPlaying = true;
    } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        btn.innerText = "Play Music";
        isPlaying = false;
    }
}

function openGift() {
    confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
    });

    toggleMusic();

    setTimeout(() => {
        document.getElementById("gift-section").classList.remove("active-section");
        document.getElementById("gift-section").classList.add("hidden-section");

        document.getElementById("maze-section").classList.remove("hidden-section");
        document.getElementById("maze-section").classList.add("active-section");
    }, 800);
}

const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

const maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 1, 0],
    [0, 0, 0, 0, 0]
];

let player = { x: 0, y: 0 };
const tileSize = 80;

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            if (maze[r][c] === 1) {
                ctx.fillStyle = "#3f4e46";
                ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }

    ctx.fillStyle = "#81a1c1";
    ctx.fillRect(4 * tileSize + 20, 4 * tileSize + 20, 40, 40);

    ctx.fillStyle = "#8d5524";
    ctx.beginPath();
    ctx.arc(player.x * tileSize + 40, player.y * tileSize + 40, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1a110b";
    ctx.beginPath();
    ctx.arc(player.x * tileSize + 40, player.y * tileSize + 25, 22, Math.PI, 0);
    ctx.fill();
}

window.addEventListener("keydown", (e) => {
    let newX = player.x;
    let newY = player.y;

    if (e.key === "ArrowUp") newY--;
    if (e.key === "ArrowDown") newY++;
    if (e.key === "ArrowLeft") newX--;
    if (e.key === "ArrowRight") newX++;

    if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5 && maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
        drawMaze();
        checkWin();
    }
});

function checkWin() {
    if (player.x === 4 && player.y === 4) {
        setTimeout(() => {
            document.getElementById("maze-section").classList.remove("active-section");
            document.getElementById("maze-section").classList.add("hidden-section");
            document.getElementById("garden-section").classList.remove("hidden-section");
            document.getElementById("garden-section").classList.add("active-section");
        }, 300);
    }
}

drawMaze();

function openModal(friendKey) {
    document.getElementById("modal-title").innerText = friendKey;
    document.getElementById("modal-text").innerText = friendMessages[friendKey];
    document.getElementById("message-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("message-modal").style.display = "none";
}

function zoomImage(src) {
    document.getElementById("zoomed-img").src = src;
    document.getElementById("image-modal").style.display = "flex";
}

function closeImageModal() {
    document.getElementById("image-modal").style.display = "none";
}
