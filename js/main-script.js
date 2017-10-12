var width, height, ratio;
var ctx;
var canvas;
var colours;
var colourList1 = [{r:110,g:71,b:91}, {r:255,g:240,b:104}, {r:220,g:248,b:184}, {r:130,g:210,b:188}];
var colourList2 = [{r:51,g:40,b:47}, {r:228,g:108,b:93}, {r:130,g:210,b:188}, {r:249,g:113,b:98}];
var colourIndex = 0;
var colour1 = {r:153,g:234,b:248};
var colour2 = {r:130,g:210,b:188};
var requestAnimationFrame;
var stars = [];




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

	genStars();
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

	// start loop once initialised //
	loop();

	updateColourIndex();
	console.log("initialised");

	smoothScroll.init();
}


function loop() {
	TWEEN.update();
	draw();
	drawStars();

	window.requestAnimationFrame(loop);
}

// DRAW GRADIENT //

function draw() {

	// create gradient //
	
	var grad = ctx.createLinearGradient(0, 0, 20, height);

	grad.addColorStop(0, colourToString(colour1));
	grad.addColorStop(1, colourToString(colour2));	



	// fill rectangle with gradient //
	ctx.fillStyle = grad;
	ctx.fillRect(0, 0, width, height);

}




//  GENERATE STARS //

function Star(x,y) {
	this.x = x;
	this. y = y;
	this.opacity = Math.random();
}

function genStars() {
	stars = [];
	var x, y;
	var starCount = Math.floor(Math.random() * 50);
	if (starCount === 0) starCount = 1;

	for (var i = 0; i <= starCount; i++) {
		x = Math.floor(Math.random() * width);
		y = Math.floor(Math.random() * height);

		var star = new Star(x,y);

		stars.push(star);

	}
}

function drawStars() {

	for (var i = 0; i < stars.length; i++) {
		// draw star //
		ctx.fillStyle = "RGBA(255,255,255," + stars[i].opacity + ")";

		ctx.beginPath();
		ctx.arc(stars[i].x, stars[i].y, 1, 0, Math.PI * 2);
		ctx.fill();
	}
}




// GRADIENT ANIMATION //

function colourToString(colour) {
	return "rgb(" + colour.r + "," + colour.g + "," + colour.b + ")";
}

function colourTween(colour1A, colour1B, colour2A, colour2B) {
	// the tween takes an object with starting values, and interpolates its values to match those of a second object.
	// The second object is passed to the method .to();
	var tweenFrom = {r1:colour1A.r, g1:colour1A.g, b1:colour1A.b, r2:colour2A.r, g2:colour2A.g, b2:colour2A.b};
	var tweenTo = {r1:colour1B.r, g1:colour1B.g, b1:colour1B.b, r2:colour2B.r, g2:colour2B.g, b2:colour2B.b};

	var tween = new TWEEN.Tween(tweenFrom);
	tween.to(tweenTo, 3000);

	// the onUpdate method is called every frame, and gives us a chance to do something with the data as it is interpolated.
	// here we're rounding the values and updating our two colour stops.
	tween.onUpdate(function() {
		colour1 = {r:Math.round(tweenFrom.r1), g:Math.round(tweenFrom.g1), b:Math.round(tweenFrom.b1)};
		colour2 = {r:Math.round(tweenFrom.r2), g:Math.round(tweenFrom.g2), b:Math.round(tweenFrom.b2)};
	});
	tween.easing(TWEEN.Easing.Quadratic.In);
	tween.start();
	tween.onComplete(function() {
		updateColourIndex();
	});
}

function updateColourIndex() {
	var nextIndex = colourIndex + 1;
	if (nextIndex > colourList1.length - 1) {nextIndex = 0};
	colourTween(colourList1[colourIndex], colourList1[nextIndex], colourList2[colourIndex], colourList2[nextIndex]);
	colourIndex += 1;
	if (colourIndex > colourList1.length - 1) {colourIndex = 0};
}






