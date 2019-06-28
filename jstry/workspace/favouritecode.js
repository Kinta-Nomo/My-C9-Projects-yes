var checker = false;
$("#submit").attr('disabled',true);
$("#submit").attr('value','You seems to have a problem!');
$("#nameD,#ageD,#jobD,#moviesD,#jobD,#usernameD,#passwordD,#emailD,#confirmpasswordD").css('visibility', 'hidden'); 

$("#name,#age,#movies,#job,#username,#Email,#Confirmpassword").focusin(function() {
    $(this).css('background-color', '#E0E0E0');
});

$("#name,#age,#movies,#job,#username,#Email,#Confirmpassword").focusout(function() {
    $(this).css('background-color', 'white');
});

function hasNumbers(t){
    var regex = /\d/g;
    return regex.test(t);
}
function allow(){
    $("#submit").attr('disabled',false);
    $("#submit").attr('value','Submit');
}
function unallow(){
    $("#submit").attr('disabled',true);
    $("#submit").attr('value','You seems to have a problem!');
}

function CheckPassword(thisO) {
    if ($(thisO).val().length < 5){
        $(thisO).css('background-color', '#ff0000');
        unallow()
        checker=false;
        $("#passwordD").css('visibility', 'visible'); 
        $("#passwordD").text('too short password');
    }else{
        if (hasNumbers($(thisO).val())==false){
            unallow()
            checker=false;
            $("#passwordD").css('visibility', 'visible'); 
            $("#passwordD").text('needs a number in a password!!');
        }else{
            if ($(thisO).val().length < 8){
                $(thisO).css('background-color', '#fd5400');
                $("#passwordD").css('visibility', 'visible'); 
                $("#passwordD").text('the password is too weak!');
            }
            else if ($(thisO).val().length < 10){
                $(thisO).css('background-color', '#ffa600');
                $("#passwordD").css('visibility', 'visible'); 
                $("#passwordD").text('the password is fine..');
            }
            else if ($(thisO).val().length < 15){
                $(thisO).css('background-color', '#ffff00');
                $("#passwordD").css('visibility', 'visible'); 
                $("#passwordD").text('the password is great!');
            }
            else if ($(thisO).val().length < 20){
                $(thisO).css('background-color', '#00ff00');
                $("#passwordD").css('visibility', 'visible'); 
                $("#passwordD").text('the password is super strong!!!');
            }
            else if ($(thisO).val().length > 30){
                $(thisO).css('background-color', '#006a0d');
                $("#passwordD").css('visibility', 'visible'); 
                $("#passwordD").text("Are you sure you can remember this!!?? It's almost like a sentence!");
            }
        }
    }
    
};


function checkage(this3) {
    if ($(this3).val().match(/^[0-9]+$/) == null) {
            $("#ageD").css('visibility', 'visible'); 
            $("#ageD").text("Do you know what's age???");
            unallow()
            checker = false;
    }else{
        if (parseInt($(this3).val()) > 100){
            $("#ageD").css('visibility', 'visible'); 
            $("#ageD").text("Unless you are android, your age seems to be too old!");
            unallow()
            checker = false;
        }
        else if (parseInt($(this3).val()) < 0){
            $("#ageD").css('visibility', 'visible'); 
            $("#ageD").text("Unless you are a fictional character, you can't be that little!");
            unallow()
            checker = false;
        }else{
            $("#ageD").css('visibility', 'hidden'); 
            $("#ageD").text("-"); 
        }
    }
};

function CheckCPassword(this2){
    console.log('function@!!!!!!!!!!!!!')
    if ($("#password").val() != $(this2).val()){
        unallow()
        checker = false;
        $("#confirmpasswordD").css('visibility', 'visible'); 
        $("#confirmpasswordD").text("doesn't match your password!");
    }else{
        $("#confirmpasswordD").css('visibility', 'hidden'); 
        $("#confirmpasswordD").text("-"); 
    }
};

function checkname(this5) {
    if (($(this5).val().replace(/\s/g, ''))==""){
        $("#nameD").css('visibility', 'visible'); 
        $("#nameD").text('You have a name right?!');
        unallow()
        checker = false;
    }else{
        $("#nameD").css('visibility', 'hidden'); 
        $("#nameD").text("-"); 
    }
};

function checkmovie(this8) {
    if (($(this8).val().replace(/\s/g, ''))==""){
        $("#moviesD").css('visibility', 'visible'); 
        $("#moviesD").text('You should have at least 1 movie you like!'); 
        unallow()
        checker = false;
    }else{
        $("#moviesD").css('visibility', 'hidden'); 
        $("#moviesD").text("-"); 
    }
};

function checkusername(this6) {
    if (($(this6).val().replace(/\s/g, ''))==""){
        $("#usernameD").css('visibility', 'visible'); 
        $("#usernameD").text('You need to have a username!'); 
        unallow()
        checker = false;
    }else{
        if (($(this6).val().includes(" ")==true)){
            console.log("You can't have a space in a username!")
            unallow()
            checker = false;
        }else{
            $("#usernameD").css('visibility', 'hidden'); 
            $("#usernameD").text("-"); 
        }
    }
};


function CheckEmail(this4){
    if (($(this4).val().includes("@")==false)||($(this4).val().includes(" ")==true)){
        unallow()
        $("#emailD").css('visibility', 'visible'); 
        $("#emailD").text("your email sounds weird!!"); 
        checker = false;
    }else{
        if(($(this4).val().includes(".com")==true)||($(this4).val().includes(".us")==true)){
            $("#emailD").css('visibility', 'hidden'); 
            $("#emailD").text("-"); 
        }else{
            $("#emailD").css('visibility', 'visible'); 
            $("#emailD").text("your email sounds weird!!"); 
        }
    }
};

function CheckJobs(this7){
    if (($(this7).val().replace(/\s/g, ''))==""){
        $("#jobD").css('visibility', 'visible'); 
        $("#jobD").text("you need to do something right? you can just make it up!"); 
        unallow()
        checker = false;
    }else{
        $("#jobD").css('visibility', 'hidden'); 
        $("#jobD").text("-"); 
    }
};


//kenta's filtering method
$(":input").keydown(function() {
    checker = true;
    checkage("#age");
    checkname("#name");
    checkusername("#username");
    checkmovie("#movies");
    CheckPassword("#password");
    CheckCPassword("#Confirmpassword");
    CheckEmail("#Email");
    CheckJobs("#job")
    if (checker == true){
        allow()
    }
});
$(":input").keyup(function() {
    checker = true;
    checkage("#age");
    checkname("#name");
    checkusername("#username");
    checkmovie("#movies");
    CheckPassword("#password");
    CheckCPassword("#Confirmpassword");
    CheckEmail("#Email");
    CheckJobs("#job")
    if (checker == true){
        allow()
    }
});



