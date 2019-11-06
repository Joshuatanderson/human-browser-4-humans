const data = 

// helix values
const WIDTH = 2;
const AMPLITUDE = 40;
// const PERIOD = 500
const FREQUENCY = 20;

// ball values
const SIZE = 20;
const SPEED_Y = 2;
const START_Y = 0;
const SPHERE_ALPHA = 0.6;
let angularVelocity = 0;
const angularVelocityIncrementer = .04

// balls
const colors: string[] = [
    `rgba(145, 66, 255, ${SPHERE_ALPHA})`,
    `rgba(255, 214, 66, ${SPHERE_ALPHA})`,
    `rgba(66, 255, 167, ${SPHERE_ALPHA})`,
    `rgba(255, 66, 110, ${SPHERE_ALPHA})`,
]

// init values
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
        this.angularVelocity += angularVelocityIncrementer
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
    makeBalls(count, FREQUENCY, colors)
    fill("#ddd")
    text(count, 50, 50)
    for (let sphere of spheres) {
        sphere.draw()
        sphere.increment((WIDTH + windowWidth / 2), (windowWidth / 2 - WIDTH))
    }
    count++;
}

const getColor = (colors: string[]) => {
    const minInclusive = 0;
    const maxExclusive = 4;
    const randInt: number = Math.floor(Math.random() * (maxExclusive - minInclusive))
    return colors[randInt]
}

const makeBalls = (count: number, frequency: number, colors: string[]) => {
    // const centerY = windowHeight / 2;
    if (count % frequency === 0) {
        spheres.push(
            new Dot(
                START_Y, SIZE, getColor(colors), -1, SPEED_Y
            )
        )
        spheres.push(
            new Dot(
                START_Y, SIZE, getColor(colors), 1, SPEED_Y
            )
        )
    }
}

const sine = (x: number, PERIOD: number, speed: number) => {
    // return sin(y) + windowWidth /
} 