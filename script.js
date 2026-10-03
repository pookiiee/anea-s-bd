* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Fredoka', cursive, sans-serif;
}

body {
    background-color: #2b3531;
    color: #e2e8f0;
    text-align: center;
    padding: 20px;
}

.hidden-section {
    display: none;
}

.active-section {
    display: block;
}

/* تنسيق الأيقونات SVG */
.icon, .flower-icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
}

/* شاشة صندوق الهدايا */
.gift-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 75vh;
}

.gift-box {
    cursor: pointer;
    margin-top: 25px;
    user-select: none;
    animation: bounceGift 1.6s infinite ease-in-out;
    transition: transform 0.3s ease;
}

.gift-icon {
    width: 90px;
    height: 90px;
    color: #81a1c1;
}

.gift-box:hover {
    transform: scale(1.15) rotate(4deg);
}

@keyframes bounceGift {
    0%, 100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-12px) scale(1.05);
    }
}

/* مشغل الأغنية */
.music-player {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 100;
}

#music-btn {
    background: #3f4e46;
    color: #fff;
    border: 1px solid #526359;
    padding: 10px 18px;
    border-radius: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
}

/* المتاهة */
#mazeCanvas {
    background: #1d2421;
    border-radius: 16px;
    margin-top: 20px;
    border: 2px solid #4a5d52;
}

/* الحديقة والوردات */
.flowers-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin: 30px 0;
}

.flower-btn {
    background: #3a4740;
    border: 1px solid #526359;
    color: #fff;
    padding: 12px 22px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.2s, background 0.2s;
}

.flower-btn:hover {
    transform: scale(1.06);
    background: #4a5d52;
}

/* معرض الصور */
.divider {
    border: 0;
    height: 1px;
    background: #4a5d52;
    margin: 40px 0;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 14px;
    max-width: 800px;
    margin: 20px auto;
}

.gallery-grid img {
    width: 100%;
    height: 130px;
    object-fit: cover;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
}

.gallery-grid img:hover {
    opacity: 0.85;
    transform: scale(1.03);
}

/* النوافذ المنبثقة (Modal) */
.modal {
    display: none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    justify-content: center;
    align-items: center;
    z-index: 200;
}

.modal-content {
    background: #252e2a;
    padding: 30px;
    border-radius: 16px;
    max-width: 420px;
    width: 90%;
    position: relative;
    border: 1px solid #4a5d52;
    line-height: 1.6;
}

.close-btn {
    position: absolute;
    top: 12px; right: 18px;
    font-size: 26px;
    cursor: pointer;
}

#zoomed-img {
    max-width: 90%;
    max-height: 80vh;
    border-radius: 12px;
}
