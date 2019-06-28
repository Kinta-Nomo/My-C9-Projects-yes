
function printTxt(txt,a,b,c){
    fill(a,b,c)
    stroke(a,b,c)
    strokeWeight(2)
    text(txt,0,100,100)
}

function mark(x,a,b,c){
    stroke(a,b,c)
    strokeWeight(5)
    line(x,0,x,canvasHeight)
}


var widthTimer;

var canvasWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var canvasHeight = (window.innerHeight > 0) ? window.innerHeight : screen.Height;

// var blockHeight = canvasWidth/50 //map viewwer
var blockHeight = canvasWidth/12 //implimentation
// var blockHeight = canvasHeight/8 //alpha version
var boxinHeight = 80/100*blockHeight

var state;


var boxin = null; 
var controlBall = null; 

var boxinImages = [null, null];
var blockType = {};
    
var selectedGroup;  
var intFace = {
    "controlBall": null,
    "controlHole": null
}

function preload(){
    blockType["grass"] = loadImage('/images/grassIII.png')
    blockType["dirt"] = loadImage('/images/dirt.png')
    blockType["treeI"] = loadImage('/images/grassIII (1) (2).png')
    blockType["treeII"] = loadImage('/images/New Piskel (3).png')
    blockType["leafI"] = loadImage('/images/leafI.png')
    blockType["leafII"] = loadImage('/images/leafII.png')
    boxinImages[0] = loadImage('/images/Boxin.png')
    boxinImages[1] = loadImage('/images/Boxin2.png')
    intFace["controlBall"] = loadImage('/images/controlBall.png')
    intFace["controlHole"] = loadImage('/images/controlHole.png')
}

function setup(){
    /*global createCanvas*/
    createCanvas(canvasWidth, canvasHeight);
    background(255)
    
    boxin = new Boxin(0,0,0);
    controlBall = new ControlBall(canvasWidth/8,canvasHeight/4*3,canvasHeight/8);
    
    state = states["playing"] 
}

//------------------------------------------------------------------------------

var states = {
    "playing":{
        "draw": function(){
            background(139, 201, 232);
            drawLevel();
            boxin.draw();
            boxin.update();
            
            if (dragging){
                noStroke();
                fill(0,0,0,50);
                rect(groupRight, 0, canvasWidth, canvasHeight)
                rect(0, 0, groupLeft, canvasHeight)
                
                // for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                //     var cell = level[selectedGroup]["blocks"][i];
                        
                //     cell.draw()
                // }
            
                stroke(255);
                strokeWeight(8);
                line(groupLeft,0,groupLeft,canvasHeight)
                line(groupRight,0,groupRight,canvasHeight)
                
            }
            drawInterface();
            
        },
        "keydown": function(key){
            boxin.move(key)
        }
    }
}

