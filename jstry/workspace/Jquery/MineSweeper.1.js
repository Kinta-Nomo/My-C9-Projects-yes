
var checker;
var minesLocations=[]
var cellsLocations=[]
var allzeros = []
var clickedone;
var space = false;
var first = true;
function setup(){
    createCanvas(2000,2000)
    Gameboard = new GameBoard(30,16,99,30)
    Gameboard.build()
}
var winlose = false;

function Cell(x,y,side,aroundB,mineStat,openstate,flagstate,stayflag){
    this.x=x;
    this.y=y;
    this.mineStat=mineStat
    this.side = side
    this.aroundB = aroundB
    this.openstate = openstate
    this.flagstate = flagstate
    
    this.drawbox = function(){
        noStroke()
        fill(255)
        triangle(this.x*this.side,this.y*this.side,this.x*this.side+this.side,this.y*this.side,this.x*this.side,this.y*this.side+this.side)
        fill(139)
        triangle(this.x*this.side+this.side,this.y*this.side,this.x*this.side,this.y*this.side+this.side,this.x*this.side+this.side,this.y*this.side+this.side)
        fill(189)
        rect(this.x*this.side+(this.side/100)*10,this.y*this.side+(this.side/100)*10,(this.side/100)*80,(this.side/100)*80)
    }
    this.checkaround = function(){
        for(i=this.x-1;i<=this.x+1;i++){
            for(j=this.y-1;j<=this.y+1;j++){
            }
        }
    }
    //adds number 1 to the boxes around this Cell
    this.addaround = function(){
        if (this.mineStat==true){
            for(a=this.x-1;a<=this.x+1;a++){
                for(b=this.y-1;b<=this.y+1;b++){
                    try{
                        cellsLocations[a][b].aroundB += 1
                    }catch(err){
                        
                    }
                }
            }
        }
    }
    this.pushzero = function(){ 
        if(this.mineStat != true){
            if(this.aroundB == 0){
                for(a=this.x-1;a<=this.x+1;a++){
                    for(b=this.y-1;b<=this.y+1;b++){
                        try{
                            if (cellsLocations[a][b].aroundB == 0){
                                if (cellsLocations[a][b].openstate == false){
                                    cellsLocations[a][b].openstate = true
                                    cellsLocations[a][b].open()
                                    allzeros.push(cellsLocations[a][b])
                                }
                            }else{
                                cellsLocations[a][b].openstate = true
                                cellsLocations[a][b].open()
                                
                                
                            }
                        }catch(err){
                                
                        }
                    }    
                }
            }else{
                this.openstate = true
                this.open()
            }
        }else{
            clickedone = [this.x,this.y]
            fill(255,0,0)
            rect(this.x*this.side,this.y*this.side,18,18)
            this.showbomb()
            Gameboard.checkflagbomb()
            Gameboard.lose()
        }
    }
    
    this.zero = function(){
        for (i = 0;i<=allzeros.length;i++){
            try{
                allzeros[i].pushzero()
            }catch(err){
                
            }
        }
    }
    this.open = function(){
    if (this.flagstate == false){
        stroke(123)
        fill(180)
        rect(this.x*this.side,this.y*this.side,this.side-1,this.side-1)
        stroke(0)
        noStroke()
        textWidth(20)
        textSize(10);
        if (this.aroundB != 0){
            if (this.aroundB == 1){
                fill(0,0,200)
            }else if (this.aroundB == 2){
                fill(0,200,0)
            }else if (this.aroundB == 3){
                fill(200,0,0)
            }else if (this.aroundB == 4){
                    fill(1,49,127)
            }else if (this.aroundB == 5){
                fill(127,9,0)
            }else if (this.aroundB == 6){
                fill(119,168,147)
            }else if (this.aroundB == 7){
                fill(255)
            }else if (this.aroundB == 8){
                fill(173)
            }
            text(this.aroundB,(this.x*this.side)+6,(this.y*this.side)+12);
        }
    }
    else if(this.flagstate == true){
            console.log(this.x,this.y)
            this.stayflag = true
        }
        stroke(0)
    }
    this.showbomb = function() {
        stroke(123)
        fill(180)
        rect(this.x*this.side,this.y*this.side,this.side,this.side)
        stroke(0)
        fill(0);
        ellipse((this.x*this.side)+9.5,(this.y*this.side)+9.5,10,10)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9,(this.y*this.side)+9+7)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9-5,(this.y*this.side)+9+5)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9-7,(this.y*this.side)+9)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9-5,(this.y*this.side)+9-5)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9,(this.y*this.side)+9-7)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9+5,(this.y*this.side)+9-5)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9+7,(this.y*this.side)+9)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9+5,(this.y*this.side)+9+5)
        stroke(255);
        strokeWeight(2.5)
        point((this.x*this.side)+7.4,(this.y*this.side)+7.4)
        strokeWeight(1)
        stroke(0);
        if ((this.x == clickedone[0]) && (this.y == clickedone[1])){
            fill(255,0,0)
            stroke(123)
            rect(this.x*this.side,this.y*this.side,19,19)
            stroke(0)
            fill(0);
            ellipse((this.x*this.side)+9.5,(this.y*this.side)+9.5,10,10)
            line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9,(this.y*this.side)+9+7)
            line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9-5,(this.y*this.side)+9+5)
            line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9-7,(this.y*this.side)+9)
            line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9-5,(this.y*this.side)+9-5)
            line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9,(this.y*this.side)+9-7)
            line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9+5,(this.y*this.side)+9-5)
            line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9+7,(this.y*this.side)+9)
            line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9+5,(this.y*this.side)+9+5)
            stroke(255);
            strokeWeight(2.5)
            point((this.x*this.side)+7.4,(this.y*this.side)+7.4)
            strokeWeight(1)
            stroke(0);  
        }
    }
    
    this.showwrong = function() {
        stroke(123)
        fill(180)
        rect(this.x*this.side,this.y*this.side,19,19)
        stroke(0)
        fill(0)
        ellipse((this.x*this.side)+9.5,(this.y*this.side)+9.5,10,10)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9,(this.y*this.side)+9+7)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9-5,(this.y*this.side)+9+5)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9-7,(this.y*this.side)+9)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9-5,(this.y*this.side)+9-5)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9,(this.y*this.side)+9-7)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9+5,(this.y*this.side)+9-5)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9+7,(this.y*this.side)+9)
        line((this.x*this.side)+9,(this.y*this.side)+9,(this.x*this.side)+9+5,(this.y*this.side)+9+5)
        stroke(255);
        strokeWeight(2.5)
        point((this.x*this.side)+7.4,(this.y*this.side)+7.4)
        strokeWeight(1)
        stroke(0);
        stroke(255,0,0)
        strokeWeight(2)
        line((this.x)*this.side+3,(this.y)*this.side+4,(this.x)*this.side+16,(this.y)*this.side+16)
        line((this.x)*this.side+3,(this.y)*this.side+16,(this.x)*this.side+16,(this.y)*this.side+4)
        stroke(0)
        strokeWeight(1)
    }
    this.checkflag = function(win_or_not) {
            if (this.flagstate == true){
                console.log('draw flag')
                this.drawbox()
                stroke(0)
                strokeWeight(1)
                fill(0);
                triangle((this.x*this.side)+10,(this.y*this.side)+13,(this.x*this.side)+5.5,(this.y*this.side)+16,(this.x*this.side)+14.5,(this.y*this.side)+16)
                rect((this.x*this.side)+9,(this.y*this.side)+5,1,10)
                fill(255,0,0);
                strokeWeight(0)
                triangle((this.x*this.side)+11,(this.y*this.side)+3,(this.x*this.side)+4,(this.y*this.side)+6.5,(this.x*this.side)+11,(this.y*this.side)+11)
                strokeWeight(1)
            }else if (this.flagstate == false){
                console.log('erase')
                this.drawbox()
            }
    }
    this.flag = function(win_or_not) {
        if (this.openstate == false){
            if (win_or_not == false){
                if (this.flagstate == true){
                    this.drawbox()
                    fill(0);
                    stroke(0)
                    strokeWeight(1)
                    triangle((this.x*this.side)+10,(this.y*this.side)+13,(this.x*this.side)+5.5,(this.y*this.side)+16,(this.x*this.side)+14.5,(this.y*this.side)+16)
                    rect((this.x*this.side)+9,(this.y*this.side)+5,1,10)
                    fill(255,0,0);
                    strokeWeight(0)
                    triangle((this.x*this.side)+11,(this.y*this.side)+3,(this.x*this.side)+4,(this.y*this.side)+6.5,(this.x*this.side)+11,(this.y*this.side)+11)
                    strokeWeight(1)
                }else if (this.flagstate == false){
                    this.drawbox()
                }
            }else{
                this.drawbox()
                fill(0);
                stroke(0)
                strokeWeight(1)
                triangle((this.x*this.side)+10,(this.y*this.side)+13,(this.x*this.side)+5.5,(this.y*this.side)+16,(this.x*this.side)+14.5,(this.y*this.side)+16)
                rect((this.x*this.side)+9,(this.y*this.side)+5,1,10)
                fill(255,0,0);
                strokeWeight(0)
                triangle((this.x*this.side)+11,(this.y*this.side)+3,(this.x*this.side)+4,(this.y*this.side)+6.5,(this.x*this.side)+11,(this.y*this.side)+11)
                strokeWeight(1)
                this.win_or_not = "I'm won already bro!"
                this.flagstate = "I'm won already bro!"
            }
        }
    }
    
    this.ClickedOne = function(){
        fill(255,0,0)
        rect(this.x*this.side,this.y*this.side,18,18)
        fill(0);
        ellipse((this.x*this.side)+9,(this.y*this.side)+9,10,10)
        console.log('ka')
    }
}

