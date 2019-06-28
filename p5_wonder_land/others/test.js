var a = []

for (var i = 0;i < 10;i++){
    for (var j = 0;j < 10;j++){
        var ii = i*10
        var jj = j*10
        //tate
        a.push({'color':[0, 0, 255],'coordinate':[[0,ii,100],[0,ii,100],[200,ii,100],[200,ii,100]],'average':0})
        //yoko
        a.push({'color':[255,0,0],'coordinate':[[0,100,100],[0,200,100],[200,200,100],[200,100,100]],'average':0})
    }
}