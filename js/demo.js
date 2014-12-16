var w = 200;	// width
var h = 200;	// height
var vpd = 500; 	// view plane distance
var showback = false;	// show the back of the objects

// get canvas
var cwf = document.getElementById('wireframe');
cwf.width = w;
cwf.height = h;

// get canvas
var csh = document.getElementById('shaded');
csh.width = w;
csh.height = h;

// create frame buffer
var fbwf = new FrameBuffer(cwf);

// create frame buffer
var fbsh = new FrameBuffer(csh);

// create z-buffer
var zb = new ZBuffer(fbsh);

// create shapes
var cube = PrimitiveGenerator.cube(80);		// cube(side)
var sphere = PrimitiveGenerator.sphere(50); // sphere(radius, parts=36)

// create light source
var orangeLight = new Light(0.5, new Color(1,1,0), new Vector());
var tol = new Transformation();
tol.translation.z = -400;

var cyanLight = new Light(0.5, new Color(0,1,1), new Vector());
var tcl = new Transformation();
tcl.translation.z = 400;

// create a transformation for the cube
var tc = new Transformation()
tc.translation.x = 50;

// create a transformation for the sphere
var ts = new Transformation()
ts.translation.x = -50;
ts.rotation = new Quaternion(Math.PI/2, new Vector(1,0,1));

// create a group
var g = new Group();

// add a shape with it's transfromation
g.add(cube, tc, 0);
g.add(sphere, ts, 0);
g.add(orangeLight, tol, 0);
g.add(cyanLight, tcl, 0);

// set camera
g.viewPoint.translation = new Vector(0, 0, -800);

// get lights
var lights = [orangeLight, cyanLight];

// create a flat shader
var shader = new Shader(vpd, zb, lights);

var roterX = new Transformation();
var roterY = new Transformation();
var roterZ = new Transformation();
roterX.rotation = new Quaternion(Math.PI/15, new Vector(1, 0, 0));
roterY.rotation = new Quaternion(Math.PI/15, new Vector(0, 1, 0));
roterZ.rotation = new Quaternion(Math.PI/15, new Vector(0, 0, 1));

var transformation = new Transformation();

function setNdraw()
{
	// clear the canvas (defaults to black, can be set with fb.bgc = color)
	fbwf.reset();	
	fbsh.reset();
	zb.reset();
	
	// calculate coordinates
	CoordinateConversion.setCoordinates(g, transformation, g.viewPoint, w, h, vpd);

	// draw wireframe
	WireframeDrawer.drawWireframeTo(g, cwf, "#bada55", 1, showback, vpd);
	WireframeDrawer.drawAxes(g, "darkOrange", cwf);

	// shade
	shader.shade(g);
}

setNdraw();


function rotateX()
{
	transformation = roterX.mult(transformation);
	setNdraw();
}

function rotateY()
{
	transformation = roterY.mult(transformation);
	setNdraw();
}

function rotateZ()
{
	transformation = roterZ.mult(transformation);
	setNdraw();
}

