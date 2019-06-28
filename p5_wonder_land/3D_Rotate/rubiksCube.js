
//points are loaded from Data.js file!! :)

var canvasMid; 

function setup(){
    createCanvas(500,1000);
    background(0);
    canvasMid=[length/2,width/2];
}

function degreesCvt(angle) {
  return angle * (180 / Math.PI);
}
function radiansCvt(angle) {
  return angle * (Math.PI / 180);
}

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function drawFace(points,fillColor,width){
        stroke(fillColor);
        strokeWeight(width);
        fill(fillColor[0],fillColor[1],fillColor[2],fillColor[3]);
        beginShape();
        for(var i = 0;i<points.length;i++){
            vertex(canvasMid[0]+points[i][0], canvasMid[1]+points[i][1]);
        }
        endShape(CLOSE);
    }
    
function getX(point,observer){
    if (point[1]-observer[1]!=0){
    	var r=point[1]/(point[1]-observer[1]);
    }else{
        var r=point[1]/(point[1]-(observer[1]+0.00000000001));
    }
    var x=point[0]-(point[0]-observer[0])*r;
    return x;
}

function distf(pointa,pointb,axis){
    if (arraysEqual(axis,[0,1])){
    	return ((pointa[0]-pointb[0])**2+(pointa[1]-pointb[1])**2)**0.5
    }else if (arraysEqual(axis,[0,2])){
    	return ((pointa[0]-pointb[0])**2+(pointa[2]-pointb[2])**2)**0.5
    }else if (arraysEqual(axis,[1,2])){
    	return ((pointa[1]-pointb[1])**2+(pointa[2]-pointb[2])**2)**0.5
    }//else{
    //     return ((pointa[0]-pointb[0])**2+(pointa[1]-pointb[1])**2)**0.5
    // }
}

function initialAngle(a,o,rotateStat){
    if (a[rotateStat[0]]-o[rotateStat[0]]!=0){
        var degree=degreesCvt(Math.atan((a[rotateStat[1]]-o[rotateStat[1]])/(a[rotateStat[0]]-o[rotateStat[0]])))
    }else{
	    var degree=degreesCvt(Math.atan((a[rotateStat[1]]-o[rotateStat[1]])/0.00000001))
    }
    if (a[rotateStat[0]]<o[rotateStat[0]]){
        degree+=180
    }
    return degree
}

function bearing(o,d,angle,point,rotateStat){
    if (rotateStat.sort().toString() == [0,1].sort().toString()){
    	return [Math.cos(radiansCvt(angle))*d+o[0],Math.sin(radiansCvt(angle))*d+o[1],point[2]]
    }else if (rotateStat.sort().toString() == [0,2].sort().toString()){
    	return [Math.cos(radiansCvt(angle))*d+o[0],point[1],Math.sin(radiansCvt(angle))*d+o[2]]
    }else if (rotateStat.sort().toString() == [1,2].sort().toString()){
    	return [point[0],Math.cos(radiansCvt(angle))*d+o[1],Math.sin(radiansCvt(angle))*d+o[2]]
    }
}

function rotatePoint(point,o,angle,rotateStat){
    var r=distf(point,o,rotateStat)
    var fialAngle=initialAngle(point,o,rotateStat)+angle
    var newPoint=bearing(o,r,fialAngle,point,rotateStat)
    
    return newPoint
}

function rorateObject(MyObject,o,angle,rotateStat){
    
    for (var i=0;i<MyObject.length;i++){
        var rotatedCoordinates=[]
        for (var a=0;a<MyObject[i]['coordinate'].length;a++){
            rotatedCoordinates.push(rotatePoint(MyObject[i]['coordinate'][a],o,angle,rotateStat))
        }
        MyObject[i]['coordinate']=rotatedCoordinates
    }
    return MyObject 
}

//sekkeizu begin
//digit 1 = yoko digit 2 = mukou digit 3 = tate

var pointsObjects = []

