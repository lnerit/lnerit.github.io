/*	Michael Riley (30062428). SWEN303 2015 T1.
 *  Visualization and connections to the rest of the project.
 *  Template for other visualizations.
 *  Uses d3 library's force directed layout to position elements representing games.
 */

"use strict";
function makeVisualizationTwo(theData, svg){
	//Sanity Check.... got data.. got d3?
	if(theData == undefined || svg == undefined){
		alert("No data or svg in makeVisualizationTwo."+ svg + theData);
		return "No data or svg in makeVisualizationTwo.";
	}
	if(d3 == undefined){		//d3 available. notify and get out if its not available.
		alert("No d3 object.");
		return "No d3 object.";
	}

	//Get focus team from teamSelector. teamA.
	var focusTeam = document.getElementById("teamA").value;
	var visualizationHeight = 435;
	var visualizationWidth = 590;

	//overwrite value from above.
	focusTeam = "Southern Steel";
	var gameSet = theData[focusTeam];
	//Storage for various indexes. These are used to tie the force directed layout together. 
	var indexes = {home : {win: 0, loss:0},
		       away : {win: 0, loss:0}
		      }

	//make each game object have a isHomeGame and pointsDifference field.
	gameSet.forEach(function(game, i){
		//positive points difference means focusTeam won.
		if(game["Home Team"] == focusTeam){//its a home game.
			game.isHomeGame = true;
			game.pointsDifference = game.Score.split("–")[0] - game.Score.split("–")[1];
		} else { //its an away game.
			game.isHomeGame = false;
			game.pointsDifference = game.Score.split("–")[1] - game.Score.split("–")[0];
		}
		//store the index so that we can build FDLayout later. 
		if(game.isHomeGame){
			if(game.pointsDifference > 0){indexes.home.win = i;}
			else {indexes.home.loss = i;}
		} else {
			if(game.pointsDifference > 0){indexes.away.win = i;}
			else {indexes.away.loss = i;}
		}
	});

	//loop over gameSet once more building links array. select two games(1 away and 1 home) to be the loci. and then create links to them.
	var links = [];
	gameSet.forEach(function(game, i){
		if(game.isHomeGame){
			if(game.pointsDifference > 0){links.push({source: i, target: indexes.home.win});}
			else {links.push({source: i, target: indexes.home.loss});}
		} else {
			if(game.pointsDifference > 0){links.push({source: i, target: indexes.away.win});}
			else {links.push({source: i, target: indexes.away.loss});}
		}
	});
	//additionally we have to link the home games and the away games. 
	links.push({source: indexes.home.win, target: indexes.home.loss});
	links.push({source: indexes.away.win, target: indexes.away.loss});
	

	//cast to a d3 type object.
	var svgElem = d3.select(svg)
		.attr("width",visualizationWidth)
		.attr("height",visualizationHeight);

	//force directed layout //link: https://github.com/mbostock/d3/wiki/Force-Layout
	var force = d3.layout.force()
		.charge(-119)
		.size([visualizationWidth, visualizationHeight])
		.links(links)
		.linkDistance(0.7)
		.nodes(gameSet)
		.gravity(0.14)
		.start();

	//set of circles ...
	var circles = svgElem.selectAll("circle")
		.data(gameSet)
		.enter()
		.append("circle");

	//set of labels.
	var labels = svgElem.selectAll("text")
		.data([{lbl: "Home!"},
			   {lbl: "Away!"}])
		.enter()
		.append("text")
		.text(function(data) {return data.lbl;});

	//for each tick of the force directed layouts simulation... gives the jumpy effect.
	force.on("tick", function() {
		//random x and y for the start of the force directed layout.
		circles.attr("cx", function(d) {return d.x})
			.attr("cy", function(d) {return d.y})
			.attr("r",8)
			.attr("fill", function(game,i){
					return ("rgb("+(140 - (11*game.pointsDifference))+","+(140 +(11*game.pointsDifference))+","+30+")");
			});

		//update labels depending on their content. as the focui of the two clusters move.
		labels.attr("x", function(data){
			//Half widths for(to center labels )halfWinnerLabelWidth = 42 halfLoserLabelWidth = 31;
			if(data.lbl=="Home!"){ return gameSet[indexes.home.win].x-42; }
			else { return gameSet[indexes.away.win].x-31; }
		})
		.attr("y", function(data){
			if(data.lbl=="Home!"){ return gameSet[indexes.home.win].y-68; }
			else { return gameSet[indexes.away.win].y-68; }
		});

	});

}


