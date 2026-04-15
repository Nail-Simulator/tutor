const container = document.getElementById('app-container');
const nailFile = document.getElementById('nail-file');
const feedback = document.getElementById('feedback');
const angleValue = document.getElementById('angle-value');

let rotation = 0;
let isFiling = false;

// Pomeranje turpije
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    nailFile.style.left = `${x - 225}px`;
    nailFile.style.top = `${y - 40}px`;

    if (isFiling) {
        checkTechnique(rotation);
    }
});

// Rotacija točkićem + Prikaz ugla u realnom vremenu
container.addEventListener('wheel', (e) => {
    e.preventDefault();
    rotation += e.deltaY * 0.1;
    nailFile.style.transform = `rotate(${rotation}deg)`;
    
    // Prikazujemo apsolutni ugao 0-180 za korisnika
    let displayAngle = Math.abs(Math.round(rotation % 180));
    angleValue.textContent = displayAngle;
});

container.addEventListener('mousedown', () => { isFiling = true; });
container.addEventListener('mouseup', () => { 
    isFiling = false; 
    feedback.className = '';
    feedback.textContent = "Čekam tvoj potez...";
});

function checkTechnique(deg) {
    let normalizedAngle = Math.abs(deg % 180);
    const ideal1 = 45;
    const ideal2 = 135;
    const tolerance = 10;

    const isNearIdeal1 = Math.abs(normalizedAngle - ideal1) < tolerance;
    const isNearIdeal2 = Math.abs(normalizedAngle - ideal2) < tolerance;

    if (isNearIdeal1 || isNearIdeal2) {
        feedback.textContent = "UGAO PRAVILAN";
        feedback.className = 'correct';
    } else {
        feedback.textContent = "LOŠ UGAO";
        feedback.className = 'wrong';
    }
}
