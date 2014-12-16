/////////////////////////////////////////////////////////////////////////////////////////////
// A class representing a mesh/geometry. An object made out of triangles.				   //
// A Shape is defined as a collection of Vertices and Triangles.						   //
/////////////////////////////////////////////////////////////////////////////////////////////

function Shape(/* null | shape */)
{
    this.vertices = [];  				// A list of vertices
    this.triangles = [];       			// A list of triangles
    this.edges = [];               		// A list of edges
    this.material = new Material();		// Material
    this.smooth = false; 				// shader
	Shape.count++;
	this.name = "Shape"+Shape.count;	// name
	this.viewPoint = new Transformation();	// view point
	this.axes = [];						// axes
	this.vpd = 500;
	
	this.initializeAxes();
	
    // Not a copy constructor
    if(arguments.length == 1 )
	{
        this.vertices = arguments[0].vertices;
		this.triangles = aruguments[0].triangles;
		this.edges = aruments[0].edges;
		this.material = aruments[0].material;
		this.smooth = aruments[0].smooth;
	}
}

Shape.count = 0;

Shape.prototype.initializeAxes = function()
{
    var k = 100; // change as see fit

    this.axes = [];
    this.axes[0] = new Vertex(new Vector(k, 0, 0));
    this.axes[1] = new Vertex(new Vector(0, k, 0));
    this.axes[2] = new Vertex(new Vector(0, 0, k));
    this.axes[3] = new Vertex(new Vector(0, 0, 0));
}

// Adds a vertex to vertices.
Shape.prototype.addVertex = function(vert)
{
    //verifications
    if (!(vert instanceof Vertex))
        throw new Error("Parameter must be an instance of Vertex.");

    //addition
    this.vertices.push(vert);
    return 0;
}

// Adds a triangle to triangles.
Shape.prototype.addTriangle = function(tri)
{
    //verifications
    if (!(tri instanceof Triangle))
        throw new Error("Parameter must be an instance of Triangle.");

    if (tri.vertices[0] < 0 ||
        tri.vertices[1] < 0 ||
        tri.vertices[2] < 0)
		throw new Error("Vertex index must be possitive.");
	
    if (tri.vertices[0] == tri.vertices[1] ||
        tri.vertices[0] == tri.vertices[2] ||
        tri.vertices[1] == tri.vertices[2])
    throw new Error("Not a triangle.");
 
            //addition
    this.triangles.push(tri);
    this.addTriangleEdges(tri);
    return 0;
}


// Adds a triangle to its vertices.
Shape.prototype.addVertexTriangles = function()
{
    for(var i=0; i<this.triangles.length; i++)
    {
        this.vertices[this.triangles[i].vertices[0]].triangles.push(i);
        this.vertices[this.triangles[i].vertices[1]].triangles.push(i);
        this.vertices[this.triangles[i].vertices[2]].triangles.push(i);
    }
}

// Adds edge(s).
Shape.prototype.addTriangleEdges = function(tri)
{
    var trEdge1 = new Edge(tri.vertices[0], tri.vertices[1]);
	var trEdge2 = new Edge(tri.vertices[1], tri.vertices[2]);
	var trEdge3 = new Edge(tri.vertices[2], tri.vertices[1]);
	var f1, f2, f3;
	f1 = f2 = f3 = false;
    for( var i=0; i<this.edges.length; i++)
	{
		if(this.edges[i].equals(trEdge1))
			f1 = true;
		if(this.edges[i].equals(trEdge2))
			f2 = true;
		if(this.edges[i].equals(trEdge3))
			f3 = true;
	}
	if(!f1)	this.edges.push(trEdge1);
	if(!f2)	this.edges.push(trEdge2);
	if(!f3)	this.edges.push(trEdge3);
}

// Returns a string representation of the mesh.
Shape.prototype.toString = function()
{
    return this.name;
}

// Sets triangles' planes.
Shape.prototype.setTrianglePlanes = function()
{
    for( var i=0; i<this.triangles.length; i++)
    {
        this.triangles[i].viewPlane = new Plane(
            this.vertices[this.triangles[i].vertices[0]].view,
            this.vertices[this.triangles[i].vertices[1]].view,
            this.vertices[this.triangles[i].vertices[2]].view
        );
    }
}

// Sets vertices' normals.
Shape.prototype.setVerticesNormals = function()
{
    var addedNormals;
	var flag;
    for( var i=0; i<this.vertices.length; i++)
    {
        this.vertices[i].normal = new Vector();
        addedNormals = [];
        for (var j=0; j< this.vertices[i].triangles.length; j++)
        {
			flag = false;
            for( var k = 0; k<addedNormals.length; k++)
			{
				if (addedNormals[k].sub(this.triangles[this.vertices[i].triangles[j]].viewPlane.normal()).length() < 0.001)
					flag = true;
			}	
			
			if (!flag)
			{
				addedNormals.push(this.triangles[this.vertices[i].triangles[j]].viewPlane.normal());
				this.vertices[i].normal = this.vertices[i].normal.add(this.triangles[this.vertices[i].triangles[j]].viewPlane.normal());
			}
        }
        this.vertices[i].normal = this.vertices[i].normal.norm();
    }
}

// Returns active aeria.
Shape.prototype.getActiveAeria = function()
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

// Returns an empty list.
Shape.prototype.getLights = function()
{
    return [];
}
