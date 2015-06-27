//function to display Season/Round Placements
var callFunction;
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

var tmpTeam = sTeam;
tmpYear = showYear;

// Add an SVG element with the desired dimensions and margin.


var titleDiv = d3.select('#filterByIndividualTeam')
	.append('div')
	.attr('class','removeTitle')
	.style('padding-top', '2px')
	.style('float', 'center')
	.style('text-align', 'left')
var select = titleDiv.append('div')
	.attr('class','remove')
	.append('select')
	.attr('id','removeTitle')
	.on('change', function(e){sTeam = this.value;d3.select('#teamA')

	graph.selectAll('.area').remove();
	graph.selectAll('circle').remove();
	tmpTeam = sTeam;
	tmpYear = showYear;
	selectA.property('value', showYear);
	selectB.property('value',sTeam);
	update();

});

var filterTeam = d3.select('filterTeam');
filterTeam.append('div')
	.attr('class','fteam')
	.style('position','relative')
	.style('top','5px')
	.style('left','5px')
	.on('change', function(e){tmpYear = this.value;d3.select('#teamA')

	graph.selectAll('.area').remove();
	graph.selectAll('circle').remove();
	tmpYear = showYear;
	//selectA.property('value', showYear);
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
.attr('width', 2.5*width/6.6).attr('height', height)
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
graph.append('rect').attr('x', x(14.0)).attr('y',0)
.attr('width', 2.5*width/12.7).attr('height', height)
.style('fill', 'lightblue').style('opacity', '0.5')
.on('mouseover', function(e) {
	var s = d3.select(this);
	s.style('fill', 'lightblue');} )
.on('mouseout', function(e) {
	var s = d3.select(this);
	s.style('fill', 'green');
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
	if (tmpYear === "All") {
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
					if (e[i].name === tmpTeam) {
						return i+1;
					}
				}
			});
			var r = rank(x).indexOf(tmpTeam) + 1;
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
		var seasons = theData[tmpYear];
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
				if (e[i].name === tmpTeam) {
					return i+1;
				}
			}
		});
		var r = rank(tmpYear).indexOf(tmpTeam) + 1;
		console.log(r);
		if (r !== -1) {
			checkRanked(rData,index,seasons);
		}
	}

	function checkRanked(dataSet,index,season){
		//Check if ranked
		var arr=[1,2,3,4];
		var rnk = dataSet[dataSet.length - 1];
		if (rnk <= arr[1]) {
			if (r === arr[2]) {
				dataSet.push(arr[1]);
				dataSet.push(arr[2]);}
			else {
				var rrr = season[index];
				var sss = teamRank([rrr]).filter(function(e) {return e.name === tmpTeam;})[0];
				if (sss.points > 0) {
					dataSet.push(arr[0]);
					dataSet.push(arr[0]);
				} else {
					dataSet.push(arr[1]);
					dataSet.push(arr[1]);
				}
				dataSet.push(r);
			}
		} else {
			if (r === arr[3]) {dataSet.push(arr[3]);}
			if (r === arr[2]) {dataSet.push(arr[2]); dataSet.push(arr[2]);}
			if (r === arr[1]) {dataSet.push(arr[2]); dataSet.push(arr[1]); dataSet.push(arr[1]);}
			if (r === arr[0]) {dataSet.push(arr[2]); dataSet.push(arr[1]); dataSet.push(arr[0]);}
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
		.attr('team',tmpTeam)
		.attr('year',tmpYear)
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

	})
	.on('mouseover', function() {
			d3.selectAll('.hovertext')
				.text(d3.select(this)
				.attr('team') + " (" + d3.select(this).attr('year')+ ")");
			//alert(tmpTeam + 'year:' + tmpYear);
			});
		/*.on('mouseout', function() {
			if (toReview == null) {
				d3.selectAll('.hovertext').text('Click a line for more options. Right click to delete a single line.'); return;
			}
			d3.selectAll('.hovertext').html('<span id="span1" class="hovered"> See Rivalry With This Team </span> ' + toReview + " (" + yearR + ") <span id='span2' class='hovered'> Switch To This Team </span>");
			d3.selectAll('#span1').on('click', function(e) {if (sTeam == toReview) {alert("You can't have a rivalry with yourself."); return;}rival1 = sTeam; rival2 = toReview; switchTo('rival');}).style('margin-right','50px').style('color','green').style('text-decoration','underline');
			d3.selectAll('#span2').on('click', function(e) {
				sTeam = toReview;
				//graph.selectAll('.area').remove();
				//graph.selectAll('circle').remove();
				tmpTeam = sTeam; selectB.property('value',sTeam); update();
				other.property('value', sTeam);
				d3.selectAll('#teamname').html(sTeam);

			}).style('margin-left', '50px').style('color','red').style('text-decoration', 'underline');
		});
	*/

	ctx.selectAll('path').data(function(d) {return [d];}).enter().append("path")
	.attr("class", "area")
	.style('stroke', function(d) {if (tmpTeam == sTeam && tmpYear == showYear) return 'black';return color(tmpTeam + "" + tmpYear);}).style('stroke-width', '4').style('fill', 'none')
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

var filterDiv = d3.select('#filterByTeam').append('div').attr('class','remove').style('text-align','center');
var selectB = filterDiv.append('select').on('change', function(e){tmpTeam = this.value;});
selectB.selectAll('option')
.data(teamList).enter()
.append('option')
.attr('value', function(e){
	return e;})
	.text(function(d){return d;})
.style('width','200px');

selectB.property('value', sTeam);
tmpTeam = sTeam;

var selectA = filterDiv.append('select').on('change', function(e){tmpYear = this.value;});

selectA.selectAll('option')
.data(['All'].concat(listYears)).enter()
.append('option')
.style('width','200px')
.attr('value', function(e){
	return e;})
	.text(function(d){return d;});
selectA.property('value', showYear);

var select = filterDiv.append('input')
	.attr('type', 'button')
	.attr('value', 'Display')
	.style('padding','2px')
	.style('width','200px')
	.on('click', function(e){update();});
filterDiv.append('br')

var select = filterDiv.append('input')
	.attr('type', 'button')
	.attr('value', 'Reset')
	.style('padding','2px')
	.style('width','200px')
	.on('click', function(e){
		graph.selectAll('.area').remove();
		graph.selectAll('circle').remove();
		tmpTeam = sTeam; tmpYear = showYear;
		selectA.property('value', showYear);
		selectB.property('value',sTeam);

;});

var select = filterDiv.append('input')
	.attr('type', 'button')
	.attr('value', 'All Rounds')
	.style('padding','2px')
	.style('width','200px')
	.on('click', function(e){
		var temp = tmpYear;
		listYears.forEach(function(e) {tmpYear = e; update();});
		tmpYear = temp;
;});

d3.selectAll('.picker').on('change', function(e){
	graph.selectAll('.area').remove();
	graph.selectAll('circle').remove();
tmpTeam = sTeam; tmpYear = showYear; selectA.property('value', showYear); selectB.property('value',sTeam); update();});
}

