
//rect(width/17, height/1.92, width/1.15, height/3.5) being the normal time
var box = {
    "x":0,
    "y":0,
    "width":0,
    "height":0,
    "origW":0,
    "origH":0
}

//an interval that moves dr.alphys
var alphysMove;

//an interval that shakes dr.alphys when harmed
var shake;

//5 images and 5 offsets of all. Fatal offset is the largest value of shake (will be plusminus -1 every shake timer)
var alphys = {
    "head":"",
    "body":"",
    "leg":"",
    "tail":"",
    "fatal":"",
    "Hoffset":{"y":0,"ya":0},
    "Boffset":{"y":0,"ya":0},
    "Loffset":{"x":0,"y":0},
    "Toffset":{"x":0,"y":0},
    "Foffset":10
};

//the time for slicer to flick after enter is pressed
var slicerMove;

//an image of attack bar (the green oval)
var attackbar;

//iterates through black and white
var slicer = {
    "choosen":"white",
    "white":"",
    "black":"",
    "x":0
};

//changes the index (key choosen in the next dictionary) that chooses the image of the slice
var sliceMove;

var slice = {
    "image":["","","","","",""],
    "choosen":0
}

//current attack
var currentAttack = 0;
var subAttack = 0;

//speed of the soul
var speed = 2.5;

var Soul = function(){
    this.image = ""
    this.state = [255,0,0]
    this.x = 0
    this.y = 0
}

//this "soul" is the main soul that's in the game
var soul = new Soul()

//obstacles that are present in the box
var obstacle = []

function preload() {
  
  soul.image = loadImage('/images/Soul_red.png')
  
  alphys['head'] = loadImage('/images/Alphys_head_tr.png');
  alphys['body'] = loadImage('/images/Alphys_body_tr.png');
  alphys['leg'] = loadImage('/images/Alphys_leg_tr.png');
  alphys['tail'] = loadImage('/images/Alphys_tail_tr.png');
  alphys['fatal'] = loadImage('/images/Alphys_fatal_tr.png')
  
  attackbar = loadImage('/images/Attackbar.png');
  
  slicer["white"] = loadImage('/images/Slicer.png')
  slicer["black"] = loadImage('/images/Slicer_2.png')
  
  slice["image"][0] = loadImage('/images/Slice_tr.png')
  slice["image"][1] = loadImage('/images/Slice_2_tr.png')
  slice["image"][2] = loadImage('/images/Slice_3_tr.png')
  slice["image"][3] = loadImage('/images/Slice_4_tr.png')
  slice["image"][4] = loadImage('/images/Slice_5_tr.png')
  slice["image"][5] = loadImage('/images/Slice_6_tr.png')
}


//------------------------------------------------------------------------------------

