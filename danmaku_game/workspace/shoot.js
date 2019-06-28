
var player;
var dragging;
var shootbul;
var ship;

var gameTime;
var time;
var enemynum = 0;

var enemies = []
var time = 0;

var enemybullets = [];

var explosions = [];


//loading images ant sources
function preload() {
  gameBack = loadImage('/sources/images/shootBack.png');
  player = loadImage('/sources/images/ship.png');
  enemygreen = loadImage('/sources/images/green_alien.png');
  enemyblue = loadImage('/sources/images/blue_alien.png');
  enemyred = loadImage('/sources/images/red_alien.png');
  enemyorange = loadImage('/sources/images/orange_alien.png');
  
  //song = loadSound('/heartbreaker2.mp3');
  ememydeath = loadSound('/invaderkilled.wav');
}

//setting up Canvas and ship
function setup(){
    //song.setVolume(0.5);
    //song.play()
    
    createCanvas(500,500);
    background(0);
    ship = new Ship(yellowShip);
    
    gameTime = setInterval(function(){
        //rounding to 2 decimalplace properly
        time=Math.round((time+0.1) * 100)/100;
        if (enemynum<level1.length){
            while (level1[enemynum].time==time){
                enemies.push(new Enemy((width/100)*level1[enemynum].x , window[level1[enemynum].type]))
                enemynum+=1
            }
        }
    },100)
    
}

function draw(){
    // if (!(song.isPlaying())){  
    //     song.play()
    // }
    
    background(0);
    ship.draw();
    fill(255,0,0)
    noStroke();
    ellipse(ship.x,ship.y,ship.rad*2)
    stroke(0)
    
    //moving every bullets that ship shoots
    //if any out from the canvas, remove it from the list
    for (var i = 0;i<ship.bullets.length;i++){
        if ((ship.bullets[i].y<0)||(ship.bullets[i].y>height)||(ship.bullets[i].x<0)||(ship.bullets[i].x>width)){
            ship.bullets.splice(i,1)
        }else{
            ship.bullets[i].move()
            ship.bullets[i].draw()
            ship.bullets[i].check()
        }
    }
    
    for (var i = 0;i<enemybullets.length;i++){
        if (enemybullets[i].y>height){
            enemybullets.splice(i,1)
        }else{
            enemybullets[i].move()
            enemybullets[i].draw()
            enemybullets[i].check()
        }
    }
    
    for (var i = 0;i<enemies.length;i++){
        enemies[i].move()
        enemies[i].draw()
        if (enemies[i].y>height){
            enemies[i].die()
        }
    }
    
    for (var i = 0;i<explosions.length;i++){
        explosions[i].update()
    }
}


function Ship(type){
    //set the initial coordinate to the center of teh screen
    this.x = width/2;
    this.y = 3*(height/4);
    this.rad = 5
    
    this.health=10
    this.type = type
    this.height = this.type.len;
    this.ratio = this.height/player.height
    this.size = {
        'x':player.width*this.ratio,
        'y':player.height*this.ratio
    }
    
    //the array whre bullets are stored
    this.bullets = []
    
    
    this.draw = function(){
        image(player, this.x-(player.width*this.ratio/2) ,this.y-(player.height*this.ratio/2), this.size.x,this.size.y);
    };
    
    this.shoot = function(){
        this.bullets.push(new playerBullet(this.x,this.y,this.type.bulletType));
    };
    
    this.shot = function(damage){
        this.health -= damage
        if(this.health <= 0){
            this.die()
        }
    }
    
    this.die = function(){
        // alert('doned')
    }
}

function playerBullet(x,y,type){
    this.x=x;
    this.y=y;
    
    this.type = type;
    
    this.speed = this.type.speed
    this.color = this.type.color;
    this.size = this.type.size;
    this.damage = this.type.damage
    
    this.move = function(){
        this.y-=this.speed;
    }
    
    this.draw = function(){
        fill(this.color[0],this.color[1],this.color[2]);
        ellipse(this.x,this.y,this.size[0],this.size[1]);
    }
    
    this.check = function(){
        for (var i = 0; i< enemies.length;i++){
            enemy = enemies[i]
            if (this.x<enemy.x+(enemy.size.x/2) && this.x>enemy.x-(enemy.size.x/2)){
                if (this.y<enemy.y+(enemy.size.y/2) && this.y>enemy.y-(enemy.size.y/2)){
                    enemy.shot(this.damage)
                    ship.bullets.splice(ship.bullets.indexOf(this),1)
                    explosions.push(new explosion(this.x,this.y))
                    return null
                }
            }
        }
    }
}

