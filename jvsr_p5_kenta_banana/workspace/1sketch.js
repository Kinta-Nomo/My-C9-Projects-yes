var myMoney = 0
function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    myMoney+=1.00;
    background(51,0,208);
    ellipse(200,200,50,50);
    console.log(myMoney);
}