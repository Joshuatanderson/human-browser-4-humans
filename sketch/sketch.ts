declare interface Math {
    sign(x: number): number;
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
        this.x += vector * sine(this.speedX, 100, count);
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
let count = 0;


let spheres: Dot[] = []

function setup() {
    createCanvas(windowWidth, windowHeight)
    noStroke()
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(100);
    makeBalls(count, 50)
    fill("#ddd")
    text(count, 50, 50)
    for (let sphere of spheres) {
        sphere.draw()
        sphere.increment(100 + (windowWidth / 2), - 100 + (windowWidth / 2))
    }
    count++;
}

const makeBalls = (count: number, frequency: number) => {
    const centerX = windowWidth / 2;
    // const centerY = windowHeight / 2;
    if (count % frequency === 0) {
        spheres.push(
            new Dot(
                (centerX + 100), 0, 25, 'rgba(179, 111, 76, .8)', 1, 1
            )
        )
        spheres.push(
            new Dot(
                (centerX - 100), 0, 25, 'rgba(76, 144, 179, .8)', 1, 1
            )
        )
    }
}

const sine = (speed: number, width: number, count: number) => {
    // returns angle from 0 to 1
    const cosine = (speed * cos((1 / width) * count))
    return cosine;
} 