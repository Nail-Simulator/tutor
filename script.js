const container = document.getElementById('app-container');
const nailFile = document.getElementById('nail-file');
const feedback = document.getElementById('feedback');
const nailRef = document.getElementById('nail-ref');

let rotation = 0;
let isFiling = false;

// 1. Pomeranje turpije
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Centriramo turpiju (pošto je veća, centar je sada na -200, -35)
    nailFile.style.left = `${x - 200}px`;
    nailFile.style.top = `${y - 35}px`;

    if (isFiling) {
        checkTechnique(rotation);
    }
});

// 2. Rotacija točkićem
container.addEventListener('wheel', (e) => {
    e.preventDefault(); // Sprečava skrolovanje strane
    rotation += e.deltaY * 0.1; // Smanjen intenzitet za precizniju rotaciju
    nailFile.style.transform = `rotate(${rotation}deg)`;
});

// 3. Detekcija "turpijanja"
container.addEventListener('mousedown', () => { 
    isFiling = true; 
    nailRef.style.transform = 'scale(1.05)'; // Blagi zum nokta za fokus
});

container.addEventListener('mouseup', () => { 
    isFiling = false; 
    feedback.className = 'idle';
    feedback.textContent = "Sistemi spremni. Čekam tvoj potez...";
    nailRef.style.transform = 'scale(1)'; // Vraćanje zumiranja
});

// --- Algoritam za proveru ugla (Tvoj intelektualni 'izum') ---
function checkTechnique(deg) {
    // Normalizujemo ugao da bude u opsegu 0-180
    let normalizedAngle = Math.abs(deg % 180);
    
    // Logika: Za bočne strane idealan ugao je oko 45 ili 135 stepeni
    // Dozvoljeno odstupanje je 10 stepeni.
    const ideal1 = 45;
    const ideal2 = 135;
    const tolerance = 10;

    const isNearIdeal1 = Math.abs(normalizedAngle - ideal1) < tolerance;
    const isNearIdeal2 = Math.abs(normalizedAngle - ideal2) < tolerance;

    if (isNearIdeal1 || isNearIdeal2) {
        feedback.textContent = `POZICIJA PRAVILNA! Ugao: ${Math.round(normalizedAngle)}°. Arhitektura se pravilno formira.`;
        feedback.className = 'correct';
    } else {
        feedback.textContent = `LOŠ UGAO! Trenutno: ${Math.round(normalizedAngle)}°. Rizik od oštećenja nokatne ploče.`;
        feedback.className = 'wrong';
    }
}
