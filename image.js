var image = new Image();
image.onload = function(){
	setInterval(move, 100);
}
image.src = "smile.jpg";
var x = 10;
function move(){
	if(x < 200) 
		x+= 5;
	else
		x= 10;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(image, x, 10, 80, 80);
}