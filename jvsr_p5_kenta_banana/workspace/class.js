let bubble1;
let bubble2;

function setup(){
    createCanvas(400,400); 
    print("im settuping!");
    bubble1 = new shake(170,185)
    bubble2 = new shake(227,185)
}

function draw(){
    background(0)
    fill(0,216,255)
    ellipse(360,5,200,200);
    fill(5, 198, 12)
    ellipse(300,15,40,20);
    fill(253, 255, 242)
    //head
    ellipse(200,200,100,100);
    fill(255)
    //eyes
    line(160,185,185,185)
    line(215,185,240,185)
    //mouth
    ellipse(200,220,10,7);
    fill(163,253,255,200)
    bubble1.show();
    bubble2.show();
}

class shake {
    constructor(x,y){
        this.x = x
        this.y = y
    }
    show() {
        this.x += random(-3,3);
        this.y += random(-3,3);
        stroke(0);
        ellipse(this.x,this.y,20,20)
    }
}