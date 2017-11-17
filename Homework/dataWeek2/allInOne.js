/**
* Student: Jasper den Duijf
* Studentnummer: 10217584
* 
* Javascript voor Data Processing Week 2
**/

// drawing area constants
var widthVar = 900;
var heightVar = 500;
var verticalMarge = 25;
var horizontalMarge = 100;
var millisecondInDay = 86400000;
var numberOfYMarks = 10;
	
var rawData1;
	
function draw() {
			
	// transform the data
	var tableData = rawData1.split(','); 
	tableData.shift();
	for(var i = 0; i < tableData.length; i += 2)
	{
		// turn dates in day structure, turn temperatures in numbers
		tableData[i] = new Date(tableData[i].substring(0,4) + "-" + tableData[i].substring(4,6) + "-" + tableData[i].substring(6,8));
		tableData[i] = (tableData[i].getTime())/millisecondInDay;
		tableData[i+1] = Number(tableData[i+1].substring(0, 5));
	}
	
	// create variables to use
	var days = [];
	var temperature = [];
	var maxTemperature = -999;
	var minTemperature = 999
	
	// load variables
	for(var i = 0; i < tableData.length; i += 2)
	{
		days.push(tableData[i] - tableData[0]);
		temperature.push(tableData[i+1]);
		
		if(maxTemperature < tableData[i+1])
		{
			maxTemperature = tableData[i+1];
		}
		if(minTemperature > tableData[i+1])
		{
			minTemperature = tableData[i+1];
		}
	}
	
	// transform function creator
	function createTransform(domain, range){
		var domain_min = domain[0]
		var domain_max = domain[1]
		var range_min = range[0]
		var range_max = range[1]
	
		var alpha = (range_max - range_min) / (domain_max - domain_min)
		var beta = range_max - alpha * domain_max
	
		return function(x){
			return alpha * x + beta;
		}
	}
	
	// transform functions for days to x pixels and temperature to y pixels
	var xTransform = createTransform([days[0], days[days.length - 1]], [horizontalMarge, widthVar - horizontalMarge]);
	var yTransform = createTransform([minTemperature, maxTemperature], [heightVar - verticalMarge, verticalMarge]);
    
	// start canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	// create graph
	ctx.beginPath();
	ctx.moveTo(xTransform(days[0]), yTransform(temperature[0]));
	for(var i = 1; i < days.length; i++)
	{
		ctx.lineTo(xTransform(days[i]), yTransform(temperature[i+1]));
	}
	ctx.stroke();
     
	// create axes
	ctx.beginPath();
	ctx.moveTo(horizontalMarge, verticalMarge);
	ctx.lineTo(horizontalMarge, heightVar - verticalMarge);
	ctx.lineTo(widthVar - horizontalMarge, heightVar - verticalMarge);
	ctx.stroke();
	
	// transform functions for y pixels to temperature 
	var yReTransform = createTransform([heightVar - verticalMarge, verticalMarge], [minTemperature, maxTemperature]);
	
	// create y-as marks
	for(var k = 0; k <= numberOfYMarks; k++)
	{
		// put down the numbers
		ctx.font = '12px serif';
		var yPixel = verticalMarge + (heightVar - 2* verticalMarge) / numberOfYMarks * k
		ctx.fillText(Math.round( yReTransform(yPixel) / numberOfYMarks * 10) / 10, 0, yPixel);
		
		// put down the markings
		ctx.beginPath();
		ctx.moveTo(horizontalMarge - 10, verticalMarge + (heightVar - 2* verticalMarge) / numberOfYMarks * k);
		ctx.lineTo(horizontalMarge, verticalMarge + (heightVar - 2* verticalMarge) / numberOfYMarks * k);
		ctx.stroke();
	}
	
	// put down y-as title
	ctx.font = '12px serif';
	ctx.fillText("Daggemiddelde in \xB0C", horizontalMarge / 2, verticalMarge / 2);
	
	
	// create x-as marks
	var months = ["August", "Semptember", "Oktober", "November", "December", "Januari", "Februari", "March", "April", "May", "June", "July"]
	
	// lower start point
	ctx.translate(horizontalMarge, heightVar);

	// put down 1996
	ctx.translate(-20,25);
	ctx.font = '12px serif';
	ctx.rotate((Math.PI / 180) * -40);
	ctx.fillText("1996", 0, 0);
	ctx.rotate((Math.PI / 180) * 40);
	ctx.translate(20,-25);
	
	// put down 1997
	ctx.translate((widthVar - 2 * horizontalMarge) / months.length * 5 -20,25);
	ctx.font = '12px serif';
	ctx.rotate((Math.PI / 180) * -40);
	ctx.fillText("1997", 0, 0);
	ctx.rotate((Math.PI / 180) * 40);
	ctx.translate(20 - (widthVar - 2 * horizontalMarge) / months.length * 5,-25);
	
	for(var l = 0; l < months.length; l++)
	{
		// put down months
		ctx.translate(5,25);
		ctx.font = '12px serif';
		ctx.rotate((Math.PI / 180) * -40);
		ctx.fillText(months[l], 0, 0);
		ctx.rotate((Math.PI / 180) * 40);
		ctx.translate(-5,-25);
		
		// put down markings
		ctx.beginPath();
		ctx.moveTo(0, -verticalMarge);
		ctx.lineTo(0, 10 -verticalMarge);
		ctx.stroke();
		
		//go to the next spot
		ctx.translate((widthVar - 2 * horizontalMarge) / months.length,0);
	}
}
	
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		rawData1 = this.responseText;
		draw();
    }
  };
xhttp.open("GET", "https://raw.githubusercontent.com/jasperdenduijf/IMDBscraper/master/dataWeek2/rawdata.txt", true);
xhttp.send();


	
	
	