//------------------------------------------------------------------------------

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
    state["draw"]()
    
    for (var keyCode in maps){
        if(keyCode == 38){
            state['keydown']('up')
        }if(keyCode == 39){
            state['keydown']('right')
        }if(keyCode == 40){
            state['keydown']('down')
        }if(keyCode == 37){
            state['keydown']('left')
        }
    }
    
    if (mouseIsPressed){
        if (controlling) {
            var distance = (Math.abs(canvasWidth/8 - mouseX)**2 + Math.abs(canvasHeight/4*3 - mouseY)**2)**0.5
            
            var angle =  0
            if ((mouseX - canvasWidth/8) >= 0){
                angle = Math.atan((canvasHeight/4*3 - mouseY)/(mouseX - canvasWidth/8)) * (180/Math.PI) 
            }else{
                // console.log(Math.atan((canvasHeight/4*3 - controlBall.y)/(canvasWidth/8 - controlBall.x)) * (180/Math.PI) + 180)
                angle = Math.atan((canvasHeight/4*3 - mouseY)/(mouseX - canvasWidth/8)) * (180/Math.PI) + 180
            }
            
            if (distance < canvasHeight/10){
                controlBall.x = mouseX
                controlBall.y = mouseY
            }else{
                controlBall.x = canvasWidth/8 + (Math.cos(angle * (Math.PI / 180))) * (canvasHeight/10)
                //not sure why is works with -sin
                controlBall.y = canvasHeight/4*3 + (-Math.sin(angle * (Math.PI / 180))) * (canvasHeight/10)
            }
            
            
            if (distance > canvasHeight/14){
                if (angle > -22.5 && angle < 22.5){
                    state['keydown']('right')
                }else if (angle > 22.5 && angle < 67.5){
                    state['keydown']('right')
                    state['keydown']('up')
                }else if (angle > 67.5 && angle <  + 112.5){
                    state['keydown']('up')
                }else if (angle > 112.5 && angle <  + 157.5){
                    state['keydown']('left')
                    state['keydown']('up')
                }else if (angle > 157.5 && angle <  + 202.5){
                    state['keydown']('left')
                }
            }
        
        }
        //can simultaniously drag and move at the same time (failing)
        if (dragging){
            var rightBorder = level[selectedGroup]["range"][1]*blockHeight
            var leftBorder = level[selectedGroup]["range"][0]*blockHeight
            var canUpdate = true
            if (previewsPull < (dragStart - mouseX)){
                //left
                if (beginX - (dragStart - mouseX) >= rightBorder){
                    // level[selectedGroup]["x"] = beginX - (dragStart - mouseX)
                    for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                        if (level[selectedGroup]["blocks"][i].checkCollision(level[selectedGroup]["blocks"][i].originalX + (rightBorder))){
                            canUpdate = false
                        }
                    }
                    if (canUpdate){
                        for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                            level[selectedGroup]["blocks"][i].x = level[selectedGroup]["blocks"][i].originalX + (rightBorder)
                        }
                    }
                }else if ((beginX - (dragStart - mouseX)) > leftBorder){
                    level[selectedGroup]["x"] = beginX - (dragStart - mouseX)
                    
                    for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                        if (level[selectedGroup]["blocks"][i].checkCollision(level[selectedGroup]["blocks"][i].initialX - (dragStart - mouseX))){
                            canUpdate = false
                        }
                    }
                    if (canUpdate){
                        for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                            level[selectedGroup]["blocks"][i].x = level[selectedGroup]["blocks"][i].initialX - (dragStart - mouseX)
                        }
                    }
                }else{
                    level[selectedGroup]["x"] = leftBorder
                    
                    for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                        if (level[selectedGroup]["blocks"][i].checkCollision(level[selectedGroup]["blocks"][i].originalX + leftBorder)){
                            canUpdate = false
                        }
                    }
                    if (canUpdate){
                        for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                            level[selectedGroup]["blocks"][i].x = level[selectedGroup]["blocks"][i].originalX + leftBorder
                        }
                    }
                }
            }else if(previewsPull > (dragStart - mouseX)){
                //right
                if (beginX - (dragStart - mouseX) <= leftBorder){
                    // console.log()
                    // level[selectedGroup]["x"] = beginX - (dragStart - mouseX)
                    for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                        if (level[selectedGroup]["blocks"][i].checkCollision(level[selectedGroup]["blocks"][i].originalX + (leftBorder))){
                            canUpdate = false
                        }
                    }
                    if (canUpdate){
                        for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                            level[selectedGroup]["blocks"][i].x = level[selectedGroup]["blocks"][i].originalX + (leftBorder)
                        }
                    }
                    
                }else if ((beginX - (dragStart - mouseX)) < rightBorder){
                    level[selectedGroup]["x"] = beginX - (dragStart - mouseX)
                    for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                        if (level[selectedGroup]["blocks"][i].checkCollision(level[selectedGroup]["blocks"][i].initialX - (dragStart - mouseX))){
                            canUpdate = false
                        }
                    }
                    if (canUpdate){
                        for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                            level[selectedGroup]["blocks"][i].x = level[selectedGroup]["blocks"][i].initialX - (dragStart - mouseX)
                        }
                    }
                }else{
                    level[selectedGroup]["x"] = rightBorder
                    for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                        if (level[selectedGroup]["blocks"][i].checkCollision(level[selectedGroup]["blocks"][i].originalX + (rightBorder))){
                            canUpdate = false
                        }
                    }
                    if (canUpdate){
                        for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
                            level[selectedGroup]["blocks"][i].x = level[selectedGroup]["blocks"][i].originalX + (rightBorder)
                        }
                    }
                }
            }else{
                //stationary
            }
            
            previewsPull = (dragStart - mouseX)
        }
    }
}

