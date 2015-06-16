"use strict";
function makeVisualizationTwo(theData, svg){
	//Sanity Check.... got data.. got d3?
	if(theData == undefined || svg == undefined){ 
		alert("No data or svg in makeVisualizationTwo."+ svg + theData);
		return "No data or svg in makeVisualizationTwo.";
	}
	if(d3 == undefined){
		alert("No d3 object.");
		return "No d3 object.";
	}
	
	//Get focus team from teamSelector. teamA.
	var focusTeam = document.getElementById("teamA").value;
	var visualizationHeight = 435;
	var visualizationWidth = 590;
	
	var gameSet = theData["Northern Mystics"];
	
	//adjust
	gameSet.forEach(function(game){
		//positive points difference means hometeam won. 
		game.pointsDifference = game.Score.split("–")[0] - game.Score.split("–")[1];
	}
	//cast to a d3 type object.
	var svgElem = d3.select(svg)
		.attr("width",visualizationWidth)
		.attr("height",visualizationHeight);	 
	
	var force = d3.layout.force()
    .charge(2)
    .size([visualizationWidth, visualizationHeight])
	.linkDistance(41)
	.nodes(gameSet)
	
	.start();
	
	force.on('end', function() {
	
		//each game. 
		svgElem.selectAll("circle")
			.data(gameSet)
			.enter()
			.append("circle")
			//random x and y for the start of the force directed layout. 
			.attr("cx", function(d) {return d.x})
			.attr("cy", function(d) {return d.y})
			.attr("r",5)
			.attr("fill", function(game,i){
					var homeScore = ;
					var awayScore = game.Score.split("–")[1];
					var ratio = homeScore/awayScore;
					//alert("rgb("+homeScore*2+",50,"+awayScore+");");
					return ("rgb(20,"+ratio*255+","+255+")");
				});
		
	});
	
}