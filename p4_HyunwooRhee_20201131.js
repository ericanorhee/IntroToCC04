/**
 * Developed by IENGROUND of ienlab.
 * @ienground_
 * Ericano Rhee on github.com/ericanorhee
 */

class Butterfly {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw() {
        let r = this.size / 7;
        fill(this.color);
        stroke(255);
        // line(0, height / 2, width, height / 2);
        // line(width / 2, 0, width / 2, height);
        // line(-3*r + width / 2, 0, -3*r+ width / 2, height);
        noStroke();

        arc(this.x - r * 3.5, this.y, r * 8, r * 8, -HALF_PI, 0, PIE);
        circle(this.x - r, this.y + r * 1.5, r * 3);
        square(this.x - r, this.y, r * 1.5);

        arc(this.x + r * 3.5, this.y, r * 8, r * 8, PI, PI + HALF_PI, PIE);
        circle(this.x + r, this.y + r * 1.5, r * 3);
        square(this.x , this.y - r * 0.5, r * 1.5);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}

function draw() {

    let butterfly = new Butterfly(width / 2, height / 2, 500, color("#FF4081"));
    butterfly.draw();
}

String.prototype.format = function () {
    let formatted = this;
    for (const arg in arguments) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};