//------------------------------------------------------------------------------

function drawLevel(){
    for (var i=level.length-1; i>=0; i--){
        // if (dragging && i==selectedGroup){
            
        // }else{
            for (var j=0; j<level[i]["blocks"].length; j++){
                var cell = level[i]["blocks"][j];
                    
                cell.draw()
            }
        // }
    }
    if (dragging){
        // fill(0,0,0,100)
        // noStr
        // rect(0,0,canvasWidth,canvasHeight)
        for (var i=0; i<level[selectedGroup]["blocks"].length; i++){
            //if the cell behind the iterated box is not undefined (box at left edge), check if behind box is directly next to the iterated box
            // if (level[selectedGroup][i-1] != undefined ){
            //     if (level[selectedGroup][i].cellX-1 > level[selectedGroup][i-1].cellX)  {  
            //         var selectWidth = 1;
            //         for (var j=i; j<level[selectedGroup].length-1; j++){
            //             if (level[selectedGroup][j].cellX-1 >= level[selectedGroup][j+1].cellX){
            //                 selectWidth+=1
            //             }else{
            //                 break
            //             }
            //         }
            //         stroke(200,200,0)
            //         strokeWeight(5)
            //         noFill()
            //         rect(level[selectedGroup][i].x, selectedGroup*blockHeight, blockHeight*selectWidth, blockHeight)
            //     }
            // }
        }
    }
}

function drawInterface(){
    image(intFace["controlHole"],canvasWidth/8 - canvasHeight/8,canvasHeight/4*3 - canvasHeight/8,canvasHeight/4,canvasHeight/4)
    stroke(255);
    strokeWeight(20)
    line(canvasWidth/8, canvasHeight/4*3, controlBall.x, controlBall.y)
    controlBall.draw()
}

//------------------------------------------------------------------------------

