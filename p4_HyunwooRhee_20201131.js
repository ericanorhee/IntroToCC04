/**
 * Developed by IENGROUND of ienlab.
 * @ienground_
 * Ericano Rhee on github.com/ericanorhee
 */

class Butterfly {
    constructor(x, y, vx, vy, size, r, g, b) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.defaultSize = size;
        this.r = r;
        this.g = g;
        this.b = b;
        this.level = 1;
        this.vlevel = 0.05;
        this.vsize = getRandomInt(1, 3);
        this.vr = getRandomInt(1, 10);
        this.vg = getRandomInt(1, 10);
        this.vb = getRandomInt(1, 10);
        this.count = 1;
    }

    move() {
        this.count++;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > windowWidth) {
            this.vx = -this.vx;
        }

        if (this.y < 0 || this.y > windowHeight) {
            this.vy = -this.vy;
        }

        this.level += this.vlevel;

        if (this.level < 1 || this.level >= 2.5) {
            this.vlevel = -this.vlevel;
        }

        if (this.r + this.vr < 0 || this.r + this.vr > 255) {
            this.vr = -this.vr;
        } else {
            this.r += this.vr;
        }

        if (this.g + this.vg < 0 || this.g + this.vg > 255) {
            this.vg = -this.vg;
        } else {
            this.g += this.vg;
        }

        if (this.b + this.vb < 0 || this.b + this.vb > 255) {
            this.vb = -this.vb;
        } else {
            this.b += this.vb;
        }

        if (this.count % 5 === 0) {
            if (this.size + this.vsize < 20 || this.size + this.vsize > this.defaultSize) {
                this.vsize = -this.vsize;
            } else {
                this.size += this.vsize;
            }
        }
    }

    draw() {
        let r = this.size / 7;

        const c1 = lerpColor(color(color('#FFFFFF55')), color(this.r, this.g, this.b), 0.3);
        const c2 = lerpColor(color(color('#FFFFFF55')), color(this.r, this.g, this.b), 0.5);
        const c3 = lerpColor(color(color('#FFFFFF55')), color(this.r, this.g, this.b), 0.7);
        const c4 = lerpColor(color(color('#FFFFFF55')), color(this.r, this.g, this.b), 1);

        let px = [this.x + 3 * r * Math.cos(-PI / 6) / this.level, this.x + 2 * r * Math.cos(PI / 3), this.x + 3 * r * Math.cos(7 * PI / 6) / this.level, this.x + 2 * r * Math.cos(2 * PI / 3)];
        let py = [this.y + 3 * r * Math.sin(-PI / 6), this.y + 2 * r * Math.sin(PI / 3), this.y + 3 * r * Math.sin(7 * PI / 6), this.y + 2 * r * Math.sin(2 * PI / 3)];

        let c1x = (5 * px[1] + px[0]) / 6;
        let c1y = (5 * py[1] + py[0]) / 6;

        let c2x = (px[1] + 2 * px[0]) / 3;
        let c2y = (py[1] + 2 * py[0]) / 3;

        let c3x = (5 * px[3] + px[2]) / 6;
        let c3y = (5 * py[3] + py[2]) / 6;

        let c4x = (px[3] + 2 * px[2]) / 3;
        let c4y = (py[3] + 2 * py[2]) / 3;

        let angle = Math.atan((py[0] - py[1]) / (px[0] - px[1]))
        let length = dist(px[0], py[0], px[1], py[1]);

        noStroke();
        fill(c3);
        arc(c1x, c1y, length / 3, length / 3, angle, angle + PI, PIE);
        arc(c2x, c2y, 2 * length / 3, 2 * length / 3, angle, angle + PI, PIE);
        triangle(this.x, this.y, px[0], py[0], px[1], py[1]);

        fill(c1);
        circle(c1x, c1y, r / 2);
        circle(c2x, c2y, r);


        fill(c4);
        arc(c3x, c3y, length / 3, length / 3, 2 * PI - angle, PI - angle, PIE);
        arc(c4x, c4y, 2 * length / 3, 2 * length / 3, 2 * PI - angle, PI - angle, PIE);
        triangle(this.x, this.y, px[2], py[2], px[3], py[3]);

        fill(c2);
        circle(c3x, c3y, r / 2);
        circle(c4x, c4y, r);
    }
}

let cnt = 1;
let butterflies = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    let butterfly = new Butterfly(mouseX, mouseY, random(-2, 2), random(-2, 2), getRandomInt(50, 300), getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255));

    cnt++;
    if (cnt < 1500 && cnt % 5 === 0) {
        butterflies.push(butterfly);
    }

    for (let i = 0; i < butterflies.length; i++) {
        butterflies[i].move();
        butterflies[i].draw();
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}