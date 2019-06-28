
function setup(){
    createCanvas(800,800);
    background(0);
    strokeWeight(5)
}

var sands = {"0,0":1000000}
var newsands = {"0,0":1000000};

function draw(){
    translate(400,400);
    
    for (var i in sands){
        var sand = sands[i] 
        
        if (sand == 1){
            stroke(255,255,255)
        }else if(sand == 2){
            stroke(255,255,0)
        }else if(sand == 3){
            stroke(255,0,0)
        }else if(sand > 4){
            stroke(100,0,0)
        }
        point(JSON.parse("[" + i + "]")[0]*5,JSON.parse("[" + i + "]")[1]*5)
        
        if (sand > 4){
            sands[i] -= 4
            var coordinate = JSON.parse("[" + i + "]");
            if (sands[[coordinate[0]-1,coordinate[1]].toString()] == undefined){
                newsands[[coordinate[0]-1,coordinate[1]].toString()] = 1
            }else{
                sands[[coordinate[0]-1,coordinate[1]].toString()] += 1
            }
            
            if (sands[[coordinate[0]+1,coordinate[1]].toString()] == undefined){
                newsands[[coordinate[0]+1,coordinate[1]].toString()] = 1
            }else{
                sands[[coordinate[0]+1,coordinate[1]].toString()] += 1
            }
            
            if (sands[[coordinate[0],coordinate[1]-1].toString()] == undefined){
                newsands[[coordinate[0],coordinate[1]-1].toString()] = 1
            }else{
                sands[[coordinate[0],coordinate[1]-1].toString()] += 1
            }
            
            if (sands[[coordinate[0],coordinate[1]+1].toString()] == undefined){
                newsands[[coordinate[0],coordinate[1]+1].toString()] = 1
            }else{
                sands[[coordinate[0],coordinate[1]+1].toString()] += 1
            }
        }
    }
    
    sands = newsands
    
}