
function setup(){
    createCanvas(400,400);
    print("im settuping!");
    background(155,15,155);
}

function draw(){
    //becomes a painting tool(caligraphy)
    if(mouseIsPressed) {
        noStroke();
        fill(255,255,0,100)
        ellipse(mouseX,mouseY,30,10);
    }
    //reset with any key
    if (keyIsPressed) {
        background(155,15,155);
    }
}