
window.onload = function() {
    setup();
    //setInterval(draw, 1000/60);
};


function setup() {
    getCanvas("canvas");
    addMouseListeners();
    addOrigin("blue");
    addOrigin("red");
}


function getCanvas(id) {
    window.canvas = document.getElementById(id);
    window.context = canvas.getContext("2d");
    window.onresize();
}


window.onresize = function() {
    canvas.height = window.innerHeight*0.8;
    canvas.width = Math.min(window.innerWidth*0.95, canvas.height);
};









let origins = [];
let theta = 0;
let colors = ["#6CA398", "#221858", "#2C4880"];
let bgColor = "#2C4770";
let curvergence = false;
let placepoints = true;



function background(color) {
    context.fillStyle = color;
    context.fillRect(0, 0, width, height);
}


function circle(x, y, r) {
    context.beginPath();
    context.arc(x, y, r, 0, 2*Math.PI);
    context.stroke();
    context.closePath();
    context.fill();

}



function curverge(theta) {
    /* draw lines at angle theta and -theta from each of the origins */
    for (let i in origins) {
        drawLine(origins[i].pos, theta, color);
        drawLine(origins[i].pos, -theta, color);
    }
}

function drawLine(p, theta, color) {
    /* Takes a Vector describing point p, a radian angle theta, and a color
     * draws a line to the canvas. */
    let q = pointAtAngle(p, theta);
    context.strokeStyle = color || "#000000";
    new Line(p, q).render();
}


/* ---------- */

function pointAtAngle(p, theta, d) {
    /* Takes a Vector p describing a point and a radian angle theta,
     * optionally also takes a distance d, otherwise 1 is assumed,
     * returns a Vector describing a point at angle theta from p. */
    d = d || 1;
    let x = d * Math.cos(theta);
    let y = d * Math.sin(theta);
    return new Vector(p.x + x, p.y + y);
}


function randomPoint(width, height) {
    /* Takes two integers describing the width and height of a plane,
     * returns a Vector describing a random point on that plane. */
    let x = Math.floor(Math.random()*width);
    let y = Math.floor(Math.random()*height);
    return new Vector(x, y);
}

function beginCurvergence() {
    background(bgColor);
    curvergence = true;
    placepoints = false;
}


function endCurvergence() {
    theta = 0;
    curvergence = false;
}


function clearCurvergence() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    curvergence = false;
    placepoints = true;
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
	let mousePos = getMousePos(e);
    for (let i in origins) {
        if (mousePos.distance(origins[i].pos) < 20) {
            origins[i].holding = true;
            break;
        }
    }
}


function mouseReleased(e) {
    for (let i in origins) {
        origins[i].holding = false;
    }
}

function mouseMoved(e) {
    for (let i in origins) {
        if (!origins[i].holding) continue;
        origins[i].pos = getMousePos(e);
        break;
    }
}


function draw() {
    if (curvergence) {
        theta += (Math.PI*2)/(360*4);
        curverge(theta);
    } else if (placepoints) {
        background(bgColor);
        for (let i in origins) {
            context.fillStyle = origins[i].color;
            circle(origins[i].pos.x, origins[i].pos.y, 5)
        }
    }
}

function addOrigin(color) {
    origins.push({ pos:     randomPoint(),
                   holding: false,
                   color:   color });
}

function removeOrigin() {
    origins.pop();
}