function Boxin(x,y,depth){
    this.x = (x-1)*blockHeight;
    this.y = (y-1)*blockHeight-(blockHeight/4*4);
    this.depth = depth
    
    this.img = boxinImages[0]
    this.width = boxinHeight/1.2
    
    this.spinTimer = null
    this.spinning = false
    //---//
    this.jumpTimer = null
    this.canJump = true
    
    this.speedY = 0;
    this.speedX = blockHeight/30
    // this.speedX = 1
    this.collidingDown = false;
    this.collidingSide = false;
    
    this.draw = function(){
        image(this.img,canvasWidth/2+((boxinHeight-this.width)/2),canvasHeight/3,this.width,boxinHeight)
    };
    
    this.move = function(key){
        if (key == "right"){
            if (boxin.spinning == false && boxin.img != boxinImages[1]){
                boxin.spinning = true
                this.spinTimer = setInterval(function(){
                    if (boxin.width>3){
                        boxin.width-=3
                    }else{
                        boxin.img = boxinImages[1]
                        clearInterval(boxin.spinTimer)
                        boxin.spinTimer = setInterval(function(){
                            if (boxin.width<boxinHeight/1.2){
                                boxin.width+=3
                            }else{
                                boxin.spinning = false
                                clearInterval(boxin.spinTimer)
                            }
                        },5)
                    }
                },5)
            }else if(this.spinning == false && this.img == boxinImages[1]){
                
                //collision
                this.collidingSide = false;
                for (var i=0; i<level.length; i++){
                    for (var j=0; j<level[i]["blocks"].length; j++){
                        if (level[i]["blocks"][j].depth == this.depth){
                            if (this.x+this.width <= level[i]["blocks"][j].x && this.x+this.width+this.speedX > level[i]["blocks"][j].x){
                                if ((level[i]["blocks"][j].y+(blockHeight/6.5) < this.y && level[i]["blocks"][j].y+blockHeight >= this.y) ||
                                    (level[i]["blocks"][j].y+(blockHeight/6.5) <= this.y+boxinHeight && level[i]["blocks"][j].y+blockHeight > this.y+boxinHeight)){
                                    this.collidingSide = true
                                    this.x = level[i]["blocks"][j].x-this.width
                                }
                            }
                        }
                    }
                }
                
                if (!this.collidingSide){
                    this.x += this.speedX
                }
                
            }
        }else if (key == "left"){
            if (boxin.spinning == false && boxin.img != boxinImages[0]){
                boxin.spinning = true
                this.spinTimer = setInterval(function(){
                    if (boxin.width>3){
                        boxin.width-=3
                    }else{
                        boxin.img = boxinImages[0]
                        clearInterval(boxin.spinTimer)
                        boxin.spinTimer = setInterval(function(){
                            if (boxin.width<boxinHeight/1.2){
                                boxin.width+=3
                            }else{
                                boxin.spinning = false
                                clearInterval(boxin.spinTimer)
                            }
                        },5)
                    }
                },5);
            }else if(this.spinning == false && this.img == boxinImages[0]){
                
                //collision
                this.collidingSide = false;
                for (var i=0; i<level.length; i++){
                    for (var j=0; j<level[i]["blocks"].length; j++){
                        if (level[i]["blocks"][j].depth == this.depth){
                            if (this.x >= level[i]["blocks"][j].x+blockHeight && this.x-this.speedX < level[i]["blocks"][j].x+blockHeight){
                                if ((level[i]["blocks"][j].y+(blockHeight/6.5) < this.y && level[i]["blocks"][j].y+blockHeight >= this.y) ||
                                    (level[i]["blocks"][j].y+(blockHeight/6.5) <= this.y+boxinHeight && level[i]["blocks"][j].y+blockHeight > this.y+boxinHeight)){
                                    this.collidingSide = true
                                    this.x = level[i]["blocks"][j].x+blockHeight
                                }
                            }
                        }
                    }
                }
                
                if (!this.collidingSide){
                    this.x -= this.speedX
                }
            }
        }else if (key == "up"){
            if (this.canJump){
                if (this.speedY == 0 && this.collidingDown){
                    this.speedY = -blockHeight/10;
                    this.canJump = false
                    this.jumpTimer = setInterval(function(){
                        boxin.canJump = true
                        clearInterval(boxin.jumpTimer)
                    },500)
                }
            }
        }
    };
    
    this.update = function(){
        
        //function can be optimised by putting if first then the loop!
        
        //gravitational area
        
        this.collidingDown = false;
        for (var i=0; i<level.length; i++){
            for (var j=0; j<level[i]["blocks"].length; j++){
                //little more space of boxin's --/__\_\--
                if (level[i]["blocks"][j].depth == this.depth){
                    if (this.speedY >= 0){
                        if (this.y+boxinHeight + this.speedY > level[i]["blocks"][j].y+(blockHeight/8) && this.y+boxinHeight <= level[i]["blocks"][j].y+(blockHeight/8)){
                            if ((level[i]["blocks"][j].x < this.x && level[i]["blocks"][j].x+blockHeight > this.x) ||
                                (level[i]["blocks"][j].x < this.x+boxinHeight/1.2 && level[i]["blocks"][j].x+blockHeight > this.x+boxinHeight/1.2)){
                                this.collidingDown = true
                            }
                        }
                    }else{
                        // + boxinHeight/10 for __\/_
                        if (this.y + boxinHeight/8 + this.speedY < level[i]["blocks"][j].y+blockHeight && this.y + boxinHeight/8 >= level[i]["blocks"][j].y+blockHeight){
                            if ((level[i]["blocks"][j].x < this.x && level[i]["blocks"][j].x+blockHeight > this.x) ||
                                (level[i]["blocks"][j].x < this.x+boxinHeight/1.2 && level[i]["blocks"][j].x+blockHeight > this.x+boxinHeight/1.2)){
                                console.log("ha")
                                this.speedY = 0
                            }
                        }
                    }
                }
            }
        }
        
        if (!this.collidingDown){
            this.y += this.speedY;
            this.speedY += blockHeight/230;
        }else{
            this.speedY = 0;
        }
        //-------------------
    }
}

