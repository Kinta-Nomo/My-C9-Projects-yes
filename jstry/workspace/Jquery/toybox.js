var banana = true;
var name = $('#cool').val();
var counter = 0;
var Switch = true;
var Switch2 = true;
var NinjaSwitch = true;
var class_value = "bold"
var Bchecked = false;
var Ichecked = false;
var Uchecked = false;
var ingrid = ["Sugar",0,"Flour",0,"Salt",0,"Egg",0,"milk",0,"Choco",0]
var dragswitch = 0;
var Pdate,Pday,Pmonth,Pyear
var logosin=[]
var correct;


function RDcounter(time, url) {
    var redirectinterval = setInterval(function(){
        $("#redirectcounter").text(time + ' seconds until redirecting to : ' + url)
        time -= 1
        if(time == 0){
            clearInterval(redirectinterval)
            window.location = url
        }
    },1000)
}


$(document).ready(function() {
    $(".table tr:even").addClass('highlight');
    var email_default = "Enter your email address..";
    var name_default = "Enter your name..";
    var search_default = "look for someone...";
    var text_max = 55
    var users=[]
    //
    var eventTime = Date.parse("12 December 2017") / 1000
    var currentTime = jQuery.now() / 1000;
    var secondsToGo = eventTime - currentTime
    var days = Math.floor(secondsToGo / (60 * 60 * 24))
    //
    
    
    $(".emoticon").click(function(){
        $("#comment").val($("#comment").val() + $(this).val())
    })
    
    $(window).scroll(function(){
        var top=$(window).scrollTop();
        $("#follow").css("top", top)
    })
    
    $("#add_more").click(function(){
        var current_count = $('input[type="file"]').length-1;
        $("#file_upload").prepend('<p><input type="file" name="file_' + current_count + 1 + '" /></p>')
    })
    //User interfaces + css
    $(".Plogos").draggable({ containment: "document", revert: true ,start:function(evt,ui){
        nowdraggedlogo = $(this)
    }})
    
    $("#dradrop").droppable({ hoverClass: 'dropborder' , eccept: '.Plogos', drop: function(){  
        if($(nowdraggedlogo).attr("moves") == "true"){
            logosin.push($(nowdraggedlogo).attr("id"))
            $(nowdraggedlogo).attr("moves",false)
        }
        $(nowdraggedlogo).draggable({ containment: "document", revert: false ,start:function(){
            nowdraggedlogo = $(this)
        } })
    },out: function(){
        $(nowdraggedlogo).animate({
            left: 0,
            top: 0
        }, 1000 );
        logosin.splice(logosin.indexOf($(nowdraggedlogo).attr("id")),1)
        $(nowdraggedlogo).attr("moves",true)
    } })
    
    // aspectRatio: true makes aspect ratio(can be fraction)
    $("#resize").resizable({ animate:true, animateDuration: 'normal', animateEasing: 'swing', ghost:true, handles: 'w,s,se',
                            maxHeight: 200,maxWidth: 300 ,minHeight: 20,minWidth: 20})
    
    //User interfaces
    $("#coolshelf,#anormousshelf").sortable({ containment:"document", tolerance: 'pointer', cursor: 'pointer',
                                            opacity: 0.60, connectWith: '#coolshelf,#anormousshelf', update: function(){
                                                //do something after sorted
                                            } });
    $("#drop").draggable({axis:'x,y', containment:'document', revert: true})
    $("#dropper").droppable(
    {over: function(){
        $("#dropper").attr("style","width: 200px; height: 200px; background-color: #cccccc")
    },out:function(){
        $("#dropper").attr("style","width: 200px; height: 200px; background-color: #f0f0f0")
    },drop: function(){
        $("#dropper").attr("style","width: 200px; height: 200px; background-color: #f0f0f0")
        alert('ouch')
    }, hoverClass: 'dropborder', tolerance: 'intersect', accept: '#drop'} )
    $("#drag").draggable({ axis:'x,y', containment:'document', cursor: 'pointer', opacity: 0.60, grid: [10,10]})
    //$("#dragheart").draggable({ axis:'x,y',containment:[x1, y1, x2, y2]})
    $("#dragheart").draggable({ axis:'x,y',containment:'parent'})
    $("#dragpenguin").draggable({ axis:'x,y',containment:'document',revert: true, revertDuration: 2000,
        start:function(){
            $("#penguinstate").html("?")
        }, 
        drag: function(){
            $("#penguinstate").html("stop dragging me!")
        },
        stop:function(){
            $("#penguinstate").html("sweet home..")
        }
    })
    
    //plugins
    $("#DHMS").countdownDHMS({ date:'13 November 2019 00:00:00'}, function(){
        alert('done!')
    });
    $("#highlighter").highlight({ color:'yellow', foreground: 'white'})
    
    setInterval(function(){
        $("#days_left").html(days + " days until Banana Party!!")
        $("#timenowMalaysia").html(Date(jQuery.now()).split('G')[0])
        $("#timenowMalaysia2").html(jQuery.now())
    })
    $("#pushuser").click(function(){
        if(jQuery.inArray($("#writeuser").val(),users) > -1){
            $("#pushdiv").html("oops! same names in database!")
            $("#writeuser").val("")
        }else{
            users.push($("#writeuser").val())
            $("#pushdiv").html("user successfully registered!")
            $("#writeuser").val("")
        }
    })
    $("#lookuser").click(function(){
        if(jQuery.inArray($("#checkuser").val(),users) > -1){
            $("#checkdiv").html("found!")
        }else{
            $("#checkdiv").html("mmm.. seems like " + $("#checkuser").val() + " is not registered!")
        }
    })
    
    //little error v.1788
    $("#scrollTAC").scroll(function(){
        var TACheight = $(this)[0].scrollHeight - $(this).innerHeight();
        console.log(Math.round(TACheight),Math.round($(this).scrollTop()))
        if (Math.round(TACheight) == Math.round($(this).scrollTop())){
            $("#agree").attr("disabled",false)
        }
        if (Math.round(TACheight)+1 == Math.round($(this).scrollTop())){
            $("#agree").attr("disabled",false)
        }
        if (Math.round(TACheight)-1 == Math.round($(this).scrollTop())){
            $("#agree").attr("disabled",false)
        }
    })
    //
    
    $("#go_top").click(function(){
        $("html, body").animate({scrollTop:0}, 1000)
    })
    
    $("#kitchen").keyup(function(){
        if(($(this).attr("minlength") > 0)  && ($(this).val().length) > ($(this).attr("minlength"))){
            $("#givefood").attr("disabled",false)
            $("#monster").html("('O'):Seems delicious!")
        }else{
            $("#givefood").attr("disabled",true)
            $("#monster").html("('O'):too little texts!")
        }
    })
    $("#givefood").click(function(){
        $("#givefood").attr("disabled",true)
        $("#monster").html("('O'):I am still a hungry monster! give me some food?")
        $("#kitchen").val("")
    })
    $('.fadegalary').css('opacity', '0.4');
    $('.fadegalary').mouseover(function(){
        $(this).fadeTo(100, 1)
        $('.fadegalary').not(this).fadeTo(100, 0.4)
    });
    $('.fadegalary').mouseleave(function(){
        $(this).fadeTo(100, 0.4)
    });
    //$('buttonexample').click(function(){
    //  $('#banana_slider').slideToggle(2000);
    //  )};
    $('#banana_slider').slideDown('slow');
    $('#banana_hide').click(function(){
        console.log('la')
        $('#banana_slider').slideUp('fast');
    })
    $('.impossibleul').each(function(){
        if ($(this).has('li').length == 0){
            $(this).after('There are no item in this list!');
        }
    })
    //$('.pinselect li:first').append('(first)') 
    $('.pinselect').find('li').first().append('(first)').click(function(){
        $(this).next().next().toggle();
    }).next().next().hide()
    $('.pinselect').find('li').first().next().append('(second!)').nextAll().addClass("italic")
    $('.pinselect li:last').append('(last)')
    $("#conbinename").click(function(){
        var combined_text = '';
        $('.namecreate').each(function(){
            combined_text += $(this).val() + ' ';
        })
        console.log(combined_text)
        $("#conbinediv").html(combined_text)
    })
    $('#Bold').click(function() {
        Bchecked = $(this).prop("checked");
    });
    $('#Italic').click(function() {
        Ichecked = $(this).prop("checked");
    });
    $('#Underline').click(function() {
        Uchecked = $(this).prop("checked");
    });
    $("#remainarea_feedback").html(text_max + "characters remaining!")
    $("#remainarea").keyup(function() {
        var textnow = ($("#remainarea").val()).length;
        var textremains = text_max - textnow;
    $("#remainarea_feedback").html(textremains + " characters remaining!")
    })
    $("#cloneme").on('click',null, function() {
        $(this).after('<input type="button" id="cloneme" value="clone me!" />')
    })
    $("#bold").bind("mouseenter",function() {
        alert("...!('v')")
    }) . bind("mouseleave" , function(){
        $(this).removeClass('bold');
        alert("!...('^')")
    });

    $("#file").change(function() {
        $("#upload").removeAttr("disabled")
    });
    $('input[type = "email"]').attr('value', email_default).focus( function(){
        if ($(this).val() == email_default) {
            $(this).attr('value', '');
        }
    }).blur(function(){
        if ($(this).val() == '') {
            $(this).attr('value', email_default);
        }
    });
    
    //same thing but with the name
    $('#name').attr('value', name_default).focus( function(){
        if ($(this).val() == name_default) {
            $(this).attr('value', '');
        }
    }).blur(function(){
        if ($(this).val() == '') {
            $(this).attr('value', name_default);
        }
    });
    
    //same thing but with the searcher
    $('#search_name').keyup(function() {
        search_name = $(this).val();
        $("#names li").removeClass('highlight2');
        if (search_name != '') {
            console.log(jQuery.trim(search_name))
            $("#names li").removeClass('highlight2');
            $("#names li:contains('" + search_name + "')").addClass('highlight2');
        } else {
            $("#names li").removeClass('highlight2');
        }
    });
    $('#search_name').attr('value', search_default).focus( function(){
        if ($(this).val() == search_default) {
            $(this).attr('value', '');
        }
    }).blur(function(){
        if ($(this).val() == '') {
            $(this).attr('value', search_default);
        }
    });
});

