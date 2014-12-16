////////////////////////////////////////////////////////////////////////////
// A class representing a plane. 										  //
// A Plane is difened as: {a, b, c, d}; Ax + By + Cz + D = 0.			  //
////////////////////////////////////////////////////////////////////////////

function Plane(/* a, b, c, d | point1, point2, point3 | normal, point | Plane*/) // point = Vector
{
	this.a = 0;           // a
    this.b = 0;           // b
    this.c = 0;           // c
    this.d = 0;           // d
	
	// Copy constructor
	if(arguments.length == 1)
	{
	    this.a = arguments[0].a;
        this.b = arguments[0].b;
        this.c = arguments[0].c;
        this.d = arguments[0].d;
	}
	
	// normal vector, point definition
	if(arguments.length == 2)
	{
	    var normal = new Vector(arguments[0].norm());
        this.a = normal.x;
        this.b = normal.y;
        this.c = normal.z;
        this.d = -(this.a * arguments[1].x + this.b * arguments[1].y + this.c * arguments[1].z);
	}
	
	// three points definition
	if(arguments.length == 3)
	{
		var p1 = arguments[0], p2 = arguments[1], p3 = arguments[2];
	    this.a = (p1.y * (p2.z - p3.z) + p2.y * (p3.z - p1.z) + p3.y * (p1.z - p2.z));
        this.b = (p1.z * (p2.x - p3.x) + p2.z * (p3.x - p1.x) + p3.z * (p1.x - p2.x));
        this.c = (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y));
        this.d = -(p1.x * (p2.y * p3.z - p3.y * p2.z) + p2.x * (p3.y * p1.z - p1.y * p3.z) + p3.x * (p1.y * p2.z - p2.y * p1.z));
	}
	
	// a, b, c, d plane definition
	if(arguments.length == 4)
	{
		this.a = isNaN(arguments[0]) ? 0 : arguments[0];
		this.b = isNaN(arguments[1]) ? 0 : arguments[1];
		this.c = isNaN(arguments[2]) ? 0 : arguments[2];
		this.d = isNaN(arguments[3]) ? 0 : arguments[3];
	}
}

// Returns the normal vector to the plane.
Plane.prototype.normal = function()
{
    return (new Vector(this.a,this.b,this.c)).norm();
}

// Returns a string representation of the plane: "a b c d".
Plane.prototype.toString = function()
{
    return this.a + " " + this.b + " " + this.c + " " + this.d;
}

// Equality operator.
Plane.prototype.equals = function(plane)
{
	if(!(plane instanceof Plane))
		return false;
		
    if ((this.normal.sub(plane.normal).length < 0.0001) && (this.d == plane.d))
        return true;

    return false;
}


// Rounds A,B,C,D to get rid of the last bit error.
Plane.prototype.roundCoefficients = function()
{
    this.a = Math.round(this.a * 10000)/10000;
    this.b = Math.round(this.b * 10000)/10000;
    this.c = Math.round(this.c * 10000)/10000;
    this.d = Math.round(this.d * 10000)/10000;
}

