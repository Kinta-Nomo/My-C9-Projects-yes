var Switch  = false
var clear = false

function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    background(0);
    if (Switch == false) {
        noStroke();
        textSize(15);
        fill(0,255,0);
        rect(322,5,50,30);
        fill(255);
        text("Start", 330, 25);
        if (mouseX > 322 && mouseX < 372 && mouseY > 5 && mouseY < 35) {
            if (mouseIsPressed) {
                Switch = true
            }
        }
    }
    rect(50,-1,50,390);
    if (mouseX > 50 && mouseX < 100 && mouseY > -1 && mouseY < 390) {
        Switch = false
    }
    rect(115,10,50,390);
    if (mouseX > 115 && mouseX < 165 && mouseY > 10 && mouseY < 400) {
        Switch = false
    }
    rect(180,-1,50,201);
    if (mouseX > 180 && mouseX < 230 && mouseY > -1 && mouseY < 200) {
        Switch = false
    }
    rect(180,205,50,195);
    if (mouseX > 180 && mouseX < 230 && mouseY > 205 && mouseY < 400) {
        Switch = false
    }
    rect(245,-1,50,395);
    if (mouseX > 245 && mouseX < 295 && mouseY > -1 && mouseY < 394) {
        Switch = false
    }
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        Switch = false
    }
    if (Switch == true ){
        if (mouseX > 0 && mouseX < 50 && mouseY > 0 && mouseY < 400){
            clear = true
        }
    }
    if (clear == true){
        background(0,255,0)
        textSize(50);
        fill(255);
        text("Clear!",135,100);
        fill(255,0,0);
        rect(150,150,100,50);
        fill(255);
        textSize(20);
        text("Reset", 170, 180);
        if (mouseX > 150 && mouseX < 250 && mouseY > 150 && mouseY < 200) {
            if (mouseIsPressed) {
                clear = false
                Switch = false
            }
        }
    }
}