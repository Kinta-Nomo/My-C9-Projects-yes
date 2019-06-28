var k = -4;

var angle = 0;
var paths = []
var moon;
var resolution = 5;

function Orbit(x,y,r,nth,parent) {
    this.x = x 
    this.y = y 
    this.r = r 
    this.nth = nth
    this.speed = radians(pow(k,this.nth-1))/resolution;
    this.parent = parent 
    this.earth = null
    this.angle = -PI/2;
    
    this.show = function(){
        stroke(255);
        strokeWeight(2);
        noFill();
        ellipse(this.x,this.y,this.r*2,this.r*2);
    }
    
    this.addearth = function(){
        var newx = this.x + this.r + this.r/3.0
        var newy = this.y
        this.earth = new Orbit(newx,newy,this.r/3.0,this.nth + 1,this)
        return this.earth
    }
    this.update = function(){
        if (this.parent != null){
            this.angle += this.speed;
            var sumdistance = this.r + this.parent.r
            this.x = this.parent.x + sumdistance * cos(this.angle);
            this.y = this.parent.y + sumdistance * sin(this.angle);
        }
    }
}

function setup(){
    noFill();
    createCanvas(600,600);
    background(150);
    sun = new Orbit(300,300,130,0,null)
    
    nextearth = sun
    for (var i = 0;i<50;i++){
        nextearth = nextearth.addearth()
    }
    //it's a moon though!
    end = nextearth
}

function draw(){
    background(150);
    
    
    current = sun
    while (current != null){
        current.update()
        current.show()
        current = current.earth
    }
    
    paths.push([end.x,end.y])
    
    beginShape();
    for (var i = 0;i<paths.length;i++){
        stroke(255,0,0)
        strokeWeight(3)
        vertex(paths[i][0],paths[i][1]);
    }
    endShape();
    
}