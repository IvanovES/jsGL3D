////////////////////////////////////////////////////////////////////////////
// A class representing a triangle.										  //
// A Triangle is defined as : {vertexIndex1, vertexIndex2, vertexIndex3}. //
////////////////////////////////////////////////////////////////////////////

function Triangle(/* index1, index2, index3 [, colour = black, normal = (0,0,0)] | Triangle*/)
{
    this.vertices = [];			// Triangle's vertices' numbers
    this.color = new Color();	// Colour
	this.viewPlane; 			// View plane

    // Default constructor. Initializes a new instance of the Triangle class.
    if(arguments.length >= 3)
        this.vertices = [arguments[0], arguments[1], arguments[2]];

    if(arguments.length >= 4)
        this.color = arguments[3];

    if(arguments.length >= 5)
        this.normal = arguments[4];

	// Copy constructor
	if(arguments.length == 1)
		if(arguments[0] instanceof Triangle)
		{
			this.vertices = [arguments[0].vertices[0], arguments[0].vertices[1], arguments[0].vertices[2]];
			this.color = new Color(arguments[0].color);
			this.viewPlane = new Plane(arguments[0].viewPlane);
		}
}
    
// Returns a string representation of the triangle.
Triangle.prototype.toString = function()
{
    return 
        this.vertices[0].toString() + " " +
        this.vertices[1].toString() + " " +
        this.vertices[2].toString();
}
