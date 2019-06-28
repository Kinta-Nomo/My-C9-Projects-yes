
var position = [1.2,-2]
var rAnswer = 0

var scaler = [60,60]
var displacement = [-0,0]

var dragged = false;
var beginPos = [0,0]
var beginDisplacement = displacement


function zeta(s){
    if (math.re(s)<1.2){
        return
    }
    var answer = math.complex(0,0)
    var i = 1
    strokeWeight(3)
    stroke(255,0,0)
    noFill();
    beginShape();
    while (true){
        var calculated = math.add(math.divide(1,math.pow(i,s)),answer)
        vertex(math.re(calculated)*scaler[0]+displacement[0], -math.im(calculated)*scaler[1]+displacement[1])
        if (Math.abs(math.re(calculated)-math.re(answer))>0.00001 || Math.abs(math.im(calculated)-math.im(answer))>0.00001){
            answer=calculated
        }else{
            endShape();
            rAnswer = [math.re(answer),math.im(answer)]
            return rAnswer
        }
        i+=1
    }
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
    
    zeta(math.complex(position[0],position[1]))
    
    //-----//
    
    if (dragged){
        position[0] = (mouseX-width/2)/scaler[0]
        position[1] = -(mouseY-height/2)/scaler[1]
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
}

function mouseReleased() {
    dragged = false;
}