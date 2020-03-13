/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
		0.5, -0.5, 0.5,     //0
		-0.5, -0.5, 0.5,    //1
            -0.5, -0.5, -0.5,	  //2
            0.5, -0.5, -0.5,    //3
            -0.5, 0.5, 0.5,     //4
            0.5, 0.5, 0.5,      //5
            0.5, 0.5, -0.5,     //6
            -0.5, 0.5, -0.5,    //7

            0.5, -0.5, 0.5,     //0
		-0.5, -0.5, 0.5,    //1
            -0.5, -0.5, -0.5,	  //2
            0.5, -0.5, -0.5,    //3
            -0.5, 0.5, 0.5,     //4
            0.5, 0.5, 0.5,      //5
            0.5, 0.5, -0.5,     //6
            -0.5, 0.5, -0.5,    //7

            0.5, -0.5, 0.5,     //0
		-0.5, -0.5, 0.5,    //1
            -0.5, -0.5, -0.5,	  //2
            0.5, -0.5, -0.5,    //3
            -0.5, 0.5, 0.5,     //4
            0.5, 0.5, 0.5,      //5
            0.5, 0.5, -0.5,     //6
            -0.5, 0.5, -0.5,    //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            //Base
            0, 1, 2,
            2, 3, 0,

            //Frente (visto a olhar para o eixo Z)
            0, 4, 1,
            0, 5, 4,

            //Direita
            5, 0, 3,
            6, 5, 3,

            //Trás
            2, 6, 3,
            2, 7, 6,
            
            //Esquerda
            2, 1, 7,
            1, 4, 7,
            
            //Topo
            5, 6, 7,
            7, 4, 5,
            ];
            
            this.normals = [
                  1,0,0,
                  0,0,1,
                  -1,0,0,
                  0,0,-1,
                  0,0,1,
                  1,0,0,
                  0,0,-1,
                  -1,0,0,

                  0,0,1,
                  -1,0,0,
                  0,0,-1,
                  1,0,0,
                  -1,0,0,
                  0,0,1,
                  1,0,0,
                  0,0,-1,

                  0,-1,0,
                  0,-1,0,
                  0,-1,0,
                  0,-1,0,
                  0,1,0,
                  0,1,0,
                  0,1,0,
                  0,1,0,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
      }
      
      updateBuffers(complexity){
		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}