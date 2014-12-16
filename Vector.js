////////////////////////////////////////////////////////////////////////////
// A class representing a vector or a point in a three dimensional space. //
// A Vector is defined as: (x, y, z).                                     //
////////////////////////////////////////////////////////////////////////////

function Vector(/* x=0, y=0, z=0 | Vector */)
{
	// Initialize
	this.x = 0;
	this.y = 0;
	this.z = 0;
	
	// No arguments passed => Default constructor (0, 0, 0)
	//if(arguments.length == 0)
		// do nothing
		
	// One argument => either (x, 0, 0) or a Vector for a copy constructor
	if(arguments.length == 1)
	{	
		// (x, 0, 0)
		if( !isNaN(arguments[0]) )
			this.x = +arguments[0];
		
		// Copy constructor
		if(arguments[0] instanceof Vector)
		{
			this.x = arguments[0].x;
			this.y = arguments[0].y;
			this.z = arguments[0].z;
		}
	}	
	// Two arguments => (x, y, 0)
	else if(arguments.length == 2)
	{
		this.x = isNaN(arguments[0]) ? 0 : +arguments[0];
		this.y = isNaN(arguments[1]) ? 0 : +arguments[1];
	}
	// Three arguments or more => (x, y, z)
	else if(arguments.length > 2)
	{
		this.x = isNaN(arguments[0]) ? 0 : +arguments[0];
		this.y = isNaN(arguments[1]) ? 0 : +arguments[1];
		this.z = isNaN(arguments[2]) ? 0 : +arguments[2];
	}

}
	
// Length
Vector.prototype.length = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}

// Returns a new vector whose components are the reciprocals of the components of the original vector.
// Used for scaling
Vector.prototype.reciprocal = function()
{
    return new Vector(1 / this.x, 1 / this.y, 1 / this.z);
}

// Equality operator
Vector.prototype.equals = function(obj)
{
    if (!(obj instanceof Vector))  // if object is not a Vector return false
        return false;
	
    return (this.x == obj.x && this.y == obj.y && this.z == obj.z);
}

// Addition operator
Vector.prototype.add = function(obj)
{
    if(!(obj instanceof Vector))
		throw new Error("Parameter passed is not an instance of Vector.");

	return new Vector(this.x + obj.x, this.y + obj.y, this.z + obj.z);
}

// Subtraction operator
Vector.prototype.sub = function(obj)
{
    if(!(obj instanceof Vector))
		throw new Error("Parameter passed is not an instance of Vector.");
		
	return	new Vector(this.x - obj.x, this.y - obj.y, this.z - obj.z);
}

// Negation operator
Vector.prototype.neg = function()
{
    return new Vector(-this.x, -this.y, -this.z);
}

// Scalar (dot) product of two vectors.
Vector.prototype.dot = function(obj)
{
	if(!(obj instanceof Vector))
		throw new Error("Parameter passed is not an instance of Vector.");
		
	return this.x * obj.x + this.y * obj.y + this.z * obj.z;
}

// Vector (cross) product of two vectors.
Vector.prototype.cross = function(obj)
{
	if(!(obj instanceof Vector))
		throw new Error("Parameter passed is not an instance of Vector.");
	
    return new Vector(
        this.y * obj.z - this.z * obj.y,    // x
        this.z * obj.x - this.x * obj.z,    // y
        this.x * obj.y - this.y * obj.x     // z
    );
}

// Multiplication by a scalar
Vector.prototype.mult = function(obj)
{
	if(isNaN(obj))
		throw new Error("Parameter must be a number");
		
	return new Vector(obj*this.x, obj*this.y, obj*this.z);
}

// Using vector's coordinates as a scaling coefficients for scaling another vector.
Vector.prototype.scale = function(obj)
{
	if(!(obj instanceof Vector))
		throw new Error("Parameter passed is not an instance of Vector.");
		
    return new Vector(
        this.x * obj.x,   // x
        this.y * obj.y,   // y
        this.z * obj.z    // z
    );
}
	
// Returns a directional (unit) vector.
Vector.prototype.norm = function()
{
    var len = this.length();
    return new Vector(
        this.x / len,  // x
        this.y / len,  // y
        this.z / len   // z
    );
}

// Returns the distance between two points (the length of the difference of two vectors).
Vector.prototype.distance = function(obj)
{
	if(!(obj instanceof Vector))
		throw new Error("Parameter passed is not an instance of Vector.");
	
    return this.sub(obj).length();
}

// Swaps two vectors.
Vector.prototype.swap = function(obj)
{
    if(!(obj instanceof Vector))
		throw new Error("Parameter passed is not an instance of Vector.");
		
	var temp = new Vector(obj);
    obj.x = this.x;
    obj.y = this.y;
    obj.z = this.z;
    this.x = temp.x;
    this.y = temp.y;
    this.z = temp.z;
}

Vector.prototype.toString = function()
{
	return this.x + " " + this.y + " " + this.z;
}

