var myPosx  = 50
var myPosy  = 50
var speed = 5
var speed2 = 2

function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    background(51,200,10);
    myPosx += speed;
    myPosy += speed2;
    fill(255);
    ellipse(myPosx,myPosy,50,50);
    if (myPosx > 400) {
        speed = -5;
    }
    if (myPosx < 0) {
        speed = 5;
    }
    if (myPosy > 400) {
        speed2 = -2;
    }
    if (myPosy < 0) {
        speed2 = 2;
    }
}