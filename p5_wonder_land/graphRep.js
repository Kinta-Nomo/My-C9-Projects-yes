
var range = [-5,5]
var step = 0.05

// var complexRange = {
//     x:[1.2,9],
//     y:[-4,4]
// }

//stretched out part of riemann
var complexRange = {
    x:[1.2,4],
    y:[-2,2]
}


//to 1000
var progression = 0
var time = 100

var result = [];

var scaler = [60,60]
var displacement = [-20,0]

var dragged = false;
var beginPos = [0,0]
var beginDisplacement = displacement

function f(x){
    return math.multiply(x, x);
}

function zeta(s){
    var answer = 0
    for (var i=1;i<1000;i++){
        answer=math.add(math.divide(1,math.pow(i,s)),answer)
    }
    return answer;
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
        result.push([])
        while (y+step <= complexRange.y[1]){
            var answer = zeta(math.complex(x,y))
            result[result.length-1].push({
                original:[x,y],
                after:[math.re(answer), math.im(answer)]
            })
            y += step
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
    
    strokeWeight(1)
    // // simple
    // for (var i = 0; i<result.length-1; i++){
    //     line(result[i][0]*scaler[0]+displacement[0], -result[i][1]*scaler[1]+displacement[1], result[i+1][0]*scaler[0]+displacement[0], -result[i+1][1]*scaler[1]+displacement[1])
    // }
    
    //complex
    stroke(255,0,0)
    noFill();
    for (var i = 0; i<result.length; i++){
        beginShape();
        for (var j = 0; j<result[i].length; j++){
            var difference = [(result[i][j].after[0] - result[i][j].original[0])/time, (result[i][j].original[1] - result[i][j].after[1])/time]
            
            vertex((result[i][j].original[0]+(difference[0]*progression))*scaler[0]+displacement[0], (-result[i][j].original[1]+(difference[1]*progression))*scaler[1]+displacement[1])
        }
        endShape();
    }
    
    for (var i = 0; i<result[0].length; i++){
        if (result[0][i].original[1] > 0.95 && result[0][i].original[1] < 1.05){
            stroke(255,255,0);
        }
        beginShape();
        for (var j = 0; j<result.length; j++){
            var difference = [(result[j][i].after[0] - result[j][i].original[0])/time, (result[j][i].original[1] - result[j][i].after[1])/time]
            
            vertex((result[j][i].original[0]+(difference[0]*progression))*scaler[0]+displacement[0], (-result[j][i].original[1]+(difference[1]*progression))*scaler[1]+displacement[1])
        }
        endShape();
    stroke(255,0,0)
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