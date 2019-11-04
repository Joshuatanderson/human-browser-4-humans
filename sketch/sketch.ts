const FREQUENCY = 20;
const WIDTH = 50;
const SPEED_Y = 2;
const AMPLITUDE = 50;
const PERIOD = 200
const SIZE = 20;
const START_Y = 0;
const SPHERE_ALPHA = 0.8;
let angularVelocity = 0;
let count = 0;
let spheres: Dot[] = [];
declare interface Math {
    sign(x: number): number;
}

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight)
    noStroke()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Dot {
    x: number;
    y: number;
    radius: number;
    color: string;
    speedX: number;
    speedY: number;
    angularVelocity: number
    constructor(startY: number, radius: number, color: string, speedX: number, speedY: number) {
        this.x = undefined;
        this.y = startY;
        this.radius = radius;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
        this.angularVelocity = 0;
    }

    moveX(vector: number) {
        // https://www.youtube.com/watch?v=GvwPwIUSYqE
        this.x = Math.sign(vector) > 0 ?
            (windowWidth / 2) + (AMPLITUDE * sin(this.angularVelocity)) :
            (windowWidth / 2) - (AMPLITUDE * sin(this.angularVelocity));
        this.angularVelocity += .04
    }
    moveY(vector: number) {
        this.y += vector;
    }

    draw() {
        fill(this.color)
        ellipse(this.x, this.y, this.radius)
    }
    increment(borderRight: number, borderLeft: number) {
        this.moveX(this.speedX)
        this.moveY(this.speedY)
    }
}

function draw() {
    background(100);
    makeBalls(count, FREQUENCY)
    fill("#ddd")
    text(count, 50, 50)
    for (let sphere of spheres) {
        sphere.draw()
        sphere.increment((WIDTH + windowWidth / 2), (windowWidth / 2 - WIDTH))
    }
    count++;
}

const makeBalls = (count: number, frequency: number) => {
    // const centerY = windowHeight / 2;
    if (count % frequency === 0) {
        spheres.push(
            new Dot(
                START_Y, SIZE, `rgba(179, 111, 76, ${SPHERE_ALPHA})`, -1, SPEED_Y
            )
        )
        spheres.push(
            new Dot(
                START_Y, SIZE, `rgba(76, 144, 179, ${SPHERE_ALPHA})`, 1, SPEED_Y
            )
        )
    }
}

const sine = (x: number, PERIOD: number, speed: number) => {
    // return sin(y) + windowWidth /
} 