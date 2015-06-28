/*	Michael Riley (30062428). SWEN303 2015 T1.
 *  Visualization and connections to the rest of the project.
 *  Template for other visualizations.
 *  Uses d3 library's force directed layout to position elements representing games.
 */

"use strict";
/* On mouseover for each circle. */
function mouseOverCircle(gameRepresentedByCircle){
   console.log("You mousedOver my game" + JSON.stringify(gameRepresentedByCircle));
   $('#info-01').html("Home: "+gameRepresentedByCircle['Home Team']);
   $('#info-02').html("Away: "+gameRepresentedByCircle['Away Team']);
   $('#info-03').html("Score: "+gameRepresentedByCircle['Score']);
   $('#info-04').html("Venue: "+gameRepresentedByCircle['Venue']);
   $('#info-05').html("Year: "+gameRepresentedByCircle['year']);
   $('#info-06').html("");
}

var focusTeam = "";

function drawVisualTwo(theData, svg){
	//empty svg
	$("#visual_holder_overview").html("")
	//overwrite value from above.
	focusTeam = $("#circleTeamSelector").val();
	if(theData[focusTeam] == undefined) { 
		//alert(focusTeam + "is an invalid selection.");
		return;
	}
	var gameSet = theData[focusTeam];
	var gameSetAdjusted = [];
	
	//get circleYearSelector
	var year=$("#circleYearSelector").val();
	//remove all games that don't match the year.
	if(year != "All"){
		for(var i = gameSet.length - 1; i >= 0; i--) {
			if(gameSet[i].year == year) {
			   gameSetAdjusted.push(gameSet[i]);
			}
		}
	}else{
		gameSetAdjusted = gameSet;
	}
	console.log(JSON.stringify(gameSetAdjusted));
	makeVisualizationTwo(gameSetAdjusted, svg);
}

var configOptions = {
	verticalOffsetLabel: -25,
	gravity: 0.38,
	linkDistance: 13,
	circleRepelFactor: -365,
	colours: [d3.rgb(255,0,0), d3.rgb(90,0,0),d3.rgb(0,90,0), d3.rgb(0,255,0)],
	rad: 14
};


function makeVisualizationTwo(gameSet, svg){
	//Sanity Check.... got data.. got d3?
	if(gameSet == undefined || svg == undefined){
		alert("No gameSet or svg in makeVisualizationTwo."+ svg + gameSet);
		return "No gameSet or svg in makeVisualizationTwo.";
	}
	if(d3 == undefined){		//d3 available. notify and get out if its not available.
		alert("No d3 object.");
		return "No d3 object.";
	}

	//Get focus team from teamSelector. teamA.
	var visualizationHeight = 490;
	var visualizationWidth = 615;

	//Storage for various indexes. These are used to tie the force directed layout together. 
	var indexes = {home : {win: 0, loss:0},
		       away : {win: 0, loss:0}
		}
	
	// these are used to setup the color scaler.
	var greatestPosPointsDifference = Number.POSITIVE_INFINITY;
	var greatestNegPointsDifference = Number.NEGATIVE_INFINITY;
	
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
		
		//store greatest point Difference to give color scaler.
		
		greatestPosPointsDifference = function(){
			var v = Number.NEGATIVE_INFINITY;
			gameSet.forEach(function(game){
				if(game.pointsDifference > v){
					v = game.pointsDifference;
				}
			})
			return v;
		}();
		greatestNegPointsDifference = function(){
			var v = Number.POSITIVE_INFINITY;
			gameSet.forEach(function(game){
				if(game.pointsDifference < v){
					v = game.pointsDifference;
				}
			})
			return v;
		}();
				
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
		.charge(configOptions.circleRepelFactor)
		.size([visualizationWidth, visualizationHeight])
		.links(links)
		.linkDistance(configOptions.linkDistance)
		.nodes(gameSet)
		.gravity(configOptions.gravity)
		.start();

	//setup color scaler
	var colorScale = d3.scale.linear()
		    .domain([greatestNegPointsDifference, -1, 1, greatestPosPointsDifference])
		    .interpolate(d3.interpolateRgb)
		    .range(configOptions.colours);
		
	//set of circles ... add new ones... remove old.. update all.
	var circles = svgElem.selectAll("circle")
		.data(gameSet)
		.enter()
		.append("circle");
	
	
	
	circles = svgElem.selectAll("circle")
		.attr("r",configOptions.rad)
		.attr("fill", function(game,i){
					return (colorScale(game.pointsDifference));
		})
		.on('mouseover', function(d) {
			mouseOverCircle(d);
			d3.select(this).style({'stroke': 'yellow', 'stroke-width': 3});
		})
		.on('mouseout', function(d){
			d3.select(this).style({'stroke': 'yellow', 'stroke-width': 0});
		});

	
	
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
			.attr("cy", function(d) {return d.y});
	
		//update labels depending on their content. as the focui of the two clusters move.
		labels.attr("x", function(data){
			var lowestX_home = function(){
				var v=Number.POSITIVE_INFINITY; 
				gameSet.forEach(function(game){if (game.x < v && game.isHomeGame){v=game.x;};}); 
				return v;}();
			var lowestX_away = function(){
				var v=Number.POSITIVE_INFINITY; 
				gameSet.forEach(function(game){if (game.x < v && !game.isHomeGame){v=game.x;};}); 
				return v;}();
			var highestX_home = function(){
				var v=Number.NEGATIVE_INFINITY;
				gameSet.forEach(function(game){if (game.x > v && game.isHomeGame){v=game.x;};}); 
				return v;}();
			var highestX_away = function(){
				var v=Number.NEGATIVE_INFINITY; 
				gameSet.forEach(function(game){if (game.x > v && !game.isHomeGame){v=game.x;};}); 
				return v;}();
			
			//Half widths for(to center labels )halfWinnerLabelWidth = 42 halfLoserLabelWidth = 31;
			if(data.lbl=="Home!"){ return ((lowestX_home+highestX_home)/2)-14; }
			else { return ((lowestX_away+highestX_away)/2) -13; }
		})
		.attr("y", function(data){
			var lowestY_home = function(){
				var v=Number.POSITIVE_INFINITY; 
				gameSet.forEach(function(game){if (game.y < v && game.isHomeGame){v=game.y;};}); 
				return v;}();
			var lowestY_away = function(){
				var v=Number.POSITIVE_INFINITY; 
				gameSet.forEach(function(game){if (game.y < v && !game.isHomeGame){v=game.y;};}); 
				return v;}();
						
			if(data.lbl=="Home!"){ return lowestY_home+configOptions.verticalOffsetLabel; }
			else { return lowestY_away+configOptions.verticalOffsetLabel; }
		});
	});
} //end makeVisualizationTwo





