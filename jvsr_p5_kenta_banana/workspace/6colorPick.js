var myPosx  = 50
var myPosy  = 50
var Myswitch = true
var Myswitch2 = true

function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    col1 = map(mouseX,0,400,0,255);
    col2 = map(mouseY,0,400,0,255);
    background(col1,255,col2);
    fill(255,255,255);
    ellipse(mouseX,mouseY,20,20);
}