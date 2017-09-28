function Vector(x, y) {
    this.x = x;
    this.y = y;
}


Vector.prototype.add = function(v) {
    /* Add another vector to this one. */
    this.x += v.x;
    this.y += v.y;
    return this;
};


Vector.prototype.copy = function() {
    /* Return a copy of this vector */
    return new Vector(this.x, this.y);
};


Vector.prototype.distance = function(v) {
	/* Return the distance between this and v. */
	let dX = this.x - v.x;
	let dY = this.y - v.y;
	return Math.hypot(dX, dY);
}


Vector.prototype.rotate = function(theta) {
	/* Rotate this Vector around origin by theta. */
    let sinTheta = Math.sin(theta);
    let cosTheta = Math.cos(theta);
    let x = this.x;
    let y = this.y;

    this.x = Math.floor(x * cosTheta - y * sinTheta);
    this.y = Math.floor(x * sinTheta + y * cosTheta);
};


Vector.prototype.sub = function(v) {
    /* Subtract another vector from this one. */
    this.x -= v.x;
    this.y -= v.y;
    return this;
};
