/**
 * MyCylinder
 * @constructor
 */
class MyCylinder extends CGFobject {
	constructor(scene, slices) {
		super(scene);
		this.slices = slices;
		this.initBuffers();
		
	}
	
	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
		var angle = 0;
		var beta = 2*Math.PI/this.slices;
		var text = 0;
		var textadded = 1/this.slices;

		for(var i = 0; i <= this.slices; i++){

			var x_ang = Math.cos(angle);
			var z_ang = Math.sin(angle);

			this.vertices.push(x_ang, 0, -z_ang); //Plano XZ 
			this.vertices.push(x_ang, 1, -z_ang); //Y=1

			this.texCoords.push(text, 1);
			this.texCoords.push(text, 0);

			this.normals.push(x_ang, 0, -z_ang, x_ang, 0, -z_ang);

			//formar os triangulos
			if(i != 0){
				this.indices.push((i*2), (i*2+1), (i*2-1));
            	this.indices.push((i*2), (2*i-1), (2*i-2));
			}

			angle += beta;
			text += textadded;

		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}


	updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

