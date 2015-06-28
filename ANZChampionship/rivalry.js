var teamList = ['Central Pulse', 'Queensland Firebirds', 'Northern Mystics', 'Waikato Bay of Plenty Magic', 'New South Wales Swifts', 'Canterbury Tactix', 'Melbourne Vixens', 'West Coast Fever', 'Adelaide Thunderbirds', 'Southern Steel']
var teamColor = ['fedd02','892b62','4b8fcb','fbda1d','e31d1a','ed1c24','00a885','eb2e43','ed5387','0a66b2']
var yearStart = 2008;
var yearEnd = 2014;
var redraw = dispExpl;
window.onresize = delayedRedraw;
var width, height;
var years = [];
var teams = {};
var teamNames = [];
var selYear = 0;
var hConf = false;
var lConf = false;
var filter = 0;
var explYear = 0;
var explRound = 1;
var dataSuffix = "-Table1.csv";
var dataPrefix = "http://www.ecs.vuw.ac.nz/~stuart";

function startTest() {
    loadTeams();
}

function makeRivalry(theData, svg) {
	// Sanity Check.... got data.. got d3?
	if(theData == undefined || svg == undefined){
		alert("No data or svg in makeVisualizationTwo."+ svg + theData);
		return "No data or svg in makeVisualizationTwo.";
	   }
	if (d3 == undefined) { // d3 available. notify and get out if its not//
		// available.
		alert("No d3 object.");
		return "No d3 object.";
	}

	startTest();
	loadTeams(teamList);
	dispExpl();

}


function dispExpl() {

	redraw = dispExpl;

	document.getElementById("Rivalry").innerHTML = "";
	updateDims();
	var bigMargin = 50;
	var con = {
		x : bigMargin,
		y : bigMargin,
		w : width - bigMargin * 2,
		h : height - bigMargin * 2
	};

	var svg = d3.select("#Rivalry").append("svg")
			.attr("id", "canvas")
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform","translate(" + ((con.w / 2) + con.x) + "," + ((con.h / 2) + con.y) + ")");
	svg.append("g")
			.attr("id", "explLines");

	for (var i = 0; i < 10; i++) {

		var teamName = teamList[i];
        var tColor = teamColor[i];

        drawSeg(svg, con.h, i, tColor, teamName);
	}

	//document.getElementById("rivalry").innerHTML += "<ul id='yearSel'><li class='yearBut' onClick='explYear=0;updExpl();'>2008</li><li class='yearBut' onClick='explYear=1;updExpl();'>2009</li><li class='yearBut' onClick='explYear=2;updExpl();'>2010</li><li class='yearBut' onClick='explYear=3;updExpl();'>2011</li><li class='yearBut' onClick='explYear=4;updExpl();'>2012</li><li class='yearBut' onClick='explYear=5;updExpl();'>2013</li></ul>";
	//document.getElementById("rivalry").innerHTML += "<ul id='roundSel'><li class='roundBut' onClick='explRound=1;updExpl();'>1</li><li class='roundBut' onClick='explRound=2;updExpl();'>2</li><li class='roundBut' onClick='explRound=3;updExpl();'>3</li><li class='roundBut' onClick='explRound=4;updExpl();'>4</li><li class='roundBut' onClick='explRound=5;updExpl();'>5</li><li class='roundBut' onClick='explRound=6;updExpl();'>6</li><li class='roundBut' onClick='explRound=7;updExpl();'>7</li><li class='roundBut' onClick='explRound=8;updExpl();'>8</li><li class='roundBut' onClick='explRound=9;updExpl();'>9</li><li class='roundBut' onClick='explRound=10;updExpl();'>10</li><li class='roundBut' onClick='explRound=11;updExpl();'>11</li><li class='roundBut' onClick='explRound=12;updExpl();'>12</li><li class='roundBut' onClick='explRound=13;updExpl();'>13</li><li class='roundBut' onClick='explRound=14;updExpl();'>14</li><li class='roundBut' onClick='explRound=15;updExpl();'>15</li><li class='roundBut' onClick='explRound=16;updExpl();'>16</li><li class='roundBut' onClick='explRound=17;updExpl();'>17</li></ul>";

	updExpl();

}

