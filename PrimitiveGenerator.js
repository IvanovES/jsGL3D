////////////////////////////////////////////////////////////////////////////
// Primitive generator							         				  //
////////////////////////////////////////////////////////////////////////////

function PrimitiveGenerator()
{
}

// Gerenerates a cube.
PrimitiveGenerator.cube = function(side)
{
    if(isNaN(side))
		throw new Error("Parameter passed is not a number.");
	var cube = new Shape();
    var sideHalf = side / 2;
    cube.addTriangle(new Triangle(0, 1, 2));
    cube.addTriangle(new Triangle(0, 2, 3));
    cube.addTriangle(new Triangle(1, 5, 6));
    cube.addTriangle(new Triangle(1, 6, 2));
    cube.addTriangle(new Triangle(5, 7, 6));
    cube.addTriangle(new Triangle(5, 4, 7));
    cube.addTriangle(new Triangle(4, 0, 7));
    cube.addTriangle(new Triangle(7, 0, 3));
    cube.addTriangle(new Triangle(2, 6, 7));
    cube.addTriangle(new Triangle(2, 7, 3));
    cube.addTriangle(new Triangle(0, 4, 1));
    cube.addTriangle(new Triangle(1, 4, 5));
    cube.addVertex(new Vertex(new Vector(sideHalf, -sideHalf, -sideHalf)));
    cube.addVertex(new Vertex(new Vector(sideHalf, sideHalf, -sideHalf)));
    cube.addVertex(new Vertex(new Vector(sideHalf, sideHalf, sideHalf)));
    cube.addVertex(new Vertex(new Vector(sideHalf, -sideHalf, sideHalf)));
    cube.addVertex(new Vertex(new Vector(-sideHalf, -sideHalf, -sideHalf)));
    cube.addVertex(new Vertex(new Vector(-sideHalf, sideHalf, -sideHalf)));
    cube.addVertex(new Vertex(new Vector(-sideHalf, sideHalf, sideHalf)));
    cube.addVertex(new Vertex(new Vector(-sideHalf, -sideHalf, sideHalf)));
    cube.addVertexTriangles();
    return cube;
}


// Generates a sphere.
PrimitiveGenerator.sphere = function(radius, parts)
{
	if(isNaN(radius))
		throw new Error("Parameter passed is not a number.");
    var sphere = new Shape();
	var k = (Number(parts)===parts && parts%1===0) ? parts : 36;
    var fi = 0, dFi = 2 * Math.PI / k, teta = 0, dTeta = 2 * Math.PI / k;
    var x, y, z, r;
    sphere.addVertex(new Vertex(new Vector(0, 0, -radius)));
    sphere.addVertex(new Vertex(new Vector(0, 0, radius)));
    teta += dTeta;
    r = radius * Math.sin(teta);
    z = -radius * Math.cos(teta);
    sphere.addVertex(new Vertex(new Vector(r, 0, z)));
    for (var i = 0; i < k - 1; i++)
    {
        fi += dFi;
        x = r * Math.cos(fi);
        y = r * Math.sin(fi);
        sphere.addVertex(new Vertex(new Vector(x, y, z)));
        sphere.addTriangle(new Triangle(0, i + 3, i + 2));
    }
    sphere.addTriangle(new Triangle(0, 2, k + 1));
    for (var i = 1; i < k / 2 - 1; i++)
    {
        fi = 0;
        teta += dTeta;
        r = radius * Math.sin(teta);
        z = -radius * Math.cos(teta);
        sphere.addVertex(new Vertex(new Vector(r, 0, z)));
        for (var j = 1; j <= k - 1; j++)
        {
            fi += dFi;
            x = r * Math.cos(fi);
            y = r * Math.sin(fi);
            sphere.addVertex(new Vertex(new Vector(x, y, z)));
            sphere.addTriangle(new Triangle(
                1 + (i - 1) * k + j,
                1 + i * k + j + 1,
                1 + i * k + j
            ));
            sphere.addTriangle(new Triangle(
                1 + (i - 1) * k + j,
                1 + (i - 1) * k + j + 1,
				1 + i * k + j + 1
            ));
        }
        sphere.addTriangle(new Triangle(1 + i * k, 2 + i * k, 1 + (i + 1) * k));
        sphere.addTriangle(new Triangle(1 + i * k, 2 + (i - 1) * k, 2 + i * k));
    }
    for (var i = 1; i < k; i++)
        sphere.addTriangle(new Triangle(1 + (k / 2 - 2) * k + i, 2 + (k / 2 - 2) * k + i, 1));

    sphere.addTriangle(new Triangle(1 + (k / 2 - 1) * k, 2 + (k / 2 - 2) * k, 1));
    sphere.addVertexTriangles();
    sphere.smooth = true;
    return sphere;
}

