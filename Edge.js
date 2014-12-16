//////////////////////////////////////////////////////////
// A class representing an edge.                 		//
// An edge is defined as {vertexIndex1, vertexIndex2}.  //
//////////////////////////////////////////////////////////

function Edge(/* start, end | Edge  */)
{
    this.start;	// starting point
    this.end;	// ending point       

    // Default constructor.
	if(arguments.length > 1)
    {
        this.start = arguments[0];
        this.end = arguments[1];
    }
	
	// Copy constructor
	if(arguments.length == 1)
	{
		if(arguments[0] instanceof Edge)
		{
			this.start = arguments[0].start;
			this.end = arguments[0].end;
		}
	}
}

// Returns a reversed edge.
Edge.prototype.reverse = function()
{
    return new Edge(this.end, this.start);
}


// Equality method.
Edge.prototype.equals = function(obj)
{
    if (!(obj instanceof Edge))
        return false;

    return ( (this.start == obj.start && this.end == obj.end) || (this.start == obj.reverse().start && this.end == obj.reverse().end) );
}
