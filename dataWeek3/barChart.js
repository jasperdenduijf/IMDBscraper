/*
*  Data Processing, week 3
*  Name: Jasper den Duijf
*  Number: 10217584
*  
*  
*/


// this function creates the bar chart when the body is loaded

function drawBarChart(){
// set the used constants
const margin = {top: 20, right: 30, bottom: 30, left: 40},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// create the x scaling function
var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1);
// create the y scaling function
var y = d3.scale.linear()
	.range([height, 0]);
// create the green color scaling function	
var green = d3.scale.linear()
	.range([0x10, 0xff]);
// create the red color scaling function
var red = d3.scale.linear()
	.range([0x10, 0xff]);
// prepare the x-axis
var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");
// prepare the y-axis
var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");
// create the main chart space with the right specs
var chart = d3.select(".chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
// load the data
d3.json("rain2015.json", function(data) {

	// set the domains based on the maximum data
	x.domain(data.map(function(d) { return d.Name; }));
	y.domain([0, d3.max(data, function(d) { return d.Rain; })]);
	green.domain([d3.max(data, function(d) { return d.Rain; }), 0]);
	red.domain([0, d3.max(data, function(d) { return d.Rain; })]);

	// create x-axis
	chart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// create y-axis
	chart.append("g")
		.attr("class", "y axis")
		.call(yAxis);
	
	// create the bars
	chart.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function(d) { return x(d.Name); })
		.attr("y", height)
		.attr("width", x.rangeBand())
		.attr("fill", "steelblue")
		.on("mouseover", turnRed)
		.on("mouseout", turnBlue)
		.attr("height", 0);

	// add a title for the y-axis
	d3.select(".chart").append("text")
		.attr('id', 'yaxes')
		.attr("x", margin.left - x.rangeBand() / 2)
		.attr("y", margin.top / 2)
		.attr('width', x.rangeBand())
		.style("font-family", "calibri")
		.text("Rain in mm");
	
	// start the animation
	grow();
});

// this function creates the slow growth of the bars
function grow(){
	chart.selectAll(".bar")
	.transition()
	.attr("height", function(d) { return height - y(d.Rain); })
	.attr("y", function(d) { return y(d.Rain); })
	.ease('linear')
	.duration(function(d) {return d.Rain * 5; });
};

// this function changes the bar when 'touched'
function turnRed(d,i){
	// create the hex color according the data
	color = '#' + Math.round(red(d.Rain)).toString(16) + Math.round(green(d.Rain)).toString(16) + '00'
	
	// add color
	d3.select(this).attr("fill", color);
		
	// add text on the bar
	chart.append("text")
		.attr('id', 'barmm')
		.attr("x", this["x"].animVal.value + x.rangeBand() / 2)
		.attr("y", this["y"].animVal.value + 20)
		.attr('width', x.rangeBand())
		.attr('style', 'font-family:calibri; font-weight: bold; fill:white; text-anchor:middle;')
		.text(d.Rain);
}

// this function changes the bar when 'untouched'
function turnBlue(d,i){
	// change the color
	d3.select(this).attr("fill", "steelblue");
	// remove the text
	chart.select("#barmm").remove();
}
}
