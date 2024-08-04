// to get the mouse position
export const getMousePos= (canvas, event)=> {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}
// to test if the mouse is exactly inside of a specific given rect
export const isInside=(pos, rect)=>{
	return pos.x > rect.x && pos.x < (rect.x+rect.width) && pos.y < (rect.y+rect.heigth) && pos.y > rect.y
}
// to set the flap of the bird
export const moveBird=(f1,f2,f3)=>{
	setTimeout(f1,200);
	setTimeout(f2,300);
	setTimeout(f3,400);
}
/**
 * /////////////////////////////////////////
function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}
function isInside(pos, rect){
	return pos.x > rect.x && pos.x < (rect.x+rect.width) && pos.y < (rect.y+rect.heigth) && pos.y > rect.y
}
var rect = {
	x:0,
	y:0,
	width:cvs.width,
	heigth:cvs.height
};
cvs.addEventListener('click', function(evt) {
	var mousePos = getMousePos(cvs, evt);

	if (isInside(mousePos,rect)) {
		alert('clicked inside rect');
		console.log(mousePos)
		
    }else{
		alert('clicked outside rect');
		console.log(mousePos)
		console.log(rect)
    }	
}, false);
////////////////////////////////
 */