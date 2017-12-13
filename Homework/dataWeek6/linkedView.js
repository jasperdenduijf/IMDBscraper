/*
* Jasper den Duijf, 10217584
* Data Processing - week 6/7
*
* Creates interactive charts  with multiple variables.
*
*/


// all global used variables and their default values.
var globalData = [],
	linkage = [],
	province = "Groningen",
	station = 286,
	typeData = "RainAmount",
	answers = ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
	datetype = ["20150101", "20160101"];

// all dates is transformed in this way	
var parseDate = d3.time.format("%Y%m%d").parse;

// load all json files and wait till loaded
function loadBoth(){
	queue()
		.defer(d3.json, 'provincies.json')
		.defer(d3.json, 'weather.json')
		.defer(d3.json, "nld.json")
		.defer(d3.json, "provincies.json")
		.await(startSite);
}

// when all data is loaded
function startSite(error, dP, dW, nld, provincies){
	// check for errors
	if (error) throw error;
	
	// start all one time calculations up front
	initiate()
	
	// draw the map
	drawNederland(nld)
	
	// prepares the weather data
	var parseDate = d3.time.format("%Y%m%d").parse;
	dW.forEach(function(d) {
		d.Date = parseDate((d.Date).toString());
		d.RainTime = +d.RainTime;
		d.RainAmount = +d.RainAmount;
		d.Temp = +d.Temp;
	});
	
	// push the data globally
	globalData = dW
	linkage = provincies
	
	// plot the linechart
	lineChart()	
}

// start one time only calculations
function initiate(){
	// three options for the data
	var data = ["RainAmount", "RainTime", "Temp"];
	
	// activates the dropdown menu when changed
	var select = d3.select('body')
	.select('select')
		.attr('class','select')
		.on('change',onchange)
	
	// shows the three options in the dropdown menu
	var options = select
	.selectAll('option')
		.data(data).enter()
		.append('option')
			.text(function (d) { return d; });	
	
	// initialize the slider
	var slider = document.getElementById("myRange");
		
	// put the year into a timeformat interval
	datetype = [slider.value + "0101", (parseInt(slider.value) + 1).toString() + "0101"]
	
	// show the year
	var output = document.getElementById("demo");
	output.innerHTML = slider.value;
	
	// whenever the slider is changed, update the year and plot the graph
	slider.oninput = function() {
		datetype = [slider.value + "0101", (parseInt(slider.value) + 1).toString() + "0101"]
		output.innerHTML = slider.value;
		lineChart()
	}
}

// plot the map
function drawNederland(nld){
	var width = 800,
		height = 400;
		
	var svg = d3.select("body").select(".map")
		.attr("width", width)
		.attr("height", height);

	
	/*
	* The following code is partially from http://bl.ocks.org/phil-pedruco/9344373
	* It's function is to draw the path of the provinces properly
	*/
		
	var colour = d3.scale.category20();
	
	var projection = d3.geo.mercator()
		.scale(1)
		.translate([0, 0]);
	
	var path = d3.geo.path()
		.projection(projection);
	
	var l = topojson.feature(nld, nld.objects.subunits).features[3],
		b = path.bounds(l),
		s = .2 / Math.max((b[1][0] - b[0][0]) / width , (b[1][1] - b[0][1]) / height ),
		t = [(width - s * 1.8 * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
	
	projection
		.scale(s)
		.translate(t);
	
	svg.selectAll("path")
		.data(topojson.feature(nld, nld.objects.subunits).features).enter()
		.append("path")
		.attr("d", path)
		.attr("fill", function(d, i) {
			return colour(i);
		})
		.attr("class", function(d, i) {
			return d.properties.name;
		})
		// gives each province two actions
		.on("click", chooseProvince)
		.on("mouseover", showDetails);
	
	// path for the IJsselmeer
	var lineData = [ { "x": 172,   "y": 92},  { "x": 180,  "y": 100},
		{ "x": 181,  "y": 110}, { "x": 188,  "y": 115},
		{ "x": 182,  "y": 130}, { "x": 180, "y": 150}, { "x": 200, "y": 140}, 
		{ "x": 205, "y": 115}, { "x": 210, "y": 120}, { "x": 215, "y": 100}, 
		{ "x": 215, "y": 90}, { "x": 200, "y": 70}];	
	
	// plot the IJsselmeer
	var lineFunction = d3.svg.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; })
		.interpolate("basis");
	svg.append("path")
		.attr("d", lineFunction(lineData))
		.attr("fill", "white");
}

