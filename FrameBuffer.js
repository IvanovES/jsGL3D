////////////////////////////////////////////////////////////////////////////
// FrameBuffer
////////////////////////////////////////////////////////////////////////////

function FrameBuffer(canvas, bgColor)
{
	this.cvs = canvas;
	this.ctx = this.cvs.getContext("2d");
	this.bgc = new Color(bgColor);
}

FrameBuffer.prototype.reset = function()
{
	var imgData=this.ctx.createImageData(this.cvs.width, this.cvs.height);
    var c = this.bgc.rgb();
	for (var i=0;i<imgData.data.length;i+=4)
	{
		imgData.data[i+0]=c.x;
		imgData.data[i+1]=c.y;
		imgData.data[i+2]=c.z;
		imgData.data[i+3]=255;
	}
	this.ctx.putImageData(imgData, 0, 0);
}

// Sets one pixel.
FrameBuffer.prototype.setPixel = function(x, y, color)
{
 	if(!(Number(x)===x && x%1===0))
		throw new Error("Parameter 'x' is not an integer.");
		
	if(!(Number(y)===y && y%1===0))
		throw new Error("Parameter 'y' is not an integer.");
		
	if(!(color instanceof Color))
		throw new Error("Parameter 'color' is not an instance of Color.");
	
	var imgData = this.ctx.createImageData(1, 1);
	var c = color.rgb();
	imgData.data[0] = c.x;
	imgData.data[1] = c.y;
	imgData.data[2] = c.z;
	imgData.data[3] = 255;
	this.ctx.putImageData(imgData, x, y);
}

