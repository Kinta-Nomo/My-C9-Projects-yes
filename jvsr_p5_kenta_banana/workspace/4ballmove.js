var myPosx  = 50
var myPosy  = 50
var Myswitch = true
var Myswitch2 = true

function setup(){
    createCanvas(400,400);
    print("im settuping!");
}

function draw(){
    if (Myswitch) {
         myPosx+=3;
    }
    else if (Myswitch = false){
        myPosx-=3;
    }
    if (Myswitch2) {
         myPosy+=1;
    }
    else if (Myswitch2 = false){
        console.log('cancelled');
        myPosy-=1;
    }
    
    if (myPosx > 400) {
        Myswitch = false
    } 
    else if (myPosx < 0) {
        Myswitch = true
    }
    if (myPosy > 400) {
        Myswitch2 = false
    } 
    else if (myPosy < 0) {
        Myswitch2 = true
    } 
    background(51,200,10);
    ellipse(myPosx,myPosy,50,50);
    
}