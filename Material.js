////////////////////////////////////////////////////////////////////////////
// A class representing material's properties.							  //
////////////////////////////////////////////////////////////////////////////

function Material()
{
    this.ambientIntensity = 0.2;   					// ambient intensity
    this.diffuseColor = new Color(0.8, 0.8, 0.8); 	// diffuse color
    // this.emissiveColor;     						// emissive color - not implemented
    this.specularColor = new Color(1, 1, 1);     	// specular color
    this.shininess = 1;          				 	// shininess
    // this.transparency;        					// transparency - not implemented
}
