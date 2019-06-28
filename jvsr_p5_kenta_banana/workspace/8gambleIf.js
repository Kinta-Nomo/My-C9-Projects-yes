
var poi = 200
console.log(poi)

function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    background(0);
    noStroke();
    textSize(15);
    fill(255);
    text("5Points", 10, 20);
    text("10Points", 110,20);
    text("15Points", 210, 20);
    text("20Points", 310, 20);
    stroke(255)
    if (mouseX > poi) {
        fill(255,0,0)
    }
    if (mouseX < poi) {
        fill(0)
    }
    ellipse(200,200,60,60)
}
