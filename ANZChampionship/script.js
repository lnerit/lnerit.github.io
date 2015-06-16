
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

var showYear = 'All';
var showFinal = 'Both';

//function to load Season for yearFilter on the HTML page
function LoadYearToFilterBox(){
	var select = document.getElementById("yearFilter");
	for (var i=0;i<listYears.length;i++){
		var opt=listYears[i];
		var ele=document.createElement("option");
		ele.textContent=opt;
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

							var div = d3.select('Rivalry').append('div');

							var select = div.append('select').attr('id', 'canvas').attr('class', 'dropdown');
							select.node().addEventListener('change', function(e) {showYear = this.value;});

							select.selectAll('option')
							.data(['All'].concat(listYears))
							.enter().append('option')
							.attr('value', function(d) {return d;})
							.text(function(d) {return d;});

							select = div.append('select').attr('id', 'visual_holder3').attr('class', 'dropdown');

							select.node().addEventListener('change', function(e) {showFinal = this.value;});
							select.selectAll('option')
							.data(['All', 'Regular', 'Finals'])
							.enter().append('option')
							.attr('value', function(d) {return d;})
							.text(function(d) {return d;});

						});

					});

			});

		});

	});
});









