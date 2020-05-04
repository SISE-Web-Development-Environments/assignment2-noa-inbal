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
/********************************************** Login **************************************************/
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
/******************************************** Register *************************************************/
function showRegModel(modelName){
	// Get the modal
	var modal = document.getElementById(modelName);
	modal.style.display = "block";
    if(modelName == 'TimeOverDialog'){
        if(score < 100){
			$( '#inputScore').empty();
            $( '#inputScore').append( "<strong>You are better than " + score.toString() + " points!</strong>" );
        }
	}
	else if(modelName == 'winnerDialog'){
		$( '#inputScoreWin').empty();
        $( '#inputScoreWin').append( "<strong>Your score : " + score.toString() + " points!</strong>" );
    }
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
/********************************************** Game ***************************************************/
function closeStartGameModel(){
	var modal = document.getElementById("startGame"); 
	modal.style.display = "none";
	ShowDiv("GameScreen");
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