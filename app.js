var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
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

function ShowDiv(show) {

	var allDives = document.getElementsByClassName('section');
	var target = document.getElementById(show);

	for(var i = 0 ; i < allDives.length ; i++){
		allDives[i].style.display = 'none';
	}

	target.style.display = 'block';

}
function checkPassword(str)
{
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
	//todo
	/*
	var uName = $('#rusername').value;
	var uPSW = $("#rpassword").value;
	var uFullName = $("#rfullname").value;
	var uEmail = $("#remail").value;
	var uDate = $("#datepicker").value;
	*/
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
}
function checkLoginForm(message){
	//var username = document.getElementById("username").value;
	//var password = document.getElementById("password").value;
	var userName = $("#LoginUN").value;
	var Password = $("#LoginPW").value;
	var pswTocheck = localStorage.getItem(userName)
	if ( pswTocheck === null && Password===pswTocheck){
		//create new window with "Login succesfuly!"
		//show game screen
		document.getElementById(message).style.display = "none";
		ShowDiv('GameScreen');
	}
	else {
		document.getElementById(message).style.display= "inline"
	}

}

function RandomProperties(){

}