function Block(x,y,depth,type){
    //checker for the nexting blocks
    this.cellX = x
    
    this.x = x*blockHeight
    this.y = y*(blockHeight/1.2)+(depth*(blockHeight/6.5))
    this.depth = depth
    this.type = type
    
    //determines the initial x position before movement
    this.initialX = this.x
    
    //determines the original x position
    this.originalX = this.x
    
    this.draw = function(){
        //canvasWidth/2+((boxinHeight-this.width)/2) is the boxin position
        image(blockType[this.type], this.x-boxin.x+(canvasWidth/2+((boxinHeight-boxinHeight/1.2)/2)), this.y-boxin.y+canvasHeight/3, blockHeight, blockHeight);
    }
    
    this.checkCollision = function(x){
        
        var able = true
        for (var i=0;i<level.length;i++){
            if (i != selectedGroup){
                for (var j=0;j<level[i]["blocks"].length;j++){
                    if (this.y == level[i]["blocks"][j].y){
                        if ((x >= level[i]["blocks"][j].x && x <= level[i]["blocks"][j].x+blockHeight) || (x+blockHeight >= level[i]["blocks"][j].x && x+blockHeight <= level[i]["blocks"][j].x+blockHeight)){
                            able = false;
                        }
                    }
                }  
            }   
        }
        if (able){
            return false
        }else{
            return true
        }
    }
}

//this is a matrix, but also not really. two different blocks with same y can exit in.
//each list in the list indicates the boxes that moves in a group.
// var level = [[new Block(2, 1, 1, "grass", true),new Block(3, 1, 1,"grass", true)],
//             [new Block(2, 1, 0, "grass", true),new Block(3, 1, 0,"grass", true)]];
            
// var level = [{"blocks":[new Block(5, 2, 2,"treeI"),new Block(5, 1, 2,"treeII"),new Block(5, 0, 2,"treeI")],"movable":false,"range":[],"x":0},
//              {"blocks":[new Block(2, 1, 0, "grass"),new Block(3, 1, 0,"grass")],"movable":false,"range":[],"x":0},
//              {"blocks":[new Block(2, 2, 1,"grass"), new Block(4, 2, 1,"grass")],"movable":true,"range":[-2,2],"x":0},
//              {"blocks":[new Block(1, 3, 2,"grass"),new Block(2, 3, 2,"grass"),new Block(3, 3, 2,"grass"),new Block(4, 3, 2,"grass"),new Block(5, 3, 2,"grass")],"movable":true,"range":[0,4],"x":0},
//              {"blocks":[new Block(1, 4, 2,"grass"),new Block(2, 4, 2,"grass"),new Block(3, 4, 2,"grass"),new Block(4, 4, 2,"grass"),new Block(5, 4, 2,"grass")],"movable":true,"range":[-2,2],"x":0}
//              ];
   
