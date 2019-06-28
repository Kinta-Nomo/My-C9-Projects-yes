
var makables=[]
var creatables=[['+','+','×'],['-','-','÷'],['×','×','pow'],['÷','÷','√'],['+','-','±'],["-","+","∓"],['+','+','+','Σ'],['×','×','×','∏'],['1','1','='],['2','2','='],['1','2','<'],['2','1','>'],['<','>','≠'],['>','<','≠'],['-','#','-#'],['-','-#','#'],['1','+','2','3'],['2','+','1','3']]

var level2 = [['√','-#','i'],['1','×','2','×','3','#!'],['!','=','≠'],['3','÷','2','mod'],['3','√','3√'],['1','0','10'],['10','10','100'],['10','0','100'],['1','#/#','100','%'],['100','#/#','%']  ,['-#','→','#','|#|'],['#','#','#','{ }']]

var level = 1;


var notations = []
var r = 20
var n = 0;

var selected = null
var gameSlider;

var makePressed;
var dusterPressed;
var drag = false;
var origX;


function colorCheck(notation){
    if (['+','-','×','÷','#','1','2','pow','√','±','∓','Σ','∏','0','-#','3','#/#','#!','mod','3√','10','100','%','|#|','.'].includes(notation)){
        stroke(0,0,255);
    }else if(['=','<','>','≠','!'].includes(notation)){
        stroke(0,200,0);
    }else if(['→'].includes(notation)){
        stroke(0,0,0);
    }else if(['{ }',','].includes(notation)){
        stroke(232, 118, 11);
    }
}

function colorCheckFill(notation){
    if (['+','-','×','÷','#','1','2','pow','√','±','∓','Σ','∏','0','-#','3','#/#','#!','mod','3√','10','100','%','|#|','.'].includes(notation)){
        fill(0,0,255)
    }else if(['=','<','>','≠','!'].includes(notation)){
        fill(0,200,0)
    }else if(['→'].includes(notation)){
        fill(0,0,0)
    }else if(['{ }',','].includes(notation)){
        fill(232, 118, 11)
    }
}

function make(){
    //for every makables for every recipes
    for(var i=0;i<makables.length;i++){
        for(var j=0;j<creatables.length;j++){
            if(makables[i].body.length == creatables[j].length-1){
                var match = true
                for(var k=0;k<makables[i].body.length;k++){
                    if (makables[i].body[k].not!=creatables[j][k]){
                        match = false
                    }    
                }
                
                if(match){
                    // if makables[i] matched, check for each notation in every makables[i].body
                    for(var k=0;k<makables[i].body.length;k++){
                        for(var l=0;l<notations.length;l++){
                            //if two of them matched, splice
                            if (makables[i].body[k]==notations[l]){
                                notations.splice(l,1)
                                break
                            }    
                        }    
                    }
                    makables.splice(i,1)
                    i-=1
                    summon(creatables[j][creatables[j].length-1])
                    if(gameSlider.discovered.includes(creatables[j][creatables[j].length-1]) == false){
                        gameSlider.discover(creatables[j][creatables[j].length-1])
                        
                        //everytime new object is discovered check for the level up
                        var levelUp = true;
                        var progress = []
                        
                        //adding every final items to progress
                        for(var l = 0;l<creatables.length;l++){
                            progress.push(String(creatables[l][creatables[l].length-1]))
                        }
                        
                        //for each item in progress, check each item in discovered
                        for (var l = 0; l<progress.length; l++){
                            if (!(gameSlider.discovered.includes(progress[l]))){
                                levelUp = false
                            }
                        }
                        if(levelUp){
                            alert('levelup')
                            levelup()
                        }
                    }
                    
                    break
                }
            }
        }
    }
}

function supersummon(name,n){
    for(var i=0;i<n;i++){
        summon(name)
    }
}

function summon(name){
    notations.push(new notation(random(0,500),random(gameSlider.height,height-(height/10)),[random(0,255),random(0,255),random(0,255)],name,n))
    makables.push({'id':n,'body':[notations[notations.length-1]]})
    n+=1
}

function levelup(){
    if (level == 1){
        alert('level up! You are now level 2! new Recipes and notations unlocked!')
        level = 2
        creatables = creatables.concat(level2)
        
        var unlockables = ['#/#','.',',','!','0','→']
        for (var i = 0;i<unlockables.length;i++){
            gameSlider.discover(unlockables[i])
        }
    }else if(level == 2){
        
    }
}

