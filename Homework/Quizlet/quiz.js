// Hé! Niet gluren in de code naar antwoorden! 

function startQuiz(){
	d3.select("svg")
		.attr("width", 1000)
		.attr("height", 750);
		
	d3.select("svg").append("ellipse")
		.attr("cx", 540)
		.attr("cy", 145)
		.attr("rx", 175)
		.attr("ry", 40)
		.attr("stroke", "black")
		.attr("fill", "white");
		
	d3.select("svg").append("text")
		.attr('x', 420)
		.attr('y', 150)
		.attr("fill", "red")
		.attr("font-size", "20px")
		.attr("font-family", "sans-serif")
		.text("Do you want the photos?")
		.transition()
		.delay(4000)
		.duration(1000)
		.text("Do you want to play a game?")
		.transition()
		.delay(8000)
		.duration(1000)
		.text("Answer my questions first!")
				
	showStart()
}


// Had ik je niet gewaarschuwd om weg te gaan?
function showStart(){
	
	d3.select("svg")
		.append("svg:image")
		.attr('x', 100)
		.attr('y', 100)
		.attr('width', 300)
		.attr('height', 300)
		.style("opacity", 0)
		.attr("xlink:href", "Scarface.png")
		.transition()
		.delay(5000)
		.duration(5000)
		.style("opacity", 1);
		
	d3.select("svg").append("circle")
		.attr("class", "eyes")
		.attr("cx", 228)
		.attr("cy", 248)
		.attr("r", 9)
		.attr("stroke", "darkred")
		.style("opacity", 0)
		.attr("fill", "darkred");
		
	d3.select("svg").append("circle")
		.attr("class", "eyes")
		.attr("cx", 298)
		.attr("cy", 248)
		.attr("r", 9)
		.attr("stroke", "darkred")
		.style("opacity", 0)
		.attr("fill", "darkred");
		
	d3.selectAll(".eyes")
		.transition()
		.duration(500)
		.delay(8500)
		.style("opacity", 1);
		
	d3.selectAll(".eyes")
		.transition()
		.duration(500)
		.delay(9000)
		.style("opacity", 0);
		
	d3.selectAll(".eyes")
		.transition()
		.duration(500)
		.delay(9500)
		.style("opacity", 1);
		
	d3.selectAll(".eyes")
		.transition()
		.duration(500)
		.delay(10000)
		.style("opacity", 0);
		
// Dit is je laatste waarschuwing!
	d3.select("svg").append("rect")
		.attr("x", 500)
		.attr("y", 400)
		.attr("width", 120)
		.attr("height", 50)
		.attr("fill", "darkslategray")
		.style("opacity", 0)
		.on("click", gameOne)
		.transition()
		.delay(5000)
		.duration(5000)
		.style("opacity", 1)
		
	d3.select("svg").append("text")
		.attr("x", 535)
		.attr("y", 430)
		.attr("width", 120)
		.attr("height", 50)
		.attr("fill", "greenyellow")
		.attr("font-size", "20px")
		.attr("font-family", "sans-serif")
		.style("opacity", 0)
		.on("click", gameOne)	
		.text("Start!")
		.transition()
		.delay(5000)
		.duration(5000)
		.style("opacity", 1)
}	

