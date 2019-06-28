
//radius of the rods
var r1 = 200;
var r2 = 200;

//mass of the bobs
var m1 = 30;
var m2 = 30;

//angles of the rods
var a1 = 3.141;
var a2 = 3.13;

//velocity
var a1_v = 0;
var a2_v = 0;

//gravity
var g = 1;

//points of vertex
var points = []

function setup(){
    createCanvas(1000,1000);
}

function draw(){
    var num1 = -g * (2 * m1 + m2) * sin(a1);
    var num2 = -m2 * g * sin(a1-2*a2);
    var num3 = -2 * sin(a1-a2)*m2;
    var num4 = a2_v*a2_v*r2+a1_v*a1_v*r1*cos(a1-a2);
    var den = r1 * (2*m1+m2-m2*cos(2*a1-2*a2));
    var a1_a = (num1 + num2 + num3*num4) / den;
    
    
    num1 = 2 * sin(a1-a2);
    num2 = (a1_v*a1_v*r1*(m1+m2));
    num3 = g * (m1 + m2) * cos(a1);
    num4 = a2_v*a2_v*r2*m2*cos(a1-a2);
    den = r2 * (2*m1+m2-m2*cos(2*a1-2*a2));
    
    var a2_a = (num1*(num2+num3+num4)) / den;
    
    background(255);
    stroke(0);
    strokeWeight(2);
    
    //offset the 0,0
    translate(width/2, height/2);
    
    //calculating the position of the bob from angle
    var x1 = r1 * sin(a1);
    var y1 = r1 * cos(a1);
    
    var x2 = x1 + r2 * sin(a2);
    var y2 = y1 + r2 * cos(a2);
    
    //draw lines and bobs
    line(0,0,x1,y1);
    fill(0);
    ellipse(x1,y1,m1,m1);
    
    line(x1,y1,x2,y2);
    fill(0);
    ellipse(x2,y2,m2,m2);
    
    a1_v += a1_a;
    a2_v += a2_a;
    a1 += a1_v;
    a2 += a2_v;
    
    points.push([x2,y2])
    
    beginShape();
    for (var i = 0;i<points.length;i++){
        noFill();
        stroke(0);
        strokeWeight(2);
        vertex(points[i][0],points[i][1]);
    }
    endShape();
}