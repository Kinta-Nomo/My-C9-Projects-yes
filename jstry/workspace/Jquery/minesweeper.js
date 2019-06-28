var msx = 5
var msy = 5
var Box=[]

function setup(){
    createCanvas(8000,8000);
    for(var i = 0; i<msx ; i++){
        for(var j = 0; j<msy ; j ++){
            boxy.push(new createbox(i*20,j*20))
            for (i = 0; i<boxy.length;i++){
                boxy[i].Cbox();
            }
        }
    } 
}
function mousePressed(){
    for (i = 0; i<box.length;i++){
        boxy[i].clicked();
    }
}

function createbox(x,y){
    this.x = x
    this.y = y
    this.Cbox = function(){
        console.log('lo')
        rect(this.x+10,this.y+10,17,17);
    }
    this.clicked = function(){
        console.log('lalala')
    }
}