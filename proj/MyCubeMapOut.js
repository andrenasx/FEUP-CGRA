/**
 * MyCubeMapOut
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMapOut extends CGFobject {
	constructor(scene) {
        super(scene);

        this.quad = new MyQuad(this.scene);
        //this.initTexture(scene);
    }

    initTexture(scene){
        this.tex = new CGFappearance(scene);
        this.tex.setAmbient(0.9, 0.9, 0.9, 1);
        this.tex.setDiffuse(0.0, 0.0, 0.0, 1);
        this.tex.setSpecular(0.0, 0.0, 0.0, 1);
        this.tex.setShininess(10.0);
        this.tex.loadTexture('textures/crate0.png');
        this.tex.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    display(){
        this.scene.pushMatrix();

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
       
        //Back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        //Bottom
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}