// Zelfvernietiging ingeschakeld...
function gameTwo(){
	d3.select("svg").remove()
	
	d3.select("body").append('input')
	.attr("id", "box")
    .attr('type','text')
    .attr('name','textInput')
    .attr('value','Solve the riddle...')
	
	d3.select("body").append("button")
		.attr("onclick", "handleClick()")
		
	d3.select("body")
		.append("svg")
		.attr("width", 1000)
		.attr("height", 750);
		
	d3.select("svg")
		.append("svg:image")
		.attr("class", "game2")
		.attr('x', 50)
		.attr('y', 50)
		.attr('width', 100)
		.attr('height', 100)
		.attr("xlink:href", "foto1-3.png")
		
	d3.select("svg")
		.append("text")
		.attr("class", "game2")
		.attr("x",100)
		.attr("y",170)
		.attr("font-size", "20px")
		.text("3")
		
	d3.select("svg")
		.append("svg:image")
		.attr("class", "game2")
		.attr('x', 175)
		.attr('y', 50)
		.attr('width', 100)
		.attr('height', 100)
		.attr("xlink:href", "foto2-3.png")
		
	d3.select("svg")
		.append("text")
		.attr("class", "game2")
		.attr("x",225)
		.attr("y",170)
		.attr("font-size", "20px")
		.text("3")
		
	d3.select("svg")
		.append("svg:image")
		.attr("class", "game2")
		.attr('x', 300)
		.attr('y', 50)
		.attr('width', 100)
		.attr('height', 100)
		.attr("xlink:href", "foto3-2.png")
		
	d3.select("svg")
		.append("text")
		.attr("class", "game2")
		.attr("x",350)
		.attr("y",170)
		.attr("font-size", "20px")
		.text("2")
		
	d3.select("svg")
		.append("svg:image")
		.attr("class", "game2")
		.attr('x', 425)
		.attr('y', 50)
		.attr('width', 100)
		.attr('height', 100)
		.attr("xlink:href", "foto4-67.png")
		
	d3.select("svg")
		.append("text")
		.attr("class", "game2")
		.attr("x",475)
		.attr("y",170)
		.attr("font-size", "20px")
		.text("67")
		
// DEZE CODE GAAT EXPLODEREN! RED JEZEL!
	d3.select("svg")
		.append("svg:image")
		.attr("class", "game2")
		.attr('x', 50)
		.attr('y', 250)
		.attr('width', 100)
		.attr('height', 100)
		.attr("xlink:href", "foto5-2.png")
		
	d3.select("svg")
		.append("text")
		.attr("class", "game2")
		.attr("x",100)
		.attr("y",370)
		.attr("font-size", "20px")
		.text("2")
		
	d3.select("svg")
		.append("svg:image")
		.attr("class", "game2")
		.attr('x', 175)
		.attr('y', 250)
		.attr('width', 100)
		.attr('height', 100)
		.attr("xlink:href", "foto6-4.png")

	d3.select("svg")
		.append("text")
		.attr("class", "game2")
		.attr("x",225)
		.attr("y",370)
		.attr("font-size", "20px")
		.text("4")		
		
	d3.select("svg")
		.append("svg:image")
		.attr("class", "game2")
		.attr('x', 50)
		.attr('y', 450)
		.attr('width', 100)
		.attr('height', 100)
		.attr("xlink:href", "foto7-4.png")	
		
	d3.select("svg")
		.append("text")
		.attr("class", "game2")
		.attr("x", 100)
		.attr("y", 570)
		.attr("font-size", "20px")
		.text("4")

	d3.select("svg")
		.append("svg:image")
		.attr("class", "game2")
		.attr('x', 175)
		.attr('y', 450)
		.attr('width', 100)
		.attr('height', 100)
		.attr("xlink:href", "foto8-2.png")
		.on("click", gameThree)

	d3.select("svg")
		.append("text")
		.attr("class", "game2")
		.attr("x",225)
		.attr("y", 570)
		.attr("font-size", "20px")
		.text("2")		
		
	d3.select("svg")
		.append("svg:image")
		.attr("class", "game2")
		.attr('x', 300)
		.attr('y', 450)
		.attr('width', 100)
		.attr('height', 100)
		.attr("xlink:href", "foto9-2.png")	

//BOEM!
	d3.select("svg")
		.append("text")
		.attr("class", "game2")
		.attr("x",350)
		.attr("y", 570)
		.attr("font-size", "20px")
		.text("2")		
}

