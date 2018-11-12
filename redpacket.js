var canvasWidth = 800
var canvasHeight = 600

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')


var R = 80
var r = 50
var rot = 0
var rotChange = 5
var polygon = 5;
var isAnimation = false
var isWholeArea = false
var clippingArea = {x: -1, y: -1, r: R}
var image = new Image()
image.src = './1.jpg'
image.onload = function(){
	canvasWidth = $('.container').width()
	canvasHeight = $('.container').height()
	canvas.width = canvasWidth
	canvas.height = canvasHeight
	R = canvasWidth/10
	initCanvas();
}
function initCanvas(){
	clippingArea = {x: Math.random()*(canvasWidth-2*R)+R, y: Math.random()*(canvasHeight-2*R)+R, r: R }
	drawCanvas()
}

function drawCanvas(){
	context.clearRect(0, 0, canvasWidth, canvasHeight)
	context.save()
	drawClippingArea()
	context.drawImage(image, 0, 0, canvasWidth, canvasHeight)
	context.restore()
}

function drawClippingArea(){
	
	if(polygon < 3){
		context.beginPath()
		context.arc(clippingArea.x, clippingArea.y, clippingArea.r, 0, 2*Math.PI)
	}else{
		//context.translate(clippingArea.x, clippingArea.y)
		//context.scale(clippingArea.r, clippingArea.r)
		//context.rotate(rot*Math.PI/180)
		context.beginPath()
		for(var i = 0; i < polygon; i++){
			context.lineTo(
				clippingArea.x + Math.cos(((90 - 360/polygon) + i * (360/polygon)-rot)/180 * Math.PI)*clippingArea.r, 
				clippingArea.y - Math.sin(((90 - 360/polygon) + i * (360/polygon)-rot)/180 * Math.PI)*clippingArea.r
			);
			context.lineTo(
				clippingArea.x + Math.cos((((90 - 360/polygon) + (180/polygon)) + i * (360/polygon)-rot)/180 * Math.PI)*0.5*clippingArea.r, 
				clippingArea.y - Math.sin((((90 - 360/polygon) + (180/polygon)) + i * (360/polygon)-rot)/180 * Math.PI)*0.5*clippingArea.r
			);
		}
		context.closePath();
	}
	context.clip()
}

function reset(){
	if(!isAnimation){
		if(isWholeArea){
			isAnimation = true
			var resettimer = setInterval(function(){
				if(clippingArea.r <= R){
					clearInterval(resettimer)
					isAnimation = false
					isWholeArea = false
					return
				}
				clippingArea.r -= 30
				rot -= rotChange
				drawCanvas()
			}, 20)
		}else{
			initCanvas()
		}
	}
	/*isAnimation = false*/
	
	/*if(clippingArea.r == R){
		clearInterval(resettimer)
		initCanvas()
	}else{
		var resettimer = setInterval(function(){
			clippingArea.r -= 20
			if(clippingArea.r <= R){
				clearInterval(resettimer)
			}
			drawCanvas()
		}, 30)
	}*/
	
}

function show(){
	if(!isAnimation){
		isAnimation = true
		var showtimer = setInterval(function(){
			if(clippingArea.r > 2*Math.sqrt(canvasWidth*canvasWidth + canvasHeight*canvasHeight)){
				clearInterval(showtimer)
				isAnimation = false
				isWholeArea = true
				return
			}
			clippingArea.r += 30
			rot += rotChange
			drawCanvas()
		}, 20)
	}
}

$('#canvas').on('touchstart', function(e){
	e.preventDefault()
})













