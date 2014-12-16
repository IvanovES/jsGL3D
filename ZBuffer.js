////////////////////////////////////////////////////////////////////////////
// ZBuffer							         							  //
////////////////////////////////////////////////////////////////////////////
function ZBuffer(frameBuffer)
{
    this.zBuffer = [];      		// z-buffer
    this.fb = frameBuffer;      	// frameBuffer
	this.reset();
}
		
// Resets the buffer.
ZBuffer.prototype.reset = function()
{
	for(var i=0; i<this.fb.cvs.width; i++)
	{
		this.zBuffer[i] = [];
		for(var j=0; j<this.fb.cvs.height; j++)
			this.zBuffer[i][j] = Number.MAX_VALUE;
	}
}

// Buffers one pixel.
ZBuffer.prototype.buffer = function(pixel, color)
{
 	if(!(pixel instanceof Vector))
		throw new Error("Parameter passed is not an instance of Vector.");
		
	if(!(color instanceof Color))
		throw new Error("Parameter passed is not an instance of Color.");
	
	var x = Math.ceil(pixel.x);
	var y = Math.ceil(pixel.y);
    if (pixel.z < this.zBuffer[x][y])
    {
        this.zBuffer[x][y] = pixel.z;
		this.fb.setPixel(x, y, color);
    } 
}

