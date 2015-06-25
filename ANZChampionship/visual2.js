/*	Michael Riley (30062428). SWEN303 2015 T1.
 *  Visualization and connections to the rest of the project.
 *  Template for other visualizations.
 *  Uses d3 library's force directed layout to position elements representing games.
 */

"use strict";
var colorScale;
var greatestPointsDifference=50;

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
	 greatestPointsDifference=0;

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
		if(greatestPointsDifference < Math.abs(game.pointsDifference)){ greatestPointsDifference = Math.abs(game.pointsDifference);}
		
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
		.charge(-129)
		.size([visualizationWidth, visualizationHeight])
		.links(links)
		.linkDistance(0.8)
		.nodes(gameSet)
		.gravity(0.14)
		.start();

	//setup color scaler
	colorScale = d3.scale.linear()
		    .domain([-greatestPointsDifference, 0, greatestPointsDifference])
		    .interpolate(d3.interpolateRgb)
		    .range([d3.rgb(255,0,0),"grey", d3.rgb(0,255,0)]);
		
	//set of circles ...
	var circles = svgElem.selectAll("circle")
		.data(gameSet)
		.enter()
		.append("circle")
		.attr("r",10)
		.attr("fill", function(game,i){
					var pD = game.pointsDifference;
					return (colorScale(pD));
		})
		.on('mouseover', function(d) {mouseOverCircle(d);});

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
			//Half widths for(to center labels )halfWinnerLabelWidth = 42 halfLoserLabelWidth = 31;
			if(data.lbl=="Home!"){ return gameSet[indexes.home.win].x-22; }
			else { return gameSet[indexes.away.win].x-15; }
		})
		.attr("y", function(data){
			if(data.lbl=="Home!"){ return gameSet[indexes.home.win].y-75; }
			else { return gameSet[indexes.away.win].y-75; }
		});
	});
} //end makeVisualizationTwo

/* On mouseover for each circle. */
function mouseOverCircle(gameRepresentedByCircle){
   console.log("You mousedOver my game" + JSON.stringify(gameRepresentedByCircle)); 
}