function around(x1,y1,x2,y2,r){
    if(((x1-x2)**2+(y1-y2)**2)**0.5 < r){
        return true
    }else{
        return false
    }
}



function notation(x,y,color,not,id){
    this.x = x
    this.y = y
    this.color = color
    this.not = not
    this.id = id 
}

function slider(width,height){
    this.x = 0
    this.height = height/8
    this.discovered = ['+','-','#','1','2']
    this.picked = null;
    
    this.draw = function(){
        fill(230);
        rect(0,0,width,this.height);
        for (var i = 0;i<this.discovered.length;i++){
            colorCheckFill(this.discovered[i])
            noStroke()
            ellipse(this.x+(i+1)*(r*2.5),this.height/2.35+27,r/1.9,r/2.5)
            if (this.discovered[i] != this.picked){
                
                stroke(0)
                strokeWeight(1)
                fill(255);
                ellipse(this.x+(i+1)*(r*2.5),this.height/2.35,r*2-(r/8))
                
                noStroke()
                fill(0);
                
                var offsetx = 0;
                var offsety = 0;
                if (this.discovered[i].length==1){textSize(30);offsetx=r/2.0;offsety=r/2.0}
                else if (this.discovered[i].length==2){textSize(20);offsetx=r/2.0;offsety=r/3.0}
                else if (this.discovered[i].length==3){textSize(15);offsetx=(r/4)*2.8;offsety=r/4;}
                else if (this.discovered[i].length==9){textSize(8);offsetx=(r/4)*2.8;offsety=r/4;}
                
                text(this.discovered[i], this.x+(i+1)*(r*2.5)-offsetx,this.height/2.35+offsety);
                
            }
        }
    }
    
    this.check = function(x,y){
        for (var i = 0;i<this.discovered.length;i++){
            if(around(x,y,this.x+(i+1)*(r*2.5),this.height/2.35,r-(r/8))){
                this.picked = this.discovered[i]
                return true
            }
        }
        return false
    }
    
    this.discover = function(notation){
        example = ['+','-','×','÷','pow','√','3√','Σ','∏','mod','#!','|#|','#','-#','#/#','0','1','2','3','10','100','±','∓','%','.','=','<','>','≠','!',',','{ }','→']
        console.log(example.indexOf(notation))
        for (var i = 1;i<this.discovered.length;i++){
            if (example.indexOf(this.discovered[i])>example.indexOf(notation)){
                this.discovered.splice(i, 0, notation);
                break
            }else if(i == this.discovered.length-1){
                this.discovered.push(notation);
                break
            }
        }
    }
    
}



function setup(){
    createCanvas(500,500);
    background(0);
    
    binButton = loadImage("/image/binButton2.png");  // Load the image
    createButton = loadImage("/image/createButton.png");  // Load the image
    dusterButton = loadImage("/image/duster.png");  // Load the image
    
    gameSlider = new slider(width,height)
    
    supersummon('+',10)
    supersummon('-',10)
    
    noStroke()
}

