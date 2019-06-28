
var normalEnemy = {
    image:"enemygreen",
    speed:1,
    len:50,
    health:50,
    shoot:null
    // shoot: function(){new }
}

var miniEnemy = {
    image:"enemygreen",
    speed:2,
    len:30,
    health:5,
    shoot:null
}

var babyEnemy = {
    image:"enemygreen",
    speed:3,
    len:20,
    health:5,
    shoot:null
}

var destroyerEnemy = {
    image:"enemyblue",
    speed:0.5,
    len:60,
    health:150,
    shoot:null
}

var speedEnemy = {
    image:"enemyred",
    speed:3,
    len:40,
    health:10,
    shoot:null
}

var deathEnemy = {
    image:"enemyred",
    speed:0.2,
    len:25,
    health:80,
    freq:1500,
    shoot:function(enemy){enemybullets.push(new enemyBullet(enemy.x,enemy.y,90,enemy,killerBullet));}
}

var soldierEnemy = {
    image:"enemyorange",
    speed:0.5,
    len:45,
    health:50,
    freq:1000,
    shoot:function(enemy){enemybullets.push(new enemyBullet(enemy.x,enemy.y,90,enemy,killerBullet));
                          enemybullets.push(new enemyBullet(enemy.x,enemy.y,80,enemy,killerBullet));
                          enemybullets.push(new enemyBullet(enemy.x,enemy.y,100,enemy,killerBullet));
    }
}

var spiralEnemy = {
    image:"enemyorange",
    speed:0.1,
    len:45,
    health:200,
    freq:100,
    a1:120,
    a2:240,
    a3:0,
    shoot:function(enemy){this.a1+=6; this.a2+=6; this.a3+=6;
                          enemybullets.push(new enemyBullet(enemy.x,enemy.y,this.a1,enemy,spiralBullet));
                          enemybullets.push(new enemyBullet(enemy.x,enemy.y,this.a2,enemy,spiralBullet));
                          enemybullets.push(new enemyBullet(enemy.x,enemy.y,this.a3,enemy,spiralBullet));
    }
}
