function draw(triangle){	
	d3.select("svg").remove()
	
	var width = 1000,
		height = 500,
		cx = 500,
		cy = 250,
		r = 200,
		dh = Number(triangle);
		
	var lineFunction = d3.svg.line()
		.x(function(d) { return d.x; })
		.y(function(d) { return d.y; })
		.interpolate("linear");
		
	var lineData = [ { "x": cx + r,   "y": cy},  { "x": cx + r - dh,  "y": cy},
			{ "x": cx + r - dh / 2,  "y": cy - Math.sqrt(3) * dh / 2}, { "x": cx + r,   "y": cy}];
		
	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);
		
	svg.append("circle")
		.attr("cx",cx)
		.attr("cy",cy)
		.attr("r",r)
		.style("stroke", "red")    // 1e circle
		.style("fill", "none");
	
	svg.append("circle")
		.attr("cx", cx - r + (2 * r - dh) / 2)
		.attr("cy", cy)
		.attr("r",(2 * r - dh) / 2)
		.style("stroke", "green")    // 2e circle
		.style("fill", "none");
		
	svg.append("path")
		.attr("d", lineFunction(lineData))
		.attr("stroke","blue")
		.attr("fill","none");
		
	var hight2 = (2 * r * dh * dh - 4 * r * r * dh) / (4 * r - dh) + (2 * r * dh - dh * dh)/ (4 * r - dh) * (2 * r * dh - dh * dh)/ (4 * r - dh) + 2 * r * dh - dh * dh;
	console.log(hight2)
	
	svg.append("circle")
		.attr("cx",  cx  - dh + r )
		.attr("cy", cy - Math.sqrt(hight2)) 
		.attr("r", (2 * r * dh - dh * dh)/ (4 * r - dh))
		.style("stroke", "purple")    // 3e circle
		.style("fill", "none");
		
	svg.append("line")
		.attr("x1", cx  - dh + r)
		.attr("y1", cy)
		.attr("x2", cx  - dh + r)
		.attr("y2", cy - Math.sqrt(hight2))
		.attr("stroke", "gold")

}

function handleClick(event){
                draw(document.getElementById("myVal").value)
                return false;
            }