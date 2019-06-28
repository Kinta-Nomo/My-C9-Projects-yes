
var Scale = 4;
var points = []

var real = {
    x:0.01,
    y:0,
    z:0
}

var constants = {
    Sigma:10,
    Rho:28,
    Beta:8.0/3.0
}

function setup(){
    createCanvas(500,500)
    background(0)
    colorMode(HSB);
}

function draw(){
    //every draw is 1 unit of time
    var dt = 0.01;
    var dx = (constants.Sigma * (real.y - real.x))*dt
    var dy = (real.x * (constants.Rho - real.z) - real.y)*dt
    var dz = ((real.x*real.y) - (constants.Beta*real.z))*dt
    
    real.x = real.x + dx
    real.y = real.y + dy
    real.z = real.z + dz
    
    stroke(255)
    strokeWeight(2)
    //point(real.x*Scale+100,real.y*Scale+200,real.z*Scale)
    points.push([real.x*Scale+200,real.y*Scale+200,real.z*Scale])
    
    
    var hue = 0;
    beginShape()
    for (var i = 0;i<points.length;i++){
        noFill();
        stroke(hue,255,255)
        strokeWeight(0.2)
        vertex(points[i][0],points[i][1])//,points[i][2])
        hue+=0.2
        if (hue > 255){
            hue = 0
        }
    }
    endShape()
    
}