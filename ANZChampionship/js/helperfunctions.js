function rank(year) {
	var list = allSeasons[year];
	var e = list[list.length-1];
	var scoreDiff = [];
	// Get score differences for the final
	var scoreHome = parseInt(e.Score.split('–')[0], 10);
	var scoreAway = parseInt(e.Score.split('–')[1], 10);
	if (scoreHome > scoreAway) {
		// home wins
		scoreDiff.push(e['Home Team']);
		scoreDiff.push(e['Away Team']);
	} else {
		// away wins
		scoreDiff.push(e['Away Team']);
		scoreDiff.push(e['Home Team']);
	}
	//third
	e = list[list.length-2];
	//console.log(e);
	var scoreHome = parseInt(e.Score.split('–')[0], 10);
	var scoreAway = parseInt(e.Score.split('–')[1], 10);
	if (scoreHome > scoreAway) {
		// Game won at home
		scoreDiff.push(e['Away Team']);
	} else {
		// Game won at away
		scoreDiff.push(e['Home Team']);
	}
	e = list[list.length-3];

	var scoreHome = parseInt(e.Score.split('–')[0], 10);
	var scoreAway = parseInt(e.Score.split('–')[1], 10);
	if (scoreHome > scoreAway) {
		// Game won at home
		scoreDiff.push(e['Away Team']);
	} else {
		scoreDiff.push(e['Home Team']);
	}
	return scoreDiff;
}

function teamRank(dat){
	// calculate wins-losses, draws, proportion win, and league points
	var data = [];
	for (var i = 0; i < teamList.length; i++) {
		data.push(new TeamData(teamList[i]));
	}
	dat.forEach(function(d) {
		//console.log(d.Date)
		if (d.Date.indexOf('BYES:') === 0) return;
		var scoreHome = parseInt(d.Score.split('–')[0], 10);
		var scoreAway = parseInt(d.Score.split('–')[1], 10);

		data[teamList.indexOf(d['Home Team'])].gamePoints += scoreHome;
		data[teamList.indexOf(d['Home Team'])].awayGamePoints += scoreAway;
		data[teamList.indexOf(d['Away Team'])].gamePoints += scoreAway;
		data[teamList.indexOf(d['Away Team'])].awayGamePoints += scoreHome;

		if (scoreHome > scoreAway) {
			data[teamList.indexOf(d['Home Team'])].wins++;
			data[teamList.indexOf(d['Home Team'])].points += 2;
			data[teamList.indexOf(d['Away Team'])].losses++;

			data[teamList.indexOf(d['Home Team'])].homeWin++;
			data[teamList.indexOf(d['Away Team'])].awayLoss++;
		} else if (scoreHome < scoreAway) {
			data[teamList.indexOf(d['Away Team'])].wins++;
			data[teamList.indexOf(d['Away Team'])].points += 2;
			data[teamList.indexOf(d['Home Team'])].losses++;

			data[teamList.indexOf(d['Away Team'])].awayWin++;
			data[teamList.indexOf(d['Home Team'])].homeLoss++;
		} else {
			console.log(teamList.indexOf(d['Home Team'])  + " " + teamList.indexOf(d['Away Team']));
			data[teamList.indexOf(d['Home Team'])].draws++;
			data[teamList.indexOf(d['Home Team'])].points++;
			data[teamList.indexOf(d['Away Team'])].draws++;
			data[teamList.indexOf(d['Away Team'])].points++;
		}
	});

	return data;
	}
function winCount(a, b) {
	return b.wins - a.wins;
}

function lossCount(a,b) {
	return b.losses - a.losses;
}

function pointCount(a,b) {
	return b.gamePoints - a.gamePoints;
}

function winLoss(a,b) {
	return (b.wins-b.losses) - (a.wins-a.losses);
}

function winRatio(a,b) {
	if (!isNumber(b.wins/(b.wins + b.losses))) {
		return -1;
	} else if (!isNumber(a.wins/(a.wins + a.losses))) {
		return 1;
	}
	return b.wins/(b.wins + b.losses) - a.wins/(a.wins + a.losses);
}

function isNumber(n){
   return typeof n == 'number' && !isNaN(n - n);
}