var context;
var shape = new Object(); // pacman location
var board; // game matrix
var score; 
var pac_color; 
var start_time;
var time_elapsed;
var interval; 
var divToShow = "Welcome";
var Monsters = [new Object() , new Object() , new Object() , new Object()]
var Lives;
var keyCodeUp= "";
var keyCodeDown= "";
var keyCodeRight= "";
var keyCodeLeft= "";
var numOfBalls;
var userName = "";
var gameProperties = []; 
//0:up,1:upCode,2:down,3:downCode:,4:right,5:rightCode,6:left,7:leftCode
//8:numBalls,9:color5P,10:color15P,11:color25P,12:time,13:monsters,14:Lives
var userInfo = [];


$(document).ready(function() {
	context = canvas.getContext("2d");
	context.fillStyle = "blue";
	ShowDiv('Welcome')
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
	board = new Array(); // init game
	score = 0;
	pac_color = "yellow";
	var monsIndex = 0;
	var cnt = 300; //  מאפשר לנו להגדיר אחוזים מסויימים בהמשך
	var food_remain = 50; // כמה אוכל רוצים שיהיה בלוח צריך לשנות את זה לפי ההגדרות אחכ
	var pacman_remain = 1; // כמה פעמים נרצה לאתחל את הפאקמן במהלך המשחק בצורה רנדומית (משמש אותנו בשביל לצייר בפעם הראשונה כרגע)
	var monst_remain = 3; // צריך לשנות לפי ההגדרות למספר המפלצות שהמשתמש הכניס
	start_time = new Date(); 
	if(userName != ""){
		food_remain = parseInt(gameProperties[8]);
		monst_remain = parseInt(gameProperties[13]);
	}
	numOfBalls = food_remain;
	for (var i = 0; i < 21; i++) {
		board[i] = new Array(); // יוצרים את המערך הדו מימדי 
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 12; j++) {
			/************* Put walls In Game Board************/
			if (
				(i == 3 && j == 0) ||
				(i == 3 && j == 1) ||
				(i == 3 && j == 2) ||
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 3 && j == 6) ||
				(i == 3 && j == 7) ||
				(i == 3 && j == 8) ||
				(i == 3 && j == 9) ||
				(i == 3 && j == 10) ||
				(i == 3 && j == 11) ||
				(i == 0 && j == 3) ||
				(i == 1 && j == 3) ||
				(i == 2 && j == 3) ||
				(i == 3 && j == 3) ||
				(i == 4 && j == 3) ||
				(i == 5 && j == 3) ||
				(i == 6 && j == 3) ||
				(i == 7 && j == 3) ||
				(i == 8 && j == 3) ||
				(i == 9 && j == 3) ||
				(i == 10 && j == 3) ||
				(i == 11 && j == 3) ||
				(i == 12 && j == 3) ||
				(i == 13 && j == 3) ||
				(i == 14 && j == 3) ||
				(i == 15 && j == 3) ||
				(i == 16 && j == 3) ||
				(i == 17 && j == 3) ||
				(i == 18 && j == 3) ||
				(i == 19 && j == 3) ||
				(i == 20 && j == 3)
			) {
				board[i][j] = 4;
				/************* Put Monster in Corners *************/
			} else if( (i==0 && j==0) ||
						(i==20 && j==0) ||
						(i==0 && j==11) ||
						(i==20 && j==11) ) {
				if (monst_remain > 0) {
					Monsters[monsIndex].i = i;
					Monsters[monsIndex].j = j;
					monst_remain--;
					monsIndex++;
					board[i][j] = 3.1;
				}
			}
			else{
				/************* Put food randomly *************/
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					let randomFood = Math.floor((Math.random() * 3) + 1); // random integer from 1 to 3
					let foodNum = 1.0 + randomFood/10; //1.1 or 1.2 or 1.3
					board[i][j] = foodNum;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					/************* Put Pacman randomly *************/
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2.1;
				}else{
					board[i][j] = 0;
				}
			}
			cnt--;
		}
	}

	
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		let randomNum = Math.floor(Math.random() * 3) + 1; // random integer from 1 to 3 
		let foodNum = 1 + randomNum/10; //1.1 or 1.2 or 1.3
		board[emptyCell[0]][emptyCell[1]] = foodNum;
		food_remain--;
	}

	keysDown = {}; // הגדרת מילון עם שני איבנט ליסנר
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
	var i = Math.floor(Math.random() * 20 + 1);
	var j = Math.floor(Math.random() * 11 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 20 + 1);
		j = Math.floor(Math.random() * 11 + 1);
	}
	return [i, j];
}
function GetKeyPressed() {
	if (keysDown[keyCodeUp]) {
		return 1;
	}
	if (keysDown[keyCodeDown]) {
		return 2;
	}
	if (keysDown[keyCodeLeft]) {
		return 3;
	}
	if (keysDown[keyCodeRight]) {
		return 4;
	}
}
function DrawCircleProp(){
	var canvas = document.getElementById('circle');
	if (canvas.getContext){
		var ctx = canvas.getContext('2d'); 
		var X = canvas.width*3/4;
		var Y = canvas.height/3;
		var R = 10;
		ctx.beginPath();
		ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
		ctx.strokeStyle = gameProperties[9];
		ctx.fillStyle = gameProperties[9];
  		ctx.fill();
		ctx.stroke();
		ctx.fillText("    5P",canvas.width*3/5,50);
		var X = canvas.width*2/4;
		var Y = canvas.height/3;
		var R = 10;
		ctx.beginPath();
		ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
		ctx.strokeStyle = gameProperties[10];
		ctx.fillStyle = gameProperties[10];
  		ctx.fill();
		ctx.stroke();
		ctx.fillText("  15P",canvas.width *2/5,50);

		var X = canvas.width/4;
		var Y = canvas.height/3;
		var R = 10;
		ctx.beginPath();
		ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
		ctx.strokeStyle = gameProperties[11];
		ctx.fillStyle = gameProperties[11];
  		ctx.fill();
		ctx.stroke();
		ctx.fillText("25P",canvas.width/5,50);

	}
}
function Draw() {
	canvas.width = canvas.width; //clean board
	/************ Show Property Part ************/
	lblScore.value = score;
	lblTime.value = time_elapsed;
	DrawCircleProp();

	document.getElementById('lblButtonsU').value = "" + gameProperties[0];
	keyCodeUp = gameProperties[1];
	document.getElementById('lblButtonsD').value = "" + gameProperties[2];
	keyCodeDown = gameProperties[3];
	document.getElementById('lblButtonsR').value = "" + gameProperties[4];
	keyCodeRight = gameProperties[5];
	document.getElementById('lblButtonsL').value = "" + gameProperties[6];
	keyCodeLeft = gameProperties[7];

	document.getElementById('lblTimeT').value = "" + gameProperties[12];
	document.getElementById('lblBalls').value = "" + gameProperties[8];
	document.getElementById('lblMonsters').value = "" + gameProperties[3];

	var imageup=document.createElement("img");	
	var imagedown=document.createElement("img");	
	var imageright=document.createElement("img");	
	var imageleft=document.createElement("img");
	var imageMons1=document.createElement('img');
	var imageMons2=document.createElement('img');
	var imageMons3=document.createElement('img');
	var imageMons4=document.createElement('img');
	var imageWall = document.createElement('img');

	imageup.onload=function(){
		context.drawImage(imageup,center.x,center.x,50,50);
	}
	imageup.src="PacmanImages\\mortiU.png";
	imagedown.src="PacmanImages\\mortiD.png";
	imageright.src="PacmanImages\\mortiR.png";
	imageleft.src="PacmanImages\\mortiL.png";
	imageMons1.src="MonstersAndWall\\mons1.png";
	imageMons2.src="MonstersAndWall\\mons2.png";
	imageMons3.src="MonstersAndWall\\mons3.png";
	imageMons4.src="MonstersAndWall\\mons4.png";
	imageWall.src="MonstersAndWall\\potal.png";

	var monsters = [imageMons1 , imageMons2 , imageMons3 , imageMons4];
	let ind = 0;


	/************* Show Game Part *************/
	for (var i = 0; i < 21; i++) {
		for (var j = 0; j < 12; j++) {
			var center = new Object();
			center.x = i*60;
			center.y = j*60;
			/************* Drow Pacman *************/
			if (board[i][j] == 2.1) {
				context.drawImage(imageup,center.x,center.y,50,50); //UP
			}else if(board[i][j] == 2.2){
				context.drawImage(imagedown,center.x,center.y,50,50); //DOWN
			} else if(board[i][j] == 2.3){
				context.drawImage(imageleft,center.x,center.y,50,50); //LEFT
			} else if(board[i][j] == 2.4){
				context.drawImage(imageright,center.x,center.y,50,50); //RIGHT
			/*************Drow Monsters***************/
			} else if(board[i][j] == 3.1 || board[i][j] == 4.2 ||
				board[i][j]== 4.3 || board[i][j]== 4.4){
				context.drawImage(monsters[ind],center.x,center.y,50,50); //Monst
				ind++;
			}
			else if (board[i][j] == 1.1) {
			/************* Drow Food 5P *************/
				context.beginPath();
				context.arc(center.x+15, center.y+15, 20, 0, 2 * Math.PI); // circle
				context.fillStyle = gameProperties[9]; //color 5P
				context.fill();
			} else if(board[i][j]==1.2){
			/************* Drow Food 15P *************/
				context.beginPath();
				context.arc(center.x+15, center.y+15, 20, 0, 2 * Math.PI); // circle
				context.fillStyle = gameProperties[10]; //color 15P
				context.fill();	
			}else if(board[i][j]==1.3){
			/************* Drow Food 25P *************/
				context.beginPath();
				context.arc(center.x+15, center.y+15, 20, 0, 2 * Math.PI); // circle
				context.fillStyle = gameProperties[11]; //color 25P
				context.fill();
			}else if (board[i][j] == 4) {
			/************* Drow Wall *************/
				context.drawImage(imageWall,center.x,center.y,50,50); //Wall
			}
		}
	}
}
function UpdatePosition() {

	let pacManDirection = board[shape.i][shape.j];
	board[shape.i][shape.j] = 0; //clean pacman
	var x = GetKeyPressed(); //get pressed key
	if (x == 1) { //up
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			if(board[shape.i][shape.j - 1] == 3.1 || board[shape.i][shape.j - 1] == 4.2 ||
				board[shape.i][shape.j - 1] == 4.3 || board[shape.i][shape.j - 1] == 4.4){
				score -= 10;
				Lives--;
				Start();
				return;
			}
			shape.j--;
			pacManDirection=2.1;
		}
	}
	if (x == 2) { //down
		if (shape.j < 11 && board[shape.i][shape.j + 1] != 4 ) {
			if(board[shape.i][shape.j + 1] == 3.1 ||board[shape.i][shape.j + 1] == 4.2 ||
				board[shape.i][shape.j + 1] == 4.3 ||board[shape.i][shape.j + 1] == 4.4 ){
				score -= 10;
				Lives--;
				Start();
				return;
			}
			shape.j++;
			pacManDirection=2.2;
		}
	}
	if (x == 3) { //left
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			if(board[shape.i - 1][shape.j] == 3.1 || board[shape.i - 1][shape.j] == 4.2 ||
				board[shape.i - 1][shape.j] == 4.3 || board[shape.i - 1][shape.j] == 4.4){
				score -= 10;
				Lives--;
				Start();
				return;
			}
			shape.i--;
			pacManDirection=2.3;
		}
	}
	if (x == 4) { //right
		if (shape.i < 20 && board[shape.i + 1][shape.j] != 4) {
			if(board[shape.i + 1][shape.j] == 3.1 || board[shape.i + 1][shape.j] == 4.2 ||
				board[shape.i + 1][shape.j] == 4.3 || board[shape.i + 1][shape.j] == 4.4){
				score -= 10;
				Lives--;
				Start();
				return;
			}
			shape.i++;
			pacManDirection=2.4;
		}
	}

	/********************************************Draw Monsters*************************************************/
	let numOfMonsters = parseInt(gameProperties[13]);
	for(let k = 0 ; k < numOfMonsters ; k++){
		board[Monsters[k].i][Monsters[k].j] -= 3.1;
		let p =Math.floor( Math.random() * 4 +1 );
		if (p == 1) { //up
			if (Monsters[k].j > 0 && board[Monsters[k].i][Monsters[k].j - 1] != 4) {
				if(board[Monsters[k].i][Monsters[k].j - 1] == 2.1 || board[Monsters[k].i][Monsters[k].j - 1] == 2.2 ||
					board[Monsters[k].i][Monsters[k].j - 1] == 2.3 || board[Monsters[k].i][Monsters[k].j - 1] == 2.4){
					score -= 10;
					Lives--;
					Start();
					return;
				}
				else{
					Monsters[k].j--;
					board[Monsters[k].i][Monsters[k].j] += 3.1;
				}

			}
		}
		if (p == 2) { //down
			if (Monsters[k].j < 11 && board[Monsters[k].i][Monsters[k].j + 1] != 4) {
				if(board[Monsters[k].i][Monsters[k].j + 1]== 2.1 || board[Monsters[k].i][Monsters[k].j + 1] == 2.2 ||
					board[Monsters[k].i][Monsters[k].j + 1] == 2.3 || board[Monsters[k].i][Monsters[k].j + 1] == 2.4){
					score -= 10;
					Lives--;
					Start();
					return;
				}
				else{
					Monsters[k].j++;
					board[Monsters[k].i][Monsters[k].j] += 3.1;
				}
			}
		}
		if (p == 3) { //left
			if (Monsters[k].i > 0 && board[Monsters[k].i - 1][Monsters[k].j] != 4) {
				if(board[Monsters[k].i - 1][Monsters[k].j] == 2.1 || board[Monsters[k].i - 1][Monsters[k].j] == 2.2 ||
					board[Monsters[k].i - 1][Monsters[k].j] == 2.3 || board[Monsters[k].i - 1][Monsters[k].j] == 2.4){
					score -= 10;
					Lives--;
					Start();
					return;
				}
				else{
					Monsters[k].i--;
					board[Monsters[k].i][Monsters[k].j] += 3.1;
				}
			}
		}
		if (p == 4) { //right
			if (Monsters[k].i < 20 && board[Monsters[k].i + 1][Monsters[k].j] != 4) {
				if(board[Monsters[k].i + 1][Monsters[k].j] == 2.1 || board[Monsters[k].i + 1][Monsters[k].j] == 2.2 ||
					board[Monsters[k].i + 1][Monsters[k].j] == 2.3 || board[Monsters[k].i + 1][Monsters[k].j] == 2.4){
					score -= 10;
					Lives--;
					Start();
					return;
				}
				else{
					Monsters[k].i++;
					board[Monsters[k].i][Monsters[k].j] += 3.1;
				}
			}
		}
	}
	/**********************************************Finish*****************************************************/

	if (board[shape.i][shape.j] == 1.1) {
		score+=5; // אם זה אוכל תעלה את הניקוד
		numOfBalls--;
	}else if (board[shape.i][shape.j] == 1.2) {
		score+=15; // אם זה אוכל תעלה את הניקוד
		numOfBalls--;
	}else if (board[shape.i][shape.j] == 1.3) {
		score+=25; // אם זה אוכל תעלה את הניקוד
		numOfBalls--;
	}
	if(!(shape.i<0 || shape.j<0 || shape.i>20 ||shape.j>11)){
		board[shape.i][shape.j] = pacManDirection; // נרצה לצבוע מחדש את הקאנבס, גם אם הצלחתי להתקדם וגם אם לא
	}

	var currentTime = new Date(); 
	time_elapsed = (currentTime - start_time) / 1000; // מעדכן את הזמן שעבר
	var timer = parseInt(gameProperties[12]);
	if(time_elapsed >= timer || Lives == 0){
		return showRegModel('gameOverDialog');
	}
	if(score == TotalScore){
		return showRegModel('"winnerDialog"');
	}
	//if (score >= 20 && time_elapsed <= 10) {
	//	pac_color = "green";
	//}
	// if (score == 50) {
	// 	window.clearInterval(interval);
	// 	window.alert("Game completed");
	// } else {
	Draw();
	// }
}

