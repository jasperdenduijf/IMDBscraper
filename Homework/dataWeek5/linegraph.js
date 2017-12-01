// this function creates a drop down menu
function dropDown(){
	// possible options
	var data = ["Male", "Female"];
	// slect the drop down menu
	var select = d3.select('select')
		.on('change',onchange)
		
	// gives the menu the options
	var options = select
	.selectAll('option')
		.data(data).enter()
		.append('option')
			.text(function (d) { return d; });
	
	// when clicked on a new option, this function is activated
	function onchange() {
		// removes the last potted graph
		d3.selectAll("svg").remove()
		
		// draws a new graph with the new option value
		selectValue = d3.select('select').property('value')
		draw(selectValue)
	};
}

// this function creates the line graph
function draw(selectValue){
	
	// pick the right keys
	if(selectValue == "Male"){
		selectList = ["1970", "1990", "2010"]
	}
	else {
		selectList = ["1970f", "1990f", "2010f"]
	}
	
	// change the title
	d3.selectAll("h1").html( selectValue + " mortality rates in the Netherlands")
	// choose the colors
	colors = ["Darkred", "Gold", "Darkblue"]
	
	// add a new svg
	d3.select("body").append("svg")
	.attr("height", 500)
	.attr("width", 1040)
	
	// select the boundries
	var svg = d3.select("svg"),
		margin = {top: 20, right: 200, bottom: 30, left: 70},
		width = svg.attr("width") - margin.left - margin.right,
		height = svg.attr("height") - margin.top - margin.bottom,
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// initiate scaling
	var x = d3.scale.linear().range([0, width]),
		invx = d3.scale.linear().domain([0, width]),	
		y = d3.scale.linear().range([height, 0]),
		z = d3.scale.ordinal(d3.schemeCategory10);

	// create a line function
	var line = d3.svg.line()
		.x(function(d) { return x(Number(d.age)); })
		.y(function(d) { return y(Number(d.mortality)); });
		
	d3.json("mortality.json", function(error, data) {
		if (error) throw error;
		
		var years = function(id, data) {
			var list = [];
			for (var i = 0; i < data.length; i++){
				list.push({age: data[i].age, mortality: data[i][id]});
			}
			return list;
		};
	
		console.log(years(selectList[0], data))
		x.domain(d3.extent(data, function(d) { return Number(d.age); }));
		invx.range(d3.extent(data, function(d) { return Number(d.age); }));
	
		y.domain([
			d3.min(data, function(d) { return Math.min(Number(d[selectList[0]]), Number(d[selectList[1]]), Number(d[selectList[2]])); }),
			d3.max(data, function(d) { return Math.max(Number(d[selectList[0]]), Number(d[selectList[1]]), Number(d[selectList[2]])); })
		]);
	
		g.append("g")
			.attr("class", "axis axis--x")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.svg.axis().scale(x)
			.orient("bottom"))
		.append("text")
			.attr("x", width - 10)
			.text("Age");
	
		g.append("g")
			.attr("class", "axis axis--y")
			.call(d3.svg.axis().scale(y)
			.orient("left"))
		.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 16)
			.attr("x", -90)
			.attr("dy", "0.71em")
			.attr("fill", "#000")
			.text("Mortality rates");
			
		// initiate a legenda
		var legend = svg.selectAll(".legend")
			.data(selectList)
		.enter().append("g")
			.attr("class", "legend")
			.attr("transform", function(d, i) { return "translate(" + (margin. left + margin.right) + "," + i * 20 + ")"; });

		// create the boxes	
		legend.append("rect")
			.attr("x", width - 18)
			.attr("width", 18)
			.attr("height", 18)
		.style("fill", function(d, i){console.log(i); return colors[i];});

		// create the text
		legend.append("text")
			.attr("x", width - 24)
			.attr("y", 9)
			.attr("dy", ".35em")
			.style("text-anchor", "end")
			.text(function(d) { return d.substring(0,4); });
	
		// this function is activated when your mouse moves
		svg.on("mousemove", function(){
			
			// remove everything from the last mouse move
			svg.selectAll(".mouseStuff").remove()
			
			// if statement to ignore the margins
			var mouse = d3.mouse(this);
			if(mouse[0] < margin.left){
				mouse[0] = margin.left
			}
			else if(mouse[0] > margin.left + width){
				mouse[0] = margin.left + width
			}
			
			// create the vertical cross hair
			var verticalLine = svg.append("line")
				.attr('class', 'mouseStuff')
				.attr("x1", mouse[0])
				.attr("y1", height + margin.top)
				.attr("x2", mouse[0])
				.attr("y2", margin.top)
				.attr("stroke", "black")
				
			// create the text block
			svg.append("rect")
				.attr('class', 'mouseStuff')
				.attr("x", mouse[0] + 20)
				.attr("y", mouse[1] + 15)
				.attr("width", 175)
				.attr("height", 70)
				.attr("fill", "antiquewhite")
				.attr("stroke", "black")
				.attr("rx",10)
				.attr("ry", 10)
			
			// this for and if loop selects the value matching with the mouse
			for(var i = 0; i < data.length; i++){
				if(data[i].age == Math.round(invx(mouse[0] - margin.left))){
					
					// create three horizontal cross hairs
					svg.append("line")
						.attr('class', 'mouseStuff')
						.attr("x1", margin.left)
						.attr("y1", y(data[i][selectList[0]]) + margin.top)
						.attr("x2", width + margin.left)
						.attr("y2", y(data[i][selectList[0]]) + margin.top)
						.attr("stroke", colors[0]);
						
					svg.append("line")
						.attr('class', 'mouseStuff')
						.attr("x1", margin.left)
						.attr("y1", y(data[i][selectList[1]]) + margin.top)
						.attr("x2", width + margin.left)
						.attr("y2", y(data[i][selectList[1]]) + margin.top)
						.attr("stroke", colors[1]);
					
					svg.append("line")
						.attr('class', 'mouseStuff')
						.attr("x1", margin.left)
						.attr("y1", y(data[i][selectList[2]]) + margin.top)
						.attr("x2", width + margin.left)
						.attr("y2", y(data[i][selectList[2]]) + margin.top)
						.attr("stroke", colors[2]);
					
					// create the text in the text block
					svg.append("text")
						.attr("class", "mouseStuff")
						.attr("width", 30)
						.attr("hight", 30)
						.attr("x", mouse[0] + 30)
						.attr("y", mouse[1] + 30)
						.attr("style", "font-size:80%")
						.text("Age: " + data[i].age)
					
					svg.append("text")
						.attr("class", "mouseStuff")
						.attr("width", 30)
						.attr("hight", 30)
						.attr("x", mouse[0] + 30)
						.attr("y", mouse[1] + 45)
						.attr("style", "font-size:80%")
						.text("Mortality rates in 1970: " + data[i][selectList[0]])
						
					svg.append("text")
						.attr("class", "mouseStuff")
						.attr("width", 30)
						.attr("hight", 30)
						.attr("x", mouse[0] + 30)
						.attr("y", mouse[1] + 60)
						.attr("style", "font-size:80%")
						.text("Mortality rates in 1990: " + data[i][selectList[1]])
						
					svg.append("text")
						.attr("class", "mouseStuff")
						.attr("width", 30)
						.attr("hight", 30)
						.attr("x", mouse[0] + 30)
						.attr("y", mouse[1] + 75)
						.attr("style", "font-size:80%")
						.text("Mortality rates in 2010: " + data[i][selectList[2]])
				}
			}
		});
		
		// create the graphs
		g.append("path")
			.attr("class", "line")
			.attr("d", line(years(selectList[0], data)))
			.style("stroke", colors[0]);
			
		g.append("path")
			.attr("class", "line")
			.attr("d", line(years(selectList[1], data)))
			.style("stroke", colors[1]);
			
		g.append("path")
			.attr("class", "line")
			.attr("d", line(years(selectList[2], data)))
			.style("stroke", colors[2]);
	});
};