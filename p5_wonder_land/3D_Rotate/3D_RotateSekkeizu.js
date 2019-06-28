
//digit 1 = yoko digit 2 = mukou digit 3 = tate

var pointsObjects = []

//cube
pointsObjects=[{'color':[51, 116, 221],'coordinate':[[100,100,100],[100,200,100],[200,200,100],[200,100,100]],'average':0},
                  {'color':[72, 226, 15],'coordinate':[[200,100,100],[200,200,100],[200,200,200],[200,100,200]],'average':0},
                  {'color':[219, 109, 19],'coordinate':[[100,200,100],[200,200,100],[200,200,200],[100,200,200]],'average':0},
                  {'color':[219, 35, 19],'coordinate':[[200,200,200],[100,200,200],[100,100,200],[200,100,200]],'average':0},
                  {'color':[178, 18, 181],'coordinate':[[100,100,100],[100,200,100],[100,200,200],[100,100,200]],'average':0},
                  {'color':[15, 251, 255],'coordinate':[[100,100,100],[200,100,100],[200,100,200],[100,100,200]],'average':0}]

//stair
var numstep = 10;
var step = 20;

for (var i = 0;i < numstep;i++){
        var ii = 100+i*step
        var jj = 100+i*step
        //tate
        pointsObjects.push({'color':[255, 0, 0, 50],'coordinate':[[100,ii,jj],[100,ii+step,jj],[300,ii+step,jj],[300,ii,jj]],'average':0})
        //yoko
        pointsObjects.push({'color':[0, 0, 255, 50],'coordinate':[[100,ii+step,jj],[100,ii+step,jj+step],[300,ii+step,jj+step],[300,ii+step,jj]],'average':0})
}

//house

pointsObjects=[{'color':[255, 255, 255, 50],'coordinate':[[300,100,100],[300,300,100],[300,300,300],[300,100,300]],'average':0},
                  {'color':[255, 255, 255, 50],'coordinate':[[100,300,100],[300,300,100],[300,300,300],[100,300,300]],'average':0},
                  {'color':[255, 255, 255, 50],'coordinate':[[100,200,100],[100,300,100],[100,300,300],[100,200,300]],'average':0},
                  {'color':[255, 255, 255, 50],'coordinate':[[00,200,100],[100,200,100],[100,200,300],[00,200,300]],'average':0},
                  {'color':[255, 255, 255, 50],'coordinate':[[000,100,100],[000,200,100],[000,200,300],[000,100,300]],'average':0},
                  {'color':[255, 255, 255, 50],'coordinate':[[300,100,100],[300,100,300],[000,100,300],[000,100,100]],'average':0},
                  
                  {'color':[145, 75, 45, 100],'coordinate':[[300,100,200],[300,300,200],[100,300,200],[100,200,200],[0,200,200] ,[0,100,200]],'average':0},
                  {'color':[145, 75, 45, 100],'coordinate':[[300,100,300],[300,300,300],[100,300,300],[100,200,300],[0,200,300] ,[0,100,300]],'average':0},
                  
                  {'color':[255, 0, 0, 200],'coordinate':[[100,50,150],[300,50,150],[300,200,0],[100,200,0]],'average':0},
                  {'color':[255, 0, 0, 200],'coordinate':[[100,350,150],[300,350,150],[300,200,0],[100,200,0]],'average':0},
                  
                  {'color':[255, 0, 0, 200],'coordinate':[[0,50,150],[100,50,150],[100,150,50],[0,150,50]],'average':0},
                  {'color':[255, 0, 0, 200],'coordinate':[[0,250,150],[100,250,150],[100,150,50],[0,150,50]],'average':0},
                  
                  {'color':[147, 63, 35],'coordinate':[[0,0,300],[8.66,-5,300],[8.66,-15,300],[0,-20,300],[-8.66,-15,300],[-8.66,-5,300]],'average':0},
                  {'color':[147, 63, 35],'coordinate':[[0,0,300],[8.66,-5,300],[8.66,-5,170],[0,0,170]],'average':0},
                  {'color':[147, 63, 35],'coordinate':[[8.66,-5,300],[8.66,-15,300],[8.66,-15,170],[8.66,-5,170]],'average':0},
                  {'color':[147, 63, 35],'coordinate':[[8.66,-15,300],[0,-20,300],[0,-20,170],[8.66,-15,170]],'average':0},
                  {'color':[147, 63, 35],'coordinate':[[0,-20,300],[-8.66,-15,300],[-8.66,-15,170],[0,-20,170]],'average':0},
                  {'color':[147, 63, 35],'coordinate':[[-8.66,-15,300],[-8.66,-5,300],[-8.66,-5,170],[-8.66,-15,170]],'average':0},
                  {'color':[147, 63, 35],'coordinate':[[-8.66,-5,300],[0,0,300],[0,0,170],[-8.66,-5,170]],'average':0},
                  
                  {'color':[0, 255, 0, 100],'coordinate':[[-30.66,-5,170]],'type':'sphere','radius':50,'average':0},
                  {'color':[0, 255, 0, 100],'coordinate':[[-5.66,20,170]],'type':'sphere','radius':50,'average':0},
                  {'color':[0, 255, 0, 100],'coordinate':[[-10,-40,180]],'type':'sphere','radius':65,'average':0},
                  {'color':[0, 255, 0, 100],'coordinate':[[40,-5,170]],'type':'sphere','radius':70,'average':0},
                  {'color':[0, 255, 0, 100],'coordinate':[[-8.66,-5,150]],'type':'sphere','radius':70,'average':0},
                  {'color':[0, 255, 0, 100],'coordinate':[[-40.66,-30,170]],'type':'sphere','radius':40,'average':0},
                  {'color':[0, 255, 0, 100],'coordinate':[[-20.66,-30,170]],'type':'sphere','radius':40,'average':0},
                  {'color':[0, 255, 0, 100],'coordinate':[[50.66,-40,170]],'type':'sphere','radius':40,'average':0},
                  {'color':[0, 255, 0, 100],'coordinate':[[18.66,-40,150]],'type':'sphere','radius':50,'average':0},
                  
                  {'color':[0, 255, 0, 100],'coordinate':[[-40.66,-10,230]],'type':'sphere','radius':30,'average':0},
                  {'color':[147, 63, 35],'coordinate':[[-40.66,-10,230],[0,-0,250]],'width':14,'type':'line','average':0}]

var numstep = 16;
var step = 6.25;

for (var i = 0;i < numstep;i++){
        var ii = 150+i*step
        var jj = 200+i*step
        //tate
        pointsObjects.push({'color':[255, 0, 0],'coordinate':[[ii,210,jj],[ii+step,210,jj],[ii+step,290,jj],[ii,290,jj]],'average':0})
        //yoko
        pointsObjects.push({'color':[0, 0, 255],'coordinate':[[ii+step,210,jj],[ii+step,210,jj+step],[ii+step,290,jj+step],[ii+step,290,jj]],'average':0})
}