function CloseGOWDialog(type , modelName){
	if(type == '1'){
		var modal = document.getElementById(modelName);
		modal.style.display = "none";
		divToShow = "GameScreen";
		ShowDiv("GameScreen");
	}
	if(type == '2'){
		var modal = document.getElementById(modelName);
		modal.style.display = "none";
		divToShow = "Welcome";
		ShowDiv("Welcome");
	}
}
 /********************************************** LogIn ***************************************************/
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
			gameProperties = localStorage.getItem(userP).split(';');
			//gameProperties = localStorage.getItem(userP) ? JSON.parse(localStorage.getItem(userP)) : []
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
function SaveMonsters(id){
	var num = document.getElementById(id).value;
	if(validNumberMonst('monst-error')){
		gameProperties.push(num);
		saveUserAndProp();
		ShowDivInProp('startGame');
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
function closeStartGameModel(){
	var modal = document.getElementById("startGame"); 
	modal.style.display = "none";
	ShowDiv("GameScreen");
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
	//gameProperties.push(3); //Lives
	Lives = 3;
	var userAndPr = userName+" Properties";
	console.log(userName);
	console.log(userAndPr);
	//localStorage.setItem(userName, userInfo);
	var result = gameProperties.join(';');
	//console.log(result);
	localStorage.setItem(userAndPr ,result );
}
/******************************************* game Prop ********************************************/
//done  - logIn modal dialog - we fix it like RegisterModel
//done -  להציג את הגדרות בדף של המשחק
//done - להוסיף שהכפתורים שנבחרו הם אלה שזזים 
//done - להוסיף את הכדורים עם הצבעים שנבחרו כשהם נאכלים, הניקוד משתנה בהתאם לניקוד של הכדור


//todo - כפתור ראנדום הוא אמר בסוף השעות קבלה משהו לא ברור על הכפתור
//todo - לצייר את המבוך של הפאקמן


//todo - מפלצות שנעות בצורה רנדומלית במשחק - עינצצצ

