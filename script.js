
const FPS = 30;
urlSearchParams = new URLSearchParams(window.location.search);

window.onload = function() {
    setup();
    setInterval(draw, FPS);
};


function setup() {
    let width, height;
    if (urlSearchParams.has("width") && urlSearchParams.has("height")) {
        width = parseInt(urlSearchParams.get("width"));
        height = parseInt(urlSearchParams.get("height"));
    }
    prepareCanvas("canvas", width, height);
    addMouseListeners();
    palette = new Palette();
    cm = new CurvergenceMachine();
    cm.setBackground(palette.getColor());
    cm.addOrigin(randomPoint(canvas.width, canvas.height), palette.getColor());
    cm.addOrigin(randomPoint(canvas.width, canvas.height), palette.getColor());

}


function draw() {
	cm.render();
	cm.update();

}


function prepareCanvas(id, width, height) {
    window.canvas = document.getElementById(id);
    window.context = canvas.getContext("2d");

    height = height || window.innerHeight*0.8;
    width = width || Math.min(window.innerWidth*0.95, height);

    canvas.width = width;
    canvas.height = height;

    document.getElementsByTagName("body")[0].style.maxWidth = canvas.width.toString() + "px";
}


/* Drawing */

function drawCircle(pos, r) {
    context.beginPath();
    context.arc(pos.x, pos.y, r, 0, 2*Math.PI);
    context.stroke();
    context.closePath();
    context.fill();

}


function drawLine(p, theta) {
    /* Takes a Vector describing point p, a radian angle theta, and
     * draws a line to the canvas. */
    let q = pointAtAngle(p, theta);
    new Line(p, q).render();
}

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




/* INPUTS */

// Mouse

function addMouseListeners() {
    document.addEventListener('mouseup', mouseReleased);
}


function getMousePos(e) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width/rect.width;
    let scaleY = canvas.height/rect.height;
    let x = (e.clientX - rect.left) * scaleX;
    let y = (e.clientY - rect.top) * scaleY;
    if (x < 0 || y < 0 ||
        x > canvas.width || y > canvas.height) return false;
    return new Vector(x, y);
}


function mouseReleased(e) {
	if (cm.state != "preparing") return;
	let mousePos = getMousePos(e);
    if (!mousePos) return;
	for (let i in cm.origins) {
		if (mousePos.distance(cm.origins[i].pos) < cm.originSize*2) {
			cm.origins.splice(i, 1);
            return;
        }
	}
    cm.addOrigin(mousePos,  palette.getColor());
}

// Buttons

function btnCurverge() {
	let started = cm.curverge();
    if (started) {
        document.getElementById("btnCurverge").style.display = "none";
    }
}

function btnReload() {
	let reloaded = cm.reload();
    if (reloaded) {
        document.getElementById("btnCurverge").style.display = "inline-block";
        document.getElementById("btnReload").style.display = "none";
    }
}




