////////////////////////////////////////////////////////////////////////////
// A class representing an object insice of a scene.					  //
// A Internal is defined as: { object, transition, rotation }.			  //
////////////////////////////////////////////////////////////////////////////

function Internal(/* object, transformation, scenario | internal */)
{
    this.object;               				  	// an object (a scene or a mesh)
    this.transformation = new Transformation(); // transformation
    //this.activeArea = new ActiveArea();       	// active aeria
		
	// not implemented yet
	//this.scenario = new Scenario();              // scenario

    // Initializes a new instance of the Internal class.
	if(arguments.length > 2 )
    {
        this.object = arguments[0];
        this.transformation = arguments[1];
        //this.scenario = arguments[2];
    }

	if(arguments.length == 1 )
    {
		this.obejct = arguments[0].object;
        this.transformation = arguments[0].transformation;
        //this.scenario = arguments[0].scenario);
    }
}

// Sets active aeria;
Internal.prototype.setActiveAeria = function()
{
    //this.activeAeria = this.object.getActiveAeria();
}

