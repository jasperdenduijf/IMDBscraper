var globalData = [],
	linkage = []
	province = "Utrecht",
	station = 328,
	typeData = "RainAmmount",
	answers = ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"],
	datetype = ["20150101", "20160101"];


function initiate(){
	var data = ["RainAmmount", "RainTime", "Temp"];
	
	var select = d3.select('body')
	.select('select')
		.attr('class','select')
		.on('change',onchange)
	
	var options = select
	.selectAll('option')
		.data(data).enter()
		.append('option')
			.text(function (d) { return d; });	
}

function onchange() {
		selectValue = d3.select('select').property('value')
		typeData = selectValue;
		lineChart();
}

function handleClick(){
	console.log("Wacht!")
	console.log(document.getElementById("myVal").value)
	console.log(answers)
	year = document.getElementById("myVal").value
	console.log(year)
	sleep(2000)
	
	for(var i = 0; i < answers.length; i++){
		sleep(1000)
		if(year == answers[i]){
			datetype = [year + "0101", (parseInt(year) + 1) + "0101" ]
			console.log(datetype)
			sleep(1000)
			console.log("En we wachten op...")
			sleep(1000)
			console.log("Pizza!")
			lineChart()
			sleep(2000)
			console.log("Ooohh... Pizza!")
			sleep(10000)
		}
		console.log(answers[i])
	}
	sleep(5000)
}

function loadBoth(){
	queue()
		.defer(d3.json, 'provincies.json')
		.defer(d3.json, 'weather.json')
		.defer(d3.json, "nld.json")
		.defer(d3.json, "provincies.json")
		.await(aab);
}

function aab(error, dP, dW, nld, provincies){
	if (error) throw error;
	drawNederland(nld)
	
	initiate()
	
	// Parse the date / time
	var parseDate = d3.time.format("%Y%m%d").parse;
	
	dW.forEach(function(d) {
		d.Date = parseDate((d.Date).toString());
		d.RainTime = +d.RainTime;
		d.RainAmmount = +d.RainAmmount;
		d.Temp = +d.Temp;
	});
	
	globalData = dW
	linkage = provincies
	station = 286;
	lineChart(dW, station)
	
}

function drawNederland(nld){
	var width = 800,
		height = 400;
	
	var colour = d3.scale.category20();
	
	var projection = d3.geo.mercator()
		.scale(1)
		.translate([0, 0]);
	
	var path = d3.geo.path()
		.projection(projection);
	
	var svg = d3.select("body").select(".map")
		.attr("width", width)
		.attr("height", height);
	
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
		.on("click",chooseProvince)
		.on("mouseover", showDetails);	
}

function lineChart(){
	
	d3.select(".lineGraph").remove()
	console.log(station)
	
	var parseDate = d3.time.format("%Y%m%d").parse;
	console.log(datetype)
	data = globalData.filter(function(d) { return d.Station == station && d.Date > parseDate(datetype[0]) && d.Date < parseDate(datetype[1]) })
	

	// Set the dimensions of the canvas / graph
	var margin = {top: 30, right: 20, bottom: 30, left: 50},
		width = 1200 - margin.left - margin.right,
		height = 270 - margin.top - margin.bottom;
	
	// Set the ranges
	var x = d3.time.scale().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);
	
	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(5);
	
	var yAxis = d3.svg.axis().scale(y)
		.orient("left").ticks(5);
	
	// Define the line
	var valueline = d3.svg.line()
		.x(function(d) { return x(Number(d.Date)); })
		.y(function(d) { return y(Number(d[typeData])); });
		
	// Adds the svg canvas
	var svg = d3.select("body")
		.append("svg")
		.attr("class","lineGraph")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", 
				"translate(" + margin.left + "," + margin.top + ")");
	
	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.Date; }));
	y.domain([0, d3.max(data, function(d) { return d[typeData]; })]);

	// Add the valueline path.
	svg.append("path")
		.attr("class", "line")
		.attr("d", valueline(data));

	// Add the X Axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// Add the Y Axis
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);
		
	svg.append("text")
		.attr("x", 250)
		.attr("y", 0)
		.attr("class","titleLineChart")
		.html(province)
}

function chooseProvince(){
	province = d3.select(this).attr("class")
	
	console.log(globalData)
	
	linkage.forEach(function(d) {
		if(d.Provincie == province){
			station = d.Station
			lineChart()
		};
	})
}

function sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

function showDetails(){
	d3.selectAll(".infokader").remove()
	province = d3.select(this).attr("class")
	
	d3.select("svg")
		.append("rect")
		.attr("x",490)
		.attr("y",280)
		.attr("width", 140)
		.attr("height",60)
		.attr("stroke", "red")
		.attr("fill", "white")
		
	linkage.forEach(function(d) {
		if(d.Provincie == province){
			d3.select("svg").append("text")
			.attr("class", "infokader")
			.attr("x", 500)
			.attr("y", 330)
			.text("Station: " + d.Station)
			
			d3.select("svg").append("text")
			.attr("class", "infokader")
			.attr("x", 500)
			.attr("y", 300)
			.text("Provincie: " + d.Provincie)
			
			d3.select("svg").append("text")
			.attr("class", "infokader")
			.attr("x", 500)
			.attr("y", 315)
			.text("Stad: " + d.Stad)			
		};
	})
	
}