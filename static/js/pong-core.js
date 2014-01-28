// Init canvas & brush
var canvas = document.getElementById("canvas-pong");
var ctx = canvas.getContext("2d");

// Fill canvas to screen
var H = 600;
var W = 800;

canvas.height = H;
canvas.width = W;

/* 
 * Define ball 
 */

// Define ball class
function ball (x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = 10; 
    this.vy = 10;
    //TODO: The ball will trapped if the paddle is too large
}

// Assign new balls
var b0 = new ball(W/2, H/2, 10);


/* 
 * Define paddles 
 */
// Define paddle size
var p_width = 20;
var p_length = H/7;
var p_width_h = p_width/2;
var p_length_h = p_length/2;

// Define paddle class
function paddle (x, y) {
    this.x = x;
    this.y = y;
}

// Assign new paddles
var p_move = 20;
var p1 = new paddle(2*p_width, H/2 - p_length_h);
var p2 = new paddle(W - 2*p_width - p_width, H/2 - p_length_h);

/* Main function */
// Main function for drawing 
function draw() {
    // Flush background
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, W, H);
    
	// Draw line
	drawLine();
	
    // Draw paddles
    drawPaddle();
    
    // Draw ball
    drawBall();
	
	// Draw score
	drawScore();
}


function drawPaddle() {
    // Move by keypress
    if(map["83"] & p1.y + p_move < H - p_length) p1.y += p_move;
    if(map["87"] & p1.y - p_move > 0) p1.y -= p_move;
	if(map["40"] & p2.y + p_move < H - p_length) p2.y += p_move;
    if(map["38"] & p2.y - p_move > 0) p2.y -= p_move;
    
    // Draw paddles
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(p1.x, p1.y, p_width, p_length);
    ctx.fillRect(p2.x, p2.y, p_width, p_length);   
}


function drawBall() {
    // Predict next location
    var p_x = b0.x + b0.vx;
    var p_y = b0.y + b0.vy;
    
    // Bounce at screen boundary and scores
	if(p_y > H | p_y < 0) b0.vy = - b0.vy;
    if(p_x > W)  {
		b0.vx = - b0.vx;
		score_1++;
	}
	else if(p_x < 0) {
		b0.vx = - b0.vx;
		score_2++;
	}
    
    // Bounce at green paddles
    imgX = ctx.getImageData(p_x, b0.y, 1, 1);
    imgY = ctx.getImageData(b0.x, p_y, 1, 1);
    if(imgX.data[1] == 255) b0.vx = - b0.vx;
    if(imgY.data[1] == 255) b0.vy = - b0.vy;

	// Update ball location
    b0.x += b0.vx;
    b0.y += b0.vy;
        
    // Draw ball
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(b0.x, b0.y, b0.r, 0, 2*Math.PI);
    ctx.fill();
}

function drawLine() {
	// Draw mid line
	ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
	ctx.fillRect(W/2, 0, 3, H);
	
	// Draw score line
	ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
	ctx.fillRect(0, 0, 5, H);
	ctx.fillRect(W-5, 0, 5, H);
};

/* Init scores */
var score_1 = 0;
var score_2 = 0;

function drawScore() {
	ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
	ctx.font="40px Arial";
	ctx.fillText(score_1, W/3 - 20, 50);
	ctx.fillText(score_2, 2*W/3, 50);
}



/**
 * Key press handler
 */
var map = [];
window.onkeydown = function(e) {
    //alert(e.keyCode);
    map[e.keyCode] = true;
}

window.onkeyup = function(e) {
    map[e.keyCode] = false;
}


// Set frame rate
setInterval(draw, 30);



