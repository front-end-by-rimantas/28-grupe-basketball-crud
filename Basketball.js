class Basketball {
    constructor(leagueName, maxPlayersPerTeam) {
        this.leagueName = leagueName;
        this.maxPlayersPerTeam = maxPlayersPerTeam;
        this.playerList = [];
        this.teamList = [];
        this.matchHistory = [];
    }

    wannaBePlayer(playerName, playerPrice) {
        this.playerList.push({
            name: playerName,
            price: playerPrice,
            hasTeam: false,
        })
    }

    createTeam(teamName) {
        this.teamList.push({
            name: teamName,
            players: [],
            winsCount: 0,
        })
        console.log(`A "${teamName}" just entered a game!`);
    }

    buyPlayer(teamId, playerId) {
        const team = this.teamList[teamId - 1];
        const player = this.playerList[playerId - 1];
        const { name, price, hasTeam } = player;

        if (team.players.includes(playerId)) {
            console.log(`"${team.name}" team can't add the same player twice!`);
            return;
        }

        if (team.players.length >= this.maxPlayersPerTeam) {
            console.log(`"${team.name}" team can't add extra players to it's team.\nMaximum players per team is ${this.maxPlayersPerTeam}.`);
            return;
        }

        if (hasTeam) {
            console.log(`${name} already has a team.`);
            return;
        }

        team.players.push(playerId);
        player.hasTeam = true;

        console.log(`"${team.name}" team just acquired new player ${name} for ${price} cash/year!`);
    }

    teamValue(teamId) {
        const team = this.teamList[teamId - 1];
        let value = 0;

        for (const playerId of team.players) {
            const player = this.playerList[playerId - 1];
            value += player.price;
        }

        console.log(`"${team.name}" team is paying ${value} cash/year for it's players.`);
    }

    letsPlay(homeTeamId, guestsTeamId) {
        this.matchHistory.push({
            home: {
                teamId: homeTeamId,
                score: 0,
            },
            guests: {
                teamId: guestsTeamId,
                score: 0,
            },
            winnerTeamId: 0,
        })
        const homeTeamName = this.teamList[homeTeamId - 1].name;
        const guestsTeamName = this.teamList[guestsTeamId - 1].name;
        console.log(`New game everybody!\n"${homeTeamName}" vs. "${guestsTeamName}"`);
    }

    score(homeTeamScore, guestsTeamScore) {
        const latestMatch = this.matchHistory[this.matchHistory.length - 1];
        latestMatch.home.score = homeTeamScore;
        latestMatch.guests.score = guestsTeamScore;

        if (homeTeamScore > guestsTeamScore) {
            latestMatch.winnerTeamId = latestMatch.home.teamId;
        } else {
            latestMatch.winnerTeamId = latestMatch.guests.teamId;
        }

        const winnerTeam = this.teamList[latestMatch.winnerTeamId - 1];
        winnerTeam.winsCount++;
        console.log(`"${winnerTeam.name}" wins!`);
    }

    seasonSummary() {
        let winnerTeam = {};
        let winnerTeamWinsCount = 0;

        for (const team of this.teamList) {
            if (team.winsCount > winnerTeamWinsCount) {
                winnerTeamWinsCount = team.winsCount;
                winnerTeam = team;
            }
        }

        console.log(`Season summary for "${this.leagueName}" ${this.maxPlayersPerTeam}x${this.maxPlayersPerTeam} league:`);
        console.log('####################');
        console.log(`Total games played: ${this.matchHistory.length}`);
        console.log(`Winner team: "${winnerTeam.name}"`);
        console.log('####################');
    }
}

module.exports = Basketball;