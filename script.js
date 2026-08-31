const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const catImage = document.getElementById('cat-image');
const statusMessage = document.getElementById('status-message');
const questionScreen = document.getElementById('question-screen');
const successScreen = document.getElementById('success-screen');
const floatingIcons = document.getElementById('floating-icons');
const rainContainer = document.getElementById('rain-container');

let attempts = 0;

const noData = [
    { text: "Em chắc chưa?", img: "2.gif" },       
    { text: "Đi màaaa 🥺", img: "3.gif" },         
    { text: "Dỗi thật rồi đấy nhé 💔", img: "4.gif" }, 
    { text: "Đùa tí thôi! Năn nỉ em đóooo", img: "5.gif" }, 
    { text: "Quá là tổn thương...", img: "6.jpg" }, 
    { text: "Rất tiếc, em không có sự lựa chọn nào khác đâu 😈", img: "7.jpg" } 
];

// 1. TẠO ICON KHÓC VÀ TIM VỠ BAY LƠ LỬNG
const icons = ['😿', '💔', '😭', '🥀', '😿', '💔'];
for (let i = 0; i < 15; i++) {
    let el = document.createElement('div');
    el.classList.add('float-icon');
    el.innerText = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (Math.random() * 5 + 5) + 's'; // Từ 5-10 giây
    el.style.animationDelay = (Math.random() * 5) + 's';
    floatingIcons.appendChild(el);
}

// 2. LOGIC NÚT NO TRẠY TRỐN
function moveNoButton() {
    if (attempts < noData.length) {
        catImage.src = noData[attempts].img;
        statusMessage.innerText = noData[attempts].text;
        
        noBtn.style.position = 'fixed';
        const maxX = window.innerWidth - noBtn.offsetWidth - 20;
        const maxY = window.innerHeight - noBtn.offsetHeight - 20;
        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));
        
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        attempts++;

        if (attempts === noData.length) {
            noBtn.style.display = 'none';
        }
    }
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);
noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveNoButton();
}, {passive: false});

// 3. LOGIC KHI BẤM YES (MƯA TRÁI TIM)
yesBtn.addEventListener('click', () => {
    questionScreen.style.display = 'none';
    floatingIcons.style.display = 'none'; // Ẩn icon khóc
    successScreen.style.display = 'block';

    // Tạo mưa trái tim liên tục
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart-drop');
        heart.innerText = '❤️';
        // Random vị trí xuất hiện theo chiều ngang
        heart.style.left = Math.random() * 100 + 'vw';
        // Random kích thước trái tim (từ 15px đến 35px)
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        // Random tốc độ rơi (từ 2s đến 5s)
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        
        rainContainer.appendChild(heart);

        // Xóa trái tim sau khi rơi xong để không làm nặng máy
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 100); // Cứ 0.1 giây tạo 1 trái tim rơi
});