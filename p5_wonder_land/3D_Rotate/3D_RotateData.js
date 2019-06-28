var pointsObjects = [];

pointsObjects=[
]

// pointsObjects=[{'color':[255, 255, 255, 50],'coordinate':[[300,100,100],[300,300,100],[300,300,300],[300,100,300]],'average':0},
//                   {'color':[255, 255, 255, 50],'coordinate':[[100,300,100],[300,300,100],[300,300,300],[100,300,300]],'average':0},
//                   {'color':[255, 255, 255, 50],'coordinate':[[100,200,100],[100,300,100],[100,300,300],[100,200,300]],'average':0},
//                   {'color':[255, 255, 255, 50],'coordinate':[[00,200,100],[100,200,100],[100,200,300],[00,200,300]],'average':0},
//                   {'color':[255, 255, 255, 50],'coordinate':[[000,100,100],[000,200,100],[000,200,300],[000,100,300]],'average':0},
//                   {'color':[255, 255, 255, 50],'coordinate':[[300,100,100],[300,100,300],[000,100,300],[000,100,100]],'average':0},
                  
//                   {'color':[145, 75, 45, 100],'coordinate':[[300,100,200],[300,300,200],[100,300,200],[100,200,200],[0,200,200] ,[0,100,200]],'average':0},
//                   {'color':[145, 75, 45, 100],'coordinate':[[300,100,300],[300,300,300],[100,300,300],[100,200,300],[0,200,300] ,[0,100,300]],'average':0},
                  
//                   {'color':[255, 0, 0, 200],'coordinate':[[100,50,150],[300,50,150],[300,200,0],[100,200,0]],'average':0},
//                   {'color':[255, 0, 0, 200],'coordinate':[[100,350,150],[300,350,150],[300,200,0],[100,200,0]],'average':0},
                  
//                   {'color':[255, 0, 0, 200],'coordinate':[[0,50,150],[100,50,150],[100,150,50],[0,150,50]],'average':0},
//                   {'color':[255, 0, 0, 200],'coordinate':[[0,250,150],[100,250,150],[100,150,50],[0,150,50]],'average':0},
                  
//                   {'color':[147, 63, 35],'coordinate':[[0,0,300],[8.66,-5,300],[8.66,-15,300],[0,-20,300],[-8.66,-15,300],[-8.66,-5,300]],'average':0},
//                   {'color':[147, 63, 35],'coordinate':[[0,0,300],[8.66,-5,300],[8.66,-5,170],[0,0,170]],'average':0},
//                   {'color':[147, 63, 35],'coordinate':[[8.66,-5,300],[8.66,-15,300],[8.66,-15,170],[8.66,-5,170]],'average':0},
//                   {'color':[147, 63, 35],'coordinate':[[8.66,-15,300],[0,-20,300],[0,-20,170],[8.66,-15,170]],'average':0},
//                   {'color':[147, 63, 35],'coordinate':[[0,-20,300],[-8.66,-15,300],[-8.66,-15,170],[0,-20,170]],'average':0},
//                   {'color':[147, 63, 35],'coordinate':[[-8.66,-15,300],[-8.66,-5,300],[-8.66,-5,170],[-8.66,-15,170]],'average':0},
//                   {'color':[147, 63, 35],'coordinate':[[-8.66,-5,300],[0,0,300],[0,0,170],[-8.66,-5,170]],'average':0},
                  
//                   {'color':[0, 255, 0, 100],'coordinate':[[-30.66,-5,170]],'type':'sphere','radius':50,'average':0},
//                   {'color':[0, 255, 0, 100],'coordinate':[[-5.66,20,170]],'type':'sphere','radius':50,'average':0},
//                   {'color':[0, 255, 0, 100],'coordinate':[[-10,-40,180]],'type':'sphere','radius':65,'average':0},
//                   {'color':[0, 255, 0, 100],'coordinate':[[40,-5,170]],'type':'sphere','radius':70,'average':0},
//                   {'color':[0, 255, 0, 100],'coordinate':[[-8.66,-5,150]],'type':'sphere','radius':70,'average':0},
//                   {'color':[0, 255, 0, 100],'coordinate':[[-40.66,-30,170]],'type':'sphere','radius':40,'average':0},
//                   {'color':[0, 255, 0, 100],'coordinate':[[-20.66,-30,170]],'type':'sphere','radius':40,'average':0},
//                   {'color':[0, 255, 0, 100],'coordinate':[[50.66,-40,170]],'type':'sphere','radius':40,'average':0},
//                   {'color':[0, 255, 0, 100],'coordinate':[[18.66,-40,150]],'type':'sphere','radius':50,'average':0},
                  
