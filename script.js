let fields = [
    null,
    null,
    'circle',
    null,
    null,
    null,
    'cross',
    null,
    null
];

function init() {
    render()
}

function render() {
    const contentDiv = document.getElementById('content');

    let tableHTML = '<table>';

    for (let i = 0; i < 3; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const field = fields[index];

            let symbol = '';
            if (field === 'circle') {
                symbol = 'O';
            } else if (field === 'cross') {
                symbol = 'X';
            }

            tableHTML += `<td>${symbol}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';

    contentDiv.innerHTML = tableHTML;
}