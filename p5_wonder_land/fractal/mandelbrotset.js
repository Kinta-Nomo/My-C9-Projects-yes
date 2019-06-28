
function setup(){
    createCanvas(400,400)
    background(255)
    strokeWeight(4)
    var length = 100
    var x = 0;
    colorMode(HSB);
    
    function mandelbrot(begin){
        function calculate(z,c,n){
            if (n > 100){
                colorMode(RGB);
                stroke(0,0,0);
                return null
            }else{
                var z_square = [z[0]**2-z[1]**2,2*z[0]*z[1]]
                var result = [z_square[0]+c[0],z_square[1]+c[1]]
                if ((result[0]**2+result[1]**2)>4){
                    colorMode(HSB);
                    stroke(n,255,255)
                    return null
                }
                return calculate(result,c,n+=1)
            }
        }
        
        for (var i = 0;i<length+1;i++){
            for (var j = 0;j<length+1;j++){
                var x = -2+(i*(4/(length-1)))
                var y = -2+(j*(4/(length-1)))
                calculate(begin,[x,y],0)
                point((width/2.0)+x*100,(height/2.0)+y*100)
            }
        }
    }
    mandelbrot([0.40,0.30])
}