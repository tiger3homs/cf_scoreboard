function getPlayersByTeams() {
    let teams = { team1: [], team2: [], spectators: [] };

    for (let playerId in g_PlayerExtraInfo) {
        if (g_PlayerExtraInfo.hasOwnProperty(playerId)) {
            let p = g_PlayerExtraInfo[playerId];
            let info = {
                id: playerId,
                name: p.name || "Unknown",
                frags: parseInt(p.frags) || 0,
                deaths: parseInt(p.deaths) || 0,
                teamnumber: p.teamnumber || null
            };

            if (info.teamnumber === 1) teams.team1.push(info);
            else if (info.teamnumber === 2) teams.team2.push(info);
            else teams.spectators.push(info);
        }
    }
    return teams;
}