var states = {
    "fight":{
        "bar":{
            "waiting":function(){
                noFill();
                stroke(255);
                strokeWeight(5)
                rect(box["x"], box["y"], box["width"], box["height"]);
                
                image(attackbar, width/2 - (width/1.2)/2, height/1.85, width/1.2, height/4);
                
                image(slicer["black"], slicer["x"], height/1.9, 20, 165)
                slicer["x"] += 8
                
                drawAlphys()
            },
            "keypressed":function(key){
                if (key == 'enter'){
                    state = states["fight"]["slice"]
                    
                    slicerMove = setInterval(function(){
                        if (slicer["choosen"] == "black"){
                            slicer["choosen"] = "white"
                        }else{
                            slicer["choosen"] = "black"
                        }
                    },70)
                    
                    sliceMove = setInterval(function(){
                        if (slice["choosen"] == 5){
                            state = states["fight"]["harm"]
                            shake = setInterval(function(){
                                if(alphys["Foffset"] < 0){
                                    alphys["Foffset"] = -alphys["Foffset"]
                                }else if(alphys["Foffset"] > 0){
                                    alphys["Foffset"] = -(alphys["Foffset"]-1)
                                }else{
                                    //reset all values
                                    slicer["x"] = width/40
                                    slice["choosen"] = 0
                                    alphys["Foffset"] = 5
                                    clearInterval(slicerMove)
                                    states["defend"]["transform"]["init"]()
                                    state = states["defend"]["transform"]
                                    clearInterval(shake)
                                }
                            },80)
                            clearInterval(sliceMove)
                        }else{
                            slice["choosen"]+=1
                        }
                    },130)
                }
            }
        },
        "slice":{
            "waiting":function(){
                noFill();
                stroke(255);
                strokeWeight(5)
                rect(box["x"], box["y"], box["width"], box["height"]);
                
                image(attackbar, width/2 - (width/1.2)/2, height/1.85, width/1.2, height/4);
                
                image(slicer[slicer["choosen"]], slicer["x"], height/1.9, 20, 165)
                
                drawAlphys()
                
                image(slice["image"][slice["choosen"]], width/3+width/10, height/8+height/10,30,100)
                
            },
            "keypressed":function(key){
                
            }
        },
        "harm":{
            "waiting":function(){
                noFill();
                stroke(255);
                strokeWeight(5)
                rect(box["x"], box["y"], box["width"], box["height"]);
                
                image(attackbar, width/2 - (width/1.2)/2, height/1.85, width/1.2, height/4);
                
                image(slicer[slicer["choosen"]], slicer["x"], height/1.9, 20, 165)
                
                image(alphys["fatal"], width/3 + alphys["Foffset"], height/8, 200,200);
    
            },
            "keypressed":function(key){
                
            }
        }
    },
    "defend":{
        "transform":{
            "init":function(){
                box["origW"] = box["width"]
                box["origH"] = box["height"] 
                attacks[currentAttack][1]()
            },
            "waiting":function(){
                noFill();
                stroke(255);
                strokeWeight(5)
                rect(box["x"], box["y"], box["width"], box["height"]);
                
                drawAlphys();
                
                drawSoul();
                
                box["width"] += (attacks[currentAttack][2][0] - box["origW"])/50
                box["height"] += (attacks[currentAttack][2][1] - box["origH"])/50
                
                box["x"] = width/2 - box["width"]/2 
                box["y"] = height/ 1.5 - box["height"]/2 
                checkSoul()
                
                if(Math.round(box["width"]) == Math.round(attacks[currentAttack][2][0]) && Math.round(box["height"]) == Math.round(attacks[currentAttack][2][1])){
                    states["defend"]["dodge"]["init"]()
                    state = states["defend"]["dodge"]
                }
            },
            "keypressed":function(key){
                moveSoul(key)
            }
        },
        "dodge":{
            "init":function(){
                
            },
            "waiting":function(){
                noFill();
                stroke(255);
                strokeWeight(5)
                rect(box["x"], box["y"], box["width"], box["height"]);
                
                drawAlphys();
                
                drawSoul();
                
                attacks[currentAttack][0][subAttack]()
            },
            "keypressed":function(key){
                moveSoul(key)
            }
        }
    }
}
//------------------------------------------------------------------------------------

var warn
var attackInterval;
var sec = 0;
var flick = [237, 200, 2]

function alert(){
    warn = [[width/2,box["y"]+40],[width/2,box["y"]+160]]
    
    stroke(flick[0],flick[1],flick[2])
    strokeWeight(2)
    noFill()
    
    rect(box["x"]+10, box["y"]+10, box["width"]-20, box["height"]-20);
    
    for (var i = 0; i < warn.length; i++){
        beginShape();
        vertex(warn[i][0]+15,warn[i][1]);
        vertex(warn[i][0],warn[i][1]+15);
        vertex(warn[i][0]-15,warn[i][1]);
        vertex(warn[i][0],warn[i][1]-15);
        endShape(CLOSE);
    }
    
}

var crushDist = 0;

function crush(){
    
    warn = [[width/2,box["y"]+40],[width/2,box["y"]+160]]
    
    sec += 0.065
    if (sec < 3){
        if (flick[0] == 237 && flick[1] == 200 && flick[2] == 2){
            flick = [239, 243, 196]
        }else{
            flick = [237, 200, 2]
        }
        for (var i = 0; i < warn.length; i++){
            beginShape();
            vertex(warn[i][0],warn[i][1]-15);
            vertex(warn[i][0],warn[i][1]+15);
            vertex(warn[i][0]-15,warn[i][1]);
            vertex(warn[i][0],warn[i][1]-15);
            endShape(CLOSE);
        }
    }else{
        subAttack = subAttack+=1 
        clearInterval(attackInterval)
    }
    
}



