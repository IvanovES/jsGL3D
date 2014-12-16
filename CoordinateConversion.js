///////////////////////////////////////////////////////////////////////////////////////////////
// A class used for calculating the coordinates of a vertex in different coordinate systems. //
///////////////////////////////////////////////////////////////////////////////////////////////

function CoordinateConversion()
{
}


// Returns a view point.
CoordinateConversion.getView = function(wPoint, transformation, viewPoint)
{
	return viewPoint.rotation.rotate(transformation.applyTo(wPoint).sub(viewPoint.translation));
}

// Returns the perspective of a point
CoordinateConversion.getPerspective = function(vPoint, screenDistance)
{
    return new Vector(
        screenDistance * vPoint.x / vPoint.z,   // x
        screenDistance * vPoint.y / vPoint.z,   // y
        vPoint.z                                // z
    );
}

// Returns the screen coords of a point
CoordinateConversion.getScreen = function(pPoint, width, height)
{
    return new Vector(
        pPoint.x + width / 2,     // x
        pPoint.y + height / 2,    // y
        pPoint.z                  // z
    );
}

// Sets object's coordinates.
CoordinateConversion.setCoordinates = function(obj, transformation, viewPoint, width, height, screenDistance)
{
	var i;
    if (obj instanceof Shape)
	{
        for(i=0; i<obj.vertices.length; i++)
        {
            obj.vertices[i].view = this.getView(obj.vertices[i].world, transformation, viewPoint);
            obj.vertices[i].perspective = this.getPerspective(obj.vertices[i].view, screenDistance);
            obj.vertices[i].screen = this.getScreen(obj.vertices[i].perspective, width, height);
        }
		obj.setTrianglePlanes();
		if(obj.smooth)
			obj.setVerticesNormals();
	}

    if (obj instanceof Light)
    {
        obj.location.view = this.getView(obj.location.world, transformation, viewPoint);
        obj.location.perspective = this.getPerspective(obj.location.view, screenDistance);
        obj.location.screen = this.getScreen(obj.location.perspective, width, height);
    }
	
    if (obj instanceof Group)
    {
        for(i=0; i<obj.internals.length; i++)
        {
            this.setCoordinates(obj.internals[i].object, transformation.mult(obj.internals[i].transformation), viewPoint, width, height, screenDistance);
        }
    }
	
    for(i=0; i<obj.axes.length; i++)
    {
        obj.axes[i].view = this.getView(obj.axes[i].world, transformation, viewPoint);
        obj.axes[i].perspective = this.getPerspective(obj.axes[i].view, screenDistance);
        obj.axes[i].screen = this.getScreen(obj.axes[i].perspective, width, height);
    }
}
