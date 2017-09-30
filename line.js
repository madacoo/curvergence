function Line(pointA, pointB, segment) {
    this.a = pointA;
    this.b = pointB;
}

Line.prototype.render = function() {
    let posA; let posB;
    let f = this.getFunction();

    if (!f) { // vertical line
        posA = new Vector(this.a.x, 0);
        posB = new Vector(this.a.x, height);
    } else {
        posA = new Vector(0, f(0));
        posB = new Vector(width, f(width));
    }

    context.beginPath();
    context.moveTo(posA.x, posA.y);
    context.lineTo(posB.x, posB.y);
    context.stroke();
    context.closePath();


};

Line.prototype.getFunction = function() {
    /* Given the points of this line, return f(x)
     * describing this line in slope-intercept form. */
    let m = this.getSlope();
    if (m == "-Infinity" || m == "Infinity") return false;
                // vertical lines cannot be represented in slope-intercept form

    let b = this.a.y - m * this.a.x;
    return function(x) { return m*x + b };
};

Line.prototype.getSlope = function() {
    return (this.a.y - this.b.y) / (this.a.x - this.b.x)
};

Line.prototype.getYIntercept = function() {
    return this.a.y - (this.getSlope() * this.a.x);

};


