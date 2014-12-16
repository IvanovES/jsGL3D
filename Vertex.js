////////////////////////////////////////////////////////////////////////////
// A class representing a vertex of a three dimensional object.           //
////////////////////////////////////////////////////////////////////////////

function Vertex(/* worldCoordinates = new Vector(0, 0, 0) | Vertex */)
{
	this.world = new Vector(); 		// world coordinates
	this.normal = new Vector();		// vertex normal
	
	this.view = new Vector();		// view coordinates
	this.perspective = new Vector();// perspective coordinates
	this.screen = new Vector();		// screen coordinates
	this.triangles = []; 			// triangles
	
	// No arguments passed => Default constructor Vector(0, 0, 0)
	//if(arguments.length == 0) do nothing

	// One argument => either a Vector or another Vertex for a copy constructor
	if(arguments.length == 1)
	{
		if(arguments[0] instanceof Vector)
			this.world = arguments[0];
		else if(arguments[0] instanceof Vertex)
		{
			this.world = new Vector(arguments[0].world);
			this.view = new Vector(arguments[0].view);
			this.perspective = new Vector(arguments[0].perspective);
			this.screen = new Vector(arguments[0].screen);
			this.normal = new Vector(arguments[0].normal);
		}
	}
}
		
// Returns a string representation of the vertex	
Vertex.prototype.toString = function()
{
	return this.world.toString();
}
	
// Swaps two vertices.
Vertex.prototype.swap = function(obj)
{
	if(!(obj instanceof Vertex))
		throw new Error("Parameter passed is not an instance of Vertex.");
		
	var	 temp = new Vertex(obj);
    obj.world = new Vector(this.world);
    obj.view = new Vector(this.view);
    obj.perspective = new Vector(this.perspective);
    obj.screen = new Vector(this.screen);
    obj.normal = new Vector(this.normal);
    this.world = new Vector(temp.world);
    this.view = new Vector(temp.view);
    this.perspective = new Vector(temp.perspective);
    this.screen = new Vector(temp.screen);
    this.normal = new Vector(temp.normal);
}