function Enemy(x,type){
    this.x = x
    this.y = 0
    this.speed=1
    
    this.type = type
    this.height = this.type.len;
    this.image=window[this.type.image]
    
    var This = this
    if (this.type.shoot != null){
        this.shoot = setInterval( function(){This.type.shoot(This)},this.type.freq)
    }
    
    
    this.ratio = this.height/this.image.height
    this.size = {
        'x':this.image.width*this.ratio,
        'y':this.image.height*this.ratio
    }
    
    this.health = this.type.health
    
    this.draw = function(){
        image(this.image,this.x-(this.image.width*this.ratio/2) ,this.y-(this.image.height*this.ratio/2), this.size.x,this.size.y);
    }
    
    this.move = function(){
        this.y+=this.type.speed
    }
    
    this.shot = function(damage){
        this.health -= damage
        if(this.health <= 0){
            this.die()
        }
    }
    
    this.die = function(){
        enemies.splice(enemies.indexOf(this),1)
        clearInterval(this.shoot)
        ememydeath.play()
    }
}


function enemyBullet(x,y,angle,parentEnemy,type){
    
    this.x=x;
    this.y=y;
    
    this.type = type;
    this.angle = angle
    
    this.speed = this.type.speed
    this.color = this.type.color;
    this.size = this.type.size;
    this.damage = this.type.damage
    this.rad = this.type.rad
    this.parentEnemy = parentEnemy
    
    
    this.move = function(){
        this.x+=Math.cos( this.angle * (Math.PI / 180) ) * this.speed;
        this.y+=Math.sin( this.angle * (Math.PI / 180) ) * this.speed;
    }
    
    this.draw = function(){
        fill(this.color[0],this.color[1],this.color[2]);
        ellipse(this.x,this.y,this.size[0],this.size[1]);
    }
    
    this.check = function(){
        for (var i = 0; i< enemies.length;i++){
            enemy = enemies[i]
            if(((this.x-ship.x)**2+(this.y-ship.y)**2)**0.5<ship.rad+this.rad){
                ship.shot(this.damage)
                enemybullets.splice(enemybullets.indexOf(this),1)
                
                return null
            }
        }
    }
}


function explosion(x,y){
    this.x = x
    this.y = y
    this.time = 0;
    this.diam = 20;
    
    this.update = function(){
        this.time+=1
        this.diam-=1
        if(this.time < 20){
            fill(255);
            ellipse(this.x,this.y,this.diam)
        }else{
            explosions.splice(explosions.indexOf(this),1)
        }
    }
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

var dragDis;

function mousePressed(){
    dragging = true;
    dragDis = {'x':ship.x-mouseX,'y':ship.y-mouseY}
    clearInterval(shootbul)
    shootbul = setInterval(function () {
        ship.shoot()
    },ship.type.time)
    
    //prevent default;
    return false;
}

function mouseDragged(){
    if (dragging){
        
        //moving the ship together with the mouse
        ship.x = mouseX+dragDis.x;
        ship.y = mouseY+dragDis.y;
        if (ship.x<2 *(ship.size.x/2)){ ship.x = 2*(ship.size.x/2) }
        if (ship.x>width-2*(ship.size.x/2)){ ship.x = width-2*(ship.size.x/2) }
        if (ship.y<2*(ship.size.y/2)){ ship.y = 2*(ship.size.y/2) }
        if (ship.y>height-2*(ship.size.y/2)){ ship.y = height-2*(ship.size.y/2) }
        
        
        //
        
    }
}

function mouseReleased(){
    dragging = false;
    clearInterval(shootbul)
}