function Origin(pos, color) {
	this.pos = pos;
	this.color = color;
	this.states = ["placed", "placing"];
	this.state = "placed";
}

function CurvergenceMachine() {
	this.states = ["preparing", "starting", "drawing", "done"];
	this.state = "preparing";
	this.origins = [];
	this.background = "#000000";
	this.theta = 0;
	this.thetaIncrement = (Math.PI*2)/(360*2);
}

CurvergenceMachine.prototype.update = function() {
	switch (this.state) {
		case "preparing":

			break;
		case "starting":
			this.state = "drawing";
            break;
		case "drawing":
			this.theta += this.thetaIncrement;
			if (this.theta > Math.PI/2) {
				this.theta = 0;
				this.state = "done";
                document.getElementById("btnReload").style.display = "inline-block";
			}
            break;
		case "done":

			break;
	}

};

CurvergenceMachine.prototype.render = function() {
	switch (this.state) {
		case "preparing":
			this.drawBackground();
			this.drawOrigins();
			break;

		case "starting":
			this.drawBackground();
			break;

		case "drawing":
			for (let i in this.origins) {
				let p = this.origins[i].pos;
				let theta = this.theta;
                context.strokeStyle = this.origins[i].color;
				drawLine(p, theta);
				drawLine(p, -theta);
			}
			break;

		case "done":

			break;
	}
};


CurvergenceMachine.prototype.drawOrigins = function() {
	for (let i in this.origins) {
        context.strokeStyle = this.origins[i].color;
        context.fillStyle = this.origins[i].color;
		drawCircle(this.origins[i].pos, 5);
	}
};


CurvergenceMachine.prototype.drawBackground = function() {
	context.fillStyle = this.background;
    context.fillRect(0, 0, canvas.width, canvas.height);
};


CurvergenceMachine.prototype.addOrigin = function(pos, color) {
    if (this.state != "preparing") return;
	this.origins.push(new Origin(pos, color));
};


CurvergenceMachine.prototype.remOrigin = function() {
    if (this.state != "preparing") return;
	this.origins.pop();
};


CurvergenceMachine.prototype.setBackground = function(color) {
    if (this.state != "preparing") return;
    this.background = color;
}


CurvergenceMachine.prototype.curverge = function() {
    switch (this.state) {
        case "preparing":
            if (this.origins.length > 0) this.state = "starting";
            return true;
    }
    return false;
};


CurvergenceMachine.prototype.reload = function() {
    this.theta = 0;
    this.state = "preparing";
    document.getElementById("btnCurverge").display = "inline-block";
    return true;
};



