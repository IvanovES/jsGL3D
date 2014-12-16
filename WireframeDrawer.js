////////////////////////////////////////////////////////////////////////////
// Wireframe drawer  							         				  //
////////////////////////////////////////////////////////////////////////////

function WireframeDrawer()
{
}

// Draws an object to a certain image.
WireframeDrawer.drawWireframeTo = function(obj, image, color, size, showBacks, screenDistance)
{
    if (obj instanceof Shape)     // if a mesh call DrawMesh()
        this.drawMesh(obj, image, color, size, showBacks, screenDistance);

    if (obj instanceof Group)    // if a scene recall DrawWireframeTo() for each internal.MObject
        for(var i=0; i<obj.internals.length; i++)
            this.drawWireframeTo(obj.internals[i].object, image, color, size, showBacks, screenDistance);

    if(obj instanceof Light)
        this.drawLight(obj, image, screenDistance);

    return 0;
}

// Draws a mesh to a certain image
WireframeDrawer.drawMesh = function(shape, image, color, size, showBacks, screenDistance)
{
    for(var i=0; i<shape.triangles.length; i++)
    {
        // pass unseen triangles if _showBacks = false
        if (!showBacks && (shape.triangles[i].viewPlane.normal().dot(shape.vertices[shape.triangles[i].vertices[0]].view.neg()) <= 0))
            continue;
		
        // pass shape.triangles[i]s behined the camera
        if (shape.vertices[shape.triangles[i].vertices[0]].screen.z < screenDistance &&
            shape.vertices[shape.triangles[i].vertices[1]].screen.z < screenDistance &&
            shape.vertices[shape.triangles[i].vertices[2]].screen.z < screenDistance)
            continue;
		
        var ctx = image.getContext("2d");
		ctx.strokeStyle = color;
		ctx.lineWidth = size;
		ctx.beginPath();
		ctx.moveTo(shape.vertices[shape.triangles[i].vertices[0]].screen.x, shape.vertices[shape.triangles[i].vertices[0]].screen.y);
		ctx.lineTo(shape.vertices[shape.triangles[i].vertices[1]].screen.x, shape.vertices[shape.triangles[i].vertices[1]].screen.y);
		ctx.moveTo(shape.vertices[shape.triangles[i].vertices[1]].screen.x, shape.vertices[shape.triangles[i].vertices[1]].screen.y);
		ctx.lineTo(shape.vertices[shape.triangles[i].vertices[2]].screen.x, shape.vertices[shape.triangles[i].vertices[2]].screen.y);
		ctx.moveTo(shape.vertices[shape.triangles[i].vertices[2]].screen.x, shape.vertices[shape.triangles[i].vertices[2]].screen.y);
		ctx.lineTo(shape.vertices[shape.triangles[i].vertices[0]].screen.x, shape.vertices[shape.triangles[i].vertices[0]].screen.y);
		ctx.stroke();
    }
}

// Draws lights.
WireframeDrawer.drawLight = function(light, image, screenDistance)
{
    if (light.location.view.z < screenDistance)
        return;
				
    var ctx = image.getContext("2d");
	var color = light.color.rgb();
	ctx.strokeStyle = "rgb("+ color.x +","+ color.y +","+ color.z +")";
	ctx.fillStyle = "rgb("+ color.x +","+ color.y +","+ color.z +")";
	
	ctx.beginPath();
	ctx.arc(light.location.screen.x - 3, light.location.screen.y - 3, 6, 0, 2*Math.PI, false);
	ctx.stroke();
	ctx.fill();
}

// Draws axes.
WireframeDrawer.drawAxes = function(obj, color, image)
{
    this.drawAxez(obj.axes, color, image);
     if (obj instanceof Group)
        for(var i=0; i<obj.internals.length; i++)
            this.drawAxez(obj.internals[i].object.axes, color, image);
}

// Draws axes
WireframeDrawer.drawAxez = function(axes, color, image)
{	
    if (axes[3].screen.z <= 0)
        return;
		
	var ctx = image.getContext("2d");
	ctx.strokeStyle = color;
	ctx.beginPath();
	
	ctx.moveTo(axes[3].screen.x, axes[3].screen.y);
	ctx.lineTo(axes[0].screen.x, axes[0].screen.y);
	ctx.moveTo(axes[3].screen.x, axes[3].screen.y);
	ctx.lineTo(axes[1].screen.x, axes[1].screen.y);
	ctx.moveTo(axes[3].screen.x, axes[3].screen.y);
	ctx.lineTo(axes[2].screen.x, axes[2].screen.y);
	ctx.stroke();

    ctx.font = "12px Arial";
	ctx.fillStyle = "#00ffff";
	ctx.fillText("X", axes[0].screen.x,axes[0].screen.y);
	ctx.fillText("Y", axes[1].screen.x,axes[1].screen.y);
	ctx.fillText("Z", axes[2].screen.x,axes[2].screen.y);
}


