var cellheight = 10
var pause = true

function Gameboard(x,y){
    this.x = x
    this.y = y
    this.cells = []
    this.createboard = function(){
        for (var i = 0;i < x;i++){
            this.cells.push([])
            for (var j = 0;j < x;j++){
                var newcell = new Cell(i,j)
                this.cells[i].push(newcell)
            }
        }
    }
    
    this.draw = function(){
        for (var i = 0;i < this.cells.length;i++){
            for (var j = 0;j < this.cells[i].length;j++){
                this.cells[i][j].draw()
            }
        }
    }
    
    this.click = function(x,y){
        this.cells[x][y].state = "ALIVE"
        this.cells[x][y].Kstate = "ALIVE"
    }
    
    this.check = function(){
        for (var i = 0;i < this.cells.length;i++){
            for (var j = 0;j < this.cells[i].length;j++){
                var check = 0
                for (var x = -1;x < 2;x++){
                    for (var y = -1;y < 2;y++){
                        try{
                            if (this.cells[i+x][j+y].state == "ALIVE"){
                                check+=1
                            }
                        }catch(err){
                            
                        }
                    }
                }
                if (this.cells[i][j].state == "DEAD"){
                    if (check == 3){
                        this.cells[i][j].Kstate = "ALIVE"
                    }
                }
                else if (this.cells[i][j].state == "ALIVE"){
                    if (check < 3){
                        this.cells[i][j].Kstate = "DEAD"
                    }
                    else if (check > 4){
                        this.cells[i][j].Kstate = "DEAD"
                    }
                }
            }
        }
        for (var i = 0;i < this.cells.length;i++){
            for (var j = 0;j < this.cells[i].length;j++){
                this.cells[i][j].state = this.cells[i][j].Kstate
            }
        }
    }
}

function Cell(x,y){
    this.x = x
    this.y = y
    this.state = "DEAD"
    this.Kstate = "DEAD"
    
    this.draw = function(){
        if (this.state == "ALIVE"){
            fill(0)
            stroke(255)
        }else if (this.state == "DEAD"){
            fill(255)
            stroke(0)
        }
        strokeWeight(0.5)
        rect(this.x*cellheight,this.y*cellheight,cellheight,cellheight)
        
    }
    
}


function setup(){
    createCanvas(500,500)
    Gameboard = new Gameboard(10,10)
    Gameboard.createboard()
    Gameboard.draw()
    
    var timer = setInterval(function(){
        if (!pause){
            Gameboard.check()
        }
    },100)
}

var timerII = setInterval(function(){
    console.log("dr")
    Gameboard.draw()
    if (mouseIsPressed){
        var mouseCoor = [Math.ceil(mouseX/cellheight)-1 , Math.ceil(mouseY/cellheight)-1]
        Gameboard.click(mouseCoor[0],mouseCoor[1])
    }
},10)


function keyPressed(){
    pause = !pause;
}