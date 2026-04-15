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

function init() {
    canvas.width = maskCanvas.width = container.offsetWidth;
    canvas.height = maskCanvas.height = container.offsetHeight;
    mCtx.drawImage(nailImg, 0, 0, canvas.width, canvas.height);
}

window.addEventListener('load', init);
window.addEventListener('resize', init);

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Pomeranje slike turpije tako da joj je centar na kursoru
    // Brojevi 175 i 20 zavise od širine/visine slike turpije u CSS-u
    nailFile.style.left = (x - 175) + 'px';
    nailFile.style.top = (y - 20) + 'px';

    if (isFiling) {
        const pixel = mCtx.getImageData(x, y, 1, 1).data;
        const r = pixel[0], g = pixel[1], b = pixel[2];

        // Detekcija svetlih tonova (nokat)
        if (r > 150 && g > 130) {
            checkTechnique(rotation);
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
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
});

container.addEventListener('mousedown', () => { isFiling = true; });
container.addEventListener('mouseup', () => { 
    isFiling = false; 
    feedback.className = '';
    feedback.textContent = "Čekam tvoj potez...";
});

function checkTechnique(deg) {
    let currentAngle = Math.abs(Math.round(deg % 180));
    if (Math.abs(currentAngle - 45) <= 5 || Math.abs(currentAngle - 135) <= 5) {
        feedback.textContent = "IDEALAN UGAO (45°)";
        feedback.className = 'correct';
    } else {
        feedback.textContent = "LOŠ UGAO!";
        feedback.className = 'wrong';
    }
}
