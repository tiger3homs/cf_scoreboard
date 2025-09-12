// step 1
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

// step 2

(async () => {
    const supabaseModule = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
    window.supabase = supabaseModule.createClient(
        'https://dzmecnikrhsdedcagvzs.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bWVjbmlrcmhzZGVkY2FndnpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1NTQ2NzcsImV4cCI6MjA1OTEzMDY3N30.JMMQMbVTS7QHDPkFInynQ-MszbrH_mEFl4uEDP9E5pk'
    );
    console.log("Supabase client ready ✅");
})();

// step 3

async function saveMatchFromConsole(playersByTeams, description = "Console match") {
    if (!window.supabase) {
        return console.error("Supabase client not found. Make sure it’s loaded first.");
    }

    try {
        // 1️⃣ Create a new match
        const { data: matchData, error: matchError } = await supabase
            .from('matches')
            .insert([{ description }])
            .select()
            .single();

        if (matchError) return console.error("Error creating match:", matchError);

        const matchId = matchData.id;

        // 2️⃣ Combine all players
        const allPlayers = [
            ...playersByTeams.team1,
            ...playersByTeams.team2,
            ...playersByTeams.spectators
        ];

        // 3️⃣ Upsert players
        const { error: playersError } = await supabase
            .from('players')
            .upsert(allPlayers.map(p => ({ id: p.id, name: p.name })), { onConflict: 'id' });

        if (playersError) return console.error("Error upserting players:", playersError);

        // 4️⃣ Insert match stats
        const { error: matchPlayersError } = await supabase
            .from('match_players')
            .insert(allPlayers.map(p => ({
                match_id: matchId,
                player_id: p.id,
                team: p.teamnumber,
                frags: p.frags,
                deaths: p.deaths
            })));

        if (matchPlayersError) return console.error("Error inserting match players:", matchPlayersError);

        console.log("✅ Match saved successfully!");
    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

// step 4

saveMatchFromConsole(teams, "Evening match");

