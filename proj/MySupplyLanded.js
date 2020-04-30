/**
 * MySupplyLanded
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupplyLanded extends CGFobject {
	constructor(scene) {
        super(scene);

        this.quad = new MyQuad(this.scene);
        this.cube = new MyCubeMapOut(this.scene);
        this.initTexture(scene);
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
        this.cube.display();
        this.tex.apply();
        this.scene.translate(0,-0.49,0);
        this.scene.rotate(-Math.PI/2, 1,0,0);

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