function cuboid(x,y,z,length,color){
    pointsObjects.push({'color':[255,255,255],'coordinate':[[x,y,z],[x,y+length,z],[x+length,y+length,z],[x+length,y,z]],'average':0})
    pointsObjects.push({'color':[191, 21, 21],'coordinate':[[x+length,y,z],[x+length,y+length,z],[x+length,y+length,z+length],[x+length,y,z+length]],'average':0})
    pointsObjects.push({'color':[14, 119, 58],'coordinate':[[x,y+length,z],[x+length,y+length,z],[x+length,y+length,z+length],[x,y+length,z+length]],'average':0})
    pointsObjects.push({'color':[0,0,255],'coordinate':[[x+length,y+length,z+length],[x,y+length,z+length],[x,y,z+length],[x+length,y,z+length]],'average':0})
    pointsObjects.push({'color':[255, 130, 5],'coordinate':[[x,y,z],[x,y+length,z],[x,y+length,z+length],[x,y,z+length]],'average':0})
    pointsObjects.push({'color':[255, 250, 2],'coordinate':[[x,y,z],[x+length,y,z],[x+length,y,z+length],[x,y,z+length]],'average':0})
}
cuboid(100,100,100,100,[255,255,255])
cuboid(100,100,200,100,[255,255,255])
cuboid(100,100,300,100,[255,255,255])
cuboid(100,200,100,100,[255,255,255])
cuboid(100,200,200,100,[255,255,255])
cuboid(100,200,300,100,[255,255,255])
cuboid(100,300,100,100,[255,255,255])
cuboid(100,300,200,100,[255,255,255])
cuboid(100,300,300,100,[255,255,255])


cuboid(200,100,100,100,[255,255,255])
cuboid(200,100,200,100,[255,255,255])
cuboid(200,100,300,100,[255,255,255])
cuboid(200,200,100,100,[255,255,255])
cuboid(200,200,200,100,[255,255,255])
cuboid(200,200,300,100,[255,255,255])
cuboid(200,300,100,100,[255,255,255])
cuboid(200,300,200,100,[255,255,255])
cuboid(200,300,300,100,[255,255,255])


cuboid(300,100,100,100,[255,255,255])
cuboid(300,100,200,100,[255,255,255])
cuboid(300,100,300,100,[255,255,255])
cuboid(300,200,100,100,[255,255,255])
cuboid(300,200,200,100,[255,255,255])
cuboid(300,200,300,100,[255,255,255])
cuboid(300,300,100,100,[255,255,255])
cuboid(300,300,200,100,[255,255,255])
cuboid(300,300,300,100,[255,255,255])

//sekkeizu end

var speed = 1
var rotspeed = 1

var anglex=0
var angley=0
var anglez=0
var observer=[0,-600,0]
var o=[250,250,250]
var newPoints;
var orderPoints = []
var acc = 0

