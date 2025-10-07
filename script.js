let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentShape = 'circle';
let gameOver = false;

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');
    let tableHTML = '<div class="board-container"><table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const field = fields[index];

            let symbolHTML = '';
            let clickHandler = '';

            if (field === 'circle') {
                symbolHTML = generateCircleSVG();
            } else if (field === 'cross') {
                symbolHTML = generateCrossSVG();
            } else if (!gameOver) {
                clickHandler = `onclick="handleClick(${index}, this)"`;
            }

            tableHTML += `<td ${clickHandler}>${symbolHTML}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table><div id="win-line"></div></div>';
    contentDiv.innerHTML = tableHTML;
}

function handleClick(index, cell) {
    if (gameOver || fields[index]) return;

    fields[index] = currentShape;

    if (currentShape === 'circle') {
        cell.innerHTML = generateCircleSVG();
        currentShape = 'cross';
    } else {
        cell.innerHTML = generateCrossSVG();
        currentShape = 'circle';
    }

    cell.onclick = null; // deaktiviert den Klick auf dieses Feld

    const winnerCombo = checkGameOver();
    if (winnerCombo) {
        gameOver = true;
        drawWinningLine(winnerCombo);
    }
}

function checkGameOver() {
    const winningCombinations = [
        [0, 1, 2], // Zeilen
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // Spalten
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // Diagonalen
        [2, 4, 6]
    ];

    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combo; // Gewinner gefunden
        }
    }
    return null; // kein Gewinn
}

function drawWinningLine(combo) {
    const line = document.getElementById('win-line');
    const positions = {
        0: { x: 0, y: 0 },
        1: { x: 1, y: 0 },
        2: { x: 2, y: 0 },
        3: { x: 0, y: 1 },
        4: { x: 1, y: 1 },
        5: { x: 2, y: 1 },
        6: { x: 0, y: 2 },
        7: { x: 1, y: 2 },
        8: { x: 2, y: 2 }
    };

    const start = positions[combo[0]];
    const end = positions[combo[2]];

    // Linie in Prozentwerten, damit sie sich anpasst
    const x1 = start.x * 33.33 + 16.66;
    const y1 = start.y * 33.33 + 16.66;
    const x2 = end.x * 33.33 + 16.66;
    const y2 = end.y * 33.33 + 16.66;

    line.innerHTML = `
        <svg class="win-svg" viewBox="0 0 100 100">
            <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                stroke="white" stroke-width="4" stroke-linecap="round">
                <animate attributeName="x2" from="${x1}" to="${x2}" dur="0.5s" fill="freeze" />
                <animate attributeName="y2" from="${y1}" to="${y2}" dur="0.5s" fill="freeze" />
            </line>
        </svg>
    `;
}

function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle 
                cx="35" 
                cy="35" 
                r="30" 
                stroke="#00B0EF" 
                stroke-width="8" 
                fill="none"
                stroke-dasharray="188.4"
                stroke-dashoffset="188.4"
            >
                <animate 
                    attributeName="stroke-dashoffset" 
                    from="188.4" 
                    to="0" 
                    dur="1s" 
                    fill="freeze" 
                />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line 
                x1="15" y1="15" 
                x2="55" y2="55" 
                stroke="#FFC000" 
                stroke-width="8" 
                stroke-linecap="round"
                stroke-dasharray="56.57"
                stroke-dashoffset="56.57"
            >
                <animate 
                    attributeName="stroke-dashoffset" 
                    from="56.57" 
                    to="0" 
                    dur="0.6s" 
                    fill="freeze" 
                />
            </line>
            <line 
                x1="55" y1="15" 
                x2="15" y2="55" 
                stroke="#FFC000" 
                stroke-width="8" 
                stroke-linecap="round"
                stroke-dasharray="56.57"
                stroke-dashoffset="56.57"
            >
                <animate 
                    attributeName="stroke-dashoffset" 
                    from="56.57" 
                    to="0" 
                    dur="0.6s" 
                    fill="freeze" 
                    begin="0.3s" 
                />
            </line>
        </svg>
    `;
}