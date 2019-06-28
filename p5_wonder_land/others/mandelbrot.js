//including p5.js and math.js

var canvasSize = 400

function calculate(z,c,n){
    //z and c is both complex
    if (n == 0){
        return [0,0,0]
    }else{
        if (math.abs(z) >= 2){
            while(n>255){
                n-=255;
            }
            return [n,200,255]
        }
        var zplusone = math.add((math.multiply(z,z)),c)
        return calculate(zplusone,c,n-1)
    }
}

function drawMandelbrot(){
    colorMode(HSB);
    
    for (var i= 0; i < canvasSize; i++){
        var calci = -2+(i*(4.0/(canvasSize-1)))
        for (var j= 0; j < canvasSize; j++){
            var calcj = math.multiply((-2+(j*(4.0/(canvasSize-1)))),math.complex(0,1))

            var result = calculate(math.complex(0,0),math.add(calci,calcj),300)
            stroke(result[0],result[1],result[2])
            strokeWeight(4)
    
            point(calci*100,calcj.im*100)
        }
    }
}

function setup(){
    createCanvas(400,400);
    
    translate(width/2, height/2);
    
    drawMandelbrot()
}