var level = [{"blocks":[new Block(-1, 0, -1,"treeI"), new Block(-1, -1, -1,"treeII"), new Block(-1, -2, -1,"treeI"), new Block(-1, -3, -1,"treeII"),
                        new Block(0, -1, -1,"leafII"), new Block(-2, -2, -1,"leafI"), new Block(0, -3, -1,"leafII")],"movable":false,"range":[],"x":0},
             {"blocks":[new Block(3, 0, -1,"treeI"), new Block(3, -1, -1,"treeII"), new Block(3, -2, -1,"treeI"), new Block(3, -3, -1,"treeII"),
                        new Block(4, -1, -1,"leafII"), new Block(2, -2, -1,"leafI"), new Block(4, -3, -1,"leafII")],"movable":false,"range":[],"x":0},
             {"blocks":[new Block(7, 0, -1,"treeI"), new Block(7, -1, -1,"treeII"), new Block(7, -2, -1,"treeI"), new Block(7, -3, -1,"treeII"),
                        new Block(8, -1, -1,"leafII"), new Block(6, -2, -1,"leafI"), new Block(8, -3, -1,"leafII")],"movable":false,"range":[],"x":0},
             {"blocks":[new Block(14, -2, 0,"treeI"), new Block(14, -3, 0,"treeII"), new Block(14, -4, 0,"treeI"), new Block(14, -5, 0,"treeII"),
                        new Block(15, -3, 0,"leafII"), new Block(13, -4, 0,"leafI"), new Block(15, -5, 0,"leafII")],"movable":false,"range":[],"x":0},
                        
             //----------------------------------------------------------------//
             
             {"blocks":[new Block(14, -1, 0, "grass"),new Block(15, -1, 0, "grass")],"movable":false,"range":[],"x":0},
             {"blocks":[new Block(11, -1, 0, "grass"),new Block(12, -1, 0, "grass"),new Block(13, -1, 0, "grass")],"movable":true,"range":[-1, 0],"x":0},
             {"blocks":[new Block(10, 0, 0, "grass"),new Block(11, 0, 0, "grass")],"movable":false,"range":[],"x":0},
             {"blocks":[new Block(-2, 1, 0, "grass"), new Block(-1, 1, 0, "grass"), new Block(0, 1, 0, "grass"), new Block(1, 1, 0,"grass"),
                        new Block(2, 1, 0,"grass"), new Block(3, 1, 0,"grass"), new Block(4, 1, 0,"grass"), new Block(5, 1, 0,"grass"),
                        new Block(6, 1, 0,"grass"), new Block(7, 1, 0,"grass"), new Block(8, 1, 0,"grass"), new Block(9, 1, 0,"grass"), new Block(10, 1, 0,"grass")],"movable":false,"range":[],"x":0},
             {"blocks":[new Block(11, 2, 0, "grass"), new Block(12, 2, 0, "grass"), new Block(13, 2, 0, "grass"), new Block(14, 2, 0,"grass"),
                        new Block(15, 2, 0,"grass"), new Block(16, 2, 0,"grass")],"movable":false,"range":[],"x":0},
                        
             {"blocks":[new Block(20, 2, 0,"grass"), new Block(21, 2, 0,"grass"), new Block(22, 2, 0,"grass"),
                        new Block(21, 1, -1,"treeI"), new Block(21, 0, -1,"treeII"), new Block(21, -1, -1,"treeI"), new Block(21, -2, -1,"treeII"),
                        new Block(22, 0, -1,"leafII"), new Block(20, -1, -1,"leafI"), new Block(22, -2, -1,"leafII")
                        ],"movable":true,"range":[-3,2],"x":0},
             {"blocks":[new Block(27, 3, 0,"dirt"), new Block(28, 3, 0,"grass"), new Block(29, 3, 0,"grass"), new Block(30, 3, 0,"grass"),
                        new Block(31, 3, 0,"dirt"),new Block(25, 2, 0,"grass"), new Block(26, 2, 0,"grass"), new Block(27, 2, 0,"grass"), new Block(31, 2, 0,"grass"), new Block(32, 2, 0,"grass"),
                        new Block(33, 2, 0,"grass"), new Block(34, 2, 0,"dirt"), new Block(34, 1, 0,"grass"), new Block(35, 1, 0,"grass"), new Block(36, 1, 0,"grass"),],"movable":false,"range":[],"x":0},
             
             {"blocks":[new Block(31, -2, 0,"dirt"), new Block(32, -2, 0,"grass"), new Block(33, -2, 0,"grass"),new Block(34, -2, 0,"grass"), new Block(31, -3, 0,"dirt"),
                        new Block(31, -4, 0,"grass"), new Block(30, -4, 0,"dirt"), new Block(30, -5, 0,"grass")],"movable":true,"range":[0,4],"x":0},
             {"blocks":[new Block(40, 1, 0,"grass"), new Block(41, 1, 0,"grass"), new Block(42, 1, 0,"dirt"), new Block(43, 1, 0,"dirt") , new Block(42, 0, 0,"grass"),
                        new Block(43, 0, 0,"dirt"), new Block(43, -1, 0,"grass")],"movable":true,"range":[-3,0],"x":0},
             {"blocks":[new Block(44, 1, 0,"grass")],"movable":true,"range":[-4,0],"x":0},
             
             //----------------------------------------------------------------//
                        
             {"blocks":[new Block(14, 1, -1,"dirt"), new Block(14, 0, -1,"dirt")],"movable":false,"range":[],"x":0}
            ];
         
