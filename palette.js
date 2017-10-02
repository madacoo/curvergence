function Palette(r, g, b) {
    this.r = r || this.randomPrimary();
    this.g = g || this.randomPrimary();
    this.b = b || this.randomPrimary();

}

Palette.prototype.randomPrimary = function(mixer) {
    mixer = parseInt(mixer, 16) || 127;
    let rnd = Math.random()*256;
    let val = Math.floor((rnd + mixer)/2);
    let hex = val.toString(16);
    if (hex.length == 2) return hex;
    return "0" + hex;

};

Palette.prototype.getColor = function() {
	let r = this.randomPrimary(this.r);
	let g = this.randomPrimary(this.g);
	let b = this.randomPrimary(this.b);
    return "#" + r + g + b;
};
