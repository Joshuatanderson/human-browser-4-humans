// I need to whiteboard this stupid thing.  
// The speed should be a function of  
// distance from center
// current speedX
// current position 


const FREQUENCY = 20;
const WIDTH = 50;
const SPEED_Y = 2;
let count = 0;
let spheres: Dot[] = []


declare interface Math {
    sign(x: number): number;
}

function setup() {
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
    constructor(startX: number, startY: number, radius: number, color: string, speedX: number, speedY: number) {
        this.x = startX;
        this.y = startY;
        this.radius = radius;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }

    moveX(vector: number) {
        this.x += vector * Math.sign(vector) * sine(this.x, 200, this.speedX);
    }
    moveY(vector: number) {
        this.y += vector;
    }

    draw() {
        fill(this.color)
        ellipse(this.x, this.y, this.radius)
    }
    increment(borderRight: number, borderLeft: number) {
        if (this.x + this.radius > borderRight) {
            this.speedX = -1
        } else if (this.x - this.radius < borderLeft) {
            this.speedX = 1
        }
        this.moveX(this.speedX)

        // if (this.y + this.radius > windowHeight) {
        //     this.speedY = -5
        // } else if (this.y - this.radius < 0) {
        //     this.speedY = 5;
        // }
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
    const centerX = windowWidth / 2;
    // const centerY = windowHeight / 2;
    if (count % frequency === 0) {
        spheres.push(
            new Dot(
                (centerX), 0, 10, 'rgba(179, 111, 76, .8)', -1, SPEED_Y
            )
        )
        spheres.push(
            new Dot(
                (centerX), 0, 10, 'rgba(76, 144, 179, .8)', 1, SPEED_Y
            )
        )
    }
}

const sine = (x: number, period: number, speed: number) => {
    const diffCenter = abs(x - windowWidth)
    const res = diffCenter * sin((1 / diffCenter) * speed);
    return res
} 