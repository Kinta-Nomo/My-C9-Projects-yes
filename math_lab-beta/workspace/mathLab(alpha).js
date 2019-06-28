
var creatables=[['+','+','×'],['-','-','÷'],['×','×','pow'],['÷','÷','√'],['+','-','±'],['+','+','+','Σ'],['x','x','x','∏']]

var notations = []
var r = 20

var selected = null

function notation(x,y,color,not){
    this.x = x
    this.y = y
    this.color = color
    this.not = not
    
    this.draw = function(){
        fill(color[0],color[1],color[2])
        ellipse(this.x,this.y,r*2)
        
        fill(255, 255, 255);
        
        var offsetx;
        var offsety;
        if (this.not.length==1){textSize(30);offsetx=r/2.0;offsety=r/2.0}
        else if (this.not.length==3){textSize(15);offsetx=(r/4)*2.8;offsety=r/4;}
        
        text(this.not, this.x-offsetx,this.y+offsety);
    }
}

function setup(){
    createCanvas(500,500);
    background(0);
    
    for(var i = 0; i<10; i++){
        notations.push(new notation(random(0,500),random(0,500),[random(0,255),random(0,255),random(0,255)],'+'))
    }
    for(var i = 0; i<10; i++){
        notations.push(new notation(random(0,500),random(0,500),[random(0,255),random(0,255),random(0,255)],'-'))
    }
}

function draw(){
    background(0);
    for (var i = 0;i<notations.length;i++){
        notations[i].draw()
    }
    if (selected != null){
        selected.x = mouseX
        selected.y = mouseY
    }
}

function mousePressed() {
    for (var i = notations.length-1;i>=0;i--){
        //check if the mouse is in any of the notation
        if (notations[i].x-r< mouseX && mouseX < notations[i].x+r  &&  notations[i].y-r<mouseY && mouseY<notations[i].y+r){
            selected = notations[i]
            var itemToReplace = notations.splice(i, 1); 
            notations = notations.concat(itemToReplace);
            break;
        }
    }
    
    //prevent default
    return false;
}

function mouseReleased() {
    
    //check if player is dragging the notation
    if (selected!=null){
        for (var i = 0;i<notations.length;i++){
            var found = false;
            //check if the selecting notation is in the others
            if (notations[i].x-r< selected.x && selected.x < notations[i].x+r  &&  notations[i].y-r<selected.y && selected.y<notations[i].y+r){
                //except for itself :)
                if(notations[i] != selected){
                    //check for the recipes
                    for(var j = 0;j<creatables.length;j++){
                        if((notations[i].not==creatables[j][0] && selected.not==creatables[j][1])||(notations[i].not==creatables[j][1] && selected.not==creatables[j][0])){
                            
                            found = true;
                            notations.splice(i,1)
                            // notations.splice(notations.indexOf(selected),1)
                            
                            notations.push(new notation(mouseX,mouseY,[random(0,255),random(0,255),random(0,255)],creatables[j][2]))
                        }
                    }
                }
            }
            if (found){
                break
            }
        }
    }
    selected = null;
}