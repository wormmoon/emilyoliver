var width, height, ratio;
var ctx;
var canvas;

// METRICS //

function metrics() {
	// GET DISPLAY DIMENSIONS //
	width = window.innerWidth;
	height = window.innerHeight;
	ratio = getPixelRatio();

	// GET CANVAS DIMENSIONS //
	canvas.width = width * ratio;
	canvas.height = height * ratio;

	// UPDATE WIDTH & HEIGHT USING PIXEL RATIO //
	width *= ratio;
	height *= ratio;
}

// PIXEL RATIO //

function getPixelRatio() {
    var dpr = window.devicePixelRatio || 1;
    var bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
}






function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	metrics();

	draw();


}

function draw() {
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(width, height);
	ctx.moveTo(width, 0);
	ctx.lineTo(0, height);
	ctx.stroke();
}