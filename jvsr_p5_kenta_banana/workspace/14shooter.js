var y = 400;
var x = 50;
var bulX = 0;
var bulY = 350;
var count = 350;
var Ex = 200;
var Ey = -20;
var EnemyLife = 3;
var hit = false;
var enemySpeed = 0.5;
var EDeath = false;
var EnemCols = ['yellow','purple','green','cyan'];
var EnemyChoice = random(0,3);
var bulSpeed = 10;
var Elecx = 0;
var counter = 0;
var elecbounce = 0;
var onlyfirsttime = true;
var point = 0;
var bulletpower;
var EbulY = 0;

function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    background(0,0,255);
    if (onlyfirsttime == undefined){
        onlyfirsttime = false
        EnemyChoice = random(0,3);
        bulletpower = 1; 
        EbulY = 0;
    }
    stroke(255);
    strokeWeight(3);
    line(0,350+15,400,350+15);
    spaceShip(mouseX-25);
    if (mouseIsPressed) {
        if (bulY < -5) {
            bulX = mouseX
            bulY = 350
            hit = false
        }
    }
    if (Ey > 380){
        Ex = random(100,300);
        Ey = -10
        EnemyLife = 3
        EDeath = false
        EnemyChoice = random(-1,3)
        bulSpeed = 10
        bulletpower = 1
        EbulY = 0
    }
    bulSpeed = 10
    Enemy(Ex);
    Bullet(bulX);
}

function spaceShip(x){
    noStroke();
    fill(255,100,50);
    rect(x,350,50,30);
    rect(x+10,350-30,10,30);
    rect(x+30,350-30,10,30);
}

function Bullet(x) {
    bulY = bulY - bulSpeed
    if (hit == false){
        if (EnemyLife > 0){
            if (x<Ex+25+Elecx && bulY<Ey+25 && x>Ex-25+Elecx && bulY>Ey-25){
                point += 1
                console.log('nice point!')
                hit = true
                EnemyLife = EnemyLife - bulletpower
            }
        }
        if (Math.ceil(EnemyChoice) == 1) {
            fill(255,0,255,200)
            ellipse(x,bulY-5,7,10)
            ellipse(x,bulY-10,7,10)
            fill(255,0,255)
        }
        else{
            fill(255);
        }
        ellipse(x,bulY,7,10)
    }
}

function Enemy(x){
    Ey+=enemySpeed
    if (EnemyLife > 0){
        if (Math.ceil(EnemyChoice) == 0) {
            bulletpower = 1
            bulSpeed = 15
            if (x+Elecx>400){
                elecbounce = true
            }
            else if (x+Elecx<0){
                elecbounce = false
            }
            
            if (elecbounce){
                counter -= 1.5
                Elecx = counter
            }
            else{
                counter += 1.5
                Elecx = counter
            }
            fill(EnemCols[0]);
            
        }
        else if (Math.ceil(EnemyChoice) == 1) {
            fill(EnemCols[1]);
            bulletpower = 1
            bulSpeed = 7
            Elecx = 0
            counter = 0
        }
        else if (Math.ceil(EnemyChoice) == 2) {
            fill(EnemCols[2]);
            bulletpower = 0.8
            Ey+=0.1
            Elecx = 0
            counter = 0
        }
        else if (Math.ceil(EnemyChoice) == 3) {
            IceBullet(x);
            fill(EnemCols[3]);
            bulletpower = 1
            Elecx = 0
            counter = 0
        }
        ellipse(x+Elecx,Ey,50,50)
        fill(255,255,255);
        ellipse(x-6+Elecx,Ey-3,7,10)
        ellipse(x+6+Elecx,Ey-3,7,10)
        ellipse(x-14+Elecx,Ey,7,10)
        ellipse(x+14+Elecx,Ey,7,10)
    }
    else if (EnemyLife <= 0){
        if (EDeath == false) {
            enemySpeed += 0.1 
            EDeath = true
            Ey = 350
            bulSpeed = 10
            point += 3
            bulletpower = 1
        }
    }
}

function IceBullet(icex){
    fill('cyan');
    ellipse(icex,EbulY,5,15)
    EbulY += 3
    if (icex < mouseX+25 && icex > mouseX-25 && EbulY> 350+30 && EbulY< 350){
        console.log('nghaaaaaa')
    }
}