$("p:first").text('Hello')

alert(name);

var txt = $('#text').text();
alert(txt);

$("#textarea").focusin(function() {
    $(this).css('background-color', 'purple');
});
$("#textarea").focusout(function() {
    $(this).css('background-color', 'white');
});

$("#cool").focusin(function() {
    $(this).css('background-color', 'yellow');
    if (banana){
        alert('looks like you are trying to type in something!')
        var kenta = confirm('would you need any help?')
        banana = false
        counter=0
        if (kenta){
            alert('you use the, keyboard typer to type into that textbox!')
        } else{
            alert('ok...');
        }
    }
});
$("#cool").focusout(function() {
    name = $('#cool').val();
    counter += 1
    if (counter == 4){
        banana = true;
        $(this).css('background-color', 'white');
    }
});

$("#click").click(function() {
    alert(':{')
    alert(name);
    alert(txt);
})

$("#howdy").click(function() {
    if (Switch){
        Switch = false;
        $('P').css('background-color', 'white').css('color', 'black');
    }else {
        Switch = true;
        $('P').css('background-color', 'black').css('color', 'white');
    }
    
})

$("#1,#2").click(function() {
    alert('there are me');
})
$("#2").submit(function() {
    alert('you submitted your something!!');
})

$("#clickme").click(function() {
    $(this).attr('value','Please wait... im sleepy.');
})

