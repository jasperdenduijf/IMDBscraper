// this function is called when the html body is fully loaded
function scatterDraw(){

	// create constants
	const margin = {top: 20, right: 20, bottom: 30, left: 40},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	// initiate scalings functions for x, y, radius and color
	var x = d3.scale.linear()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);

	var dotSize = d3.scale.linear()
		.range([0, 75]);

	var color = d3.scale.category10();

	// initiate axes
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	// create a svg canvas
	var svg = d3.select("body").select("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// load the data from the json file
	d3.json("Europe.json", function(error, data) {
		if (error) throw error;
  
		// sort the data on victories on ESC
		data = data.sort(function(a, b) { 
			return a.esc - b.esc;
		})

	// give the scaling functions a proper domain
	x.domain(d3.extent(data, function(d) { return d.x / 100000; })).nice();
	y.domain(d3.extent(data, function(d) { return d.y / 100000; })).nice();
	dotSize.domain(d3.extent(data, function(d) { return Math.sqrt(d.size);})).nice();

	// create the x-ax with a label
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	.append("text")
		.attr("class", "label")
		.attr("x", width)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("Oosterlengte");

	// create the y-ax
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
		.attr("class", "label")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Noorderbreedte");


	// create the dots
	svg.selectAll(".dot")
		.data(data)
	.enter().append("circle")
		.attr("class", "dot")
		.attr("r", function(d) {console.log(d.esc); return dotSize(Math.sqrt(d.size)); })
		.attr("cx", function(d) { return x(d.x / 100000); })
		.attr("cy", function(d) { return y(d.y / 100000); })
		.attr("id", function(d) { return d.country })
		.style("fill", function(d) { return color(d.esc); })
		.on("mouseover",showName)
		.on("mouseout",hideName);

	// initiate a legenda
	var legend = svg.selectAll(".legend")
		.data(color.domain())
	.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	// create the boxes	
	legend.append("rect")
		.attr("x", width - 18)
		.attr("width", 18)
		.attr("height", 18)
      .style("fill", color);

	// create the text
	legend.append("text")
		.attr("x", width - 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) { return d; });

	d3.select("body")
		.append("a")
		.attr("href","https://en.wikipedia.org/wiki/List_of_European_countries_by_area")
		.text("Source sizes  ");
	
	d3.select("body")
		.append("a")
		.attr("href","https://en.wikipedia.org/wiki/List_of_Eurovision_Song_Contest_winners")
		.text("Source ESC victories")
	});
}

// this function is called if the mouse is on a dot
function showName(){
	// create the country name
	d3.select("body").select("svg").append("text")
		.attr("class", "countryName")
		.attr("x", this["cx"].animVal.value + 10)
		.attr("y", this["cy"].animVal.value + 10)
		.attr("width", 50)
		.attr("height", 50)
		.text(this["id"])
}

// this function is called if the mouse is removed from a dot
function hideName(){
	// remove the country name
	d3.selectAll(".countryName").remove()
}
