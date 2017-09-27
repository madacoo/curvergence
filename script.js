const WIDTH = 800;
const HEIGHT = 600;

let lines = [];
let pointA = randomPoint();
let pointB = randomPoint();


function clear() {
    /* clear the canvas (does not handle transformations) */
    context.clearRect(0, 0, canvas.width, canvas.height);
}


function getCanvas() {
    window.canvas = document.getElementById("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    window.context = canvas.getContext("2d");
}




function randomPoint() {
    let x = Math.floor(Math.random()*WIDTH);
    let y = Math.floor(Math.random()*HEIGHT);
    return new Vector(x, y);
}

function background(color) {
    context.fillStyle = "#2C4770";
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

function curverge() {
    let pointC, pointD;
    let a = 0;
    let x, y;

    background();

    while (a < Math.PI/2) {
        a += Math.PI*2/(360*4);
        x = Math.cos(a);
        y = Math.sin(a);
        pointC = new Vector(x + pointA.x, y + pointA.y);
        pointD = new Vector(x + pointB.x, y + pointB.y);
        context.strokeStyle = "#221858";
        new Line(pointA, pointC).render();
        context.strokeStyle = "#6CA398";
        new Line(pointB, pointD).render();
    }


}

function setup() {
    getCanvas();
    addMouseListeners();
    //curverge();

}

function circle(x, y, r) {
    context.beginPath();
    context.arc(x, y, r, 0, 2*Math.PI);
    context.stroke();
    context.closePath();

}

function draw() {
    clear();
    circle(pointA.x, pointA.y, 5);
    circle(pointB.x, pointB.y, 5);


}


function addMouseListeners() {
    document.addEventListener('mousedown', mousePressed);
    document.addEventListener('mouseup', mouseReleased);
    document.addEventListener('mousemove', mouseMoved);
}


function getMousePos(e) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width/rect.width;
    let scaleY = canvas.height/rect.height;
    let x = (e.clientX - rect.left) * scaleX;
    let y = (e.clientY - rect.top) * scaleY;
    return new Vector(x, y);
}

function mousePressed(e) {

}


function mouseReleased(e) {

}

function mouseMoved(e) {

}







window.onload = function() {
    setup();
    setInterval(draw, 1000/15);
};
