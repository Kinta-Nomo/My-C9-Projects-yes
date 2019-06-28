bu = []
var q
q = 0
var r = 0
var g = 0
var b = 0

function setup(){
    createCanvas(400,400); 
    print("im settuping!");
}
    
function draw(){
    background(255)
    r = random(0,255)
    g = random(0,255)
    b = random(0,255)
    bu[q] = new shake(200,200,[r,g,b,random(0,200)]) 
    for (let i = 0; i <= q;i++){
        bu[i].show()
    }
    q+=1
}

class shake {
    constructor(x,y,col){
        this.x = x
        this.y = y
        this.colour = col
    }
    show() {
        this.x += random(-7,7);
        this.y += random(-7,7);
        stroke(0);
        fill(this.colour[0],this.colour[1],this.colour[2],this.colour[3])
        ellipse(this.x,this.y,20,20)
    }
}