function ControlBall(x, y, length){
    this.x = x
    this.y = y
    this.length = length
    
    this.draw = function(){
        image(intFace["controlBall"],this.x - (this.length/2), this.y - (this.length/2), this.length, this.length)
    }
}
//------------------------------------------------------------------------------

var dragging = false;
var controlling = false;
var dragStart;
var beginX = 0;

//checks if player is dragging to left or right
var previewsPull = 0;

//the rightMost and leftMost index of list
var groupLeft = 0;
var groupRight = 0;

function mousePressed() {
    if ((Math.abs(canvasWidth/8 - mouseX)**2 + Math.abs(canvasHeight/4*3 - mouseY)**2)**0.5 < canvasHeight/10){
        controlBall.x = mouseX
        controlBall.y = mouseY
        controlling = true;
    }else{
        loop1:
            for (var i=0; i<level.length; i++){
        loop2:
                for (var j=0; j<level[i]["blocks"].length; j++){
                    var ghostX = level[i]["blocks"][j].x - boxin.x+canvasWidth/2
                    if (ghostX < mouseX && ghostX+blockHeight >= mouseX && level[i]["movable"]){
                        var ghostY = level[i]["blocks"][j].y - boxin.y+canvasHeight/3
                        if (ghostY < mouseY && ghostY+blockHeight >= mouseY){
                            dragStart = mouseX
                            dragging = true;
                            selectedGroup = i
                            beginX = level[selectedGroup]["x"]
                            
                            //saves every position & checks rightmost/leftmost
                            for (var k=0; k<level[selectedGroup]["blocks"].length; k++){
                                level[selectedGroup]["blocks"][k].initialX = level[selectedGroup]["blocks"][k].x
                                
                                //
                                if (level[selectedGroup]["blocks"][k].originalX < level[selectedGroup]["blocks"][groupLeft].originalX){
                                    groupLeft = k
                                }
                                if (level[selectedGroup]["blocks"][k].originalX > level[selectedGroup]["blocks"][groupRight].originalX){
                                    groupRight = k
                                }
                            }
                            groupLeft = (level[selectedGroup]["blocks"][groupLeft].originalX-boxin.x+canvasWidth/2) + level[selectedGroup]["range"][0]*blockHeight
                            groupRight = (level[selectedGroup]["blocks"][groupRight].originalX-boxin.x+canvasWidth/2+blockHeight) + level[selectedGroup]["range"][1]*blockHeight
                            
                            break loop1
                        }
                    }
                }
            }
    }
    
  // prevent default dragging
  return false;
}

function mouseReleased() {
    dragging = false;
    controlling = false;
    controlBall.x = canvasWidth/8
    controlBall.y = canvasHeight/4*3
    groupLeft = 0;
    groupRight = 0;
}