// Verdorie. Oké, het was bluf. Ik ken de d3 zelfvernietigingscode nog niet...
function gameOne(){
	
	d3.select("svg").remove()
		
	d3.select("body")
		.append("svg")
		.attr("width", 1000)
		.attr("height", 750)
		
	d3.select("svg").append("ellipse")
		.attr("cx", 540)
		.attr("cy", 145)
		.attr("rx", 175)
		.attr("ry", 40)
		.attr("stroke", "black")
		.attr("fill", "white")
		.attr("opacity", 1)
		.transition()
		.delay(2000)
		.attr("opacity", 0)
		
	d3.select("svg").append("text")
		.attr('x', 420)
		.attr('y', 150)
		.attr("fill", "red")
		.attr("font-size", "20px")
		.attr("font-family", "sans-serif")
		.text("Which letter to click?")
		.attr("opacity", 1)
		.transition()
		.delay(2000)
		.attr("opacity", 0)
		
	d3.select("svg").append("text")
		.attr("x", 200)
		.attr("y", 300)
		.attr("fill", "red")
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", d3.rgb(100, 100, 0))
		.text("A")
		.on("click", badAnswer)

// Maar je kunt veel beter eerlijk de raadsels oplossen.		
	d3.select("svg").append("text")
		.attr("x", 280)
		.attr("y", 300)
		.attr("fill", "red")
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", d3.rgb(50, 250, 50))
		.text("B")
		.on("click", badAnswer)
		
	d3.select("svg").append("text")
		.attr("x", 360)
		.attr("y", 300)
		.attr("fill", "red")
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", d3.rgb(250, 100, 150))
		.text("C")
		.on("click", badAnswer)
		
	d3.select("svg").append("text")
		.attr("x", 440)
		.attr("y", 300)
		.attr("fill", "red")
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", d3.rgb(171, 205, 239))
		.text("D")
		.on("click", gameTwo)
	
	d3.select("svg").append("text")
		.attr("x", 520)
		.attr("y", 300)
		.attr("fill", "red")
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", d3.rgb(145, 39, 206))
		.text("E")
		.on("click", badAnswer)

// Of wap Jasper voor hints. Vindt hij ook goed.
	d3.select("svg").append("text")
		.attr("x", 600)
		.attr("y", 300)
		.attr("fill", "red")
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", d3.rgb(200, 100, 50))
		.text("F")
		.on("click", badAnswer)
}

function badAnswer(){
		d3.select("svg")
		.append("svg:image")
		.attr('x', 100)
		.attr('y', 100)
		.attr('width', 600)
		.attr('height', 600)
		.style("opacity", 0)
		.attr("xlink:href", "Scarface.png")
		.transition()
		.duration(500)
		.style("opacity", 1)
		.transition()
		.delay(15000)
		.duration(500)
		.style("opacity", 0)
		.attr("x", 700)
		.attr("y", 700);
		
		d3.select("svg").append("text")
		.attr("x", 50)
		.attr("y", 100)
		.attr("font-size", "80px")
		.attr("font-family", "sans-serif")
		.attr("fill", "black")
		.text("FOUT!")
		.transition()
		.duration(500)
		.style("opacity", 1)
		.transition()
		.delay(5000)
		.text("Denk na: ABCDEF?")
		.transition()
		.delay(10000)
		.duration(500)
		.style("opacity", 0)
}

