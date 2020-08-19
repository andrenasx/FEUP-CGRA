/**
* MyEngine
* @constructor
*/
class MyEngine extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;

        this.sphere = new MySphere(this.scene, this.slices, this.stacks);
        this.quad = new MyQuad2S(this.scene);
        this.angle=0;
        this.initTexture(scene);
    }

    initTexture(scene){
        this.white = new CGFappearance(scene);
        this.white.setAmbient(1, 1, 1, 1);
        this.white.setDiffuse(0.5, 0.5, 0.5, 1);
        this.white.setSpecular(0.3, 0.3, 0.3, 1);
        this.white.setShininess(10.0);

        this.red = new CGFappearance(scene);
        this.red.setAmbient(1, 0.1, 0.1, 1);
        this.red.setDiffuse(0.5, 0.2, 0.2, 1);
        this.red.setSpecular(0.3, 0.1, 0.1, 1);
        this.red.setShininess(10.0);
    }

    rotateProp(ang){
        this.angle = ang*Math.PI/180;
    }

    display(){
        this.red.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.05,0.05,0.1);
        this.sphere.display();
        this.scene.popMatrix();

        this.white.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.1);
        this.scene.rotate(this.angle, 0,0,1);
        this.scene.scale(0.015,0.15,0);
        this.quad.display();
        this.scene.popMatrix();
    }
}