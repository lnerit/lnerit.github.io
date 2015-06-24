
//main script for handling data from the CSV files
var isNZTeam = {'Central Pulse':true, 'Queensland Firebirds':false, 'Northern Mystics':true, 'Waikato Bay of Plenty Magic':true, 'New South Wales Swifts':false, 'Canterbury Tactix':true, 'Melbourne Vixens':false, 'West Coast Fever':false, 'Adelaide Thunderbirds':false, 'Southern Steel':true}
var teamList = ['Central Pulse', 'Queensland Firebirds', 'Northern Mystics', 'Waikato Bay of Plenty Magic', 'New South Wales Swifts', 'Canterbury Tactix', 'Melbourne Vixens', 'West Coast Fever', 'Adelaide Thunderbirds', 'Southern Steel']

var mList = teamList.slice();
var nList = teamList.slice();

var listYears = [2008, 2009, 2010, 2011, 2012, 2013];
//Declare arrays to hold data from the input files
var allSeasons = {};
var allTeams = {};
var allVenues = {};

//Initialise varables
var sYear = 2008;
var sTeam = 'Central Pulse';
var showYear = 'All';


//function to load Season for yearFilter on the HTML page
function LoadYearToFilterBox(){
	var select = document.getElementById("yearFilter");
	for (var i=0;i<listYears.length;i++){
		var ele=document.createElement("option");
		ele.textContent=listYears[i];
		select.appendChild(ele);
	}
}

