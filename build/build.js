var Morph = (function () {
    function Morph() {
    }
    Morph.prototype.setup = function () {
        this.shapes = [];
        this.currentShape = 0;
        this.shapes.push({ points: Shapes.circle(100), color: color('#009CDF') });
        this.shapes.push({ points: Shapes.circle(150), color: color(255, 204, 0) });
        this.shapes.push({ points: Shapes.square(50), color: color(175, 100, 220) });
        this.morph = new Array();
        var highestCount = 0;
        for (var i = 0; i < this.shapes.length; i++) {
            highestCount = Math.max(highestCount, this.shapes[i].points.length);
        }
        for (var i = 0; i < highestCount; i++) {
            this.morph.push(new p5.Vector());
        }
    };
    Morph.prototype.recalc = function () {
        var totalDistance = 0;
        var points = this.shapes[this.currentShape].points;
        for (var i = 0; i < points.length; i++) {
            var v1 = points[i];
            var v2 = this.morph[i];
            v2.lerp(v1, 0.1);
            totalDistance += p5.Vector.dist(v1, v2);
        }
        if (totalDistance < 0.1) {
            this.currentShape++;
            if (this.currentShape >= this.shapes.length) {
                this.currentShape = 0;
            }
        }
    };
    Morph.prototype.draw = function () {
        this.recalc();
        var color = this.shapes[this.currentShape].color;
        var points = this.shapes[this.currentShape].points;
        translate(width / 2, height / 2);
        strokeWeight(4);
        beginShape();
        noFill();
        stroke(color);
        for (var i = 0; i < points.length; i++) {
            var v = this.morph[i];
            vertex(v.x, v.y);
        }
        endShape(CLOSE);
    };
    return Morph;
}());
var Shapes = (function () {
    function Shapes() {
    }
    Shapes.circle = function (size) {
        var points = new Array();
        for (var angle = 0; angle < 360; angle += 9) {
            var v = p5.Vector.fromAngle(radians(angle - 135));
            v.mult(size);
            points.push(v);
        }
        return points;
    };
    Shapes.square = function (size) {
        var points = new Array();
        for (var x = -size; x < size; x += 10) {
            points.push(createVector(x, -size));
        }
        for (var y = -size; y < size; y += 10) {
            points.push(createVector(size, y));
        }
        for (var x = size; x > -size; x -= 10) {
            points.push(createVector(x, size));
        }
        for (var y = size; y > -size; y -= 10) {
            points.push(createVector(-size, y));
        }
        return points;
    };
    Shapes.star = function (x, y, radius1, radius2, npoints) {
        var angle = TWO_PI / npoints;
        var halfAngle = angle / 2.0;
        var points = new Array();
        for (var a = 0; a < TWO_PI; a += angle) {
            var sx = x + cos(a) * radius2;
            var sy = y + sin(a) * radius2;
            points.push(createVector(sx, sy));
            sx = x + cos(a + halfAngle) * radius1;
            sy = y + sin(a + halfAngle) * radius1;
            points.push(createVector(sx, sy));
        }
        return points;
    };
    return Shapes;
}());
var FREQUENCY = 20;
var WIDTH = 50;
var SPEED_Y = 2;
var AMPLITUDE = 50;
var PERIOD = 200;
var angle = 0;
var count = 0;
var spheres = [];
function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    noStroke();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
var Dot = (function () {
    function Dot(startX, startY, radius, color, speedX, speedY) {
        this.x = startX;
        this.y = startY;
        this.radius = radius;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.angle = 0;
    }
    Dot.prototype.moveX = function (vector) {
        this.x = Math.sign(vector) > 0 ?
            (windowWidth / 2) + (AMPLITUDE * sin(this.angle)) :
            (windowWidth / 2) - (AMPLITUDE * sin(this.angle));
        this.angle += .04;
    };
    Dot.prototype.moveY = function (vector) {
        this.y += vector;
    };
    Dot.prototype.draw = function () {
        fill(this.color);
        ellipse(this.x, this.y, this.radius);
    };
    Dot.prototype.increment = function (borderRight, borderLeft) {
        this.moveX(this.speedX);
        this.moveY(this.speedY);
    };
    return Dot;
}());
function draw() {
    background(100);
    makeBalls(count, FREQUENCY);
    fill("#ddd");
    text(count, 50, 50);
    for (var _i = 0, spheres_1 = spheres; _i < spheres_1.length; _i++) {
        var sphere_1 = spheres_1[_i];
        sphere_1.draw();
        sphere_1.increment((WIDTH + windowWidth / 2), (windowWidth / 2 - WIDTH));
    }
    count++;
}
var makeBalls = function (count, frequency) {
    var brownStart = (windowWidth / 2) + (AMPLITUDE * sin((frameCount / PERIOD) * TWO_PI));
    var blueStart = (windowWidth / 2) - (AMPLITUDE * sin((frameCount / PERIOD) * TWO_PI));
    if (count % frequency === 0) {
        spheres.push(new Dot((brownStart), 0, 10, 'rgba(179, 111, 76, .8)', -1, SPEED_Y));
        spheres.push(new Dot((blueStart), 0, 10, 'rgba(76, 144, 179, .8)', 1, SPEED_Y));
    }
};
var sine = function (x, PERIOD, speed) {
};
//# sourceMappingURL=build.js.map