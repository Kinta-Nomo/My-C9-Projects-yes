var Switch = true
var shake = 5

function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    background(255)
    fill(255)
    //head
    ellipse(200,200,100,100);
    //eyes
    line(160,185,185,185)
    line(215,185,240,185)
    //mouth
    ellipse(200,220,10,7);
    if (mouseIsPressed) {
        if (Switch){
            background(0,255,0)
        }
        else {
            background(255,0,0);
        }
        ellipse(200+shake,200,100,100);
        ellipse(175+shake,180,20,30);
        ellipse(225+shake,180,20,30);
        rect(180+shake,210,40,20)
        if (Switch){
            Switch = false
        }
        else {
            Switch = true
        }
        if (shake == 5){
            shake = -5
        }
        else {
            shake = 5
        }
    }
}