$(".submit").click(function() {
    console.log('submit')
    $(this).attr('value','Please wait...');
    $(this).attr('disabled',true);
})
$("#name,#email,#Cemail").focusin(function() {
    $(this).css('background-color', 'yellow');
});
$("#name,#email,#Cemail").blur(function() {
    $(this).css('background-color', 'white');
});

//font changer

function change_size (element, size) {
    var current = parseInt(element.css('font-size'));
    if (size == 'smaller'){
        var new_size = current - 2;
    } else if (size == 'bigger'){
        var new_size = current + 2;
    }
    element.css('font-size', new_size + 'px');
    console.log('mm!')
}

$("#smaller").click(function() {
    change_size($('#Ftext'),'smaller');
    change_size($('#AFtext'),'smaller');
});
$("#bigger").click(function() {
    change_size($('#Ftext'),'bigger');
    change_size($('#AFtext'),'bigger');
});
$("#menuclick").dblclick(function() {
    if (Switch2){
        $('#text5').show()
        Switch2=false
    }else{
        $('#text5').hide()
        Switch2=true
    }
});
$("#selects").change(function() {
    alert('hellozzzzzz')
    var list_value = $(this).val();
    $("#list_feedback").html("you have selected " + list_value + "zzz!");
});

$("#lets_essay").scroll(function() {
    var scroll_pos = $(this).scrollTop();
    console.log(scroll_pos)
    $("#console_feedback").html('You have scrolled ' + Math.ceil(scroll_pos) + " rolls!");
});

