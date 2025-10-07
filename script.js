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

let currentShape = 'circle'; // Startspieler: Kreis

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');

    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const field = fields[index];

            let symbolHTML = '';
            let clickHandler = '';

            // Wenn Feld belegt ist → Symbol anzeigen
            if (field === 'circle') {
                symbolHTML = generateCircleSVG();
            } else if (field === 'cross') {
                symbolHTML = generateCrossSVG();
            } else {
                // Wenn leer → Klickfunktion aktivieren
                clickHandler = `onclick="handleClick(${index}, this)"`;
            }

            tableHTML += `<td ${clickHandler}>${symbolHTML}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    contentDiv.innerHTML = tableHTML;
}

function handleClick(index, cell) {
    // Nur reagieren, wenn das Feld noch leer ist
    if (!fields[index]) {
        fields[index] = currentShape;

        // Setze SVG im geklickten Feld
        if (currentShape === 'circle') {
            cell.innerHTML = generateCircleSVG();
            currentShape = 'cross'; // Nächster Spieler
        } else {
            cell.innerHTML = generateCrossSVG();
            currentShape = 'circle';
        }

        // Klick-Event für dieses Feld deaktivieren
        cell.onclick = null;
    }
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
