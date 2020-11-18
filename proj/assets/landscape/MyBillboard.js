/**
 * MyBillboard
 * @constructor
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene, 40);
        this.progressShader = new CGFshader(scene.gl, 'shaders/progressbar.vert', 'shaders/progressbar.frag');
        this.dropped = 0;

        this.progressShader.setUniformsValues({ drops: 0 });
        this.initMaterials();
		
    }
    
    initMaterials(){
        this.front = new CGFappearance(this.scene);
        this.front.setAmbient(0.1, 0.1, 0.1, 1);
        this.front.setDiffuse(0.8, 0.8, 0.8, 1);
        this.front.setSpecular(0.3, 0.3, 0.3, 1);
        this.front.setShininess(10.0);
        this.front.loadTexture('textures/billboard.png');
        this.front.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.support = new CGFappearance(this.scene);
        this.support.setAmbient(0.1, 0.1, 0.1, 1);
        this.support.setDiffuse(0.1, 0.1, 0.1, 1);
        this.support.setSpecular(0.1, 0.1, 0.1, 1);
        this.support.setShininess(10.0);
    }

    update() {
        this.progressShader.setUniformsValues({ drops: ++this.dropped});
    }

    reset() {
        this.dropped = 0;
        this.progressShader.setUniformsValues({ drops: 0 });
    }

	display(){
        this.scene.pushMatrix();
        
        this.scene.translate(14.3, 5, -1);
        this.scene.rotate(45*Math.PI/180, 0, 1 ,0);
        
        //Board
        this.front.apply();
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.plane.display();
        this.scene.popMatrix();

        //Back of the board
        this.support.apply();
        this.scene.pushMatrix();
        this.scene.rotate(-180.0*Math.PI/180.0, 0, 1, 0);
        this.scene.scale(2, 1, 1);
        this.plane.display();
        this.scene.popMatrix();

        //Supports for the board
        this.scene.pushMatrix();
        this.scene.translate(-0.95, -1, 0);
        this.scene.scale(0.1, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.95, -1, 0);
        this.scene.scale(0.1, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        //Backs of the supports
        this.scene.pushMatrix();
        this.scene.rotate(-180.0*Math.PI/180.0, 0, 1, 0);
        this.scene.translate(-0.95, -1, 0);
        this.scene.scale(0.1, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-180.0*Math.PI/180.0, 0, 1, 0);
        this.scene.translate(0.95, -1, 0);
        this.scene.scale(0.1, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        //Progress Bar
        this.scene.setActiveShaderSimple(this.progressShader);
        this.scene.pushMatrix();
        this.scene.translate(0, -0.3, 0.01);
        this.scene.scale(1.5, 0.2, 1);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShaderSimple(this.scene.defaultShader);

        this.scene.popMatrix();
    }
}

