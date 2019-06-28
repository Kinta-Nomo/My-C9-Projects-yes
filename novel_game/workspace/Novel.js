
var canvasWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var canvasHeight = (window.innerHeight > 0) ? window.innerHeight : screen.Height;

var padding = canvasHeight/15
var padding2 = canvasHeight/25

var state = "dialoge"
var currentChapter = "chapter1"


var currentLetter = 0;
var textTimer = null;

var currentTextIndex = 0
var currentText = ""
var originalSelectedText  = ""
var selectedText  = ""
var textLayer = 0

var backImage;

var choice = []

function setup(){
    createCanvas((canvasHeight/225)*300,canvasHeight);
    background(0);
    
    backImage = bedroom
}

function draw(){
    image(backImage, padding, padding, (canvasHeight/225)*300-(2*padding), canvasHeight-(2*padding))
    drawDialoge()
    drawButton()
    if (state == "choice"){
        drawChoice()
    }
}


function drawDialoge(){
    fill(250,250,255)
    rect(padding2,canvasHeight/1.5,(canvasHeight/225)*300-(2*padding2),canvasHeight-(canvasHeight/1.4),30)
    
    textSize(canvasHeight/28)
    fill(0)
    textLayer = 0
    originalSelectedText = selectedText
    while (selectedText.length > 0){
        if (selectedText.length > 30){
            text(selectedText.slice(0, 30), padding2 + (padding2*2),canvasHeight/1.44 + (canvasHeight/20) +(textLayer*(canvasHeight/19)))
            selectedText = selectedText.slice(30, selectedText.length)
        }else{
            text(selectedText, padding2 + (padding2*2),canvasHeight/1.44 + (canvasHeight/20) +(textLayer*(canvasHeight/19)))
            selectedText = ""
        }
        textLayer+=1
    }
    selectedText = originalSelectedText
}

function drawChoice(){
    for (var i in choice){
        fill(0,0,200,180);
        rect(((canvasHeight/225)*300)/2-(padding*4),canvasHeight/2.9+(i*canvasHeight/6)-((choice.length*canvasHeight/6-canvasHeight/12)/2),padding*8,canvasHeight/12)
        fill(255);
        textSize(canvasHeight/28)
        text(choice[i][0], ((canvasHeight/225)*300)/2-(canvasHeight/28*choice[i][0].length/2),canvasHeight/2.9+(i*canvasHeight/6+canvasHeight/20)-((choice.length*canvasHeight/6-canvasHeight/12)/2))
        // rect(canvasWidth/2-(padding*10/2),(canvasHeight/2-(padding2/10))*i,padding*10,padding2/5)
    }
}

var a = canvasWidth/8
function drawButton(){
    textFont(buttonFont);
    textSize(canvasHeight/35)
    fill(0)
    text("skip", padding*4, canvasHeight/1.1)
    text("auto", padding*4+(a*1), canvasHeight/1.1)
    text("save", padding*4+(a*2), canvasHeight/1.1)
    text("load", padding*4+(a*3), canvasHeight/1.1)
    text("log", padding*4+(a*4), canvasHeight/1.1)
    textFont("Georgia");
}


function touchEnded() {
    if (state == "choice"){
        for (var i in choice){
            if (mouseX > ((canvasHeight/225)*300)/2-(padding*4) && mouseX < ((canvasHeight/225)*300)/2-(padding*4)+padding*8){
                if(mouseY > canvasHeight/2.9+(i*canvasHeight/6)-((choice.length*canvasHeight/6-canvasHeight/12)/2) && mouseY < canvasHeight/2.9+(i*canvasHeight/6)-((choice.length*canvasHeight/6-canvasHeight/12)/2)+canvasHeight/12){
                    //rect(((canvasHeight/225)*300)/2-(padding*4),canvasHeight/2.9+(i*canvasHeight/6)-((choice.length*canvasHeight/6-canvasHeight/12)/2),padding*8,canvasHeight/12)
                    currentTextIndex = dialoge[currentChapter].indexOf(choice[i][1])
                    state = "dialoge"
                    
                    //do not open this box. It is forbitten//
                    if (typeof(dialoge[currentChapter][currentTextIndex])=="object" && dialoge[currentChapter][currentTextIndex][0] == "select"){
                        choice = []
                        for (var i = 1; i < dialoge[currentChapter][currentTextIndex].length; i++){
                            choice.push(dialoge[currentChapter][currentTextIndex][i])
                        }
                        state = "choice"
                    }else{
                        if (textTimer == null){
                            if (typeof(dialoge[currentChapter][currentTextIndex])!="string"){
                                backImage = dialoge[currentChapter][currentTextIndex]
                                currentTextIndex+=1
                            }
                            currentText = dialoge[currentChapter][currentTextIndex]
                            currentLetter = 0
                            textTimer = setInterval(function(){
                                if (currentLetter <= currentText.length){
                                    selectedText = currentText.slice(0,currentLetter)
                                    currentLetter += 1
                                }else{
                                    clearInterval(textTimer)
                                    textTimer = null
                                }
                            },2)
                            currentTextIndex+=1
                        }
                    }
                    //do not open this box. It is forbitten//
                    
                    break
                }
            }
        }
    }else{
        if (typeof(dialoge[currentChapter][currentTextIndex])=="object" && dialoge[currentChapter][currentTextIndex][0] == "select"){
            choice = []
            for (var i = 1; i < dialoge[currentChapter][currentTextIndex].length; i++){
                choice.push(dialoge[currentChapter][currentTextIndex][i])
            }
            state = "choice"
        }else{
            if (textTimer == null){
                if (typeof(dialoge[currentChapter][currentTextIndex])!="string"){
                    backImage = dialoge[currentChapter][currentTextIndex]
                    currentTextIndex+=1
                }
                currentText = dialoge[currentChapter][currentTextIndex]
                currentLetter = 0
                textTimer = setInterval(function(){
                    if (currentLetter <= currentText.length){
                        selectedText = currentText.slice(0,currentLetter)
                        currentLetter += 1
                    }else{
                        clearInterval(textTimer)
                        textTimer = null
                    }
                },2)
                currentTextIndex+=1
            }
        }
    }
    
}