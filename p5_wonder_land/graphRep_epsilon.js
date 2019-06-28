
var range = [-5,5]
var step = 0.1

// var complexRange = {
//     x:[1.2,9],
//     y:[-4,4]
// }

//stretched out part of riemann
var complexRange = {
    x:[1.2,3],
    y:[-2, 2]
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
// Complex type
var Complex = function (real, imag) {
    if (real instanceof Complex) return real;
    imag = imag || 0;
    return Object.freeze(Object.create(Complex.prototype, {
        real: {value: real, enumerable: true},
        imag: {value: imag, enumerable: true},
    }));
};
Complex.fromPolar = function (r, theta) {
    return Complex(r * Math.cos(theta), r * Math.sin(theta));
};
Complex.eq = function (a, b) {
    a = Complex(a), b = Complex(b);
    return a.real === b.real && a.imag === b.imag;
};
Complex.prototype.r = Complex.prototype.abs = function () {
    return Math.sqrt(this.norm());
};
Complex.prototype.theta = Complex.prototype.arg = function () {
    return Math.atan2(this.imag, this.real);
};
Complex.prototype.add = function (b) {
    b = Complex(b);
    return Complex(this.real + b.real, this.imag + b.imag);
};
Complex.prototype.sub = function (b) {
    b = Complex(b);
    return Complex(this.real - b.real, this.imag - b.imag);
};
Complex.prototype.mul = function (b) {
    b = Complex(b);
    var real = this.real * b.real - this.imag * b.imag;
    var imag = this.real * b.imag + this.imag * b.real;
    return Complex(real, imag);
};
Complex.prototype.neg = function () {
    return Complex(-this.real, -this.imag);
};
Complex.prototype.conj = function () {
    return Complex(this.real, -this.imag);
};
Complex.prototype.norm = function () {
    return this.real * this.real + this.imag * this.imag;
};
Complex.prototype.inv = function () {
    var base = this.norm();
    return Complex(this.real / base, -this.imag / base);
};
Complex.prototype.div = function (b) {
    b = Complex(b);
    var base = b.norm();
    var c = this.mul(b.conj());
    return Complex(c.real / base, c.imag / base);
};
Complex.prototype.pow = function (b) {
    b = Complex(b);
    var r = this.r(), theta = this.theta();
    var abs = Math.pow(r, b.real) * Math.exp(-b.imag * theta);
    var arg = b.imag * Math.log(r) + b.real * theta;
    return Complex.fromPolar(abs, arg);
};
Complex.prototype.exp = function () {
    return Complex.fromPolar(Math.exp(this.real), this.imag);
};
Complex.prototype.log = function (n) {
    n = n || 0;
    return Complex(Math.log(this.r()), this.theta() + 2 * n * Math.PI);
};
Complex.prototype.proj = function () {
    if (this.real === Infinity || this.real === -Infinity ||
        this.imag === Infinity || this.imag === -Infinity) return Complex.inf;
    return this;
};
Complex.c0 = Complex(0);
Complex.c1 = Complex(1);
Complex.c2 = Complex(2);
Complex.i = Complex.c1i = Complex(0, 1);
Complex.inf = Complex(Infinity);


// util
var range = function (start, end) {
    var l = end - start;
    var a = new Array(l);
    for (var i = 0; i < l; i++) a[i] = start + i;
    return a;
};
var csum = function (a) {
    var r = Complex.c0;
    for (var i = 0, l = a.length; i < l; i++) r = r.add(a[i]);
    return r;
};
var binom = function (n, k) {
    k = n - k < k ? n - k : k; // use shorter side for loop
    // use add with array for avoiding overflow by mul n*(n-1)
    //   e.g. 3C2: 1 0 0 => 1 1 0 => 1 2 1  => 1 3 3  <= result
    var a = new Array(k + 1);
    a[0] = 1;
    for (var i = 1; i <= k; i++) a[i] = 0;
    for (var i = 0; i < n; i++) {
        for (var j = k; j >= 1; j--) a[j] += a[j - 1];
    }
    return a[k];
};

var sign = function (k) {
    return (k % 2) ? -1 : 1;
};

var zeta3 = function (s, t) {
    t = t || 100;
    s = Complex(s);
    if (Complex.eq(s, Complex.c1)) return Complex.inf;
    // zeta(s) = 1/(1 - 2^(1-s)) * 
    //           S(n=1..inf| 1/2^(n+1) * S(k=0..n| -1^k * C(n,k) / (k+1)^s))
    // (s != 1)
    var sn = s.neg(), two = Complex.c2;
    return csum(range(0, t).map(function (n) {
        return csum(range(0, n + 1).map(function (k) {
            return Complex(k + 1).pow(sn).mul(sign(k) * binom(n, k));
        })).div(two.pow(n + 1));
    })).div(two.pow(sn.add(1)).neg().add(1));
};

function zeta(s){
    // var answer = math.complex(0,0)
    // for (var i=1;i<1000000;i++){
    //     var calculated = math.add(math.divide(1,math.pow(i,s)),answer)
    //     if (Math.abs(math.re(calculated)-math.re(answer))>0.00001 || Math.abs(math.im(calculated)-math.im(answer))>0.00001){
    //             answer=calculated
    //     }else{
    //         return answer
    //     }
    // }
    // return answer;
    
    var answer = math.complex(0,0)
    var i = 1
    while(true){
        var calculated = math.add(math.divide(1,math.pow(i,s)),answer)
        if (Math.abs(math.re(calculated)-math.re(answer))>0.00001 || Math.abs(math.im(calculated)-math.im(answer))>0.00001){
            answer=calculated
        }else{
            return answer
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
    
    var x = complexRange.x[0]
    while (x+step <= complexRange.x[1]){
        var y = complexRange.y[0]
        result.push([])
        while (y+step <= complexRange.y[1]){
            var answer = zeta3(Complex(x,y))
            result[result.length-1].push({
                original:[x,y],
                after:[answer.real, answer.imag]
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