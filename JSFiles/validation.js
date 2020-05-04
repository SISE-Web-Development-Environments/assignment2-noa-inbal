$(function() {

    $.validator.addMethod('strongPassword',function(value,element){
        return this.optional(element)
            || value.length >=6
            && value.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\,\.\?\\\'\`\~\{\}\[\]\|\-]/) == -1
            && value.search(/[^a-zA-Z0-9]/) == -1 ;
    },"The password should be at least 6 characters long, only numbers and letters");

    $.validator.addMethod('validateName',function(value,element){
        return this.optional(element)
            || /^[a-zA-Z]+ [a-zA-Z]+$/.test(value);
    },"Please enter valid full name - only letters and white space")

    $.validator.addMethod('validateMail',function(value,element){
        return this.optional(element)
            || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    },"Please Enter your valid mail")

    $('#signinform').validate({
        rules: {
            rusername:{
                required : true,
                minlength : 2
            },
            rfullname:{
                required : true,
                validateName : true
            },
            rpassword:{
                required: true,
                strongPassword: 2
            },
            remail: {
                required: true,
                email : true,
                validateMail: true
            },
            rdate: {
                required : true,
                date: true
            }
        },
        messages: {
            remail:{
                required: "Your mail is required",
                email: "Your email address must be in the format of name@domain.com"
            },
            rpassword:{
                required: "Password is required",
                minlength: "Please enter at least 6 characters"
            }
        }
    });
});

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
	if(form.rusername.value == "" || form.rusername.value.length <2){
		form.rusername.focus();
		return false;
	}

  fullNameValid = /^[a-zA-Z]+ [a-zA-Z]+$/;
  if(form.rfullname.value == "" || !fullNameValid.test(form.rfullname.value)) {
	form.rfullname.focus();
	return false;
  }
  if(form.rpassword.value == "" || !checkPwd(form.rpassword.value)) {
	form.rpassword.focus();
	return false;
  }

  emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(form.remail.value == "" || !emailValid.test(form.remail.value)){
	form.remail.focus();
	return false;
  }
  if(form.rdate.value == ""){
	form.rdate.focus();
	return false;
	}
  return true;
}
function saveUser(){
	if(!checkForm(document.forms["registerform"])){
		document.forms["registerform"].focus();
		return false;
	}
	var uName = document.forms["registerform"]["rusername"].value;
	console.log(uName);
	var uPSW = document.forms["registerform"]["rpassword"].value;
	var uFullName = document.forms["registerform"]["rfullname"].value;
	var uEmail = document.forms["registerform"]["remail"].value;
	var uDate = document.forms["registerform"]["datepicker"].value;
	var info = uName + ',' + uPSW + ',' + uFullName + ',' + uEmail + ',' + uDate
	console.log(info);
	localStorage.setItem(uName , info)
	userName = uName;
	return showRegModel('registerDialog');
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
            if(localStorage.getItem(userP) == null){
                divToShow = "Properties";
                return ShowDiv("Properties");
            }
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