function draw(){
    background(0);
    
    image(binButton, width-width/3.6, height-height/7.2, width/7, width/7);
    image(createButton, width-width/8, height-height/8, width/9, width/9);
    image(dusterButton, width-(width/3.6+width/3.6/2), height-height/7.2, width/7, width/7);
    
    
    for (var i=0;i<makables.length;i++){
        if (makables[i].body.length>1){
            for (var j=0;j<makables[i].body.length-1;j++){
                stroke(200)
                strokeWeight(5)
                line(makables[i].body[j].x,makables[i].body[j].y,makables[i].body[j+1].x,makables[i].body[j+1].y)
            }
            noStroke()
        }
    }
    
    
    for (var i=0;i<notations.length;i++){
        fill(255)
        ellipse(notations[i].x,notations[i].y,r*2-(r/8))
        
        noFill()
        colorCheck(notations[i].not)
        strokeWeight(3);
        ellipse(notations[i].x,notations[i].y,r*2-(r/8)-(r/2))
        noStroke();
        
        fill(0);
        
        var offsetx = 0;
        var offsety = 0;
        if (notations[i].not.length==1){textSize(30);offsetx=r/2.0;offsety=r/2.0}
        else if (notations[i].not.length==2){textSize(20);offsetx=r/2.0;offsety=r/3.0}
        else if (notations[i].not.length==3){textSize(15);offsetx=(r/4)*2.8;offsety=r/4;}
        else if (notations[i].not.length==9){textSize(8);offsetx=(r/4)*2.8;offsety=r/4;}
        
        text(notations[i].not, notations[i].x-offsetx,notations[i].y+offsety);
    }
    
    
    if (selected != null){
        selected.x = mouseX
        selected.y = mouseY
    }
    
    
    gameSlider.draw()
    
    //drawing the picked one from the slider
    if(gameSlider.picked != null){
        stroke(0)
        strokeWeight(1)
        fill(255);
        ellipse(mouseX,mouseY,r*2-(r/8))
        noStroke();
        
        fill(0);
        var offsetx = 0;
        var offsety = 0;
        if (gameSlider.picked.length==1){textSize(30);offsetx=r/2.0;offsety=r/2.0}
        else if (gameSlider.picked.length==2){textSize(20);offsetx=r/2.0;offsety=r/3.0}
        else if (gameSlider.picked.length==3){textSize(15);offsetx=(r/4)*2.8;offsety=r/4;}
        else if (gameSlider.picked.length==9){textSize(8);offsetx=(r/4)*2.8;offsety=r/4;}
        
        text(gameSlider.picked, mouseX-offsetx,mouseY+offsety);
    }
    noStroke()
}


function mousePressed() {
    
    //  //make sure that the mouse is down inside the makeButton
    // if(width-width/8<mouseX && mouseX<(width-width/8)+width/9 && height-height/8<mouseY && mouseY<(height-height/8)+width/9){
    //         makePressed = true;
    // }else{
    //     makePressed = false;
    // }
    
    
    
    // if(width-(width/3.6+width/3.6/2)<mouseX && mouseX<(width-(width/3.6+width/3.6/2))+width/7 && height-height/7.2<mouseY && mouseY < (height-height/7.2) + width/7){
    //     dusterPressed = true;
    // }else{
    //     dusterPressed = false;
    // }

    // if (mouseY<gameSlider.height){
    //     if(gameSlider.check(mouseX,mouseY)){
            
    //     }else{
    //         drag = true;
    //         origX = mouseX;
    //     }
    // }else{
        
    //     //check for all the notations
    //     for (var i = notations.length-1;i>=0;i--){
    //         //check if the mouse is in any of the notation
    //         if (((mouseX-notations[i].x)**2+(mouseY-notations[i].y)**2)**0.5<r){
    //             var head = false
    //             for (var k=0;k<makables.length;k++){
    //                 //make head true if the notation was the last item
    //                 if (notations[i] == makables[k].body[makables[k].body.length-1]){
    //                     head = true;
    //                     break
    //                 }
    //             }
    //             if(head){
    //                 //if head and touching, make that the "selected"
    //                 selected = notations[i]
    //                 //move the selected to the end
    //                 var itemToReplace = notations.splice(i, 1); 
    //                 notations = notations.concat(itemToReplace);
                    
    //                 for (var k=0;k<makables.length;k++){
    //                     //check the makable that contains the selected one
    //                     if (selected.id == makables[k].id){
    //                         //if selected was the only item, then keep it as is
    //                         if(makables[k].body.length!=1){
    //                             //if it wasn't the only item, remove it and make a new makable
    //                             makables[k].body.splice(makables[k].body.indexOf(selected),1)
    //                             makables.push({'id':n,'body':[selected]})
    //                             selected.id=n
    //                             n+=1
    //                         }
    //                         break
    //                     }
    //                 }
                    
    //                 break;
    //             }
    //         }
    //     }
    // }
    
    // //prevent default 
    return false;
}