//function to display Season/Round Placements
function RoundPlacement(theData, svg){
//define dimensions of svg canvas
var margin = [40, 40, 60, 40]; // margins
var width = 600 - margin[1] - margin[3]; // width
var height = 500 - margin[0] - margin[2]; // height

var color = d3.scale.category20();

//X scale will fit all values from data[] within pixels 0-w
var x = d3.scale.linear().domain([1,17]).range([0, width]);
//Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
var y = d3.scale.linear().domain([10, 1]).range([height, 0]);

//create a line function that can convert data[] into x and y points
var line = d3.svg.line()
//plot line graph on the data points
.x(function(d,i) {
	return x(i+1);
})
.y(function(d) {
	return y(d);
})

var qTeam = sTeam;
sYear = showYear;

var titleDiv = d3.select(svg)
	.append('div')
	.attr('class','remove')
	.style('padding-top', '2px')
	.style('text-align', 'center')
var select = titleDiv.append('div')
	.attr('class','remove')
	.append('select')
	.on('change', function(e){sTeam = this.value;d3.select('#teamA')

	graph.selectAll('.area').remove();
	graph.selectAll('circle').remove();
	qTeam = sTeam;
	sYear = showYear;
	//selectA.property('value', showYear);
	//selectB.property('value',sTeam);
	update()

});

select.selectAll('option')
.data(teamList.slice().sort()).enter()
.append('option')
.attr('value', function(e){
	return e;})
	.text(function(d){return d;});

select.property('value', sTeam);
var other = select;

//Add an SVG element with the desired dimensions and margin.
var graph = d3.select(svg)
	.append('div')
	.attr('class','remove')
	.style('text-align','center')
	.append("svg:svg")
	.style('text-align','center')
.attr("width", width + margin[1] + margin[3])
.attr("height", height + margin[0] + margin[2])
.append("svg:g")
.attr("transform", "translate(" + margin[3] + "," + margin[0] + ")");

//create y-Axis
var xAxis = d3.svg.axis().scale(x).ticks(17).tickSize(-15);
//Add the x-axis.
graph.append("svg:g").append("svg:g").attr('class', 'focus').append('svg:g')
.attr("class", "x axis")
.attr("transform", "translate(" + 0 +"," + (height + 15) + ")")
.call(xAxis).append("text")
.attr("transform", "translate("+ width/2 + ")")
.attr("y", 25)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Round").style('font-weight', 'bold');

//Rectangle for initial season
graph.append('rect').attr('x', x(1)).attr('y',0)
.attr('width', 2.5*width/5.7).attr('height', height)
.style('fill', 'yellow').style('opacity', '0.5')
.attr("transform", "translate(" + x + "," + y + ")")
.on('mouseover', function(e) {
		var s = d3.select(this);
		s.style('fill', 'grey');} )
.on('mouseout', function(e) {var s = d3.select(this); s.style('fill', 'lightblue');});
graph.append('svg:g')
	.append('svg:text')
	.attr('class','temp')
	.text('1st Half')
	.style('font-weight', 'thin')
	.attr('x',x(1)).attr('y', y(9.5));

//Mid season rectangle
graph.append('rect').attr('x', x(8)).attr('y',0)
.attr('width', 2.5*width/7).attr('height', height)
.style('fill', 'yellow').style('opacity', '0.5')
.attr("transform", "translate(" + x + "," + y + ")")
.on('mouseover', function(e) {
		var s = d3.select(this);
		s.style('fill', 'orange');} )
.on('mouseout', function(e) {var s = d3.select(this); s.style('fill', 'lightblue');});
graph.append('svg:g')
	.append('svg:text')
	.attr('class','temp')
	.text('2nd Half')
	.style('font-weight', 'thin')
	.attr('x',x(9)).attr('y', y(9.5));

//Rectangle for final season
graph.append('rect').attr('x', x(14.5)).attr('y',0)
.attr('width', 2.5*width/16).attr('height', height)
.style('fill', 'lightblue').style('opacity', '0.5')
.on('mouseover', function(e) {
	var s = d3.select(this);
	s.style('fill', 'lightblue');} )
.on('mouseout', function(e) {
	var s = d3.select(this);
	s.style('fill', 'yellow');
	});
graph.append('svg:g')
	.append('svg:text')
	.attr('class','temp')
	.text('Final Season')
	.style('font-weight', 'thin')
	.attr('x',x(14.0)).attr('y', y(9.5));

//create left y-Axis
var yAxisLeft = d3.svg.axis().scale(y).orient("left").tickSize(-width).tickSubdivide(true);
//Add the y-axis to the left
var context = graph.append("svg:g").attr('class', 'focus').append('svg:g')
.attr("class", "y axis")
.attr("transform", "translate(0,0)")
.call(yAxisLeft)
.append("text")
.attr("transform", "rotate(-90)")
.attr('y', -30)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("Rank").style('font-weight', 'bold');


function update() {
	//This function calculates rank data for each round
	if (sYear === "All") {
		var totalData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var incre = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		listYears.forEach(function(x){
			var season = theData[x];
			var index = 0;
			var games = [];
			var data = [];
			for (var i = 1; i < 15; i++) {
				while (season[index].Round <= i) {
					games.push(season[index]);
					index++;
				}
				data.push(teamRank(games).sort(function(a,b){ return b.points - a.points;}));
			}
			console.log(data);

			var rData = data.map(function(e) {
				for (var i = 0; i < e.length; i++) {
					if (e[i].name === qTeam) {
						return i+1;
					}
				}
			});
			var r = rank(x).indexOf(qTeam) + 1;
			console.log(r);
			if (r !== -1) {
				checkRanked(rData,index,season);
			}
			for (var i = 0; i < rData.length; i++) {
				totalData[i] += rData[i];
				incre[i]++;
			}
		});

		//calculate the position for each round in the data set
		for(var hx = 0; hx < totalData.length; hx++) {
			if (incre[hx] === 0) {
				totalData = totalData.slice(0,hx);
				break;
			}
			totalData[hx] = Math.round(totalData[hx]/incre[hx]);
		}
		rData = totalData;
		console.log(rData);
	} else {
		var seasons = theData[sYear];
		var index = 0;
		var games = [];
		var data = [];
		for (var i = 1; i < 15; i++) {
			while (seasons[index].Round <= i) {
				games.push(seasons[index]);
				index++;
			}
			data.push(teamRank(games).sort(function(a,b){ return b.points - a.points;}));
		}
		console.log(data);

		var rData = data.map(function(e) {
			for (var i = 0; i < e.length; i++) {
				if (e[i].name === qTeam) {
					return i+1;
				}
			}
		});
		var r = rank(sYear).indexOf(qTeam) + 1;
		console.log(r);
		if (r !== -1) {
			checkRanked(rData,index,seasons);
		}
	}

	function checkRanked(dataSet,index,season){
		//Check if ranked
		var rnk = dataSet[dataSet.length - 1];
		if (rnk <= 2) {
			if (r === 3) {dataSet.push(2); dataSet.push(3);} else {
				var rrr = season[index];
				var sss = teamRank([rrr]).filter(function(e) {return e.name === qTeam;})[0];
				if (sss.points > 0) {
					dataSet.push(1);
					dataSet.push(1);
				} else {
					dataSet.push(2);
					dataSet.push(2);
				}
				dataSet.push(r);
			}
		} else {
			if (r === 4) {dataSet.push(4);}
			if (r === 3) {dataSet.push(3); dataSet.push(3);}
			if (r === 2) {dataSet.push(3); dataSet.push(2); dataSet.push(2);}
			if (r === 1) {dataSet.push(3); dataSet.push(2); dataSet.push(1);}
		}
	}

	drawGraph(rData);
}
function drawGraph(dataSet){
	 //Dots are appended to the svg canvas
	var ctx = graph.selectAll('.dots')
		.data([dataSet]);//bind data
	var sd = null;
	var yearR = null;

	ctx.enter().append('g')
		.attr('class', 'line')
		.attr('team',qTeam)
		.attr('year',sYear)
		.on('click', function(){
			d3.select('.line')
			.classed('selected',false);
		var t = d3.select(this).attr('team');
		console.log(t);
		console.log(sd);
		if (t == sd) {
			d3.select(this).classed('selected', false);
			sd = null;
			return;
		}
		sd = t;
		yearR = d3.select(this).attr('year');
		d3.select(this).classed('selected',true);
	});

	ctx.selectAll('path').data(function(d) {return [d];}).enter().append("path")
	.attr("class", "area")
	.style('stroke', function(d) {if (qTeam == sTeam && sYear == showYear) return 'black';return color(qTeam + "" + sYear);}).style('stroke-width', '4').style('fill', 'none')
	.transition()
	.duration(2000)
	.attrTween('d', function(data) {
		var interpolate = d3.scale.quantile()
		.domain([0,1])
		.range(d3.range(1, 18));
		return function(t) {
			return line(data.slice(0, interpolate(t)));
		};
	});

	ctx.on('contextmenu', function(data, index) {console.log(this);d3.event.preventDefault();d3.select(this).remove();});

	var circ = ctx.selectAll('circle').data(dataSet)
	.enter().append('circle').transition().delay(200)
	.attr('cx', function (d, i) { return x(i+1); })
	.attr('cy', function (d) { return y(d); })
	.attr('r', 4);
	console.log(dataSet);
}

update();

}
