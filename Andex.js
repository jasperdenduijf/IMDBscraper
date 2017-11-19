function animateDiv(){
	d3.select(".chart")
	.attr("width", 500)
	.attr("height", 900)
	.append("g")
	.attr("transform", "translate(30,30)");
	
	d3.select(".chart").append("text")
		.attr("id", "week2")
		.attr("x", 0)
		.attr("y", 30)
		.text("Week 2")
		.on("mouseover", move2)
		.on("click", function() { window.open("https://jasperdenduijf.github.io/IMDBscraper/Homework/dataWeek2/DataWeek2.html"); });

		
	d3.select(".chart").append("text")
		.attr("id", "week3")
		.style("width", "300px")
		.attr("x", 0)
		.attr("y", 60)
		.text("Week 3")
		.on("mouseover", move3)
		.on("click", function() { window.open("https://jasperdenduijf.github.io/IMDBscraper/Homework/dataWeek3/barchart.html"); });
}

function move2(){
	newX = Math.random() * 400 + 30;
	newY = Math.random() * 400 + 30;
	
	d3.select(".chart").select("#week2")
	.transition()
	.attr("x", newX)
	.attr("y", newY)
	.ease('bounce')
	.duration(3000);
}

function move3(){
	newX = Math.random() * 400 + 30;
	newY = Math.random() * 400 + 30;
	
	d3.select(".chart").select("#week3")
	.transition()
	.attr("x", newX)
	.attr("y", newY)
	.ease('bounce')
	.duration(3000);
}