function GameBoard(x,y,mines,minewidth){
    this.x=x;
    this.y=y;
    this.mines=mines;
    this.minewidth=minewidth;
    if (this.mines > 999){
        alert('you have too many bombs! ')
        this.mines = 999
    }
    if (this.x*this.y < this.mines){
        this.mines = this.x*this.y
    }
    this.build=function (){
        noStroke()
        fill(255)
        triangle(this.x*this.minewidth,this.y*this.minewidth,this.x*this.minewidth+this.minewidth,this.y*this.minewidth,this.x*this.minewidth,this.y*this.minewidth+this.minewidth)
        fill(139)
        triangle(this.x*this.minewidth+this.minewidth,this.y*this.minewidth,this.x*this.minewidth,this.y*this.minewidth+this.minewidth,this.x*this.minewidth+this.minewidth,this.y*this.minewidth+this.minewidth)
        fill(189)
        rect(this.x*this.minewidth+(this.minewidth/100)*10,this.y*this.minewidth+(this.minewidth/100)*10,(this.minewidth/100)*80,(this.minewidth/100)*80)
        stroke(0)
        strokeWeight(1)
        fill(255,255,0)
        ellipse(x*this.minewidth+this.minewidth,this.minewidth,15,15)
        noFill()
        strokeWeight(2.3)
        point(x*this.minewidth+17.5,17.5)
        point(x*this.minewidth+22,17.5)
        strokeWeight(1)
        arc(x*this.minewidth+this.minewidth,19,10,10,0+QUARTER_PI,HALF_PI+QUARTER_PI)
        fill(255)
        for(i=0;i<this.x;i++){
            cellsLocations.push([])
            for(j=0;j<this.y;j++){
                cellsLocations[i].push(new Cell(i,j,this.minewidth,0,false,false,false,false))
            }
        }
        for(i=0;i<this.x;i++){
            for(j=0;j<this.y;j++){
                cellsLocations[i][j].drawbox()
            }
        }
    };
    this.setbomb = function(){
        var checkpush = true;
        for(i=0;i<this.mines;i++){
            checkpush = true
            var randomnumberX = Math.ceil(random(-1,this.x-1))
            var randomnumberY = Math.ceil(random(-1,this.y-1))
            //checks if there are same one or not
            if (cellsLocations[randomnumberX][randomnumberY].mineStat == true){
                i -= 1
            }
            //changes minestat with Rx and Ry
            cellsLocations[randomnumberX][randomnumberY].mineStat = true
            //checks if full if not check wether mouse is on the mine or not
            if (this.x*this.y == this.mines){
                console.log('full')
            }else{
                if (cellsLocations[Math.ceil(mouseX/this.minewidth)-1][Math.ceil(mouseY/this.minewidth)-1].mineStat == true){
                    i -= 1
                    cellsLocations[Math.ceil(mouseX/this.minewidth)-1][Math.ceil(mouseY/this.minewidth)-1].mineStat = false
                    checkpush = false;
                }
            }
            //finally pushes into coordinate lists
            if (checkpush == false){
                console.log('I am kentabanana s god')
            }else{
                minesLocations.push([randomnumberX,randomnumberY])
            }
        }
        for(i=0;i<this.x;i++){
            cellsLocations.push([])
            for(j=0;j<this.y;j++){
                cellsLocations[i][j].addaround()
            }
        }
    }
    
    this.clickopen = function(x,y){
        if (cellsLocations[x][y].flagstate == false){
            try{
            cellsLocations[x][y].pushzero()
            cellsLocations[x][y].zero()
            }catch(err){
                console.log('number too big')
            }
        }
    }
    this.checkflagbomb = function(){
        console.log('akla')
        for (a=0;a<=x;a++){
            for (b=0;b<=y;b++){
                try{
                    if((cellsLocations[a][b].flagstate == true) && (cellsLocations[a][b].mineStat==false)){
                        console.log(a,b)
                        cellsLocations[a][b].showwrong()
                    }
                }catch(err){
                    
                }
            }
        }
    }
    this.lose=function (){
        winlose = true
        for(i = 0;i<=minesLocations.length;i++){
            if (cellsLocations[minesLocations[i][0]][minesLocations[i][1]].flagstate == false){
                cellsLocations[minesLocations[i][0]][minesLocations[i][1]].showbomb()
            }
        }
    };
    this.reset = function(){
        if (mouseX > this.x*this.minewidth+10 && mouseX < this.x*this.minewidth+30 && mouseY > 10 && mouseY < 30){
            console.log('lala')
            checker;
            minesLocations=[]
            cellsLocations=[]
            allzeros = []
            clickedone;
            space = false;
            Gameboard.build()
            winlose = false;
            first = true
        }
    };
    this.surprises = function(clicked){
        if (clicked === true){
            if ((mouseX < this.x*this.minewidth && mouseY < this.y*this.minewidth)&&(mouseX > 0 && mouseY > 0)){
                noStroke()
                fill(255)
                triangle(this.x*this.minewidth,this.y*this.minewidth,this.x*this.minewidth+this.minewidth,this.y*this.minewidth,this.x*this.minewidth,this.y*this.minewidth+this.minewidth)
                fill(139)
                triangle(this.x*this.minewidth+this.minewidth,this.y*this.minewidth,this.x*this.minewidth,this.y*this.minewidth+this.minewidth,this.x*this.minewidth+this.minewidth,this.y*this.minewidth+this.minewidth)
                fill(189)
                rect(this.x*this.minewidth+(this.minewidth/100)*10,this.y*this.minewidth+(this.minewidth/100)*10,(this.minewidth/100)*80,(this.minewidth/100)*80)
                stroke(0)
                strokeWeight(1)
                fill(255,255,0)
                ellipse(x*this.minewidth+this.minewidth,this.minewidth,15,15)
                noFill()
                strokeWeight(2.7)
                stroke(0)
                point(x*this.minewidth+17.3,17)
                point(x*this.minewidth+22.7,17)
                strokeWeight(1)
                ellipse(x*this.minewidth+this.minewidth,22,4,4.5)
                fill(255)
            }
        }else{
            noStroke()
            fill(255)
            fill(255)
            triangle(this.x*this.minewidth,this.y*this.minewidth,this.x*this.minewidth+this.minewidth,this.y*this.minewidth,this.x*this.minewidth,this.y*this.minewidth+this.minewidth)
            fill(139)
            triangle(this.x*this.minewidth+this.minewidth,this.y*this.minewidth,this.x*this.minewidth,this.y*this.minewidth+this.minewidth,this.x*this.minewidth+this.minewidth,this.y*this.minewidth+this.minewidth)
            fill(189)
            rect(this.x*this.minewidth+(this.minewidth/100)*10,this.y*this.minewidth+(this.minewidth/100)*10,(this.minewidth/100)*80,(this.minewidth/100)*80)
            stroke(0)
            strokeWeight(1)
            fill(255,255,0)
            ellipse(x*this.minewidth+this.minewidth,this.minewidth,15,15)
            noFill()
            strokeWeight(2.3)
            stroke(0)
            point(x*this.minewidth+17.5,17.5)
            point(x*this.minewidth+22,17.5)
            strokeWeight(1)
            arc(x*this.minewidth+this.minewidth,19,10,10,0+QUARTER_PI,HALF_PI+QUARTER_PI)
            fill(255)
        }
    };
    this.win = function(){
        if (this.first != true){
            checker = false
                for (i = 0;i<=this.x;i++){
                    for (j = 0;j<=this.y;j++){
                        try{
                            if ((cellsLocations[i][j].mineStat == false) && (cellsLocations[i][j].openstate == false)){
                                checker = true
                            }
                        }catch(err){
                            
                        }
                        try{
                            if ((cellsLocations[i][j].mineStat == false) && (cellsLocations[i][j].stayflag == true) && (cellsLocations[i][j].flagstate == true)){
                                checker = true
                            }
                        }catch(err){
                            
                        }
                    }
                } 
        }
        if (checker == false){
            alert('win!')
            winlose = true
            noStroke()
            fill(255)
            triangle(this.x*this.minewidth,this.y*this.minewidth,this.x*this.minewidth+this.minewidth,this.y*this.minewidth,this.x*this.minewidth,this.y*this.minewidth+this.minewidth)
            fill(139)
            triangle(this.x*this.minewidth+this.minewidth,this.y*this.minewidth,this.x*this.minewidth,this.y*this.minewidth+this.minewidth,this.x*this.minewidth+this.minewidth,this.y*this.minewidth+this.minewidth)
            fill(189)
            rect(this.x*this.minewidth+(this.minewidth/100)*10,this.y*this.minewidth+(this.minewidth/100)*10,(this.minewidth/100)*80,(this.minewidth/100)*80)
            stroke(0)
            strokeWeight(1)
            fill(255,255,0)
            ellipse(x*this.minewidth+this.minewidth,this.minewidth,15,15)
            noFill()
            strokeWeight(3.5)
            point(x*this.minewidth+17.5,17.5)
            point(x*this.minewidth+22,17.5)
            strokeWeight(1)
            line(x*this.minewidth+17.1,16.2,x*this.minewidth+22.4,16.2)
            line(x*this.minewidth+16.9,16.2,x*this.minewidth+12.5,this.minewidth)
            line(x*this.minewidth+22.4,16.2,x*this.minewidth+27,this.minewidth)
            arc(x*this.minewidth+this.minewidth,19,10,10,0+QUARTER_PI,HALF_PI+QUARTER_PI)
            fill(255)
            
            for(i = 0;i<=minesLocations.length;i++){
                try{
                    cellsLocations[minesLocations[i][0]][minesLocations[i][1]].flag(true)
                }catch(err){
                    
                }
            }
        }
    }
    
}

