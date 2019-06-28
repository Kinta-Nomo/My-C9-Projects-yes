
function setup(){
    createCanvas(800,800);
    background(0);
    strokeWeight(5)
}

var sands = {"0,0":500000}
var newsands = {"0,0":500000};
var needsCheck = ["0,0"]
var newCheck = ["0,0"]

function draw(){
    translate(400,400);
    
    needsCheck = newCheck
    newCheck = []
    for (var j in needsCheck){
        var i = needsCheck[j]
        var sand = sands[i] 
        
        if (sand == 1){
            stroke(255,255,255)
        }else if(sand == 2){
            stroke(255,255,0) 
        }else if(sand == 3){
            stroke(255,0,0)
        }else if(sand >= 4){
            stroke(100,0,0)
        }
        point(JSON.parse("[" + i + "]")[0]*5,JSON.parse("[" + i + "]")[1]*5)
        
        if (sand >= 4){
            sands[i] -= 4
            var coordinate = JSON.parse("[" + i + "]");
            var string1 = [coordinate[0]-1,coordinate[1]].toString()
            var string2 = [coordinate[0]+1,coordinate[1]].toString()
            var string3 = [coordinate[0],coordinate[1]-1].toString()
            var string4 = [coordinate[0],coordinate[1]+1].toString()
            var string5 = [coordinate[0],coordinate[1]].toString()
            
            if (sands[string1] == undefined){
                newsands[string1] = 1
            }else{
                if (!newCheck.includes(string1) && newsands[string1]){
                    newCheck.push(string1)
                }
                newsands[string1] += 1
            }
            
            if (sands[string2] == undefined){
                newsands[string2] = 1
            }else{
                if (!newCheck.includes(string2) && newsands[string2]){
                    newCheck.push(string2)
                }
                newsands[string2] += 1
            }
            
            if (sands[string3] == undefined){
                newsands[string3] = 1
            }else{
                if (!newCheck.includes(string3) && newsands[string3]){
                    newCheck.push(string3)
                }
                newsands[string3] += 1
            }
            
            if (sands[string4] == undefined){
                newsands[string4] = 1
            }else{
                if (!newCheck.includes(string4) && newsands[string4]){
                    newCheck.push(string4)
                }
                newsands[string4] += 1
            }
            
            if (!newCheck.includes(string5)){
                newCheck.push(string5)
            }
            
        }
    }
    // debugger
    
    sands = newsands
    
}