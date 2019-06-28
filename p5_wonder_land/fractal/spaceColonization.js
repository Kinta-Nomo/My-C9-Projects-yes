
var tree;
var max_dist = 100;
var min_dist = 10;
var strokeweight = 20

function Tree(){
    this.leaves = []
    this.branches = []
    
    for (var i  =0; i < 300; i++){
        this.leaves.push(new Leaf())
    }
    
    var pos = createVector(width/2,height)
    var dir = createVector(0,-1)
    var root = new Branch(null,pos,dir)
    
    this.branches.push(root)
    
    var current = root
    
    var found = false
    
    while(!found){
        for (var i = 0; i < this.leaves.length;i++){
            var d = p5.Vector.dist(current.pos, this.leaves[i].pos)
            if (d < max_dist){
                found = true
            }
        }
        
        if(!found) {
            var branch = current.next()
            current = branch
            this.branches.push(current)
        }
    }
    
    this.show = function() {
        
        for (var i = 0; i < this.branches.length; i++){
            this.branches[i].show()
        }
        
        for (var i =0; i < this.leaves.length; i++){
            this.leaves[i].show()
        }
    }
    
    this.grow = function(){
        for (var i = 0; i < this.leaves.length; i++){
            var leaf = this.leaves[i]
            
            var closestBranch = null
            var record = 10000
            for (var j = 0; j < this.branches.length; j++){
                var branch = this.branches[j]
                var d = p5.Vector.dist(leaf.pos, branch.pos)
                if (d < min_dist){
                    leaf.reached = true;
                    closestBranch = null
                    break;
                }else if (d > max_dist){
                    //pass
                }else if(closestBranch == null || d < record){
                    closestBranch = branch
                    record = d;
                }
            }
            
            if (closestBranch != null){
                var newdir = p5.Vector.sub(leaf.pos, closestBranch.pos)
                newdir.normalize();
                closestBranch.dir.add(newdir)
                closestBranch.count++
            }
        }
        
        for (var i = this.leaves.length-1; i>=0;i--){
            if (this.leaves[i].reached){
                this.leaves.splice(i, 1)
            }
        }
        
        for (var i = this.branches.length-1; i >= 0; i--){
            var branch = this.branches[i]
            if (branch.count > 0){
                branch.dir.div(branch.count);
                this.branches.push(branch.next())
                // var newPos = p5.Vector.add(branch.pos, branch.dir)
                // var newBranch = new Branch(branch, newPos, branch.dir.copy());
                // this.branches.push(newBranch)
            }
            branch.reset()
        }
    }
}

function Branch(parent,pos,dir){
    this.pos = pos
    this.parent = parent
    this.dir = dir
    this.count = 0;
    this.origDir = dir.copy()
    this.len = 5
    
    
    this.reset = function(){
        this.dir = this.origDir.copy()
        this.count = 0
    }
    this.next = function(){
        var nextDir = p5.Vector.mult(this.dir, this.len)
        var nextPos = p5.Vector.add(this.pos,nextDir)
        var nextBranch = new Branch(this, nextPos ,this.dir.copy())
        return nextBranch
    }
    this.show = function(){
        if (parent != null) {
            stroke(255)
            line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y)
        }
    }
}

function Leaf() {
    this.pos = createVector(random(0,width),random(0,height)-200)
    this.reached = false
    
    this.show = function(){
        fill(200,0,0)
        noStroke()
        ellipse(this.pos.x,this.pos.y,8,8)
    }
}

function setup(){
    createCanvas(600,600)
    background(0)
    tree = new Tree()
}
function draw(){
    strokeWeight(strokeweight)
    tree.grow()
    tree.show()
    
    strokeweight-=0.2
}