function updExpl() {
	var lines = d3.select("#explLines");
	d3.selectAll(".gameLine").remove();
	lines.empty();

	var round = years[explYear].rounds[explRound];
	alert("jestin");
	round.forEach(function() {
		var loser = teamList.indexOf(game.home);
		var winner = teamList.indexOf(game.away);
		if (game.homePts > game.awayPts) {
			var t = loser;
			loser = winner;
			winner = t;
		}
		;
		drawGameLine(lines, loser, winner);
	});
}

function drawGameLine(lines, loser, winner) {
	var h = document.getElementById("canvas").getAttribute("height");
	var lineRadius = h / 10 * 6.25 / 2;
	var angle1 = (loser - 2) / 5 * Math.PI;
	var angle2 = (winner - 2) / 5 * Math.PI;
	var x1 = Math.cos(angle1) * lineRadius;
	var y1 = Math.sin(angle1) * lineRadius;
	var x2 = Math.cos(angle2) * lineRadius;
	var y2 = Math.sin(angle2) * lineRadius;
	var x3 = x1 * 0.1 + x2 * 0.9;
	var y3 = y1 * 0.1 + y2 * 0.9;
	var x4 = x1 * 0.9 + x2 * 0.1;
	var y4 = y1 * 0.9 + y2 * 0.1;
	lines.append("svg:line").attr("class", "gameLine").attr("x1", x1).attr(
			"y1", y1).attr("x2", x2).attr("y2", y2);
	lines.append("svg:line").attr("class", "gameLine winnerLine")
			.attr("x1", x3).attr("y1", y3).attr("x2", x2).attr("y2", y2);
	lines.append("svg:line").attr("class", "gameLine loserLine").attr("x1", x4)
			.attr("y1", y4).attr("x2", x1).attr("y2", y1);
}

function drawSeg(f, h, i, col, nam) {

	var arc = d3.svg.arc().innerRadius(h / 10 * 7.5 / 2).outerRadius(
			h / 10 * 8 / 2).startAngle(Math.PI / 5 * i).endAngle(
			Math.PI / 5 * (i + 1));
	f.append("svg:path").style("fill", "#" + col).attr("d", arc).attr("class",
			"seg");

	var angle = (i - 2) / 5 * Math.PI;
	var rad = h / 10 * 9.5 / 2;

	addIcon(f, Math.cos(angle) * rad, Math.sin(angle) * rad, h / 9, nam);
}

function addIcon(f, x, y, s, n) {
	f.append("svg:image").attr('x', x - s / 2).attr('y', y - s / 2).attr(
			'width', s).attr('height', s).attr("xlink:href",
			"images/icons-small/" + n + ".png").append("svg:title").text(n);
}

function addLine(f, x1, y1, x2, y2, isRed) {
	var col = (isRed) ? "rgb(255,0,0)" : "rgb(0,0,0)";
	f.append("svg:line").attr("class", "finalLine").attr("x1", x1).attr("y1",
			y1).attr("x2", x2).attr("y2", y2).style("stroke", col);
}

function addText(f, x, y, s, place) {
	f.append("text").attr("class", "placing").attr("text-anchor", "right")
			.attr("dominant-baseline", "middle").attr("y", y).attr("x", x - s)
			.text(place);
}

function updateDims() {
	width = document.body.clientWidth-450;
	height = window.innerHeight - 320;
}

//Here downwards pretty much copied from CMS @ http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed
function delayedRedraw() {
    delay(function () {
        updateDims();
        redraw();
    }, 500);
}

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

function loadTeams(listOfTeams) {
	var tms = d3.map();
	teamNames.forEach(function (team) {
        var newTeam = {};
        newTeam["score"] = 0;
        newTeam["rounds"] = [0, 0];
        tms.set(team, newTeam);
    });

	d3.csv("data/Teams.csv", function (tms) {

        tms.forEach(function (team) {
            teams[team.Name] = {
                name: team.Name,
                country: team.Country,
                color: team.Color,
                sColor: team.SColor,
                homeWins: 0,
                homeLosses: 0,
                awayWins: 0,
                awayLosses: 0,
                winsAgainst: {}
            };
            teamNames.push(team.Name);
        });

        teamNames.forEach(function (name) {
            teamNames.forEach(function (other) {
                teams[name].winsAgainst[other] = 0;
            });
        });

        loadYear(yearStart);


    });
}

