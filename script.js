:root {
    --accent: #b5838d;
    --bg: #fcfaf8;
    --text: #3d3d3d;
}

body { margin: 0; font-family: sans-serif; background-color: var(--bg); overflow: hidden; }

header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 40px; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

#live-angle {
    font-weight: bold; font-size: 1.5rem; color: var(--accent);
    background: #fdf2f4; padding: 5px 15px; border-radius: 10px;
}

.instructions-panel { background: #fdf2f4; padding: 10px; text-align: center; border-bottom: 1px solid #ddd; }
.instructions-panel ul { list-style: none; padding: 0; display: flex; justify-content: center; gap: 15px; font-size: 0.85rem; margin: 5px 0; }
.instructions-panel li { background: white; padding: 4px 12px; border-radius: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

#app-container {
    position: relative; 
    width: 90vw; 
    height: 60vh; 
    margin: 20px auto;
    border-radius: 20px; 
    overflow: hidden; 
    background: #000;
    cursor: none; /* Sakrivamo pravi miš */
}

#nail-ref { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    pointer-events: none; 
}

#filing-canvas {
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
    z-index: 10; 
    pointer-events: none; 
}

#nail-file {
    position: absolute;
    width: 300px; /* Smanjena turpija radi bolje preciznosti */
    z-index: 999; 
    pointer-events: none;
    transform-origin: center center;
    filter: drop-shadow(0px 8px 5px rgba(0,0,0,0.4));
    display: block;
}

#feedback {
    position: absolute; top: 15px; left: 50%; transform: translateX(-50%);
    z-index: 1000; padding: 8px 15px; border-radius: 8px; font-weight: bold;
    background: rgba(255,255,255,0.95); box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.scroll-instruction { position: fixed; bottom: 20px; right: 20px; background: white; padding: 10px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); font-weight: bold; font-size: 0.7rem; }
.correct { background: #d4edda !important; color: #155724; border: 2px solid #28a745; }
.wrong { background: #f8d7da !important; color: #721c24; border: 2px solid #dc3545; }
