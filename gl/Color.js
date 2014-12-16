////////////////////////////////////////////////////////////////////////////
// A class representing a colour.										  //
// A colour is defined as: {red, green, blue}.                            //
// RGB values vary [0:1]                                                  //
// Set fromRGB = true to convert from RGB values [0,255]                  //
////////////////////////////////////////////////////////////////////////////

function Color(/* r=0, g=0, b=0 | Color [, fromRGB=false ] */)
{
	// Initialize
	this.r = 0;
	this.g = 0;
	this.b = 0;
	// No arguments passed => Default constructor (0, 0, 0)
	// if(arguments.length == 0)
		// do nothing
		
	// One (two) argument(s) => copy constructor
	if(arguments.length == 1 || arguments.length == 2)
	{
		if(arguments[0] instanceof Color)
		{
			this.r = arguments[0].r;
			this.g = arguments[0].g;
			this.b = arguments[0].b;
		}
	}

	// Three arguments or more => (r, g, b)
	else if(arguments.length > 2)
	{
		this.r = isNaN(arguments[0]) ? 0 : +arguments[0];
		this.g = isNaN(arguments[1]) ? 0 : +arguments[1];
		this.b = isNaN(arguments[2]) ? 0 : +arguments[2];
	}

	if( (arguments.length == 2 && arguments[1]) || (arguments.length >= 4 && arguments[3]) )
	{
		this.r /= 255.0;
		this.g /= 255.0;
		this.b /= 255.0;
	}
	
	this.norm();
}
	
// Equality operator
Color.prototype.equals = function(obj)
{
    if (!(obj instanceof Color))  // if object is not a Color return false
        false;
		
    return (this.r == obj.r && this.g == obj.g && this.b == obj.b);
}

// Addition operator
Color.prototype.add = function(obj)
{
    if(!(obj instanceof Color))
		throw new Error("Parameter passed is not an instance of Color.");
			
	return new Color(this.r + obj.r, this.g + obj.g, this.b + obj.b).norm();
}
	
// Subtraction operator
Color.prototype.sub = function(obj)
{
    if(!(obj instanceof Color))
		throw new Error("Parameter passed is not an instance of Color.");
			
	return	new Color(this.r - obj.r, this.g - obj.g, this.b - obj.b).norm();
}

// Using vector's coordinates as a scaling coefficients for scaling.
Color.prototype.scale = function(obj)
{
	if(!(obj instanceof Vector))
		throw new Error("Parameter passed is not an instance of Vector.");
			
    return new Color(
        this.r * obj.x,   // r
        this.g * obj.y,   // g
        this.b * obj.z    // b
    ).norm();
}

Color.prototype.mult = function(obj)
{
	if(isNaN(obj))
		throw new Erro("Parameter must be a number");
	
	return new Color(
        this.r * obj,   // r
        this.g * obj,   // g
        this.b * obj    // b
    ).norm();
}
	
// Normalizes the color
Color.prototype.norm = function()
{
    if (this.r > 1) this.r = 1;
    if (this.g > 1) this.g = 1;
    if (this.b > 1) this.b = 1;
    if (this.r < 0) this.r = 0;
    if (this.g < 0) this.g = 0;
    if (this.b < 0) this.b = 0;
    return this;
}
	
// Return a vector representing a colour in RGB
Color.prototype.rgb = function()
{
	return new Vector(Math.round(255*this.r), Math.round(255*this.g), Math.round(255*this.b));
}

// Returns a string representation of the vector as: "r g b";
Color.prototype.toString = function()
{
    return this.r + " " + this.g + " " + this.b;
}