function draw(){
    background(0)
    var projectPoints;
    
    // o=[150,150,150]

    newPoints = JSON.parse(JSON.stringify(pointsObjects));
    
    // if (keyIsDown(68)) {anglex+=rotspeed;}
    // if (keyIsDown(65)) {anglex-=rotspeed;}
    // if (keyIsDown(69)) {angley+=rotspeed;}
    // if (keyIsDown(81)) {angley-=rotspeed;}
    // if (keyIsDown(87)) {anglez+=rotspeed;}
    // if (keyIsDown(83)) {anglez-=rotspeed;}
    
    
    // if (keyIsDown(37)) {for (var i = 0;i<pointsObjects.length;i++){for (var j = 0;j<pointsObjects[i].coordinate.length;j++){pointsObjects[i].coordinate[j][0]+= speed}};o[0]+=speed}
    // if (keyIsDown(39)) {for (var i = 0;i<pointsObjects.length;i++){for (var j = 0;j<pointsObjects[i].coordinate.length;j++){pointsObjects[i].coordinate[j][0]-= speed}};o[0]-=speed}
    // if (keyIsDown(40)) {for (var i = 0;i<pointsObjects.length;i++){for (var j = 0;j<pointsObjects[i].coordinate.length;j++){pointsObjects[i].coordinate[j][1]+= speed}};o[1]+=speed}
    // if (keyIsDown(38)) {for (var i = 0;i<pointsObjects.length;i++){for (var j = 0;j<pointsObjects[i].coordinate.length;j++){pointsObjects[i].coordinate[j][1]-= speed}};o[1]-=speed}
    // if (keyIsDown(32)) {for (var i = 0;i<pointsObjects.length;i++){for (var j = 0;j<pointsObjects[i].coordinate.length;j++){pointsObjects[i].coordinate[j][2]+= speed}};o[2]+=speed}
    // if (keyIsDown(16)) {for (var i = 0;i<pointsObjects.length;i++){for (var j = 0;j<pointsObjects[i].coordinate.length;j++){pointsObjects[i].coordinate[j][2]-= speed}};o[2]-=speed}
    
    projectPoints = rorateObject(newPoints,o,1,[0,1])
    projectPoints = rorateObject(projectPoints,o,0,[0,2])
    projectPoints = rorateObject(projectPoints,o,0,[1,2])
    
    for (var i = 0;i<projectPoints.length;i++){
        //projectPoints[i] is each face
        var average = 0;
        for (var p = 0;p<projectPoints[i].coordinate.length;p++){
            //projectPoints[i].coordinate[p] is the each point
            var point = projectPoints[i].coordinate[p]
            average += ((point[0]-observer[0])**2+(point[1]-observer[1])**2+(point[2]-observer[2])**2)**0.5
        }
        average = average/projectPoints[i].coordinate.length
        
        projectPoints[i].average = average
        //console.log(projectPoints[i].average)
        
        var found = false;
        for (var j = 0;j<orderPoints.length;j++){
            //orderPoints[j] is the face after sorted
            if (projectPoints[i].average<orderPoints[j].average){
                //projectPoints[i] is nearer than orderPoints[j]
                orderPoints.splice(j,0,projectPoints[i])
                found = true;
                break
            }
        }
        if (found == false){
            orderPoints.splice(orderPoints.length,0,projectPoints[i])
        }
    }
    
    //miss here :P
    orderPoints.reverse()
    
    for (var i = 0;i<orderPoints.length;i++){
        for (var j = 0;j<orderPoints[i].coordinate.length;j++){
            if(orderPoints[i].coordinate[j][1]<observer[1]){
                // console.log("out")
            }
        }
    }
    
    for (var i = 0;i<orderPoints.length;i++){
        var faces=orderPoints[i]
        var projectedPoints=[]
        for (var j = 0;j<faces.coordinate.length;j++){
            if(faces.coordinate[j][1]<observer[1]){
                // console.log("hha")
            }
        }
        if (faces.type == undefined){
            
            for (var j = 0;j<faces['coordinate'].length;j++){
                if(faces.coordinate[j][1]<observer[1]){
                    break
                }
                var facePoint=faces['coordinate'][j]
                projectedPoints.push([getX([facePoint[0],facePoint[1]],[observer[0],observer[1]]),getX([facePoint[2],facePoint[1]],[observer[2],observer[1]])])
            }
            drawFace(projectedPoints,faces['color'],0)
        }else if (faces.type == "sphere"){
            
            if(faces['coordinate'][0][1]<observer[1]){
                    
            }else{
                var facePoint = faces['coordinate'][0]
                fill(faces['color'][0],faces['color'][1],faces['color'][2],faces['color'][3])
                var xr = canvasMid[0]+getX([facePoint[0] + faces.radius,facePoint[1]],[observer[0],observer[1]]) 
                var x = canvasMid[0]+getX([facePoint[0],facePoint[1]],[observer[0],observer[1]]) 
                var y = canvasMid[1]+getX([facePoint[2],facePoint[1]],[observer[2],observer[1]])
                ellipse(x , y , x-xr)
            }
        }else if (faces.type == "line"){
            if(faces['coordinate'][0][1]<observer[1] || faces['coordinate'][1][1]<observer[1]){
                    
            }else{
                var facePoint = faces['coordinate'][0]
                var facePoint2 = faces['coordinate'][1]
                stroke(faces['color'][0],faces['color'][1],faces['color'][2],faces['color'][3])
                
                var xw = canvasMid[0]+getX([facePoint[0]+(faces.width/2),facePoint[1]],[observer[0],observer[1]]) 
                var x = canvasMid[0]+getX([facePoint[0],facePoint[1]],[observer[0],observer[1]])
                
                var width = Math.abs(xw-x)
                strokeWeight(width)
                line(canvasMid[0]+getX([facePoint[0],facePoint[1]],[observer[0],observer[1]]) , 
                     canvasMid[1]+getX([facePoint[2],facePoint[1]],[observer[2],observer[1]]) ,
                     canvasMid[0]+getX([facePoint2[0],facePoint[1]],[observer[0],observer[1]]),
                     canvasMid[1]+getX([facePoint2[2],facePoint[1]],[observer[2],observer[1]]))
                noStroke()
            }
        }
    }
    
    orderPoints = []
    pointsObjects = JSON.parse(JSON.stringify(projectPoints));
}