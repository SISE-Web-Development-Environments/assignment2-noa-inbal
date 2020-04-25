var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var divToShow = "Welcome";

var userName = "";
var gameProperties = [];
var userInfo = [];


$(document).ready(function() {
	context = canvas.getContext("2d");
	context.fillStyle = "blue";

	ShowDiv('GameScreen')
	console.log(divToShow)
});

function ShowDiv(show) {
	var allDives = document.getElementsByClassName('section');
	var allModals = document.getElementsByClassName('modal')
	var target = document.getElementById(show);
	for(var i = 0 ; i < allDives.length ; i++){
		allDives[i].style.display = 'none';
	}
	for(var i = 0 ; i < allModals.length ; i++){
		allModals[i].style.display = 'none';
	}
	target.style.display = 'block';
	if(show == "GameScreen"){
		Start();
		window.location.hash = '#GameScreen';
	}
	if(show === 'Properties'){
		ShowDivInProp('introProperties');
	}
}

function Start() {
	// ShowDiv("Welcome");
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}
/********************************************** game ***************************************************/

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	var arrow  =  gameProperties[0];
	console.log(arrow);
	document.getElementById('lblButtonsU').value = "" + gameProperties[0];
	document.getElementById('lblButtonsD').value = "" + gameProperties[1];
	document.getElementById('lblButtonsR').value = "" + gameProperties[2];
	document.getElementById('lblButtonsL').value = "" + gameProperties[3];
	document.getElementById('lblTimeT').value = "" + gameProperties[8];
	document.getElementById('lblBalls').value = "" + gameProperties[4];


	document.getElementById('lblMonsters').value = "" + gameProperties[8];


	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}
 /********************************************** SignIn ***************************************************/
/*function checkPassword(str) {
	// at least one number, one lowercase and one uppercase letter
    // at least six characters that are letters, numbers or the underscore
  var passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  return passwordValid.test(str);
}
function checkUserName(str) {
	if (localStorage.getItem(str)===null){
		return (true);
	}
	return (false);
}

 */

function checkPwd(str) {
    if (str.length < 6) {
        return(false);
    }else if (str.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\,\.\?\\\'\`\~\{\}\[\]\|\-]/) != -1) {
        return(false);
	}
	else if(str.search(/[^a-zA-Z0-9]/) != -1){
		return(false);
	}
    return(true);
}
function checkForm(form){
	if(form.rusername.value == ""){
		form.rusername.focus();
		return false;
	}

  fullNameValid = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if(form.rfullname.value == "" || !fullNameValid.test(form.rfullname.value)) {
	//alert("Error: full name must contain only letters and white space"+form.rfullname.value);
	//document.getElementsById("rfullname-error").style.display = "inline";
	form.rfullname.focus();
	return false;
  }
  if(form.rpassword.value == "" || !checkPwd(form.rpassword.value)) {
	// alert("Error pass");
	form.rpassword.focus();
	return false;
  }

  emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(form.remail.value == "" || !emailValid.test(form.remail.value)){
	//alert("Error email");
	form.remail.focus();
	return false;
  }
  if(form.rdate.value == ""){
	form.rdate.focus();
	return false;
	}
  return true;
}
function validatePass(value, message) {
	var isValid;
	if (value.length < 6) {
        isValid = false;
    }else if (value.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\,\.\?\\\'\`\~\{\}\[\]\|\-]/) != -1) {
        isValid = false;
	}
	else if(value.search(/[^a-zA-Z0-9]/) != -1){
        isValid = false;
	}
    else{
		isValid = true;
	}

    if (isValid) {
        document.getElementById(message).style.display = "none";
    }else {
        document.getElementById(message).style.display= "inline";
    }
    return isValid;
}
function validateMail(value, message) {
	emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var isValid = emailValid.test(value)
    
    if (isValid) {
        document.getElementById(message).style.display = "none";
    }else {
        document.getElementById(message).style.display= "inline";
    }
    return isValid;
}
function validateName(value, message) {
	fullNameValid = /^[a-zA-Z]+ [a-zA-Z]+$/;
	var isValid = fullNameValid.test(value)
    
    if (isValid) {
        document.getElementById(message).style.display = "none";
    }else {
        document.getElementById(message).style.display= "inline";
    }
    return isValid;
}
function saveUser(){
	if(!checkForm(document.forms["registerform"])){
		document.forms["registerform"].focus();
		return false;
	}
	var uName = document.forms["registerform"]["rusername"].value;//.getElementById('#rusername').value;
	console.log(uName);
	var uPSW = document.forms["registerform"]["rpassword"].value;//getElementById("#rpassword").value;
	var uFullName = document.forms["registerform"]["rfullname"].value;//getElementById("#rfullname").value;
	var uEmail = document.forms["registerform"]["remail"].value;//getElementById("#remail").value;
	var uDate = document.forms["registerform"]["datepicker"].value;//getElementById("#datepicker").value;
	var info = uName + ',' + uPSW + ',' + uFullName + ',' + uEmail + ',' + uDate
	console.log(info);
	localStorage.setItem(uName , info)
	
	return showRegModel('registerDialog');

}
function showRegModel(modelName){
	// Get the modal
	var modal = document.getElementById(modelName);
	modal.style.display = "block";

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		//   modal.style.display = "none";
		  CloseRegDialog();
	}
	return false;
}
function CloseRegDialog() {
	var modal = document.getElementById("registerDialog"); 
	modal.style.display = "none";
	divToShow = "Properties";
	ShowDiv("Properties");
}
 /********************************************** LogIn ***************************************************/
 function checkLoginForm(message){
	userName = document.getElementById('LoginUN').value;
	console.log("in login");
	console.log(userName);
	let userP = userName+" Properties";
	var PassWord = document.getElementById('LoginPW').value;
	var info = localStorage.getItem(userName);
	if(info === null){
		document.getElementById(message).style.display= "inline"
	}
	else{
		var pswToCheck = info.split(',')[1];
		if ( PassWord === pswToCheck){
			document.getElementById(message).style.display = "none";
			gameProperties = localStorage.getItem(userP) ? JSON.parse(localStorage.getItem(userP)) : []
			return showLogModel("loginDialog")			
		}
		else{
			document.getElementById(message).style.display= "inline";
		}
	}
	divToShow = "Login";
	console.log(divToShow)
}
function showLogModel(modelName){
	// Get the modal
	var modal = document.getElementById(modelName);
	modal.style.display = "block";

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		//   modal.style.display = "none";
		  CloseLogDialog();
	}
	return false;
}
function CloseLogDialog() {
	var modal = document.getElementById("loginDialog"); 
	modal.style.display = "none";
	divToShow = "GameScreen";
	ShowDiv("GameScreen");
}
 /********************************************** About ***************************************************/

