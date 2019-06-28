
var range = [-5,5]
var step = 0.5

var complexRange = {
    x:[-10,10],
    y:[-10,10]
}

//to 1000
var progression = 0
var time = 100

var result = [];

var scaler = [21,20]
var displacement = [-20,-100]

var dragged = false;
var beginPos = [0,0]
var beginDisplacement = displacement

function f(x){
    return math.multiply(x, x);
}

function setup(){
    createCanvas(600,600);
    background(0);
    
    
    // //simple
    // var x = range[0]
    // while (x+step <= range[1]){
    //     x += step
    //     result.push([x, f(x)])
    // }
    
    var x = complexRange.x[0]
    while (x+step <= complexRange.x[1]){
        var y = complexRange.y[0]
        while (y+step <= complexRange.y[1]){
            y += step
            var answer = f(math.complex(x,y))
            result.push({
                original:[x,y],
                after:[math.re(answer), math.im(answer)]
            })
        }
        x += step
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
    
    strokeWeight(5)
    // // simple
    // for (var i = 0; i<result.length-1; i++){
    //     line(result[i][0]*scaler[0]+displacement[0], -result[i][1]*scaler[1]+displacement[1], result[i+1][0]*scaler[0]+displacement[0], -result[i+1][1]*scaler[1]+displacement[1])
    // }
    
    //complex
    stroke(255,0,0)
    for (var i = 0; i<result.length; i++){
        var difference = [(result[i].after[0] - result[i].original[0])/time, (result[i].original[1] - result[i].after[1])/time]
        // point(result[i][0]*scaler[0]+displacement[0], -result[i][1]*scaler[1]+displacement[1])
        // point(result[i].original[0]*scaler[0]+displacement[0], -result[i].original[1]*scaler[1]+displacement[1])
        // point(result[i].after[0]*scaler[0]+displacement[0], -result[i].after[1]*scaler[1]+displacement[1])
        point((result[i].original[0]+(difference[0]*progression))*scaler[0]+displacement[0], (-result[i].original[1]+(difference[1]*progression))*scaler[1]+displacement[1])
    }
    
    //-----//
    
    if (dragged){
        displacement[0] = beginDisplacement[0] + mouseX-beginPos[0];
        displacement[1] = beginDisplacement[1] + mouseY-beginPos[1];
    }
    
    if (progression < time){
        progression+=1
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