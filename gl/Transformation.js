/////////////////////////////////////////////////////////////////////////////////////////////
// A class representing an affine transformation.                                          //
// A transformation is defined as: Point(position) Quaternion(rotation) Point(scaling).    //
/////////////////////////////////////////////////////////////////////////////////////////////

function Transformation(/* translation, rotation, scaling | Transformation */)
{
    this.translation = new Vector();       // position
    this.rotation = new Quaternion();      // rotation
    this.scaling = new Vector(1,1,1);      // scaling 


    // Default constructor
	if(arguments.length == 3)
    {
        this.translation = new Vector(arguments[0]);
        this.rotation = new Quaternion(arguments[1]);
        this.scaling = new Vector(arguments[2]);
    }

    
    // Initializes a new instance of the MOViewPoint class.
    if(arguments.length == 1)
    {
        this.translation = new Vector(arguments[0].translation);
        this.rotation = new Quaternion(arguments[0].rotation);
        this.scaling = new Vector(arguments[0].scaling);
    }
}

// Returns inverse transformation.
Transformation.prototype.inverse = function()
{
    return new Transformation(
        this.rotation.inverse().rotate(this.scaling.reciprocal().scale(this.translation)).neg(), // translation
        this.rotation.inverse(),      // rotation
        this.scaling.reciprocal()      // scaling
    );
}

// Tells if it's a zero trafsformation.
Transformation.prototype.isZero = function()
{
    if (this.translation.equals(new Vector(0, 0, 0)) &&
        this.rotation.zeroAngle &&
        this.scaling.equals(new MOVector(1, 1, 1))
    )
        return true;

    return false;
}

// Returns a string representation of a transformation.
Transformation.prototype.toString = function()
{
    return this.translation.toString() + " " +
        this.rotation.toString() + " " +
        this.scaling.toString();
}

// Transformation additiong.
Transformation.prototype.add = function(transf)
{
    return new Transformation(
        this.translation.add(transf.translation),      // translation
        transf.rotation.mult(this.rotation),            // rotation
        this.scaling.scale(transf.scaling)          // scaling
    );
}

// Composition of two transformations.
Transformation.prototype.mult = function(transf)
{
    return new Transformation(
        this.rotation.rotate(this.scaling.scale(transf.translation)).add(this.translation), // translation
        this.rotation.mult(transf.rotation),        // rotation
        this.scaling.scale(transf.scaling)      // scaling
    );
}


// Applying transformation to a point.
Transformation.prototype.applyTo = function(point)
{   // scale, rotate, translate
	return this.rotation.rotate(this.scaling.scale(point)).add(this.translation);
}

Transformation.prototype.inverseMultiplication = function(point)
{   //  translate, rotate, scale (scale rotate ?)
    return this.rotation.inverse.rotate(this.scaling.reciprocal.scale(point.sub(this.translation)));
}