function showModel(modelName) {

	// Get the modal
	var modal = document.getElementById(modelName);
	modal.style.display = "block";

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
  		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
  		if (event.target == modal) {
    		modal.style.display = "none";
  		}
	}
}
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

}
function SaveBalls(){
	var num = document.getElementById('numBalls').value;
	if(validNumBalls('balls-error')){
		gameProperties.push(num);
		document.getElementById('cp').style.display = "inline";
	}
}
function SaveTime(){
	var num = document.getElementById('timer').value;
	if(validTimer('time-error')){
		gameProperties.push(num);
		ShowDivInProp('Monsters');
	}
}
function SaveMonsters(id , show){
	//var num = document.getElementById(id).value;
	//if(validNumberMonst('monst-error')){
	//	gameProperties.push(num);
		saveUserAndProp();
		ShowDivInProp('startGame');
	//}
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
function validNumberMonst() {
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
function closeStartGameModel(){
	var modal = document.getElementById("startGame"); 
	modal.style.display = "none";
	ShowDiv("GameScreen");
}
/************************************* Properties - button ***************************************/

function showBotton(event , pId) {
	var x = event.key;
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
		gameProperties.push(down);
		gameProperties.push(right);
		gameProperties.push(left);
	
		console.log(gameProperties);
		console.log(gameProperties[0]);
		console.log(gameProperties[1]);
		console.log(gameProperties[3]);

		next.style.visibility = "visible";
		window.location.hash = '#MoveButtoms';
		return true;
	}
	
}
/**
 * save the connected user globaly and save his property with his name to local storage
 */
function saveUserAndProp(){
	var userAndPr = userName+" Properties";
	console.log(userName);
	console.log(userAndPr);
	localStorage.setItem(userName, userInfo);
	localStorage.setItem(userAndPr ,JSON.stringify(gameProperties) );
}
/******************************************* game Prop ********************************************/



//todo - saveMonstare or validNumberMonst with errors we need to fix it - עינצצצצ
//done  - logIn modal dialog - we fix it like RegisterModel
/// להציג את הגדרות בדף של המשחק
// כפתור ראנדום
// לצייר את המבוך של הפאקמן
// להקטין את הפיקסלים במשחק כי הם גדולים מידי
// להוסיף שהכפתורים שנבחרו הם אלה שזזים 
// להוסיף את הכדורים עם הצבעים שנבחרו
// מפלצות שנעות בצורה רנדומלית במשחק - עינצצצ