function mouseReleased(){
    //checks the smiley clicked or not
    Gameboard.reset()
    if ((first == true) && (mouseX < Gameboard.x*Gameboard.minewidth) && (mouseY < Gameboard.y*Gameboard.minewidth)){
        console.log('first!')
        Gameboard.setbomb()
        console.log(cellsLocations)
        console.log(minesLocations)
    }
    if (winlose != true){
        try{
            Gameboard.surprises(false)
            if ((cellsLocations[Math.ceil(mouseX/Gameboard.minewidth)-1][Math.ceil(mouseY/Gameboard.minewidth)-1].stayflag === true) && (cellsLocations[Math.ceil(mouseX/Gameboard.minewidth)-1][Math.ceil(mouseY/Gameboard.minewidth)-1].flagstate === false)){
                cellsLocations[Math.ceil(mouseX/Gameboard.minewidth)-1][Math.ceil(mouseY/Gameboard.minewidth)-1].open()
                cellsLocations[Math.ceil(mouseX/Gameboard.minewidth)-1][Math.ceil(mouseY/Gameboard.minewidth)-1].pushzero()
                cellsLocations[Math.ceil(mouseX/Gameboard.minewidth)-1][Math.ceil(mouseY/Gameboard.minewidth)-1].zero()
            } 
            Gameboard.clickopen(Math.ceil(mouseX/Gameboard.minewidth)-1,Math.ceil(mouseY/Gameboard.minewidth)-1)
            Gameboard.win()
        }
        catch(err){
        }
    }
}
function mousePressed(){
    if (winlose != true){
        Gameboard.surprises(true)
    }
}
function keyPressed() {
    if (winlose != true){
        if (keyCode === 70){
            if (cellsLocations[Math.ceil(mouseX/20)-1][Math.ceil(mouseY/20)-1].flagstate === true){
                cellsLocations[Math.ceil(mouseX/20)-1][Math.ceil(mouseY/20)-1].flagstate = false
                cellsLocations[Math.ceil(mouseX/20)-1][Math.ceil(mouseY/20)-1].flag(false)
            }
            else if (cellsLocations[Math.ceil(mouseX/20)-1][Math.ceil(mouseY/20)-1].flagstate === false){
                cellsLocations[Math.ceil(mouseX/20)-1][Math.ceil(mouseY/20)-1].flagstate = true
                cellsLocations[Math.ceil(mouseX/20)-1][Math.ceil(mouseY/20)-1].flag(false)
            }
            if (cellsLocations[Math.ceil(mouseX/20)-1][Math.ceil(mouseY/20)-1].openstate == true){
                if (cellsLocations[Math.ceil(mouseX/20)-1][Math.ceil(mouseY/20)-1].stayflag === true){
                    console.log('tiger@!')
                    cellsLocations[Math.ceil(mouseX/20)-1][Math.ceil(mouseY/20)-1].checkflag()
                    cellsLocations[Math.ceil(mouseX/20)-1][Math.ceil(mouseY/20)-1].openstate = false
                }
            }
        }
    }
}
