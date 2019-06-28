//include library P5.js
//v4

function distance(foods, point){
    //foods & point: not tuple should be list
    var foodsdist = []
    for (var i = 0;i<foods.length;i++){
        foodsdist.push(((foods[i][0]-point[0])**2+(foods[i][1]-point[1])**2)**0.5)
    }
    return Math.min(...foodsdist)
}


function Ant(){
    //wether it follows other's path
    this.craze = Math.random() >= 0.5;
    
    //if not crazy, they'll select one of the path
    this.selectedPath = []
    
    //if found food, this becomes true
    this.found = false
    
    //if crazy, they'll mark their path in this
    this.path = []
    
    this.locate = [width/2,height/2]
    
    //aging that leads to dying
    this.age = 0
    
    //aging that leads to dying
    this.leaving = true
    
    //pointer for travelling
    this.pointer = 0
    
    //kills ant & removes from the ants array
    this.die = function(){
        ants.splice(ants.indexOf(this),1);
    } 
    
    this.findPath = function(){
        this.age += 1
        
        //sadly, ants dies too!
        //longer the lifetime, faster learning but less accurater the path finding
        if (this.age == 1000){ 
            this.die()  
            console.log("i died!")
            
            //exit from the function
            return null
        }
        
        //activated when ant found the food in past
        if (this.found){
            //check if crazy
            if (this.craze){
                
                //more shorter the way, the number of pushing increases!
                
                //check if back to nest
                if (this.leaving){
                    //going back the "pathway"
                    this.locate = this.path[this.path.length-1-this.pointer]
                    this.pointer += 1
                    if (this.pointer == this.path.length-1){
                        //if the pointer reached to the bottom, let's go there again!
                        this.leaving = false
                        
                        //every go-return, adds the path into the path list
                        paths.push(this.path.slice())
                    }
                }else{
                    //if back to nest, follow the same path again
                    this.locate = this.path[this.path.length-1-this.pointer]
                    this.pointer -= 1
                    if (this.pointer == 0){
                        //if the pointer reached to the top, let's go backssss again!
                        this.leaving = true
                        
                        //every go-return, adds the path into the path list
                        paths.push(this.path.slice())
                    }
                }
            }else{
                //if not crazy, start going back the selected path
                
                //check if going back to nest
                if (this.pointer != 0){
                    this.pointer -= 1
                    
                    this.locate = this.selectedPath[this.pointer]
                    
                    if (this.pointer == 0){
                        //every go-return, adds the path into the path list
                        paths.push(this.selectedPath.slice())
                    }
                    
                }else{
                    //if back to nest, pretend that it has not ever touched the food 
                    this.found = false
                    
                    //every go-return, adds the path into the path list
                    paths.push(this.selectedPath.slice())
                }
            }
        }else{
            //very crazy and randomly runs around
            if (this.craze){
                //readability > length!
                x = this.locate[0]
                y = this.locate[1]
                this.locate = [x+random(-10,10),y+random(-10,10)]
                this.path.push(this.locate)
                
                //check if reached the food. If so, push the path into paths
                if (distance(foods, this.locate) < 10){
                    paths.push(this.path.slice())
                    this.found = true;
                }
            }else{
                //ants that are ok.. they think crazy ants are crazy
                
                //check if it has any path selected!
                if (this.selectedPath.length == 0){
                    //check if there are any available path
                    if (paths.length != 0){
                        
                        this.selectedPath = paths[Math.floor(Math.random()*paths.length)].slice();
                        
                        //randomity
                        for (var i = 0;i < this.selectedPath.length;i++){
                            this.selectedPath[0][0] += Math.random(-10,10)
                            this.selectedPath[0][1] += Math.random(-10,10)
                        }
                        
                    }else{
                        //ok.. no one found any path yet! than it'll be crazy too!
                        this.craze = true
                        
                        ////not that.. let's just wait! 
                    }
                }else{
                    //if path is selected, we need to start going to the food
                    this.locate = this.selectedPath[this.pointer]
                    
                    //if at the end of the array
                    if (this.pointer == this.selectedPath.length-1){
                        this.found = true;
                        
                        //every go-return, adds the path into the path list
                        paths.push(this.selectedPath.slice())
                    }
                    
                    this.pointer+=1
                    
                }
            }
        } 
    }
}

//array with all ants
var ants = []

//array of every paths crazy ants find
var paths = []

//array of foods
var foods = [[250,250],[20,250]]

function setup(){
    createCanvas(300,300);
    background(255);
    var antGen = setInterval(function(){
        ants.push(new Ant())
    },1000)
}

setInterval(function(){
    
    background(255);
    
    //drawing foods
    for (var i = 0;i<foods.length;i++){
        noStroke();
        fill(0,0,250)
        ellipse(foods[i][0],foods[i][1],20,20)
    }
    
    //drawing ants
    for (var i = 0;i<ants.length;i++){
        ants[i].findPath()
        
        //if crazy, if found, blue, if not, red. If not crazy, black
        if (ants[i].craze == true){ 
            if (ants[i].found){
                stroke(0,0,255)
            }else{
                stroke(255,0,0)
            }
        }else{
            stroke(0)
        }
        strokeWeight(10)
        point(ants[i].locate[0],ants[i].locate[1])
    }
    
    //expires some of the paths! (until fits capacity)
    if (paths.length > 100){
        paths.splice(0, paths.length-100);
    }
},100)

