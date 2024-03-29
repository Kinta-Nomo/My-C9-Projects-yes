
var range = [-10,10]
var step = 0.1

var complexRange = {
    x:[-100,100],
    y:[-100,100]
}

var result = [];

var scaler = [21,20]
var displacement = [-20,-100]

var dragged = false;
var beginPos = [0,0]
var beginDisplacement = displacement

function f(x){
    return (x**2);
}

function setup(){
    createCanvas(600,600);
    background(0);
    
    var x = range[0]
    while (x+step <= range[1]){
        x += step
        result.push([x, f(x)])
    }
}

function draw(){
    
    background(0);
    
    stroke(255);
    strokeWeight(3);
    
    translate(width/2, height/2);
    line(-width/2,displacement[1], width/2,displacement[1]);
    line(displacement[0],-height/2, displacement[0],height/2);
    
    strokeWeight(1)
    
    var xDisplacement = 0;
    if (displacement[0] < 0){
        xDisplacement = Math.abs(Math.abs(displacement[0]) - Math.abs(width/2))%scaler[0]
    }else if(displacement[0] >= 0){
        xDisplacement = Math.abs(Math.abs(displacement[0]) + Math.abs(width/2))%scaler[0]
    }
    
    if (scaler[1]>1){
        for (var i = 0; i<Math.ceil(width/scaler[0]); i++){
            line((-width/2+i*scaler[0])+xDisplacement, displacement[1]+3, (-width/2+i*scaler[0])+xDisplacement, displacement[1]-3)
        }
    }else{
        strokeWeight(7)
        line(-width/2, displacement[1], width/2, displacement[1]);
    }
    
    
    
    var yDisplacement = 0;
    if (displacement[1] < 0){
        yDisplacement = Math.abs(Math.abs(displacement[1]) - Math.abs(height/2))%scaler[1];
    }else if(displacement[1] >= 0){
        yDisplacement = Math.abs(Math.abs(displacement[1]) + Math.abs(height/2))%scaler[1];
    }
    
    if (scaler[1]>1){
        for (var i = 0; i<Math.ceil(height/scaler[1]); i++){
            line(displacement[0]+3, (-height/2+i*scaler[1])+yDisplacement, displacement[0]-3, (-height/2+i*scaler[1])+yDisplacement);
        }
    }else{
        strokeWeight(7)
        line(displacement[0], -height/2, displacement[0], height/2);
    }
    
    //-----//
    
    // console.log(result)
    strokeWeight(5)
    for (var i = 0; i<result.length-1; i++){
        line(result[i][0]*scaler[0]+displacement[0], -result[i][1]*scaler[1]+displacement[1], result[i+1][0]*scaler[0]+displacement[0], -result[i+1][1]*scaler[1]+displacement[1])
    }
    
    
    //-----//
    
    if (dragged){
        displacement[0] = beginDisplacement[0] + mouseX-beginPos[0];
        displacement[1] = beginDisplacement[1] + mouseY-beginPos[1];
    }
}

function mouseWheel(event) {
    if (event.delta>=0){
        // displacement[0]+=3
        scaler[0]-=scaler[0]/8; scaler[1]-=scaler[1]/8
    }else if(event.delta<0){
        // displacement[0]-=3
        scaler[0]+=scaler[0]/8; scaler[1]+=scaler[1]/8
    }
}

function mousePressed() {
    dragged = true;
    beginPos = [mouseX, mouseY];
    beginDisplacement = [displacement[0], displacement[1]];
}

function mouseReleased() {
    dragged = false;
}