/**
 * MySupplyLanded
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupplyLanded extends CGFobject {
	constructor(scene) {
        super(scene);

        this.quad = new MyQuad(this.scene);
        this.sphere = new MySphere(this.scene, 16, 8);
        this.initTexture(scene);
    }

    initTexture(scene){
        this.tex = new CGFappearance(scene);
        this.tex.setAmbient(0.9, 0.9, 0.9, 1);
        this.tex.setDiffuse(0.0, 0.0, 0.0, 1);
        this.tex.setSpecular(0.0, 0.0, 0.0, 1);
        this.tex.setShininess(10.0);
        this.tex.loadTexture('textures/crate.png');
        this.tex.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.surp = new CGFappearance(scene);
        this.surp.setAmbient(0.9, 0.9, 0.9, 1);
        this.surp.setDiffuse(0.0, 0.0, 0.0, 1);
        this.surp.setSpecular(0.0, 0.0, 0.0, 1);
        this.surp.setShininess(10.0);
        this.surp.loadTexture('textures/supply.jpg');
        this.surp.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    display(){
        this.scene.pushMatrix();

        this.scene.pushMatrix();
        this.surp.apply();
        this.scene.scale(0.5,0.5,0.5);
        this.scene.rotate(Math.PI, 0,1,0);
        this.sphere.display();
        this.scene.popMatrix();

        this.tex.apply();
        this.scene.translate(0,-0.49,0);
        this.scene.rotate(-Math.PI/2, 1,0,0);

        //Center
        this.quad.display();

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0,-1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Back
        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.translate(1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.scene.translate(-1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}