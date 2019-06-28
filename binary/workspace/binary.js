
function den_to_bin(den){
    var bin = ""
    while(den > 0){
        bin = (den%2).toString() + bin
        den = Math.floor(den/2)
    }
    return parseInt(bin)
}

console.log(den_to_bin(390))