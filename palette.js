function Palette(r, g, b) {
    this.r = r || this.randomPrimary();
    this.g = g || this.randomPrimary();
    this.b = b || this.randomPrimary();
    
}

Palette.prototype.randomPrimary = function() {
	return Math.floor(Math.random()*257);
};

Palette.prototype.getColor = function() {
	let r = this.randomPrimary();
	let g = this.randomPrimary();
	let b = this.randomPrimary();
	r = Math.floor((r + this.r)/2);
	g = Math.floor((g + this.g)/2);
	b = Math.floor((b + this.b)/2);
    
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);

};