//                   {'color':[0, 255, 0, 100],'coordinate':[[-40.66,-10,230]],'type':'sphere','radius':30,'average':0},
//                   {'color':[147, 63, 35],'coordinate':[[-40.66,-10,230],[0,-0,250]],'width':14,'type':'line','average':0}]

// function cuboid(x,y,z,width,depth,height,colors){
//     pointsObjects.push({'color':colors,'coordinate':[[x,y,z],[x,y+depth,z],[x+width,y+depth,z],[x+width,y,z]],'average':0})
//     pointsObjects.push({'color':colors,'coordinate':[[x+width,y,z],[x+width,y+depth,z],[x+width,y+depth,z+height],[x+width,y,z+height]],'average':0})
//     pointsObjects.push({'color':colors,'coordinate':[[x,y+depth,z],[x+width,y+depth,z],[x+width,y+depth,z+height],[x,y+depth,z+height]],'average':0})
//     pointsObjects.push({'color':colors,'coordinate':[[x+width,y+depth,z+height],[x,y+depth,z+height],[x,y,z+height],[x+width,y,z+height]],'average':0})
//     pointsObjects.push({'color':colors,'coordinate':[[x,y,z],[x,y+depth,z],[x,y+depth,z+height],[x,y,z+height]],'average':0})
//     pointsObjects.push({'color':colors,'coordinate':[[x,y,z],[x+width,y,z],[x+width,y,z+height],[x,y,z+height]],'average':0})
// }

var length = 10
function cuboid(x,z,y,width,colors){
    
    for (var i = 0; i<width; i++){
        pointsObjects.push({'color':colors,'coordinate':[[x+(i*length),y,z],[x+(i*length),y+length,z],[x+(i*length)+length,y+length,z],[x+(i*length)+length,y,z]],'average':0})
        pointsObjects.push({'color':colors,'coordinate':[[x+(i*length)+length,y,z],[x+(i*length)+length,y+length,z],[x+(i*length)+length,y+length,z+length],[x+(i*length)+length,y,z+length]],'average':0})
        pointsObjects.push({'color':colors,'coordinate':[[x+(i*length),y+length,z],[x+(i*length)+length,y+length,z],[x+(i*length)+length,y+length,z+length],[x+(i*length),y+length,z+length]],'average':0})
        pointsObjects.push({'color':colors,'coordinate':[[x+(i*length)+length,y+length,z+length],[x+(i*length),y+length,z+length],[x+(i*length),y,z+length],[x+(i*length)+length,y,z+length]],'average':0})
        pointsObjects.push({'color':colors,'coordinate':[[x+(i*length),y,z],[x+(i*length),y+length,z],[x+(i*length),y+length,z+length],[x+(i*length),y,z+length]],'average':0})
        pointsObjects.push({'color':colors,'coordinate':[[x+(i*length),y,z],[x+(i*length)+length,y,z],[x+(i*length)+length,y,z+length],[x+(i*length),y,z+length]],'average':0})
    }
}

cuboid(30,10,0,7,[255,0,0])
//brown
cuboid(30,20,0,2,[150, 78, 27])
//skin
cuboid(20,30,0,1,[219, 133, 72])
cuboid(30,30,0,1,[150, 78, 27])
cuboid(20,40,0,1,[219, 133, 72])
cuboid(30,40,0,2,[150, 78, 27])
cuboid(80,40,0,1,[150, 78, 27])
cuboid(70,50,0,3,[150, 78, 27])

cuboid(30,0,10,5,[255,0,0])
cuboid(20,10,10,9,[255,0,0])
cuboid(20,20,10,1,[150, 78, 27])
cuboid(50,20,10,2,[219, 133, 72])
cuboid(70,20,10,1,[150, 78, 27])
cuboid(80,20,10,1,[219, 133, 72])
cuboid(10,30,10,1,[150, 78, 27])
cuboid(40,30,10,3,[219, 133, 72])
cuboid(70,30,10,1,[150, 78, 27])
cuboid(80,30,10,2,[219, 133, 72])


// function stairs(numstep,step,c1,c2){
//     for (var i = 0;i < numstep;i++){
//             var ii = 150+i*step
//             var jj = 200+i*step
//             //tate
//             pointsObjects.push({'color':c1,'coordinate':[[ii,210,jj],[ii+step,210,jj],[ii+step,290,jj],[ii,290,jj]],'average':0})
//             //yoko
//             pointsObjects.push({'color':c2,'coordinate':[[ii+step,210,jj],[ii+step,210,jj+step],[ii+step,290,jj+step],[ii+step,290,jj]],'average':0})
//     }
// }

// cuboid(100,100,100 , 100,100,100)
// console.log(pointsObjects)
// 
// stairs(16,6.25,[255, 0, 0],[0, 0, 255])