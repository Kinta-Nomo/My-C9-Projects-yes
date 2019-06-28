
//no cordinate should have less than 'screenDepth' depth(z)

// var original = [[200,200,200],[300,200,200],[300,300,200],[200,300,200],[200,200,300],[300,200,300],[300,300,300],[200,300,300]]
var original = [[100,100,200],[-100,100,200],[-100,-100,200],[100,-100,200],[100,100,300],[-100,100,300],[-100,-100,300],[100,-100,300]]
var screenDepth = 100

var rotationOrigin = [100,100,250]

function setup(){
    createCanvas(800,800);
    background(0);
}

function project(value1,value2){
    //projected point on the plane
    return screenDepth/value2*value1
}

function rotatePoint(axis,x,y,z){
    if (axis == "z"){
        var radius = ((x-rotationOrigin[0])**2+(y-rotationOrigin[1])**2)**0.5
        var zeroAngle = Math.atan((y-rotationOrigin[1])/(x-rotationOrigin[0]+0.001))
        
        //other half of the rotation
        if (x<rotationOrigin[0]){
            zeroAngle+=3.141592653589793
        }
        
         return [rotationOrigin[0]+Math.cos(zeroAngle+0.01)*radius,rotationOrigin[1]+Math.sin(zeroAngle+0.01)*radius,z]
    }else if (axis == "y"){
        var radius = ((x-rotationOrigin[0])**2+(z-rotationOrigin[2])**2)**0.5
        var zeroAngle = Math.atan((x-rotationOrigin[0])/(z-rotationOrigin[2]+0.001))
        
        //other half of the rotation
        if (z<rotationOrigin[0]){
            zeroAngle+=3.141592653589793
        }
        
         return [rotationOrigin[0]+Math.sin(zeroAngle+0.01)*radius,y,rotationOrigin[1]+Math.cos(zeroAngle+0.01)*radius]
    }
}

function draw(){
    background(0);
    translate(400,400)
    stroke(255,0,0)
    strokeWeight(5)
    for (var i in original){
        point(original[i][0],original[i][1])
    }
    stroke(0,0,255)
    for (var i in original){
        //projecting 3d point onto 2d plane
        point(project(original[i][0],original[i][2]),project(original[i][1],original[i][2]))
        
        var coordinates = rotatePoint('z', original[i][0],original[i][1],original[i][2])
        original[i] = [coordinates[0],coordinates[1],coordinates[2]]
    }
    
}