function gameThree(){
	d3.selectAll(".game2").remove()
	
	d3.select("svg")
		.append("svg:image")
		.attr('x', 100)
		.attr('y', 100)
		.attr('width', 300)
		.attr('height', 300)
		.style("opacity", 1)
		.attr("xlink:href", "Scarface.png")
		.transition()
		.delay(1000)
		.duration(1000)
		.style("opacity", 0);
		
	d3.select("svg")
		.append("svg:image")
		.attr("class", "game3")
		.attr('x', 175)
		.attr('y', 450)
		.attr('width', 100)
		.attr('height', 100)
		.attr("xlink:href", "foto8-2.png")
		.transition()
		.attr('x', 400)
		
	d3.select("svg")
		.append("text")
		.attr("class", "game3")
		.attr('x', 450)
		.attr('y', 600)
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", "black")
		.text("- i")
		.style("opacity", 0)
		.transition()
		.delay(2000)
		.duration(1000)
		.style("opacity", 1);
		
	d3.select("svg").append("ellipse")
		.attr("cx", 540)
		.attr("cy", 145)
		.attr("rx", 175)
		.attr("ry", 40)
		.attr("stroke", "black")
		.attr("fill", "white")
		.style("opacity", 1)
		.transition()
		.delay(1000)
		.duration(1000)
		.style("opacity", 0);
		
	d3.select("svg").append("text")
		.attr('x', 420)
		.attr('y', 150)
		.attr("fill", "red")
		.attr("font-size", "20px")
		.attr("font-family", "sans-serif")
		.text("One more puzzle!")
		.style("opacity", 1)
		.transition()
		.delay(1000)
		.duration(1000)
		.style("opacity", 0);
		
	d3.select("svg")
		.append("svg:image")
		.attr('x', 100)
		.attr('y', 100)
		.attr('width', 100)
		.attr('height', 100)
		.style("opacity", 0)
		.attr("xlink:href", "Rebus1.png")
		.transition()
		.delay(2000)
		.style("opacity", 1);	
		
	d3.select("svg")
		.append("text")
		.attr("class", "game3")
		.attr('x', 110)
		.attr('y', 250)
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", "black")
		.text("- wit")
		.style("opacity", 0)
		.transition()
		.delay(1000)
		.duration(1000)
		.style("opacity", 1);
		
	d3.select("svg")
		.append("svg:image")
		.attr('x', 400)
		.attr('y', 100)
		.attr('width', 100)
		.attr('height', 100)
		.style("opacity", 0)
		.attr("xlink:href", "Rebus2.png")
		.transition()
		.delay(2000)
		.style("opacity", 1);
		
	d3.select("svg")
		.append("text")
		.attr("class", "game3")
		.attr('x', 410)
		.attr('y', 250)
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", "black")
		.text("p = r")
		.style("opacity", 0)
		.transition()
		.delay(1000)
		.duration(1000)
		.style("opacity", 1);
		
	d3.select("svg")
		.append("svg:image")
		.attr('x', 130)
		.attr('y', 450)
		.attr('width', 100)
		.attr('height', 100)
		.style("opacity", 0)
		.attr("xlink:href", "Rebus3.png")
		.transition()
		.delay(2000)
		.style("opacity", 1);
		
	d3.select("svg")
		.append("svg:image")
		.attr('x', 620)
		.attr('y', 420)
		.attr('width', 300)
		.attr('height', 300)
		.style("opacity", 0)
		.attr("xlink:href", "Rebus5.png")
		.transition()
		.delay(2000)
		.style("opacity", 1);
}

function handleClick(event){
	var fillIn = document.getElementById("box").value;
	if (fillIn == "merry christmas" || fillIn == "Merry Christmas" || fillIn == "Merry christmas"){
		theEnd()
	}
}

function theEnd(){
	
	d3.select("svg").remove()
	d3.select("button").remove()
	d3.select("input").remove()
		
			
	d3.select("body").append('input')
		.attr("id", "box")
		.attr('type','text')
		.attr('name','textInput')
		.attr('value','https://photos.app.goo.gl/SE3ihNW4s4RFsUzx2')
	
	d3.select("body")
		.append("svg")
		.attr("width", 1000)
		.attr("height", 750)
		
	d3.select("svg").append("text")
		.attr("x", 50)
		.attr("y", 100)
		.attr("font-size", "80px")
		.attr("font-family", "sans-serif")
		.attr("fill", "black")
		.text("Well played!")
		.attr("opacity", 1)
		.transition()
		.delay(2000)
		.attr("opacity", 0)
		
	d3.select("svg")
		.append("svg:image")
		.attr('x', 0)
		.attr('y', 0)
		.attr("width", 1000)
		.attr("height", 750)
		.attr("opacity", 0)
		.attr("xlink:href", "Kerstkaart.png")
		.transition()
		.delay(2000)
		.duration(5000)
		.attr("opacity", 1)
		
	d3.select("svg").append("text")
		.attr("x", 250)
		.attr("y", 170)
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", "darkred")
		.text("Merry christmas, Smarties!")
		.attr("opacity", 0)
		.transition()
		.delay(2000)
		.duration(5000)
		.attr("opacity", 1)
		
	d3.select("svg").append("text")
		.attr("x", 270)
		.attr("y", 620)
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", "darkred")
		.text("And a happy new year!")
		.attr("opacity", 0)
		.transition()
		.delay(2000)
		.duration(5000)
		.attr("opacity", 1)
		
		d3.select("svg").append("text")
		.attr("x", 0)
		.attr("y", 0)
		.attr("font-size", "40px")
		.attr("font-family", "sans-serif")
		.attr("fill", "darkred")
		.text(" Jasper")
		.attr("transform", "translate(760,600) rotate(-30)")
		.attr("opacity", 0)
		.transition()
		.delay(2000)
		.duration(5000)
		.attr("opacity", 1)		
		
	
// Nou. Dat was het dan. Tot volgend jaar!	
}