function loadYear(yearNumber) {
	var dataLoc = "data/" + yearNumber + dataSuffix;
    d3.csv(dataLoc, function (games) {

    	games = games.filter(function (game) {
            return game.Date.lastIndexOf("BYES", 0) !== 0;
        });

        var year = ({
            year: yearNumber,
            games: (games.map(function (game) {
                var isDraw = game.Score.indexOf("draw") != -1;
                var scoreSplit = game.Score.replace(/\(\d+[-–]\d+\)|draw/, "").split(/[-–]/);
                var time = game.time;
                return {
                    round: +game.Round,
                    date: (time) ? Date.parse(yearNumber + " " + game.Date + " " + game.Time) : Date.parse(yearNumber + " " + game.Date),
                    home: game["Home Team"],
                    away: game["Away Team"],
                    homePts: +scoreSplit[0],
                    awayPts: +scoreSplit[1],
                    venue: game.Venue,
                    draw: isDraw
                }
            }))
        });

        performAnalysis(year);
        years.push(year);

        if (yearNumber < yearEnd) loadYear(yearNumber + 1);
        else {
            updateDims();
            redraw();
        }
    });
}

function performAnalysis(year) {
    var games = year.games;
    var tms = d3.map();
    teamNames.forEach(function (team) {
        var newTeam = {};
        newTeam["score"] = 0;
        newTeam["rounds"] = [0, 0];
        tms.set(team, newTeam);
    });
    year.finals = [];
    year.rounds = [];
    year.aus = {
        score: 0,
        wins: 0,
        finals: 0
    };
    year.nz = {
        score: 0,
        wins: 0,
        finals: 0
    };

    games.forEach(function (game) {
        if(year.rounds[game.round]===undefined) year.rounds[game.round] = [];
        year.rounds[game.round].push(game);

        var homeTeam = tms.get(game.home);
        var awayTeam = tms.get(game.away);
        var hCountry = (teams[game.home].country === "Australia") ? year.aus : year.nz;
        var aCountry = (teams[game.away].country === "Australia") ? year.aus : year.nz;
        if (game.round == 15) {
            hCountry.finals++;
            aCountry.finals++;
        }
        hCountry.score += game.homePts;
        aCountry.score += game.awayPts;

        if (game.round >= 15) {
            var winnerName = (game.homePts > game.awayPts) ? game.home : game.away;
            year.finals.push(game.home);
            year.finals.push(game.away);
            year.finals.push(winnerName);
        }

        /*if (game.round in homeTeam["rounds"]) homeTeam["rounds"][game.round] += game.homePts;
        else homeTeam["rounds"][game.round] = game.homePts + homeTeam["score"];

        if (game.round in awayTeam["rounds"]) awayTeam["rounds"][game.round] += game.awayPts;
        else awayTeam["rounds"][game.round] = game.homePts + awayTeam["score"];

        homeTeam["score"] += game.homePts;
        awayTeam["score"] += game.awayPts;*/

        if (game.draw) {
            if (game.round in homeTeam["rounds"]) homeTeam["rounds"][game.round] += 1;
            else homeTeam["rounds"][game.round] = 1 + homeTeam["score"];
            if (game.round in awayTeam["rounds"]) awayTeam["rounds"][game.round] += 1;
            else awayTeam["rounds"][game.round] = 1 + awayTeam["score"];
            homeTeam["score"] += 1;
            awayTeam["score"] += 1;
        } else if (game.homePts > game.awayPts) {
            if (game.round in homeTeam["rounds"]) homeTeam["rounds"][game.round] += 2;
            else homeTeam["rounds"][game.round] = 2 + homeTeam["score"];
            homeTeam["score"] += 2;
            teams[game.home].homeWins++;
            teams[game.home].winsAgainst[game.away]++;
            teams[game.away].awayLosses++;
            hCountry.wins++;
        } else {
            if (game.round in awayTeam["rounds"]) awayTeam["rounds"][game.round] += 2;
            else awayTeam["rounds"][game.round] = 2 + awayTeam["score"];
            awayTeam["score"] += 2;
            teams[game.home].homeLosses++;
            teams[game.home].winsAgainst[game.home]++;
            teams[game.away].awayWins++;
            aCountry.wins++;
        }
    });
    year["teams"] = tms;

    tms.values().forEach(function (tm) {
        d3.range(1, 15).forEach(function (index) {
            if (isNaN(tm.rounds[index])) tm.rounds[index] = tm.rounds[index - 1];
        });
    });

    tms.values().forEach(function (tm) {
        tm.graphPts = d3.zip(d3.range(0, (year.year === 2011) ? 13 : 15), tm.rounds);
    });
}