// Generates a cone.
PrimitiveGenerator.cone = function(baseRadius, height, parts)
{
	if(isNaN(baseRadius) || isNaN(height))
		throw new Error("Parameter passed is not a number.");
    var cone = new Shape();
	var k = (Number(parts)===parts && parts%1===0) ? parts : 36;
    var fi = 0, dFi = Math.PI / k, x, y;
    cone.addVertex(new Vertex(new Vector(0, 0, 0)));
    cone.addVertex(new Vertex(new Vector(0, 0, height)));
    cone.addVertex(new Vertex(new Vector(baseRadius, 0, 0)));
    for (var i = 3; i <= 2 * k + 1; i++)
    {
         fi += dFi;
        x = Math.cos(fi) * baseRadius;
        y = Math.sin(fi) * baseRadius;
        cone.addVertex(new Vertex(new Vector(x, y, 0)));
        cone.addTriangle(new Triangle(0, i, i - 1));
        cone.addTriangle(new Triangle(1, i - 1, i));
    }
    cone.addTriangle(new Triangle(0, 2, 2 * k + 1));
    cone.addTriangle(new Triangle(1, 2 * k + 1, 2));
    cone.addVertexTriangles();
    return cone;
}

// Generates a cylinder.
// This one must be redone
PrimitiveGenerator.cylinder = function(topRadius, bottomRadius, height, parts)
{
	if(isNaN(topRadius) || isNaN(bottomRadius) || isNaN(height))
		throw new Error("Parameter passed is not a number.");
    var cylinder = new Shape();
	var k = (Number(parts)===parts && parts%1===0) ? parts : 36;
    var fi = 0, dFi = Math.PI / k, xTop, yTop, xBot, yBot, hightHalf = height / 2;
    var  doubI;
    cylinder.addVertex(new Vertex(new Vector(0, 0, hightHalf)));
    cylinder.addVertex(new Vertex(new Vector(0, 0, -hightHalf)));
    cylinder.addVertex(new Vertex(new Vector(topRadius, 0, hightHalf)));
    cylinder.addVertex(new Vertex(new Vector(bottomRadius, 0, -hightHalf)));
    for (var i = 2; i <= 2 * k; i++)
    {
        doubI = 2 * i;
        fi += dFi;
        xTop = Math.cos(fi) * topRadius;
        yTop = Math.sin(fi) * topRadius;
        xBot = Math.cos(fi) * bottomRadius;
        yBot = Math.sin(fi) * bottomRadius;
        cylinder.addVertex(new Vertex(new Vector(xTop, yTop, hightHalf)));
        cylinder.addVertex(new Vertex(new Vector(xBot, yBot, -hightHalf)));
        cylinder.addTriangle(new Triangle(0, doubI - 2, doubI));
        cylinder.addTriangle(new Triangle(1, doubI + 1, doubI - 1));
        cylinder.addTriangle(new Triangle(doubI - 2, doubI - 1, doubI));
        cylinder.addTriangle(new Triangle(doubI - 1, doubI + 1, doubI));
    }
    cylinder.addTriangle(new Triangle(0, 4 * k, 2));
    cylinder.addTriangle(new Triangle(1, 3, 4 * k + 1));
    cylinder.addTriangle(new Triangle(4 * k, 4 * k + 1, 2));
    cylinder.addTriangle(new Triangle(4 * k + 1, 3, 2));
    cylinder.addVertexTriangles();
    return cylinder;
}

// Generates a disc.
PrimitiveGenerator.disc = function(radius, parts)
{
	if(isNaN(radius))
		throw new Error("Parameter passed is not a number.");
    var disc = new Shape();
	var k = (Number(parts)===parts && parts%1===0) ? parts : 36;
    var fi = 0, dFi = Math.PI / k, x, y;
    disc.addVertex(new Vertex(new Vector(0, 0, 0)));
    disc.addVertex(new Vertex(new Vector(radius, 0, 0)));
    for (var i = 2; i <= 2 * k; i++)
    {
        fi += dFi;
        x = Math.cos(fi) * radius;
        y = Math.sin(fi) * radius;
        disc.addVertex(new Vertex(new Vector(x, y, 0)));
        disc.addTriangle(new Triangle(0, i, i - 1));
        disc.addTriangle(new Triangle(0, i - 1, i));
    }
    disc.addTriangle(new Triangle(0, 1, 2 * k));
    disc.addTriangle(new Triangle(0, 2 * k, 1));
    disc.addVertexTriangles();
    return disc;
}



