var pointsObjects = [];

function cube(x,y,z,l,n){
    if (n == 0){
        pointsObjects.push({'color':[255,0,0],'coordinate':[[x,y,z],[x+l,y,z],[x+l,y+l,z],[x,y+l,z]],'average':0})
        pointsObjects.push({'color':[0,255,0],'coordinate':[[x,y,z],[x,y,z+l],[x,y+l,z+l],[x,y+l,z]],'average':0})
        pointsObjects.push({'color':[0,0,255],'coordinate':[[x,y,z],[x,y,z+l],[x+l,y,z+l],[x+l,y,z]],'average':0})
        pointsObjects.push({'color':[0,255,255],'coordinate':[[x+l,y+l,z+l],[x,y+l,z+l],[x,y+l,z],[x+l,y+l,z]],'average':0})
        pointsObjects.push({'color':[255,255,255],'coordinate':[[x+l,y+l,z+l],[x+l,y,z+l],[x,y,z+l],[x,y+l,z+l]],'average':0})
        pointsObjects.push({'color':[255,255,0],'coordinate':[[x+l,y+l,z+l],[x+l,y,z+l],[x+l,y,z],[x+l,y+l,z]],'average':0})
    }else{
    var len = l/3.0
    
    cube(x,y,z+len+len,len,n-1)
    
    cube(x+len+len,y,z+len+len,len,n-1)
    
    
    
    cube(x,y+len+len,z+len+len,len,n-1)
    
    cube(x+len+len,y+len+len,z+len+len,len,n-1)
    
    cube(x,y,z,len,n-1)
    
    cube(x+len+len,y,z,len,n-1)
    
    
    
    cube(x,y+len+len,z,len,n-1)
    
    cube(x+len+len,y+len+len,z,len,n-1)
    }
}


cube(100,100,100,100,2)