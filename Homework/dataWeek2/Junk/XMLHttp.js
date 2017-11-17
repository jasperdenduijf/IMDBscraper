  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
	console.log(this.readyState)
	console.log(this.status)
    if (this.readyState == 4 && this.status == 200) {
		var raw_data_1 = this.responseText;
      document.getElementById("rawdata").innerHTML = this.responseText;
	  draw();
    }
  };
  xhttp.open("GET", "http://127.0.0.1:8080/rawdata.txt", true);
  xhttp.send();