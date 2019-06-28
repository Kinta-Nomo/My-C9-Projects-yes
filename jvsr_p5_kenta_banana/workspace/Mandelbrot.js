var x, y;
var n = 4000;
var colors = ['black', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'red'];
var points=[];
function setup() {



    createCanvas(4000, 4000);
    man();
    print("im settuping!");
}


function colorSelect(a, b, c, d, l) {

    if (l > 20) {
        return colors[0];
        console.log('hi');
    }

    if (Math.pow(((a * a - b * b) + c) * ((a * a - b * b) + c) + ((2 * a * b) + d) * ((2 * a * b) + d), 0.5) > 2) {
        return colors[l];
    }
    else {
        return colorSelect(((Math.pow(a, 2) - Math.pow(b, 2)) + c), ((2 * a * b) + d), c, d, l + 1);
    }
}

function man() {
    for (var i = 0; i <= n; i += 1) {
        console.log(i);
        for (var j = 0; j <= n; j += 1) {

            x = i / 1000.0 - 2.0;
            y = j / 1000.0 - 2.0;

            // stroke(colorSelect(x, y, x, y, 1));
            // point(x * 1000 + 2000, y * 1000 + 2000);
            points.push([x,y,colorSelect(x, y, x, y, 1)])
        }
    }
}