var point = {
    x: random(0,400),
    y: random(0,400)
}

function setup(){
    createCanvas(400,400);
    print("im settuping!");
    background(0);
}

function draw(){
    point.x = random(0,width)
    point.y = random(0,height)
    fill(random(0,255),random(0,255),random(0,255),random(0,200));
    ellipse(point.x,point.y,20,20);
}