
var Complex = function(real, imag){
    imag = imag || 0
    return Object.freeze(Object.create(Complex.prototype, {
        real: {value: real},
        imag: {value: imag},
    }));
}

Complex.prototype.add = function(number){
    var imag = this.imag + number.imag
    var real = this.real + number.real
    return Complex(imag, real)
}