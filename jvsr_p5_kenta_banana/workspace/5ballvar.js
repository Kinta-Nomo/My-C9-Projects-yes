var myPosx  = 50
var myPosy  = 50
var diameter = 50

var circle = {
    myPosx  : 50,
    myPosy  : 50,
    diameter : 1
}

function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    background(51,200,10);
    circle.myPosx += 1
    circle.diameter += 1
    ellipse(circle.myPosx,circle.myPosy,circle.diameter,circle.diameter);
    
}