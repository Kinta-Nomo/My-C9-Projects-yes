function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    //weird planet
    background(55,55,55);
    fill(255,255,12);
    rect(0,270,400,130);
    
    //body
    fill(246,50,246);
    rect(180,200,40,100);
    
    //head
    fill(2,100,246,100)
    ellipse(200,200,80,80);
    
    //eyes
    fill(255,255,255);
    ellipse(183,200,17,20);
    ellipse(217,200,17,20);
    
    //right leg/foot
    line(180,300,170,310);
    
    //left leg/foot
    line(220,300,230,310);
}