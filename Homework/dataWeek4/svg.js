console.log("Hoi!")
d3.xml("test.svg", "image/svg+xml", function(error, xml) {
	if (error) throw error;    
	document.body.appendChild(xml.documentElement);   
	FillColor();
});

function FillColor(){
	data = ["#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824","ffffff"]
	
	var colorBox = d3.select("body").selectAll(".st1")
	var colorToAdd = data.length - colorBox.size()
	
	var textbox = d3.select("body").selectAll(".st2")
	var textToAdd = data.length - colorBox.size()
	
	for(var i = 0; i < colorToAdd; i++){
		d3.select("svg").append("rect")
		.attr("id", "kleur" + (i + colorBox.size()))
		.attr("x", "13")
		.attr("y", 138.4 + 40 * i)
		.attr("class", "st1")
		.attr("width", "21")
		.attr("height", "29")
	}
	
	for(var i = 0; i < textToAdd; i++){
		d3.select("svg").append("rect")
		.attr("id", "tekst" + (i + textbox.size()))
		.attr("x", "46.5")
		.attr("y", 138.4 + 40 * i)
		.attr("class", "st2")
		.attr("width", "119.1")
		.attr("height", "29")
	}
	
	d3.select("body").selectAll(".st1")
	.data(data)
	.style("fill", function(d) { return d; })
}