function TeamData (n) {
	this.wins = 0;
	this.losses = 0;
	this.draws = 0;
	this.name = n;
	this.points = 0;
	this.homeWin = 0;
	this.homeLoss = 0;
	this.awayWin = 0;
	this.awayLoss = 0;
	this.gamePoints = 0;
	this.awayGamePoints = 0;
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
/*
 *
 */

//Load all the csv files

d3.csv('data/2008-Table1.csv', function(data){
	console.log(data);
		allSeasons['2008'] = data;
		data.forEach(function(i) {
			i.year = 2008;
			var team = allTeams[i['Home Team']];
			if (team == undefined) {
				allTeams[i['Home Team']] = [i];
			} else {
				team.push(i);
			}

			team = allTeams[i['Away Team']];
			if (team == undefined) {
				allTeams[i['Away Team']] = [i];
			} else {
				team.push(i);
			}

			var venue = allVenues[i['Venue']];
			if (venue == undefined) {
				allVenues[i['Venue']] = [i];
			} else {
				venue.push(i);
			}
		});

		d3.csv('data/2009-Table1.csv', function(data){
			allSeasons['2009'] = data;
			data.forEach(function(i) {
				i.year = 2009;
				var team = allTeams[i['Home Team']];
				if (team == undefined) {
					allTeams[i['Home Team']] = [i];
				} else {
					team.push(i);
				}

				team = allTeams[i['Away Team']];
				if (team == undefined) {
					allTeams[i['Away Team']] = [i];
				} else {
					team.push(i);
				}

				var venue = allVenues[i['Venue']];
				if (venue == undefined) {
					allVenues[i['Venue']] = [i];
				} else {
					venue.push(i);
				}
			});
			d3.csv('data/2010-Table1.csv', function(data){
				allSeasons['2010'] = data;
				data.forEach(function(i) {
					i.year = 2010;
					var team = allTeams[i['Home Team']];
					if (team == undefined) {
						allTeams[i['Home Team']] = [i];
					} else {
						team.push(i);
					}

					team = allTeams[i['Away Team']];
					if (team == undefined) {
						allTeams[i['Away Team']] = [i];
					} else {
						team.push(i);
					}

					var venue = allVenues[i['Venue']];
					if (venue == undefined) {
						allVenues[i['Venue']] = [i];
					} else {
						venue.push(i);
					}
				});
				d3.csv('data/2011-Table1.csv', function(data){
					allSeasons['2011'] = data;
					data.forEach(function(i) {
						i.year = 2011;
						var team = allTeams[i['Home Team']];
						if (team == undefined) {
							allTeams[i['Home Team']] = [i];
						} else {
							team.push(i);
						}

						team = allTeams[i['Away Team']];
						if (team == undefined) {
							allTeams[i['Away Team']] = [i];
						} else {
							team.push(i);
						}

						var venue = allVenues[i['Venue']];
						if (venue == undefined) {
							allVenues[i['Venue']] = [i];
						} else {
							venue.push(i);
						}
					});
					d3.csv('data/2012-Table1.csv', function(data){
						allSeasons['2012'] = data;
						data.forEach(function(i) {
							i.year = 2012;
							var team = allTeams[i['Home Team']];
							if (team == undefined) {
								allTeams[i['Home Team']] = [i];
							} else {
								team.push(i);
							}

							team = allTeams[i['Away Team']];
							if (team == undefined) {
								allTeams[i['Away Team']] = [i];
							} else {
								team.push(i);
							}

							var venue = allVenues[i['Venue']];
							if (venue == undefined) {
									allVenues[i['Venue']] = [i];
							} else {
									venue.push(i);
							}
						});

						d3.csv('data/2013-Table1.csv', function(data) {

							allSeasons['2013'] = data;
							data.forEach(function(i) {
								i.year = 2013;
								var team = allTeams[i['Home Team']];
								if (team == undefined) {
									allTeams[i['Home Team']] = [i];
								} else {
									team.push(i);
								}

								team = allTeams[i['Away Team']];
								if (team == undefined) {
									allTeams[i['Away Team']] = [i];
								} else {
									team.push(i);
								}

								var venue = allVenues[i['Venue']];
								if (venue == undefined) {
									allVenues[i['Venue']] = [i];
								} else {
									venue.push(i);
								}
							});
							//Remove underdefined and emty entries

							delete allVenues[undefined];
							delete allVenues[''];

							console.log(allSeasons);
							console.log(allTeams);
							console.log(allVenues);

							//call Next functions.. to draw visualization 2.
							makeVisualizationTwo(allTeams, document.getElementById("visual_holder_overview"));
							RoundPlacement(allSeasons,document.getElementById("visualization-1"));
						});
					});
			});
		});
	});
});
function teamRank(dat){
	// calculate wins-losses, draws, proportion win, and league points
	var data = [];
	for (var i = 0; i < teamList.length; i++) {
		data.push(new TeamData(teamList[i]));
	}
	dat.forEach(function(e) {
		if (e.Date.indexOf('BYES') === 0) return;

		var scoreHome = parseInt(e.Score.split('–')[0], 10);
		var scoreAway = parseInt(e.Score.split('–')[1], 10);

		data[teamList.indexOf(e['Home Team'])].gamePoints += scoreHome;
		data[teamList.indexOf(e['Home Team'])].awayGamePoints += scoreAway;
		data[teamList.indexOf(e['Away Team'])].gamePoints += scoreAway;
		data[teamList.indexOf(e['Away Team'])].awayGamePoints += scoreHome;

		if (scoreHome > scoreAway) {
			data[teamList.indexOf(e['Home Team'])].wins++;
			data[teamList.indexOf(e['Home Team'])].points += 2;
			data[teamList.indexOf(e['Away Team'])].losses++;

			data[teamList.indexOf(e['Home Team'])].homeWin++;
			data[teamList.indexOf(e['Away Team'])].awayLoss++;
		} else if (scoreHome < scoreAway) {
			data[teamList.indexOf(e['Away Team'])].wins++;
			data[teamList.indexOf(e['Away Team'])].points += 2;
			data[teamList.indexOf(e['Home Team'])].losses++;

			data[teamList.indexOf(e['Away Team'])].awayWin++;
			data[teamList.indexOf(e['Home Team'])].homeLoss++;
		} else {
			console.log(teamList.indexOf(e['Home Team'])  + " " + teamList.indexOf(e['Away Team']));
			data[teamList.indexOf(e['Home Team'])].draws++;
			data[teamList.indexOf(e['Home Team'])].points++;
			data[teamList.indexOf(e['Away Team'])].draws++;
			data[teamList.indexOf(e['Away Team'])].points++;
		}
	});

	return data;
	}

function rank(year) {
	var list = allSeasons[year];
	var e = list[list.length-1];
	var scoreDiff = [];
	// Take the score difference for finals
	var scoreHome = parseInt(e.Score.split('–')[0], 10);
	var scoreAway = parseInt(e.Score.split('–')[1], 10);
	if (scoreHome > scoreAway) {
		// home win
		scoreDiff.push(e['Home Team']);
		scoreDiff.push(e['Away Team']);
	} else {
		// away win
		scoreDiff.push(e['Away Team']);
		scoreDiff.push(e['Home Team']);
	}
	//third
	e = list[list.length-2];
	//console.log(e);
	var scoreHome = parseInt(e.Score.split('–')[0], 10);
	var scoreAway = parseInt(e.Score.split('–')[1], 10);
	if (scoreHome > scoreAway) {
		// home won
		scoreDiff.push(e['Away Team']);
	} else {
		// away win
		scoreDiff.push(e['Home Team']);
	}
	e = list[list.length-3];

	var scoreHome = parseInt(e.Score.split('–')[0], 10);
	var scoreAway = parseInt(e.Score.split('–')[1], 10);
	if (scoreHome > scoreAway) {
		// home wins
		scoreDiff.push(e['Away Team']);
	} else {
		// away wins
		scoreDiff.push(e['Home Team']);
	}
	return scoreDiff;
}









