////////////////////////////////////////////////////////////////////////////
// A class representing a scene - collection of scenes and meshes.		  //
// A MOScene in defined as a collection of internals.  					  //
////////////////////////////////////////////////////////////////////////////

function Group(/* null | group */)
{
    this.internals = [];             				  // a list of internal objects
	this.transformationMarker = new Transformation();  // transformation marker
	this.axes = [];
	Group.count++;
	this.name = "Group"+Group.count;
	this.viewPoint = new Transformation();
	this.vpd = 500;
	
	this.initializeAxes();
    
	// not available yet
	//this.scenarioMarker = new Scenario();              // scenario marker
	
	if(arguments.length == 1 )
	{
		this.internals = arguments[0].internals;
		this.transformationMarker = arguments[0].transformationMarker;
		this.axes = arguments[0].axes;
		this.name = arguments[0].name;
		this.viewPoint = arguments[0].viewPoint;
		this.vpd = arguments[0].vpd;
	}
}

Group.count = 0;

Group.prototype.initializeAxes = function()
{
    var k = 100; // change as see fit

    this.axes = [];
    this.axes[0] = new Vertex(new Vector(k, 0, 0));
    this.axes[1] = new Vertex(new Vector(0, k, 0));
    this.axes[2] = new Vertex(new Vector(0, 0, k));
    this.axes[3] = new Vertex(new Vector(0, 0, 0));
}	

// Returns a string representation of the scene.
Group.prototype.toString = function()
{
    return this.name;
}

// Set triangles' planes.
Group.prototype.setTrianglePlanes = function()
{
    for( var i=0; i<this.internals.length; i++)
        this.internals[i].object.setTrianglePlanes();
}

// Sets vertice's normals.
Group.prototype.setVerticesNormals = function()
{
    for( var i=0; i<this.internals.length; i++)
        this.internals[i].object.setVerticesNormals();
}

// Returns active aeria.
Group.prototype.getActiveAeria = function()
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

// Returns all lights.
Group.prototype.getLights = function()
{
    var lights = [];
    for(var i=0; i< this.internals.length; i++)
        lights = lights.concat(this.internals[i].object.getLights());

    return lights;
}

// Add an object
Group.prototype.add = function(obj, transformation, scenario)
{
	this.internals.push(new Internal(obj, transformation, scenario));
}

