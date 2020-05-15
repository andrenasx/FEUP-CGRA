/**
 * MySupplyDropping
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupplyDropping extends CGFobject {
	constructor(scene) {
        super(scene);

        this.cube = new MyCubeMapOut(this.scene);
        this.initTexture(scene);
    }

    initTexture(scene){
        this.tex = new CGFappearance(scene);
        this.tex.setAmbient(1, 1, 1, 1);
        this.tex.setDiffuse(0.5, 0.5, 0.5, 1);
        this.tex.setSpecular(0.0, 0.0, 0.0, 1);
        this.tex.setShininess(10.0);
        this.tex.loadTexture('textures/crate.png');
        this.tex.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    display(){
        this.scene.pushMatrix();
        this.tex.apply();
        this.cube.display();
        this.scene.popMatrix();
    }
}