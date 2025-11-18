// Aim Training Game
let score = 0;
let hits = 0;
let misses = 0;
let timeLeft = 30;
let gameActive = false;
let gameTimer = null;
let targetTimer = null;
let bestScore = localStorage.getItem('aimTrainingBest') || 0;

// DOM elements
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const bestDisplay = document.getElementById('best');
const startButton = document.getElementById('start');
const playArea = document.querySelector('.play-area');

// Background music
const backgroundMusic = new Audio('Videos/GameAudio.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.8; // Set volume to 80%

// Initialize best score display
bestDisplay.textContent = bestScore;

// Start game function
function startGame() {
    if (gameActive) return;
    
    // Reset game state
    score = 0;
    hits = 0;
    misses = 0;
    timeLeft = 30;
    gameActive = true;
    
    // Update UI
    startButton.textContent = 'Game Active';
    startButton.disabled = true;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    playArea.innerHTML = '';
    
    // Start background music
    backgroundMusic.play().catch(error => {
        console.log('Audio playback failed:', error);
        // Some browsers require user interaction before playing audio
    });
    
    // Start timers
    gameTimer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    // Spawn first target
    spawnTarget();
}

// Spawn target function
function spawnTarget() {
    if (!gameActive) return;
    
    // Remove existing targets
    const existingTargets = playArea.querySelectorAll('.target');
    existingTargets.forEach(target => {
        target.remove();
        misses++;
    });
    
    // Create new target (rock)
    const target = document.createElement('div');
    target.className = 'target';
    
    // Random size (30-60px)
    const size = Math.random() * 30 + 30;
    target.style.width = size + 'px';
    target.style.height = size + 'px';
    
    // Random grey shade (different shades of grey)
    const greyShades = [
        '#4A4A4A', // Dark grey
        '#5A5A5A', // Medium-dark grey
        '#6B6B6B', // Medium grey
        '#7A7A7A', // Medium-light grey
        '#8B8B8B', // Light grey
        '#9A9A9A', // Lighter grey
        '#555555', // Charcoal grey
        '#666666', // Slate grey
        '#777777', // Silver grey
        '#888888'  // Light silver grey
    ];
    const randomGrey = greyShades[Math.floor(Math.random() * greyShades.length)];
    target.style.backgroundColor = randomGrey;
    
    // Different rock shapes - choose from various irregular patterns (more bumpy)
    const shapeTypes = [
        // Type 1: Very irregular, organic with lots of bumps
        () => {
            const r1 = Math.random() * 60 + 5;
            const r2 = Math.random() * 60 + 40;
            const r3 = Math.random() * 60 + 5;
            const r4 = Math.random() * 60 + 40;
            const r5 = Math.random() * 60 + 5;
            const r6 = Math.random() * 60 + 40;
            const r7 = Math.random() * 60 + 5;
            const r8 = Math.random() * 60 + 40;
            return `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;
        },
        // Type 2: Bumpy boulder with pronounced irregularities
        () => {
            const r1 = Math.random() * 50 + 20;
            const r2 = Math.random() * 50 + 30;
            const r3 = Math.random() * 50 + 20;
            const r4 = Math.random() * 50 + 30;
            const r5 = Math.random() * 50 + 20;
            const r6 = Math.random() * 50 + 30;
            const r7 = Math.random() * 50 + 20;
            const r8 = Math.random() * 50 + 30;
            return `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;
        },
        // Type 3: Very angular with extreme bumps
        () => {
            const r1 = Math.random() * 40 + 0;
            const r2 = Math.random() * 40 + 60;
            const r3 = Math.random() * 40 + 0;
            const r4 = Math.random() * 40 + 60;
            const r5 = Math.random() * 40 + 60;
            const r6 = Math.random() * 40 + 0;
            const r7 = Math.random() * 40 + 60;
            const r8 = Math.random() * 40 + 0;
            return `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;
        },
        // Type 4: Bumpy oval with irregularities
        () => {
            const r1 = Math.random() * 40 + 30;
            const r2 = Math.random() * 40 + 30;
            const r3 = Math.random() * 40 + 30;
            const r4 = Math.random() * 40 + 30;
            return `${r1}% ${r2}% ${r3}% ${r4}%`;
        },
        // Type 5: Highly irregular bumpy blob
        () => {
            const r1 = Math.random() * 55 + 10;
            const r2 = Math.random() * 55 + 45;
            const r3 = Math.random() * 55 + 10;
            const r4 = Math.random() * 55 + 45;
            const r5 = Math.random() * 55 + 10;
            const r6 = Math.random() * 55 + 45;
            const r7 = Math.random() * 55 + 10;
            const r8 = Math.random() * 55 + 45;
            return `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;
        },
        // Type 6: Extra bumpy with many variations
        () => {
            const r1 = Math.random() * 70 + 0;
            const r2 = Math.random() * 70 + 30;
            const r3 = Math.random() * 70 + 0;
            const r4 = Math.random() * 70 + 30;
            const r5 = Math.random() * 70 + 30;
            const r6 = Math.random() * 70 + 0;
            const r7 = Math.random() * 70 + 30;
            const r8 = Math.random() * 70 + 0;
            return `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;
        }
    ];
    
    const selectedShape = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    target.style.borderRadius = selectedShape();
    
    // Random rotation for variety
    target.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Random position
    const playAreaRect = playArea.getBoundingClientRect();
    const maxX = playAreaRect.width - size;
    const maxY = playAreaRect.height - size;
    
    target.style.left = Math.random() * maxX + 'px';
    target.style.top = Math.random() * maxY + 'px';
    
    // Add click event
    target.addEventListener('click', hitTarget);
    
    // Add to play area
    playArea.appendChild(target);
    
    // Remove target after 2 seconds if not clicked
    targetTimer = setTimeout(() => {
        if (target.parentNode) {
            target.remove();
            misses++;
            spawnTarget();
        }
    }, 2000);
}

// Hit target function
function hitTarget(event) {
    if (!gameActive) return;
    
    event.stopPropagation();
    const target = event.target;
    
    // Calculate points based on target size (smaller = more points)
    const size = parseInt(target.style.width);
    const points = Math.floor((60 - size) / 5) + 1;
    
    score += points;
    hits++;
    
    // Update score display
    scoreDisplay.textContent = score;
    
    // Visual feedback - preserve rotation
    const currentRotation = target.style.transform.match(/rotate\(([^)]+)\)/) || ['', '0deg'];
    target.style.transform = `scale(1.2) ${currentRotation[0]}`;
    target.classList.add('hit');
    
    // Remove target
    setTimeout(() => {
        target.remove();
        spawnTarget();
    }, 100);
}

// End game function
function endGame() {
    gameActive = false;
    
    // Stop background music
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    
    // Clear timers
    clearInterval(gameTimer);
    clearTimeout(targetTimer);
    
    // Remove all targets
    playArea.innerHTML = '';
    
    // Calculate accuracy
    const totalShots = hits + misses;
    const accuracy = totalShots > 0 ? ((hits / totalShots) * 100).toFixed(1) : 0;
    
    // Update best score
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('aimTrainingBest', bestScore);
        bestDisplay.textContent = bestScore;
    }
    
    // Reset button
    startButton.textContent = 'Start Game';
    startButton.disabled = false;
    
    // Show results
    const results = document.createElement('div');
    results.className = 'game-results';
    results.innerHTML = `
        <h3>Game Over!</h3>
        <p>Final Score: ${score}</p>
        <p>Hits: ${hits} | Misses: ${misses}</p>
        <p>Accuracy: ${accuracy}%</p>
        ${score > parseInt(localStorage.getItem('aimTrainingBest') || 0) ? '<p class="new-best">New Best Score! 🎯</p>' : ''}
    `;
    playArea.appendChild(results);
    
    // Remove results after 5 seconds
    setTimeout(() => {
        results.remove();
    }, 5000);
}

// Miss click handler (clicking play area but not target)
playArea.addEventListener('click', (event) => {
    if (gameActive && event.target === playArea) {
        misses++;
    }
});

// Start button event
startButton.addEventListener('click', startGame);

