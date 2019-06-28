var rainY = 0
var RandomX = 50
var chancer = 0
var Kakuritu = 3

function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    RandomX = random(0,width);
    rainY = 0
    R = random(-400,400)
    while (rainY <= height){
        noFill();
        strokeWeight(9);
        stroke(200,200,200,200);
        arc(RandomX + 20,rainY + R + 20,60, 60, HALF_PI, PI);
        arc(RandomX,rainY + R,60, 60, HALF_PI, PI);
        if (Math.ceil(chancer) == 1){
            stroke((random(0,255)),(random(0,255)),random(0,255));
        }
        else {
            stroke(255,255,0);
        }
        arc(RandomX,rainY + R,60, 60, HALF_PI, PI);
        stroke(0);
        point(RandomX,rainY + R +30);
        rainY += 60
        chancer = random(0,Kakuritu)
    }
}