// plot the line chart
function lineChart(){
	
	// remove the previous line chart
	d3.select(".lineGraph").remove()
	
	data = globalData.filter(function(d) { return d.Station == station && d.Date > parseDate(datetype[0]) && d.Date < parseDate(datetype[1]) })
	
	// set the dimensions of the canvas / graph
	var margin = {top: 30, right: 20, bottom: 30, left: 50},
		width = 1200 - margin.left - margin.right,
		height = 270 - margin.top - margin.bottom;
	
	// set the ranges
	var x = d3.time.scale().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);
	
	// define the axes
	var xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(5);
	
	var yAxis = d3.svg.axis().scale(y)
		.orient("left").ticks(5);
	
	// define the line
	var valueline = d3.svg.line()
		.x(function(d) { return x(Number(d.Date)); })
		.y(function(d) { return y(Number(d[typeData])); });
		
	// adds the svg canvas
	var svg = d3.select("body")
		.append("svg")
		.attr("class","lineGraph")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", 
				"translate(" + margin.left + "," + margin.top + ")");
	
	// scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.Date; }));
	y.domain([d3.min(data, function(d) { return d[typeData]; }), 
		d3.max(data, function(d) { return d[typeData]; })]);

	// add the valueline path.
	svg.append("path")
		.attr("class", "line")
		.attr("d", valueline(data));

	// add the X Axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
	
	// check the data type and picks the right lables and title
	var data = ["RainAmount", "RainTime", "Temp"],
		translation = ["De hoeveelheid regen", "Het aantal uren regen", "De gemiddelde temperatuur"],
		ylabels = ["Etmaalsom van de neerslag (0.1 mm)", "Duur van de neerslag (0.1 uur)", "Gemiddelde temperatuur (0.1" + String.fromCharCode(176) + "Celsius)"],
		words = translation[data.indexOf(typeData)],
		ylabel = ylabels[data.indexOf(typeData)];
	
	// add the Y Axis
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -213)
		.attr("y", -40)
		.text(ylabel)
	
	// add the title with the proper words
	svg.append("text")
		.attr("x", 250)
		.attr("y", -10)
		.attr("class","titleLineChart")
		.html(words + " in " + province + " in " + datetype[0].substring(0,4))
}


// the dropdown menu changes the datatype and plots the linegraph again
function onchange() {
		selectValue = d3.select('select').property('value')
		typeData = selectValue;
		lineChart();
}

// the map changes the line graph
function chooseProvince(){
	province = d3.select(this).attr("class")
	
	// if the data for this province exist, plot a new line graph
	linkage.forEach(function(d) {
		if(d.Provincie == province){
			station = d.Station
			lineChart()
		};
	})
}

// creates a info box about a province
function showDetails(){
	// remove the previous info box
	d3.selectAll(".infobox").remove()
	
	// select the province
	province = d3.select(this).attr("class")
	
	// add a new box
	d3.select("svg")
		.append("rect")
		.attr("x",490)
		.attr("y",280)
		.attr("width", 160)
		.attr("height",60)
		.attr("class", "infobox")
		.attr("stroke", "black")
		.attr("fill", "white")
	
	// find the right information and put it in the box
	linkage.forEach(function(d) {
		if(d.Provincie == province){
			d3.select("svg").append("text")
			.attr("class", "infobox")
			.attr("x", 500)
			.attr("y", 330)
			.text("Station: " + d.Station)
			
			d3.select("svg").append("text")
			.attr("class", "infobox")
			.attr("x", 500)
			.attr("y", 300)
			.text("Provincie: " + d.Provincie)
			
			d3.select("svg").append("text")
			.attr("class", "infobox")
			.attr("x", 500)
			.attr("y", 315)
			.text("Stad: " + d.Stad)			
		};
	})	
}