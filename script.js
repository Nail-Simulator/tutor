const container = document.getElementById('app-container');
const nailFile = document.getElementById('nail-file');
const feedback = document.getElementById('feedback');
const angleValue = document.getElementById('angle-value');
const nailImg = document.getElementById('nail-ref');
const canvas = document.getElementById('filing-canvas');
const ctx = canvas.getContext('2d');
const maskCanvas = document.getElementById('hidden-mask-canvas');
const mCtx = maskCanvas.getContext('2d', { willReadFrequently: true });

let rotation = 0;
let isFiling = false;

// Funkcija za sinhronizaciju veličine canvasa sa slikom
function setupCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    maskCanvas.width = container.clientWidth;
    maskCanvas.height = container.clientHeight;
    
    // Crtamo sliku na masku da bi mogli čitati boje
    mCtx.drawImage(nailImg, 0, 0, canvas.width, canvas.height);
}

// Čekamo da se sve učita
window.onload = setupCanvas;
window.onresize = setupCanvas;

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Turpija prati kursor (centrirano na 150px širine i 15px visine)
    nailFile.style.left = (x - 150) + 'px';
    nailFile.style.top = (y - 15) + 'px';

    if (isFiling) {
        // Provera boje piksela ispod turpije
        const pixel = mCtx.getImageData(x, y, 1, 1).data;
        const r = pixel[0], g = pixel[1], b = pixel[2];

        // Detektujemo svetlije tonove (nokat) - prilagođeno za Unsplash sliku
        if (r > 140 && g > 110) {
            checkTechnique(rotation);
            ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
        } else {
            feedback.textContent = "NACILJAJ NOKAT";
            feedback.className = 'wrong';
        }
    }
});

container.addEventListener('wheel', (e) => {
    e.preventDefault();
    rotation += e.deltaY * 0.1;
    nailFile.style.transform = `rotate(${rotation}deg)`;
    angleValue.textContent = Math.abs(Math.round(rotation % 180));
}, { passive: false });

container.addEventListener('mousedown', () => { isFiling = true; });
container.addEventListener('mouseup', () => { 
    isFiling = false; 
    feedback.className = '';
    feedback.textContent = "Čekam tvoj potez...";
});

function checkTechnique(deg) {
    let currentAngle = Math.abs(Math.round(deg % 180));
    // Provera za 45 ili 135 stepeni (lewa i desna strana)
    if (Math.abs(currentAngle - 45) <= 7 || Math.abs(currentAngle - 135) <= 7) {
        feedback.textContent = "IDEALAN UGAO (45°)";
        feedback.className = 'correct';
    } else {
        feedback.textContent = "LOŠ UGAO!";
        feedback.className = 'wrong';
    }
}
