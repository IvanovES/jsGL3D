////////////////////////////////////////////////////////////////////////////
// Flat shader										 				  	  //
////////////////////////////////////////////////////////////////////////////

function Shader(viewPlaneDistance, zBuffer, lights)
{
    // Initializes a new instance of the ShaderFlat class.
    this.vpd = viewPlaneDistance;
    this.zb = zBuffer;
    this.l = lights;
	this.smooth = false;
	
	// Shades a shape.
	this.shadeShape = function(shape)
	{	
		if(!(shape instanceof Shape))
			throw new Error("Parameter 'shape' must be an instance of Shape");
		
		this.smooth = shape.smooth;

		for(var i=0; i<shape.triangles.length; i++)
		{
			var normal = shape.triangles[i].viewPlane.normal().norm();
			if (normal.dot(shape.vertices[shape.triangles[i].vertices[0]].view.neg()) <= 0)
				continue;

			// no cullung imlemented
			if (shape.vertices[shape.triangles[i].vertices[0]].screen.z < this.vpd &&
				shape.vertices[shape.triangles[i].vertices[1]].screen.z < this.vpd &&
				shape.vertices[shape.triangles[i].vertices[2]].screen.z < this.vpd)
				continue;
				
			this.rasterize(shape.triangles[i], shape);
		}
	}
	
	this.rasterize = function(triangle, shape)
	{
		var a = new Vertex(shape.vertices[triangle.vertices[0]]);
		var b = new Vertex(shape.vertices[triangle.vertices[1]]);
		var c = new Vertex(shape.vertices[triangle.vertices[2]]);

		if (a.screen.y > b.screen.y)  
			a.swap(b);

		if (a.screen.y > c.screen.y)  
			a.swap(c);

		if (b.screen.y > c.screen.y)  
			b.swap(c);
		
		if (Math.floor(a.screen.y) == Math.floor(b.screen.y))
		{
			if (Math.floor(a.screen.x) > Math.floor(b.screen.x))    
				a.swap(b);
			
			if(this.smooth)
				this.rasterizeHalfSmooth(a, b, c, triangle.viewPlane, shape.material);
			else
				this.rasterizeHalf(a, b, c, triangle.viewPlane, shape.material);
		}
		else
		{
			if (Math.floor(b.screen.y) == Math.floor(c.screen.y))
			{
				if (Math.floor(b.screen.x) > Math.floor(c.screen.x))    
					b.swap(c);
				
				if(this.smooth)
					this.rasterizeHalfSmooth(b, c, a, triangle.viewPlane, shape.material);
				else
					this.rasterizeHalf(b, c, a, triangle.viewPlane, shape.material);
			}
			else
			{
				var dx = (c.screen.x - a.screen.x) / Math.abs((c.screen.y - a.screen.y));
				var n = b.screen.y - a.screen.y;
				var d = new Vertex();
				d.screen = new Vector(a.screen.x + n * dx, b.screen.y, 0);
				d.view = this.getViewFromScreen(d.screen.x, d.screen.y, triangle.viewPlane);
				d.normal = (a.normal.add((c.normal.sub(a.normal)).mult(n / Math.abs((c.screen.y - a.screen.y))))).norm();
				if (Math.floor(d.screen.x) < Math.floor(b.screen.x))
					b.swap(d);
				
				if(this.smooth)
				{
					this.rasterizeHalfSmooth(b, d, a, triangle.viewPlane, shape.material);
					this.rasterizeHalfSmooth(b, d, c, triangle.viewPlane, shape.material);
				}
				else
				{
					this.rasterizeHalf(b, d, a, triangle.viewPlane, shape.material);
					this.rasterizeHalf(b, d, c, triangle.viewPlane, shape.material);
				}
			}
		}
	}
	
    // flat rasterization
	this.rasterizeHalf = function(a, b, c, plane, mat)
    {
        var dY = Math.floor(c.screen.y) - Math.floor(a.screen.y);
        var deltaY = Math.sign(dY);
        var deltaXLeft = (Math.floor(c.screen.x) - Math.floor(a.screen.x)) / Math.abs(dY);
        var deltaXRight = (Math.floor(c.screen.x) - Math.floor(b.screen.x)) / Math.abs(dY);
        var xLeft = Math.floor(a.screen.x);
        var xRight = Math.floor(b.screen.x);
        var x, y;
        var view;
        var color;
        for (y = Math.floor(a.screen.y); y != Math.floor(c.screen.y); y += deltaY)
        {
            for (x = Math.floor(xLeft); x <= Math.floor(xRight); x++)
            {
                if (x < 0 || y < 0 || x >= this.zb.fb.cvs.width || y >= this.zb.fb.cvs.height)
                    continue;

                view = this.getViewFromScreen(x, y, plane);
                color = this.getColor(view, plane.normal(), mat, this.l);
                this.zb.buffer(new Vector(x, y, view.z), color);
            }
            xLeft += deltaXLeft;
            xRight += deltaXRight;
        }
    }
	
	this.rasterizeHalfSmooth = function(a, b, c, plane, mat)
    {
        var dY = Math.floor(c.screen.y) - Math.floor(a.screen.y); 
		if(dY==0) dY = c.screen.y - a.screen.y;
        var deltaY = Math.sign(dY); 
        var deltaXLeft = (Math.floor(c.screen.x) - Math.floor(a.screen.x)) / Math.abs(dY); 
        var deltaXRight = (Math.floor(c.screen.x) - Math.floor(b.screen.x)) / Math.abs(dY); 
        var xLeft = Math.floor(a.screen.x); 
        var xRight = Math.floor(b.screen.x); 
        var dX = xRight - xLeft;
        var nL = new Vector(a.normal);
        var nR = new Vector(b.normal);
        var dNL = (c.normal.sub(a.normal)).mult(deltaY / dY);
        var dNR = (c.normal.sub(b.normal)).mult(deltaY / dY);
        var x, y;
        var dIP, normal, view;
        var color;

        for (y = Math.floor(a.screen.y); y != Math.floor(c.screen.y); y += deltaY) 
        {
            if (dX == 0)
                continue;
            dIP = nR.sub(nL).mult(1/dX); 
            normal = new Vector(nL); 
            for (x = Math.floor(xLeft); x <= Math.floor(xRight); x++) 
            {
                if (x < 0 || y < 0 || x >= this.zb.fb.cvs.width || y >= this.zb.fb.cvs.height)
                    continue;

                view = this.getViewFromScreen(x, y, plane); 
                color = this.getColor(view, normal, mat, this.l);
                this.zb.buffer(new Vector(x, y, view.z), color);
                normal = normal.add(dIP); 
            }
            xLeft += deltaXLeft; 
            xRight += deltaXRight;
            dX = xRight - xLeft; 
            nL = nL.add(dNL); 
            nR = nR.add(dNR);
        }
    }
	
	
	// Returns the view coordinates of a point calculated back from screen coordinates.
	this.getViewFromScreen = function(x, y, plane)
	{
		var xPersp = (x - this.zb.fb.cvs.width / 2);
		var yPersp = (y - this.zb.fb.cvs.height / 2);
		var zView = -(this.vpd * plane.d / (plane.a * xPersp + plane.b * yPersp + this.vpd * plane.c));
		var xView = xPersp * zView / this.vpd;
		var yView = yPersp * zView / this.vpd;
		return new Vector(xView, yView, zView);
	}
	
	
	// Returns calculeted color for one pixel.
	this.getColor = function(pixelView, normal, material, lights)
	{
		var pixelColor = material.diffuseColor.mult(material.ambientIntensity);
		var view = (pixelView.neg()).norm(), light, refl;
		var f=0.9, cosNL, cosRV, power;
		for(var i=0; i<lights.length; i++)
		{
			light = (lights[i].location.view.sub(pixelView)).norm();
			cosNL = normal.dot(light);
			if (cosNL > 0)
			{
				//f = 300 / (lights[i].location.view.sub(pixelView).length() + 1);
				pixelColor.r += f * lights[i].intensity * lights[i].color.r * material.diffuseColor.r * cosNL;
				pixelColor.g += f * lights[i].intensity * lights[i].color.g * material.diffuseColor.g * cosNL;
				pixelColor.b += f * lights[i].intensity * lights[i].color.b * material.diffuseColor.b * cosNL;
				refl = normal.mult(2 * cosNL).sub(light);
				cosRV = refl.dot(view);
				if (cosRV > 0)
				{
					// edit as you see fit
					power = cosRV * cosRV; 
					power = power * power;
					power = power * power;
					power = power * power;
					power = power * power;
					power = power * power;
					pixelColor.r += f * lights[i].intensity * power * material.shininess * material.specularColor.r * lights[i].color.r;
					pixelColor.g += f * lights[i].intensity * power * material.shininess * material.specularColor.g * lights[i].color.g;
					pixelColor.b += f * lights[i].intensity * power * material.shininess * material.specularColor.b * lights[i].color.b;

				}
			}
		}
		return pixelColor.norm();
	}
	
}

// shades an object
Shader.prototype.shade = function(obj)
{
	if (obj instanceof Group)
        for(var i=0; i<obj.internals.length; i++)
            this.shade(obj.internals[i].object);

	if (obj instanceof Shape)
        this.shadeShape(obj);
}



