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
	var indexOfHomeGame;  	//these two are storage to determine what the locus of the force directed layout will be.
	var indexOfAwayGame;

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
		if(game.isHomeGame){
			indexOfHomeGame = i;
		} else {
			indexOfAwayGame = i;
		}
	});

	//loop over gameSet once more building links array. select two games(1 away and 1 home) to be the loci. and then create links to them.
	var links = [];
	gameSet.forEach(function(game, i){
		if(game.isHomeGame){
			links.push({source: i, target: indexOfHomeGame});
		} else {
			links.push({source: i, target: indexOfAwayGame});
		}
	});

	//cast to a d3 type object.
	var svgElem = d3.select(svg)
		.attr("width",visualizationWidth)
		.attr("height",visualizationHeight);

	//force directed layout //link: https://github.com/mbostock/d3/wiki/Force-Layout
	var force = d3.layout.force()
		.charge(-89)
		.size([visualizationWidth, visualizationHeight])
		.links(links)
		.linkDistance(5)
		.nodes(gameSet)
		.gravity(0.094)
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
			if(data.lbl=="Home!"){ return gameSet[indexOfHomeGame].x-42; }
			else { return gameSet[indexOfAwayGame].x-31; }
		})
		.attr("y", function(data){
			if(data.lbl=="Away!"){ return gameSet[indexOfHomeGame].y-68; }
			else { return gameSet[indexOfAwayGame].y-68; }
		});



	});

}


