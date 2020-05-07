/**
* MyCockpit
* @constructor
*/
class MyCockpit extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;

        this.sphere = new MySphere(this.scene, this.slices, this.stacks);
        this.cylinder = new MyCylinder(this.scene, this.slices);
        this.initTexture(scene);
    }

    initTexture(scene){
        this.white = new CGFappearance(scene);
        this.white.setAmbient(1, 1, 1, 1);
        this.white.setDiffuse(0.0, 0.0, 0.0, 1);
        this.white.setSpecular(0.0, 0.0, 0.0, 1);
        this.white.setShininess(10.0);
    }

    display(){
        this.white.apply();
        
        //Main
        this.scene.pushMatrix();
        this.scene.scale(0.1,0.1,0.6);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.cylinder.display();
        this.scene.popMatrix();

        //End
        this.scene.pushMatrix();
        this.scene.scale(0.1,0.1,0.1);
        this.sphere.display();
        this.scene.popMatrix();

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.6);
        this.scene.scale(0.1,0.1,0.1);
        this.sphere.display();
        this.scene.popMatrix();
    }
}
