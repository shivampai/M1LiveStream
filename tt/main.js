var r = document.querySelector(':root');

function dbReset() {
    firebase.database().ref('liveMatch/matches/0').set({
        matchDetails: {
            name: 'M1PL Boys Match 3',
            start: 1695832555679,
            team1: { name: 'Team 1 Name', id: 0 },
            team2: { name: 'Team 2 Name', id: 1 },
            tournament: { name: 'M1PL 2023 Boys', id: 0 }
        }
    })
    firebase.database().ref('liveMatch/teams/').set([
        {
            name: 'Team 1 Name',
            themeColor: 'red',
            fontColor: 'white',
            tournament: 0,
            players: [
                { name: 'Player 1', id: 0 },
                { name: 'Player 2', id: 1 },
                { name: 'Player 3', id: 2 },
                { name: 'Player 4', id: 3 },
                { name: 'Player 5', id: 4 },
                { name: 'Player 6', id: 5 },
            ]
        },
        {
            name: 'Team 2 Name',
            themeColor: 'blue',
            fontColor: 'white',
            tournament: 0,
            players: [
                { name: 'Player 7', id: 6 },
                { name: 'Player 8', id: 7 },
                { name: 'Player 9', id: 8 },
                { name: 'Player 10', id: 9 },
                { name: 'Player 11', id: 10 },
                { name: 'Player 12', id: 11 },
            ]
        },
        {
            name: 'Team 3 Name',
            themeColor: 'skyblue',
            fontColor: 'black',
            tournament: 0,
            players: [
                { name: 'Player 13', id: 12 },
                { name: 'Player 14', id: 13 },
                { name: 'Player 15', id: 14 },
                { name: 'Player 16', id: 15 },
                { name: 'Player 17', id: 16 },
                { name: 'Player 18', id: 17 },
            ]
        },
    ])
}
function load() {
    firebase.database().ref('liveMatch/ongoing').once('value', (snapshot) => {
        const matchid = snapshot.val()
        firebase.database().ref('liveMatch/matches/' + matchid).once('value', (snapshot) => {
            allMatchData = snapshot.val();
            team1id = allMatchData.matchDetails.team1.id;
            team2id = allMatchData.matchDetails.team2.id;
            matchName = allMatchData.matchDetails.name;
            document.title = matchName;
            firebase.database().ref(`liveMatch/teams/`).once('value', (snapshot) => {
                const data = snapshot.val()
                db_team1data = data[team1id]
                r.style.setProperty('--team1fc', db_team1data.fontColor);
                r.style.setProperty('--team1bg', db_team1data.themeColor);
                elems_team1_name = document.getElementsByClassName('data-name-team-1');
                for (i = 0; i < elems_team1_name.length; i++) {
                    elems_team1_name[i].innerHTML = db_team1data.name
                }
            });
        })
    })
}