var Flask = function(x,y,height){
    this.x = x
    this.y = y
    this.height = height
    this.filled = true
    
    this.draw = function(){
        fill(255);
        rect(x,y,5,height)
    }
    
    this.check = function(){
        return false
    }
}

// function sword(){
    
// }


//main function, init function, and the size of rectangle
var attacks = [
    [[alert,crush,"f3"],function(){
        attackInterval = setInterval(function(){
            sec += 0.05
            if (sec < 3){
                if (flick[0] == 237 && flick[1] == 200 && flick[2] == 2){
                    flick = [239, 243, 196]
                }else{
                    flick = [237, 200, 2]
                }
            }else{
                subAttack = subAttack+=1 
                clearInterval(attackInterval)
            }
        },50)
    },[200,200]],
    "wire",
    "stungun",
    "maze"
]

//------------------------------------------------------------------------------------

var state = states["fight"]["bar"];

function setup(){
    
    createCanvas(800,600)
    background(0)
    
    frameRate(60)
    
    soul.x = width/2 - 10
    soul.y = height/1.5
    
    box["height"] = height/3.5
    box["y"] = height/ 1.5 - box["height"]/2
    box["width"] = width/1.15
    box["x"] = width/2 - box["width"]/2
    
    slicer["x"] = width/40
    
    alphysMove = setInterval(function(){ 
        alphys["Hoffset"]["y"] = Math.sin(alphys["Hoffset"]["ya"])*5
        alphys["Hoffset"]["ya"] += 0.2
        
        alphys["Boffset"]["y"] = Math.sin(alphys["Hoffset"]["ya"])*6.5
        alphys["Boffset"]["ya"] += 0.2
    }, 100);
    
}

var maps = {};
onkeydown = onkeyup = function(e){
    e = e || event; 
    maps[e.keyCode] = e.type == 'keydown';
    for (var key in maps){
      if (maps[key] == false){
          delete maps[key]
      }
    }
}

function draw(){
    background(0)
    
    state['waiting']()
    
    
    for (var keyCode in maps){
        if(keyCode == 38){
            state['keypressed']('up')
        }if(keyCode == 39){
            state['keypressed']('right')
        }if(keyCode == 40){
            state['keypressed']('down')
        }if(keyCode == 37){
            state['keypressed']('left')
        }
    }
}

function keyPressed() {
    if (keyCode == 13){
        state['keypressed']('enter')
    }
}




//-----------------------------------------------------------------------------------------


function checkSoul(){
    if (soul.y < box["y"]){
        soul.y = box["y"]
    }
    if (soul.x > box["x"]+box["width"]-20){
        soul.x = box["x"]+box["width"]-20
    }
    if (soul.y > box["y"]+box["height"]-20){
        soul.y = box["y"]+box["height"]-20
    }
    if (soul.x < box["x"]){
        soul.x = box["x"]
    }
}

function moveSoul(key){
    if (key == "up"){
        if (soul.y - speed < box["y"]){
            soul.y = box["y"]
        }else{
            soul.y -= speed;
        }
    }else if(key == "right"){
        if (soul.x + speed > box["x"]+box["width"]-20){
            soul.x = box["x"]+box["width"]-20
        }else{
            soul.x += speed;
        }
    }else if (key == "down"){
        if (soul.y + speed > box["y"]+box["height"]-20){
            soul.y = box["y"]+box["height"]-20
        }else{
            soul.y += speed;
        }
    }else if(key == "left"){
        if (soul.x - speed < box["x"]){
            soul.x = box["x"]
        }else{
            soul.x -= speed;
        }
    }
}

function drawSoul(){
    image(soul.image,soul.x,soul.y,20,20)
}

function drawAlphys(){
    image(alphys["leg"], width/3, height/8, 200,200);
    image(alphys["body"], width/3, height/8 + alphys['Boffset']['y'], 200, 200);
    image(alphys["head"], width/3, height/8 + alphys['Hoffset']['y']+3, 200,200);
    image(alphys["tail"], width/3, height/8 , 200,200);
}