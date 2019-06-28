var points=[]

var x;
var y;
var z;
var lx;
var lz;

var angle = 0
var speed = 1
var step=0


function setup(){
    createCanvas(500,500,500)
    background(0)
    x = width/2-10
    y = height/2+100
    z = 0
}

function draw(){
    //background(0)
    stroke(255)
    point(x,y,z)
    noFill()
    
    step+=1
    angle+=0.1
    
    y-=1
    lx=x+sin(angle)*50
    lz=z+cos(angle)*50
    x=x+sin(angle)*2
    z=z+cos(angle)*2
    
    if (step % 35 === 0){
        var stat = true
    }else{
        var stat = false
    }
    
    points.push([x,y,z,stat,lx,lz])
    
    beginShape()
    for (var i = 0;i<points.length;i++){
        vertex(points[i][0],points[i][1])
        if (points[i][3]==true){
            strokeWeight(10)
            stroke(0,150,0)
            line(points[i][0],points[i][1],points[i][4],points[i][1])
            //point(points[i][4],points[i][1],points[i][5])
            stroke(255)
            strokeWeight(2)
        }
    }
    endShape()
}
