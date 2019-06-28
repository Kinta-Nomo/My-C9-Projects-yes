var myPosx  = 50
var myPosy  = 50
var speed = 5
var speed2 = 2

function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    background(0,250,270);
    myPosx += speed;
    myPosy += speed2;
    fill(255);
    ellipse(myPosx,myPosy,50,50);
    if(myPosy > 400) {
        speed2 = -2;
    }
    else if(myPosy < 0) {
        speed2 = 2;
    }
    
    if (mouseX > 300) {
        if (myPosx < 0) {
            speed = 20;  
        }
        else if (myPosx > 400){
            speed = -20;
        }
    }
    else if (mouseX > 200) {
        if (myPosx < 0) {
            speed = 8;  
        }
        else if (myPosx > 400){
            speed = -8;
        }
    }
    else if (mouseX > 100) {
        if (myPosx < 0) {
            speed = 4;  
        }
        else if (myPosx > 400){
            speed = -4;
        }
    }
    else if (mouseX > 0) {
        if (myPosx < 0) {
            speed = 2;  
        }
        else if (myPosx > 400){
            speed = -2;
        }
    }
}