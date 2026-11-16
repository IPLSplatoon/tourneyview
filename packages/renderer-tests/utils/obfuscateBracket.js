export function obfuscateBracket(bracket, baseId, verbose) {
    const oldIdToNewId = {};
    bracket.matchGroups.forEach((group, i) => {
        group.matches.forEach((match, j) => {
            const newId = `${baseId}_${i}_${j}`;
            oldIdToNewId[match.id] = newId;
            match.id = newId;
        });
    });

    let rollingPlayerNumber = 0;
    const playerIdToNumber = {};
    function getTeamNumber(team) {
        if (team.id == null) return null;

        const existingNumber = playerIdToNumber[team.id];
        if (existingNumber == null) {
            playerIdToNumber[team.id] = ++rollingPlayerNumber;
            if (verbose) {
                console.log(`"${team.name}" -> Team ${rollingPlayerNumber}`);
            }
            return rollingPlayerNumber;
        }

        return existingNumber;
    }

    return {
        id: baseId,
        name: 'Placeholder name (please change me!)',
        eventName: 'Test Event',
        type: bracket.type,
        matchGroups: bracket.matchGroups.map((group, i) => ({
            ...group,
            id: `${baseId}_group_${i}`,
            name: `Match Group #${i + 1}`,
            matches: group.matches.map((match, j) => {
                const topTeamNumber = getTeamNumber(match.topTeam);
                const bottomTeamNumber = getTeamNumber(match.bottomTeam);

                return ({
                    ...match,
                    nextMatchId: oldIdToNewId[match.nextMatchId],
                    topTeam: {
                        ...match.topTeam,
                        id: topTeamNumber,
                        name: topTeamNumber == null ? undefined : `Team ${topTeamNumber}`
                    },
                    bottomTeam: {
                        ...match.bottomTeam,
                        id: bottomTeamNumber,
                        name: bottomTeamNumber == null ? undefined : `Team ${bottomTeamNumber}`
                    }
                });
            })
        }))
    };
}
