const container = document.getElementById('app-container');
const nailFile = document.getElementById('nail-file');
const feedback = document.getElementById('feedback');
const angleValue = document.getElementById('angle-value');
const nailImg = document.getElementById('nail-ref');

// Canvas za crtanje traga
const canvas = document.getElementById('filing-canvas');
const ctx = canvas.getContext('2d');

// Canvas za analizu boja (maska)
const maskCanvas = document.getElementById('hidden-mask-canvas');
const mCtx = maskCanvas.getContext('2d', { willReadFrequently: true });

let rotation = 0;
let isFiling = false;

// Inicijalizacija kada se slika učita
function init() {
    canvas.width = maskCanvas.width = container.offsetWidth;
    canvas.height = maskCanvas.height = container.offsetHeight;
    mCtx.drawImage(nailImg, 0, 0, canvas.width, canvas.height);
}

if (nailImg.complete) {
    init();
} else {
    nailImg.onload = init;
}

// 1. Pomeranje turpije
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Postavi turpiju na kursor (centrirano)
    nailFile.style.left = `${x - 200}px`;
    nailFile.style.top = `${y - 20}px`;

    if (isFiling) {
        // Provera boje piksela ispod kursora
        const pixel = mCtx.getImageData(x, y, 1, 1).data;
        const r = pixel[0], g = pixel[1], b = pixel[2];

        // Ako je boja svetla (pretpostavka da je to nokat)
        const isOverNail = r > 150 && g > 130 && b > 120;

        if (isOverNail) {
            checkTechnique(rotation);
            // Crtanje traga turpijanja
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fill();
        } else {
            feedback.textContent = "NAĐI IVICU NOKTA";
            feedback.className = 'wrong';
        }
    }
});

// 2. Rotacija točkićem
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    rotation += e.deltaY * 0.1;
    nailFile.style.transform = `rotate(${rotation}deg)`;
    
    let displayAngle = Math.abs(Math.round(rotation % 180));
    angleValue.textContent = displayAngle;
});

// 3. Klik za početak turpijanja
container.addEventListener('mousedown', () => { isFiling = true; });
container.addEventListener('mouseup', () => { 
    isFiling = false; 
    feedback.className = '';
    feedback.textContent = "Čekam tvoj potez...";
});

// 4. Provera preciznosti (45 stepeni)
function checkTechnique(deg) {
    let currentAngle = Math.abs(Math.round(deg % 180));
    const ideal1 = 45;
    const ideal2 = 135;
    const tolerance = 5; // Veoma strogo

    const isCorrect = Math.abs(currentAngle - ideal1) <= tolerance || 
                      Math.abs(currentAngle - ideal2) <= tolerance;

    if (isCorrect) {
        feedback.textContent = "IDEALAN UGAO (45°)";
        feedback.className = 'correct';
    } else {
        feedback.textContent = "POGREŠAN UGAO - NACILJAJ 45°";
        feedback.className = 'wrong';
    }
}
