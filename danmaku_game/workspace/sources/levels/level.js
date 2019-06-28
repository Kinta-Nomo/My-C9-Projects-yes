//x is percentage, time is second

var level1 = [
    
    //normal area. relaxable time
    {type:"normalEnemy",x:50,time:1},
    {type:"normalEnemy",x:50,time:3},
    {type:"normalEnemy",x:50,time:5},
      
    //6 mini enemies. Rushing!
    {type:"miniEnemy",x:25,time:6},
    {type:"miniEnemy",x:75,time:6},
    {type:"miniEnemy",x:25,time:7},
    {type:"miniEnemy",x:75,time:7},
    {type:"miniEnemy",x:25,time:8},
    {type:"miniEnemy",x:75,time:8},
    
    //2 shield enemy approach. while 6 speed enemies hunts
    {type:"destroyerEnemy",x:25,time:10},
    {type:"destroyerEnemy",x:75,time:12},
    {type:"speedEnemy",x:50,time:13},
    {type:"speedEnemy",x:60,time:14},
    {type:"speedEnemy",x:70,time:15},
    {type:"speedEnemy",x:50,time:16},
    {type:"speedEnemy",x:60,time:17},
    {type:"speedEnemy",x:70,time:18},
    {type:"speedEnemy",x:50,time:19},
    
    //wave of enemies. baby, normal and speed. Hard when destroyer enemy is still present
    {type:"babyEnemy",x:10,time:23},
    {type:"babyEnemy",x:70,time:23.5},
    {type:"normalEnemy",x:40,time:24},
    {type:"speedEnemy",x:10,time:24},
    {type:"babyEnemy",x:30,time:24.5},
    {type:"babyEnemy",x:20,time:25},
    {type:"normalEnemy",x:80,time:25.5},
    {type:"speedEnemy",x:90,time:25.5},
    {type:"babyEnemy",x:50,time:26},
    {type:"babyEnemy",x:70,time:26.5},
    {type:"normalEnemy",x:30,time:27},
    {type:"speedEnemy",x:90,time:27},
    {type:"babyEnemy",x:20,time:27.5},
    
    //shild comes. And enemy aproaches from behind
    {type:"destroyerEnemy",x:25,time:30},
    {type:"deathEnemy",x:25,time:32},
    {type:"destroyerEnemy",x:50,time:36},
    {type:"deathEnemy",x:50,time:37},
    {type:"destroyerEnemy",x:75,time:39},
    {type:"deathEnemy",x:75,time:40},
    
    //soldier enemy area, another safety 
    {type:"soldierEnemy",x:50,time:58},
    {type:"soldierEnemy",x:25,time:60},
    {type:"soldierEnemy",x:75,time:60},
    
    //army attack! with some bombs
    {type:"soldierEnemy",x:20,time:65},
    {type:"soldierEnemy",x:40,time:67},
    {type:"soldierEnemy",x:60,time:69},
    {type:"soldierEnemy",x:80,time:71},
    {type:"deathEnemy",x:20,time:71},
    {type:"deathEnemy",x:40,time:73},
    {type:"deathEnemy",x:60,time:75},
    {type:"deathEnemy",x:80,time:77},
    {type:"speedEnemy",x:25,time:78},
    {type:"speedEnemy",x:75,time:79},
    {type:"speedEnemy",x:50,time:80},
    
    //spiral enemy time! btw it's boss
    {type:"spiralEnemy",x:50,time:90},
]