function mouseReleased() {
    
//     if (gameSlider.picked != null){
//         notations.push(new notation(mouseX,mouseY,[random(0,255),random(0,255),random(0,255)],gameSlider.picked,n))
//         makables.push({'id':n,'body':[notations[notations.length-1]]})
//         n+=1
//     }
    
    
//     if(makePressed){
//         if(width-width/8<mouseX && mouseX<(width-width/8)+width/9){
//             if(height-height/8<mouseY && mouseY<(height-height/8)+width/9){
//                 make()
//             }
//         }
//     }
    
//     if(dusterPressed){
//         if(width-(width/3.6+width/3.6/2)<mouseX && mouseX<(width-(width/3.6+width/3.6/2))+width/7){
//             if(height-height/7.2<mouseY && mouseY < (height-height/7.2) + width/7){
//                 makables = []
//                 notations = []
//             }
//         }
//     }
    
    
//     //check if player is dragging the notation
//     if (selected!=null){
        
//         if(width-width/3.6<mouseX && mouseX<(width-width/3.6)+width/7){
//             if(height-height/7.2<mouseY && mouseY<(height-height/7.2)+width/7){
//                 selected
//                 for (var i = 0;i<notations.length;i++){
//                     if(notations[i]==selected){
//                         notations.splice(i,1)
//                     }
//                 }
//                 for (var i = 0;i<makables.length;i++){
//                     if(makables[i].id==selected.id){
//                         makables.splice(i,1)
//                     }
//                 }
//                 return
//             }
//         }
        
        
//         for (var i = 0;i<notations.length;i++){
//             var found = false;
//             //make sure the notation is not the selected one
//             if(notations[i]!=selected){
//                 var radius = r*2
//                 var kanchi = 20
//                 var fit=false
                
//                 var a = [notations[i].x-radius/2.0,notations[i].y-((radius**2-(radius/2.0)**2)**0.5)]
//                 var b = [notations[i].x-radius,notations[i].y]
//                 var c = [notations[i].x-radius/2.0,notations[i].y+((radius**2-(radius/2.0)**2)**0.5)]
//                 var d = [notations[i].x+radius/2.0,notations[i].y+((radius**2-(radius/2.0)**2)**0.5)]
//                 var e = [notations[i].x+radius,notations[i].y]
//                 var f = [notations[i].x+radius/2.0,notations[i].y-((radius**2-(radius/2.0)**2)**0.5)]
                
//                 //check if the notation is next to the selected one
//                 if(around(a[0],a[1],mouseX,mouseY,kanchi)){
//                     //if any notation near, then fits
//                     selected.x = a[0]
//                     selected.y = a[1]
//                     fit=true
                    
//                 }else if(around(b[0],b[1],mouseX,mouseY,kanchi)){
//                     selected.x = b[0]
//                     selected.y = b[1]
//                     fit=true
                    
//                 }else if(around(c[0],c[1],mouseX,mouseY,kanchi)){
//                     selected.x = c[0]
//                     selected.y = c[1]
//                     fit=true
                    
//                 }else if(around(d[0],d[1],mouseX,mouseY,kanchi)){
//                     selected.x = d[0]
//                     selected.y = d[1]
//                     fit=true
                    
//                 }else if(around(e[0],e[1],mouseX,mouseY,kanchi)){
//                     selected.x = e[0]
//                     selected.y = e[1]
//                     fit=true
                    
//                 }else if(around(f[0],f[1],mouseX,mouseY,kanchi)){
//                     selected.x = f[0]
//                     selected.y = f[1]
//                     fit=true
                    
//                 }
                
//                 if(fit){
//                     for (var j=0;j<makables.length;j++){
//                         //check the makable id that is same with the notation id
//                         if(notations[i].id == makables[j].id){
                            
//                             //make sure that the notation touching is the final item
//                             if (makables[j].body[makables[j].body.length-1]==notations[i]){
                                
//                                 found = true;
                                
//                                 var origID = selected.id
                                
//                                 //push the selected into the new array
//                                 makables[j].body.push(selected)
//                                 //set the selected id to the new array's id
//                                 console.log(selected.id , makables[j].id)
//                                 selected.id = makables[j].id
                                
//                                 // check the makable that the selected was in, and delete it
//                                 for (var k=0;k<makables.length;k++){
//                                     if(makables[k].id==origID){
//                                         //delete the array that the selected one was in
//                                         makables.splice(k,1)
//                                         break
//                                     }
//                                 }
//                                 break
//                             }
                            
//                         }
//                     }
//                 } 
//             }
//             if (found){
//                 break
//             }
//         }
//     }
//     selected = null;
//     drag = false;
//     gameSlider.picked = null
}

// var diff = 0;

function mouseDragged(){
//     if(drag){
//         diff = mouseX-origX
//         gameSlider.x += diff
//         origX = mouseX
//     }
}