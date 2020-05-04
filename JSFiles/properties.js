/********************************************* Properties ************************************************/
function ShowDivInProp(show){
	var allDives = document.getElementsByClassName('PropSection');
	var target = document.getElementById(show);
	for(var i = 0 ; i < allDives.length ; i++){
		allDives[i].style.display = 'none';
	}
	target.style.display = 'block';
}
function RandomProperties(){
	var x = Math.random();
	var y= Math.random();
	var balls =  Math.floor(x*40 + 50);
	var monsters =  Math.floor(x*3 + 1);
	var time =  Math.floor((x*120) + (y*240) + 60);
	var colors = ["" , "" , ""];
	for( i = 0 ; i < 3 ; i++){
		var create = true;
		var color = "";
		while(create){
			x = Math.floor(Math.random()*255);
			y= Math.floor(Math.random()*255);
			var z = Math.floor(Math.random()*255);
			color = "rgb(" + x + "," + y + "," + z + ")"
			create = false;
			for(j = 0 ; j <= i ; j++){
				if(color == colors[i]){
					create = true;
				}
			}
		}
		colors[i] = color;
	}
	gameProperties.push("ArrowUp");
	gameProperties.push(38);
	gameProperties.push("ArrowDown");
	gameProperties.push(40);
	gameProperties.push("ArrowRight");
	gameProperties.push(39);
	gameProperties.push("ArrowLeft");
	gameProperties.push(37);
	gameProperties.push(balls);
	gameProperties.push(colors[0]);
	gameProperties.push(colors[1]);
	gameProperties.push(colors[2]);
	gameProperties.push(time);
	gameProperties.push(monsters);
	saveUserAndProp();
	ShowDivInProp('startGame');

}
/************************************* Properties - balls ***************************************/
function SaveBalls(){
	var num = document.getElementById('numBalls').value;
	if(validNumBalls('balls-error')){
		gameProperties.push(num);
		document.getElementById('cp').style.display = "inline";
	}
}
function validNumBalls(message){
	var num = document.getElementById("numBalls").value;
	if (num.match(/^[0-9]+$/) != null){
		var x = parseInt(num);
		if(50 <= x && x <= 90){
			document.getElementById(message).style.display = "none";
			return true;
		}
	}
	document.getElementById(message).style.display = "inline";
	return false;
}
function submitBalls(message){
	var color5 = document.getElementById("color1").style.background;
	var color15 = document.getElementById("color2").style.background;
	var color25 = document.getElementById("color3").style.background;
	var colors = [color5 , color15 , color25];
	if ( color5 === color15 || color5 === color25 || color15 === color25){
		document.getElementById(message).style.display = "inline"
	}
	else{
		document.getElementById(message).style.display = "none"
		for(var i=0 ; i < 3 ; i++){
			gameProperties.push(colors[i]);
		}
		ShowDivInProp('GameTime');
	}
}
/************************************* Properties - time ***************************************/
function SaveTime(){
	var num = document.getElementById('timer').value;
	if(validTimer('time-error')){
		gameProperties.push(num);
		ShowDivInProp('Monsters');
	}
}
function validTimer(message) {
	var num = document.getElementById("timer").value;
	if (num.match(/^[0-9]+$/) != null){
		var x = parseInt(num);
		if(x >= 60){
			document.getElementById(message).style.display = "none";
			return true;
		}
	}
	document.getElementById(message).style.display = "inline";
	return false;
}
/************************************* Properties - Monsters ***************************************/
function SaveMonsters(id){
	var num = document.getElementById(id).value;
	if(validNumberMonst('monst-error')){
		gameProperties.push(num);
		saveUserAndProp();
		ShowDivInProp('startGame');
	}
}
function validNumberMonst(message) {
	var num = document.getElementById("monst").value;
	if (num.match(/^[0-9]+$/) != null){
		var x = parseInt(num);
		if(x >= 1 && x <= 4){
			//document.getElementById(message).style.display = "none";
			return true;
		}
	}
	document.getElementById(message).style.display = "inline";
	return false;
}
/************************************* Properties - color ***************************************/
function ColorPickerDisplay(){
	document.getElementById("balls1").style.display = "none"
	document.getElementById("balls2").style.display = "block"
	var input1 = document.querySelectorAll("input");
	var input2 = document.querySelectorAll("input");
	var input3 = document.querySelectorAll("input");

	for(var i = 0; i < input1.length; i++){
		input1[i].addEventListener("input" , function () {
			var red = document.getElementById("red1").value,
				green = document.getElementById("grn1").value,
				blue = document.getElementById("blu1").value;
			var display = document.getElementById("color1");
			display.style.background = "rgb(" + red + ", " + green + ", " + blue + ")"

		})

		input2[i].addEventListener("input" , function () {
			var red = document.getElementById("red2").value,
				green = document.getElementById("grn2").value,
				blue = document.getElementById("blu2").value;
			var display = document.getElementById("color2");
			display.style.background = "rgb(" + red + ", " + green + ", " + blue + ")"

		})

		input3[i].addEventListener("input" , function () {
			var red = document.getElementById("red3").value,
				green = document.getElementById("grn3").value,
				blue = document.getElementById("blu3").value;
			var display = document.getElementById("color3");
			display.style.background = "rgb(" + red + ", " + green + ", " + blue + ")"

		})
	}
}
/************************************* Properties - button ***************************************/
function showBotton(event , pId) {
	var x = event.key;
	if(pId=="rightBotton"){
		keyCodeRight = event.keyCode;
	}
	else if(pId=="leftBotton"){
		keyCodeLeft = event.keyCode;
	}else if(pId=="upBotton"){
		keyCodeUp = event.keyCode;
	}else if(pId=="downBotton"){
		keyCodeDown = event.keyCode;
	}
	document.getElementById(pId).value = "" + x;
}
/**
 * save buttons only afer validation
 */
function SaveButtonMoves(){
	var right = document.getElementById("rightBotton").value;
	var left = document.getElementById("leftBotton").value;
	var  up = document.getElementById("upBotton").value;
	var down = document.getElementById("downBotton").value;

	if(right == "" || left == "" || down == "" || up == "" ||
	 right == left || right == up || right == down || left == up || left == down || up == down){
		document.getElementById('key-error').style.display = "inline";
		window.location.hash = '#MoveButtoms';
		return false;
	}
	else{
		var next = document.getElementById("next");

		document.getElementById('key-error').style.display = "none";
		gameProperties=[];
		gameProperties.push(up);
		gameProperties.push(keyCodeUp);
		gameProperties.push(down);
		gameProperties.push(keyCodeDown);
		gameProperties.push(right);
		gameProperties.push(keyCodeRight);
		gameProperties.push(left);
		gameProperties.push(keyCodeLeft);

		next.style.visibility = "visible";
		window.location.hash = '#MoveButtoms';
		return true;
	}
	
}
/**
 * save the connected user globaly and save his property with his name to local storage
 */
function saveUserAndProp(){
	let userAndPr = userName+" Properties";
	let result = gameProperties.join(';');
	localStorage.setItem(userAndPr ,result );
}