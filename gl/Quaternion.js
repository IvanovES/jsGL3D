////////////////////////////////////////////////////////////////////////////
// A class representation of a quaternion.								  //
// A quaternion is defined as (double, Point) = ( scalar , vector ).	  //
////////////////////////////////////////////////////////////////////////////

function Quaternion(/* scalar, x, y, z | angle, axis | scalar, vector, int | quaternion*/)
{
    this.scalarPart = 1;                // the real part
    this.vectorPart = new Vector();		// the imaginary part
    this.zeroAngle = true;              // if zero angle rotation

    // Constructor. Initializes a new instance of the Quaternion class.
	if(arguments.length == 4)
    {
        if (arguments[0] != 1)
        {
            this.scalarPart = arguments[0];
            this.vectorPart = new Vector(arguments[1], arguments[2], arguments[3]);
            this.zeroAngle = false;
        }
    }

    // Constructor. Initializes a new instance of the Quaternion class.
    // Construcs a unit quaternion used for rotation.
	if(arguments.length == 2)
    {
        var angleHalf = (arguments[0] % (2 * Math.PI)) / 2;       // (angle mod 2Pi) / 2
        if (angleHalf != 0)
        {
            this.scalarPart = Math.cos(angleHalf);
            this.vectorPart = (arguments[1].norm()).mult(Math.sin(angleHalf));
            this.zeroAngle = false;
        }
    }

    // Constructor. Initializes a new instance of the Quaternion class.
	// Third parameter is a dummie. 
    if(arguments.length == 3)
    {
        if (arguments[1].length() != 0 && arguments[0] != 1)
        {
            this.scalarPart = arguments[0];
            this.vectorPart = new Vector(arguments[1]);
            //this.norm();
            this.zeroAngle = false;
        }
    }

	// Copy Constructor.
	if(arguments.length == 1)
    {
        this.scalarPart = arguments[0].scalarPart;
        this.vectorPart = new Vector(arguments[0].vectorPart);
        this.zeroAngle = arguments[0].zeroAngle;
    }
}


// Returns the norm/length of the quaternion.
Quaternion.prototype.length = function()
{
    return Math.sqrt(
        this.scalarPart * this.scalarPart +
        this.vectorPart.x * this.vectorPart.x +
        this.vectorPart.y * this.vectorPart.y +
        this.vectorPart.z * this.vectorPart.z
        );
}

// Returns inverse rotation quaternion.
Quaternion.prototype.inverse = function()
{
    if (this.zeroAngle)
        return new Quaternion();
		
    return new Quaternion(this.scalarPart, this.vectorPart.neg(), 0);
}

// Returns a unit quaternion.
Quaternion.prototype.norm = function()
{
    var length = this.length();
    return new Quaternion(
        this.scalarPart / length,
        this.vectorPart.x / length,
        this.vectorPart.y / length,
        this.vectorPart.z / length
    );
}

// Quaternion sum operator.
Quaternion.prototype.add = function(quat)
{
	if(!(quat instanceof Quaternion))
		throw new Error("Parameter must be an instance of Quaternion.");
		
    return new Quaternion(this.scalarPart + quat.scalarPart, this.vectorPart.add(quat.vectorPart));
}

// Quaternion subtraction operator.
Quaternion.prototype.sub = function(quat)
{
	if(!(quat instanceof Quaternion))
		throw new Error("Parameter must be an instance of Quaternion.");
		
    return new Quaternion(this.scalarPart - quat.scalarPart, this.vectorPart.sub(quat.vectorPart));
}

// Equality operator.
Quaternion.prototype.equals = function(quat)
{
	if(!(quat instanceof Quaternion))
		return false;

    if ((this.scalarPart == quat.ScalarPart) && (this.vectorPart.equals(quat.vectorPart)))
        return true;

    return false;
}

// Multiplication operator.
Quaternion.prototype.mult = function(quat)
{
    if(!(quat instanceof Quaternion))
		throw new Error("Parameter must be an instance of Quaternion.");
	
	return new Quaternion(
        (this.scalarPart * quat.scalarPart) - this.vectorPart.dot(quat.vectorPart),
        quat.vectorPart.mult(this.scalarPart).add(this.vectorPart.mult(quat.scalarPart)).add(this.vectorPart.cross(quat.vectorPart)),
        0
    ).norm();
}

// Multiplication operator defining a rotation of a point.
Quaternion.prototype.rotate = function(point)
{
	if(!(point instanceof Vector))
		throw new Error("Parameter must be an instance of Vector.");
		
    return point.add(this.vectorPart.cross(this.vectorPart.cross(point).add(point.mult(this.scalarPart))).mult(2));
}

// Returns a string representation of a quaternion.
Quaternion.prototype.toString = function()
{
    var angleHalf = Math.acos(this.scalarPart);
    if (this.zeroAngle)
        return "zero angle";                   // zero angle

    return ((this.vectorPart.mult((1 / Math.sin(angleHalf)))).toString() + " " + (2 * angleHalf).toString()).replace(",", ".");
}

