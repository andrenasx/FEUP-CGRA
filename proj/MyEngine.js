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
    }

    rotateProp(ang){
        this.angle = ang*Math.PI/180;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.05,0.05,0.1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.1);
        this.scene.rotate(this.angle, 0,0,1);
        this.scene.scale(0.015,0.15,0);
        this.quad.display();
        this.scene.popMatrix();
    }
}