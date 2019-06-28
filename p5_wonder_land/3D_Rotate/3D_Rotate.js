
var canvasMid;

function setup(){
    createCanvas(500,500);
    background(0);
    canvasMid=[height/2,width/2];
}

function arrayClone( arr ) {  
    if( _.isArray( arr ) ) {
        return _.map( arr, arrayClone );
    } else if( typeof arr === 'object' ) {
        throw 'Cannot clone array containing an object!';
    } else {
        return arr;
    }
}

function degreesCvt(angle) {
  return angle * (180 / Math.PI);
}
function radiansCvt(angle) {
  return angle * (Math.PI / 180);
}

function drawFace(points,fillColor,width){
        stroke(fillColor);
        strokeWeight(width);
        fill(fillColor[0],fillColor[1],fillColor[2]);
        beginShape();
        for(var i = 0;i<points.length;i++){
            vertex(canvasMid[0]+points[i][0], canvasMid[1]+points[i][1]);
        }
        endShape(CLOSE);
    }
    
function getX(point,observer){
    if (point[1]-observer[1]!=0){
    	var r=point[1]/(point[1]-observer[1])
    }else{
        var r=point[1]/point[1]-(observer[1]+0.00000000001)
    }
    var x=point[0]-(point[0]-observer[0])*r
    return x
}

function d(pointa,pointb,axis){
    if (axis==[0,1]){
    	return ((pointa[0]-pointb[0])**2+(pointa[1]-pointb[1])**2)**0.5
    }else if (axis==[0,2]){
    	return ((pointa[0]-pointb[0])**2+(pointa[2]-pointb[2])**2)**0.5
    }else if (axis==[1,2]){
    	return ((pointa[1]-pointb[1])**2+(pointa[2]-pointb[2])**2)**0.5
    }else{
        return ((pointa[0]-pointb[0])**2+(pointa[1]-pointb[1])**2)**0.5
    }
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
    var r=d(point,o,rotateStat)
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

var pointsObjects=[{'color':[51, 116, 221],'coordinate':[[100,100,100],[100,200,100],[200,200,100],[200,100,100]]},
                   {'color':[72, 226, 15],'coordinate':[[200,100,100],[200,200,100],[200,200,200],[200,100,200]]},
                   {'color':[219, 109, 19],'coordinate':[[100,200,100],[200,200,100],[200,200,200],[100,200,200]]},
                   {'color':[219, 35, 19],'coordinate':[[200,200,200],[100,200,200],[100,100,200],[200,100,200]]},
                   {'color':[178, 18, 181],'coordinate':[[100,100,100],[100,200,100],[100,200,200],[100,100,200]]},
                   {'color':[15, 251, 255],'coordinate':[[100,100,100],[200,100,100],[200,100,200],[100,100,200]]}]

var angle=0
var observer=[-200,-500,-200]
var o=[150,150,150]
function draw(){
    background(0)
    angle+=1
    var projectPoints;
    
//     observer=[-200,-200,-200]
//     o=[10,50,150]

    var newPoints = []
    var newPoints = JSON.parse(JSON.stringify(pointsObjects));
    
    if (keyIsDown(65)) {background(0);anglex+=1;}
    
    projectPoints=rorateObject(newPoints,o,angle,[0,1])
    projectPoints=rorateObject(projectPoints,o,angle,[0,2])
    projectPoints=rorateObject(projectPoints,o,angle,[1,2])
    
    for (var i = 0;i<projectPoints.length;i++){
        var faces=projectPoints[i]
        var projectedPoints=[]
        for (var j = 0;j<faces['coordinate'].length;j++){
            var facePoint=faces['coordinate'][j]
            projectedPoints.push([getX([facePoint[0],facePoint[1]],[observer[0],observer[1]]),getX([facePoint[2],facePoint[1]],[observer[2],observer[1]])])
            // [(getX(!!!!!!!!!!!,?????????????????????????),getX(33333333333,!!!!!!!!!!!!!!!!!!!!!!!!!)) for i in faces['coordinate']]
        }
        drawFace(projectedPoints,faces['color'],0)
    }

}
