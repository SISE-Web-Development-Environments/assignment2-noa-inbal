$(function() {

    $.validator.addMethod('strongPassword',function(value,element){
        return this.optional(element)
            || value.length >=6
            && value.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\,\.\?\\\'\`\~\{\}\[\]\|\-]/) == -1
            && value.search(/[^a-zA-Z0-9]/) == -1 ;
    },"your passs is not good at all!!!")

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
                minlength: "Please enter at least 2 characters"
            }
        }
        // submitHandler: function(form){
        //     form.submit();
        // }
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
	var uName = document.forms["registerform"]["rusername"].value;//.getElementById('#rusername').value;
	console.log(uName);
	var uPSW = document.forms["registerform"]["rpassword"].value;//getElementById("#rpassword").value;
	var uFullName = document.forms["registerform"]["rfullname"].value;//getElementById("#rfullname").value;
	var uEmail = document.forms["registerform"]["remail"].value;//getElementById("#remail").value;
	var uDate = document.forms["registerform"]["datepicker"].value;//getElementById("#datepicker").value;
	var info = uName + ',' + uPSW + ',' + uFullName + ',' + uEmail + ',' + uDate
	console.log(info);
	localStorage.setItem(uName , info)
	userName = uName;
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