$("#selectme").select(function() {
    $("#select_feedback").html("Stop selecting meeeeee!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}) .focusout(function() {
    $("#select_feedback").html("few...");
});

$(".hovers").mousemove(function(){
    var description = $(this).attr('hovertxt');
    $('#hoverdiv').html(description).show(); 
    $('#hoverdiv').css('top', event.clientY + $(window).scrollTop()-50).css('left',event.clientX+10);
}).mouseout(function(){
    $('#hoverdiv').hide(); 
});

$("#transformerhelper").click(function(){
    $("#transformer").removeClass()
    if (Bchecked == true){
        $("#transformer").addClass("bold");
    }
    if(Ichecked == true){
        $("#transformer").addClass("italic");
    }
    if(Uchecked == true){
        $("#transformer").addClass("underline");
    }
})

$('#hider').click(function() {
    // $('#ninjabird').fadeToggle(5000, 'linear' ,function(){
    //     alert('jutsu complete!')
    // });
    if (NinjaSwitch){
        //$('#ninjabird').fadeOut(1000,'linear', function(){
        $('#ninjabird').hide(1000,'linear', function(){
            alert('dissappear no jutsu!')
            $('#hider').val("Ninja show")
            NinjaSwitch = false;
        });
    }else{
        $('#ninjabird').fadeIn(2000,'linear', function(){
            alert('appear no jutsu!')
            $('#hider').val("Ninja hide")
            NinjaSwitch = true;
        });
    }
})
$('#jutsu_pauser').click(function(){
    $('#ninjabird').stop();
    alert('oi!')
})


$("#startgo").click(function(){
    $(this).attr("disabled",true)
    $('#miokurier').html("('&Delta;'):Good luck with your journey!")
    setTimeout(function(){
        $('#ikuer').html("(-_-):bi! I'll bring you a tacos!")
        setTimeout(function(){
             $('#ikuer').html("(-_-):")
             $('#ikuer').fadeOut().delay(3000).fadeIn()
             setTimeout(function(){
                 $('#ikuer').html("(-_-)/[^^^]:heres your tacos!")
                 setTimeout(function(){
                     $('#miokurier').html("('&Delta;'):thanks!!")
                 },4000)
             },1000)
        },3000)
    }, 3000)
})

$("#copybutton").click(function(){
    $(this).attr("disabled",true)
    $("#hakase").html("(@&#1044@):")
    $("#copyGuy").clone().appendTo("#hakase");
    setTimeout(function(){
        $("#copyGuy").html("( ' &#9637 ' ):Whaaaaaat!!??")
    },2000)
})

$(".ingridiments").click(function(){
    var ing = $(this).text()
    var itemselect = $(this).attr("id")
    if (itemselect == "Sugar"){
        ingrid[1] += 10
    }else if(itemselect == "Flour"){
        ingrid[3] += 50
    }else if(itemselect == "Salt"){
        ingrid[5] += 10
    }else if(itemselect == "Egg"){
        ingrid[7] += 1
    }else if(itemselect == "milk"){
        ingrid[9] += 50
    }else if(itemselect == "Choco"){
        ingrid[11] += 5
    }
    $("#recipie").append('<option>' + ing + '</option>')
})

$("#input_final_food").click(function(){
    $("#final_food").html($("#final").val())
    $("#recipieingrid").empty();
    for(var i = 0;i<ingrid.length/2;i++){
        if (ingrid[(i*2+1)] != 0){
            if (ingrid[(i*2)] == "milk"){
                $("#recipieingrid").append('<li>- ' + ingrid[(i*2+1)] + 'ml of ' + ingrid[(i*2)] + '</li>')
            }else if(ingrid[(i*2)] == "Egg"){
                $("#recipieingrid").append('<li>- ' + ingrid[(i*2+1)] +' '+ ingrid[(i*2)] + 's</li>')
            }else{
                $("#recipieingrid").append('<li>- ' + ingrid[(i*2+1)] + 'g of ' + ingrid[(i*2)] + '</li>')
            }
        }
    }
    ingrid = ["Sugar",0,"Flour",0,"Salt",0,"Egg",0,"milk",0,"Choco",0]
    $("#recipie").empty(0)
})

//Coder starts ajax and php around here!
$("#page_html_Load").click(function(){
    $("#contentLoad").load("/Jquery/files_to_load/page.html")
    setTimeout(function(){
        $("#page_html_Load").val("Oh! Nice strong text!")
    },3000)
})


//works with get as well
$("#httpbutton").click(function(){
    var name = $("#namepost").val()
    var httpstring = $("#stringrequest").val()
    $.post('/Jquery/files_to_load/reverse.php', { input: httpstring, phpname: name } , function(data){
        $("#reversefeedback").html(data)
    })
})

$("#newload").click(function(){
    $.ajax({
        //this works nicely when the file don't exist!
        url: '/Jquery/files_to_load/newpage.html',
        statusCode: {
            404: function(){
                $("#contentLoad2").html("errorno.404: page not find!")
            },
            403:function(){
                $("#contentLoad2").html("errorno.403: access denied!")
            },
            500:function(){
                $("#contentLoad2").html("errorno.500: proccessing failed!")
            }
        },
        success: function(data){
            alert("success!!!")
        $("#contentLoad2").html(data)
        },
        error: function(){
            alert("Oh.. my... Error..!?")
        },
        complete: function(){
            alert("I'm done with my job!")
        }
    })
})

//vid.106 - vid.110
function validate_email(email){
    //Mr.ajax and Ms.php
    $.post('/Jquery/files_to_load/emailvalidation.php', {email:email}, function(data){
        $("#validator").text(data);
    })
}

$("#validEmail").focusin(function(){
    if ($("#validEmail").val() == ""){
        $("#validator").text("You are going to type an email? good luck!")
    }else{
        validate_email($("#validEmail").val());
    }
}).blur(function(){
    $("#validator").text("")
}).keyup(function(){
    validate_email($("#validEmail").val());
})

$('#toggleSH').click(function() {
        if($(this).prop("checked")){
            $('#showhidepassword').clone().attr('type','text').insertAfter('#showhidepassword').prev().remove();
        }else{
            $('#showhidepassword').clone().attr('type','password').insertAfter('#showhidepassword').prev().remove();
        }
    });

function onclick(){
    console.log("sdkskdkjms")
}

$("#pluginlink").mousedown(function(){
    $(this).runaway("random",2)
})

$("#callthatback").click(function(){
    $("#pluginlink").remove()
    $("#callthatback").before('<a id="pluginlink" href="http://kidocode.com/" >nice place called CidoKode</a>')
})

$("#redbutton").click(function() {
    $(this).remove()
    $("#countdowner").countdown({ from:5 },function(){
        alert('boom!')
    })
    
})

$("#dragchanger").click(function(){
    if (dragswitch == 0){
        dragswitch = 1
        $("#drag").draggable( { axis:'y',containment:'document' } )
        $("#dragstate").html("y axis")
    }
    else if(dragswitch == 1){
        dragswitch = 2
        $("#drag").draggable( { axis:'x',containment:'document' } )
        $("#dragstate").html("x axis")
    }else if(dragswitch == 2){
        dragswitch = 0
        $("#drag").draggable( { axis:'x,y',containment:'document' })
        $("#dragstate").html("both x and y axis")
    }
})


//user interfaces
$("#profcontent").accordion( {icons:{ 'header':'ui-icon-plus', 'headerSelected':'ui-icon-minus' },
                                collapsible: true, active: false });
                                
$("#date").datepicker({ dateFormat:'mm-dd-yy', onSelect: function(){
    Pdate = $(this).datepicker('getDate'),
    Pday  = Pdate.getDate(),
    Pmonth = Pdate.getMonth(),              
    Pyear =  Pdate.getFullYear();
} })

$("#startdatepicked").click(function(){
    if(Pdate,Pday,Pmonth,Pyear != undefined){
        $("#startdatepicked").attr("disabled",true)
        $("#pickeddate").text("until " + String(Pdate,Pday,Pmonth,Pyear).split('G')[0] + "!  :)")
        $("#datepick").countdownDHMS({ date: String(Pdate,Pday,Pmonth,Pyear) }, function(){
        $("#startdatepicked").attr("disabled",false)
            alert('done!')
        })
    }
})
$("#save_snake").click(function(){
    //model: disables closing other window part than dialog
    $("#dialog").text("Snake successfully escaped from cactus fall!").dialog({ buttons: { 'Yay snakie':function(){
        $(this).dialog('close')
    } }, closeOnEscape: true, resizable: false });
    $("#snakestat").html("snake is saved!")
    $("#bananasnake").attr("src","/Jquery/saved snake.PNG")
})

$("#uploader").click(function(){
    $(this).attr("disabled","true")
    var val = 0
    var interval = setInterval(function(){
        val+=Math.round(Math.random(0,4))
        $("#progbar").progressbar({ value: val});
        $("#progpercentage").html(val + "%")
        if (val >= 100){
            clearInterval(interval)
            $("#uploader").attr("disabled",false)
        }
    },50)
})


var max_value = 400.0;

    $("#slider").slider({
        min: 0.0,
        max: max_value,
        step: parseFloat($("#multiples").val()) ,
        slide: function(event, ui) {
            $("#slider_value").html(ui.value)
        }
    })

$("#multiples").change(function() {
    $("#slider_value").html(0)
    $("#slider").slider({
        max: max_value,
        value:[0],
        //problem: step was string
        step: parseFloat($("#multiples").val()) ,
        slide: function(event, ui) {
            $("#slider_value").html(ui.value)
        }
    })
});

$("#multislider").slider({
    max: max_value,
    range:true,
    values:[20,40],
    //can be vertical
    orientation: "horizontal",
    slide: function(event, ui) {
        $("#multislider_value").html(ui.values[0] + ' to ' + ui.values[1])
    }
})

$("#tabs").tabs({
    ajaxOptions: {
        error: function(chr, index, status, anchor)
            {
                $(anchor.hash).text('Could not load page')
            }
    }, cookie: { expires: 2 } });
    
$("#programming_quiz").click(function(){
    correct = true
    if ((logosin.indexOf( "apple" ) >= 0)||(logosin.indexOf( "bootstrap" ) < 0)){
        correct = false
        console.log((logosin.indexOf( "apple" ) >= 0),(logosin.indexOf( "bootstrap" ) < 0))
        console.log(logosin)
    }
    if ((logosin.indexOf( "css" ) < 0)||(logosin.indexOf( "energysys" ) >= 0)){
        correct = false
        console.log("cssenergys")
        console.log(logosin)
    }
    if ((logosin.indexOf( "flask" ) < 0)||(logosin.indexOf( "html" ) < 0)){
        correct = false
        console.log("flaskhtml")
        console.log(logosin)
    }
    if ((logosin.indexOf( "joomla" ) < 0)||(logosin.indexOf( "pepsi" ) >= 0)){
        correct = false
        console.log("joomlapepsi")
        console.log(logosin)
    }
    if ((logosin.indexOf( "perl" ) < 0)||(logosin.indexOf( "python" ) < 0)){
        correct = false
        console.log("perlpython")
        console.log(logosin)
    }
    if ((logosin.indexOf( "razer" ) >= 0)||(logosin.indexOf( "ruby" ) < 0)){
        correct = false
        console.log("razerruby")
        console.log(logosin)
    }
    if (logosin.indexOf( "wordpress" ) < 0){
        correct = false
        console.log("wordpress")
        console.log(logosin)
    }
    
    if (correct){
        $("#follow").hide().fadeIn(1000).delay(2000).fadeOut(1000)
    }
})


$("#redirect").click(function(){
    RDcounter(10, 'https://www.google.co.uk');
})
    
$(".dinamlink").click(function(){
    var href = $(this).attr("href")
    $("#lunch_area").hide().load(href).fadeIn('normal')
    
    return false
})