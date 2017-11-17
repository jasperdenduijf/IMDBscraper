// DRAWING AREA
var widthVar = 900;
var heightVar = 450;
var verticalMarge = 25;
var horizontalMarge = 100;
	
console.log("Hoi!")
	
function draw() {
		
		
	// CALCULATE AREA
	var StartTime = new Date("1996-01-01");
		document.getElementById('demo3').innerHTML = "To be";
		var tableData = document.getElementById('rawdata').innerHTML.split(','); 
		tableData.shift();
		for(var i = 0; i < tableData.length; i += 2)
		{
			tableData[i] = new Date(tableData[i].substring(0,4) + "-" + tableData[i].substring(4,6) + "-" + tableData[i].substring(6,8));
			document.getElementById('demo2').innerHTML = tableData[1];
			tableData[i] = (tableData[i].getTime() - StartTime.getTime())/86400000;
			tableData[i+1] = Number(tableData[i+1].substring(0, 5));
			document.getElementById('demo3').innerHTML = "or not to be";
		}

	function createTransform(domain, range){

		var domain_min = domain[0]
		var domain_max = domain[1]
		var range_min = range[0]
		var range_max = range[1]
	
		var alpha = (range_max - range_min) / (domain_max - domain_min)
		var beta = range_max - alpha * domain_max
	
		return function(x){
		}
		return alpha * x + beta;
	}
		
	  var xTransform = createTransform([200, 600], [horizontalMarge, widthVar - horizontalMarge]);
	  var yTransform = createTransform([-150, 250], [heightVar - verticalMarge, verticalMarge]);
      var canvas = document.getElementById('canvas');
      if (canvas.getContext) {
        var ctx = canvas.getContext('2d');


	// graph
	ctx.beginPath();
    ctx.moveTo(xTransform(tableData[0]), yTransform(tableData[1]));
	for(var i = 2; i < tableData.length; i += 2)
	{
		ctx.lineTo(xTransform(tableData[i]), yTransform(tableData[i+1]));
	}
    ctx.stroke();
    }
    	
	// axes
	ctx.beginPath();
    ctx.moveTo(75, 15);
	ctx.lineTo(75, 435);
	ctx.lineTo(850, 435);
	ctx.stroke();
	console.log("Hoi2!")
	
	var xReTransform = createTransform([horizontalMarge, widthVar - horizontalMarge], [200, 600]);
	var yReTransform = createTransform([heightVar - verticalMarge, verticalMarge], [-150, 250]);
	
	// y-as marks
	for(var k = 0; k < 8; k++)
	{
		ctx.font = '12px serif';
		ctx.fillText(yReTransform(20 + 60 * k)/10, 0, 20 + 60 * k);
		
		ctx.beginPath();
		ctx.moveTo(65, 15 + 60 * k);
		ctx.lineTo(75, 15 + 60 * k);
		ctx.stroke();
	}
	
	// x-as marks
	var months = ["1996", "August", "Semptember", "Oktober", "November", "December", "1997", "Februari", "March", "April", "May", "June", "July"]
	ctx.translate(0,475);
		
	for(var l = 0; l < months.length; l++)
	{
		ctx.translate(55,0);
		ctx.font = '12px serif';
		ctx.rotate((Math.PI / 180) * -30);
		ctx.fillText(months[l], 0, 0);
		ctx.rotate((Math.PI / 180) * 30);
		
		ctx.beginPath();
		ctx.moveTo(55, -40);
		ctx.lineTo(55, -30);
		ctx.stroke();
	}
}
	

	
	
	