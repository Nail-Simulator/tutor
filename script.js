const container = document.getElementById('app-container');
const nailFile = document.getElementById('nail-file');
const feedback = document.getElementById('feedback');
const canvas = document.getElementById('paint-layer');
const ctx = canvas.getContext('2d');

let rotation = 0;
let isFiling = false;

// Podesi canvas
canvas.width = 800;
canvas.height = 500;

// 1. Pomeranje turpije
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    nailFile.style.left = `${x - 150}px`;
    nailFile.style.top = `${y - 25}px`;

    if (isFiling) {
        checkTechnique(rotation);
        drawDust(x, y);
    }
});

// 2. Rotacija točkićem
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    rotation += e.deltaY * 0.1;
    nailFile.style.transform = `rotate(${rotation}deg)`;
});

// 3. Detekcija "turpijanja"
container.addEventListener('mousedown', () => { isFiling = true; });
container.addEventListener('mouseup', () => { 
    isFiling = false; 
    feedback.className = 'idle';
    feedback.textContent = "Sistemi spremni...";
});

function checkTechnique(deg) {
    const normalizedAngle = Math.abs(deg % 180);
    
    // Logika: Za bočne strane idealan ugao je oko 45 ili 135 stepeni
    if ((normalizedAngle > 35 && normalizedAngle < 55) || (normalizedAngle > 125 && normalizedAngle < 145)) {
        feedback.textContent = "IDEALAN UGAO! Arhitektura se pravilno formira.";
        feedback.className = 'correct';
    } else {
        feedback.textContent = "LOŠ UGAO! Rizik od oštećenja nokatne ploče.";
        feedback.className = 'wrong';
    }
}

function drawDust(x, y) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
}
