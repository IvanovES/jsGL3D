////////////////////////////////////////////////////////////////////////////
// A class representing a point light source.							  //
// A light source is defined as { color , intensity }.					  //
////////////////////////////////////////////////////////////////////////////

function Light(/* intensity, color, location | Light */)	// location is a vertex
{
    this.intensity = 1;       		 // intensity
    this.color = new Color(1,1,1);   // color
    this.location = new Vertex();    // location
	this.axes = []; 				 // axes
	this.viewPoint = new Transformation(); // viewPoint
	Light.count++;
	this.name = "Light"+Light.count;
	this.vpd = 500;
	
	// Copy constructor
	if(arguments.length == 1)
	{
		this.intensity = arguments[0].intesity;
		this.color = new Color(arguments[0].color);
		this.viewPoint = new Transformation(arguments[0].viewPoint);
	}
	
	if(arguments.length > 2)
	{
		this.intesity = arguments[0];
		this.color = arguments[1];
		this.location = new Vertex(arguments[2]);
	}
	
	this.initializeAxes();
}

// Initializes axes.
Light.prototype.initializeAxes = function()
{
    var k = 100; // change as see fit
    this.axes = [];
    this.axes[0] = new Vertex(new Vector(k, 0, 0));
    this.axes[1] = new Vertex(new Vector(0, k, 0));
    this.axes[2] = new Vertex(new Vector(0, 0, k));
    this.axes[3] = new Vertex(new Vector(0, 0, 0));
}
		
Light.count = 0;
//Light.prototype = AObject;
//Light.constructor = Light;

// Returns active aeria.
Light.prototype.getActiveAeria = function()
{
    var radius = 0;
    var length = 0;
	for(var i=0; i<this.axes.length; i++)
    {
        length = new Vector(this.axes[i].screen.x - this.axes[3].screen.x, this.axes[i].screen.y - this.axes[3].screen.y, 0).length();
        
		if (length > radius)
            radius = length;
    }
    return new ActiveArea(this.axes[3].screen, radius);
}


// Does nothing.
Light.prototype.setTrianglePlanes = function() { }

// Does nothing.
Light.prototype.setVerticesNormals = function() { }

// Returns a string representation of the mesh.
Light.prototype.toString = function()
{
    return "Light: " + this.Name;
}

// Returns this light.
Light.prototype.getLights = function()
{
    return [this];
}

