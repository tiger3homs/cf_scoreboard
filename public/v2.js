function showPlayerStatsTable() {
    function parseTeam(bodyClass) {
        const players = [];
        const rows = document.querySelectorAll(`.${bodyClass} tr`);
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length < 5) return; // skip invalid rows

            // Name is in second td, after any span tags
            const nameSpan = cells[1].querySelectorAll('span');
            const name = nameSpan.length > 1 ? nameSpan[1].textContent.trim() : 'Unknown';

            const kills = parseInt(cells[3].textContent.trim() || 0, 10);
            const deaths = parseInt(cells[4].textContent.trim() || 0, 10);

            players.push({ Name: name, Kills: kills, Deaths: deaths });
        });
        return players;
    }

    const ctPlayers = parseTeam('scoreboard-hud-ct-body');
    const trPlayers = parseTeam('scoreboard-hud-tr-body');

    console.log('=== CT Players ===');
    console.table(ctPlayers);

    console.log('=== TR Players ===');
    console.table(trPlayers);
}

// Run the function
showPlayerStatsTable();
