
function Enemy(x, y, vx, vy, color, strength) {

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vx;
    this.color = color;
    this.strength = strength;

    this.move = function() {
        this.x += vx;
        this.y += vy;};
        
    this.shoot = function() {
        // create a bullet at the x,y
    }



    }


