/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangleBig extends CGFobject {
	constructor(scene, color) {
		super(scene);
		this.initBuffers(color);
	}
	initBuffers(color) {
		this.vertices = [
			-2, 0, 0,	//0
			2, 0, 0,	//1
            0, 2, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
		];

		if(color == 0){
			this.texCoords = [
				0, 0,
				1, 0,
				0.5, 0.5,
			];
		}
		else{
			this.texCoords = [
				1, 1,
				1, 0,
				0.5, 0.5,
			];
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}