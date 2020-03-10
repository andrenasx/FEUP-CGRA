/**
 * MyChair
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyChair extends CGFobject {
	constructor(scene) {
        super(scene);

        this.leg = new MyChairLeg(this.scene);
        this.top = new MyUnitCubeQuad(this.scene);
    }

    display(){
        //Legs
        this.scene.pushMatrix();
        this.leg.display();
        this.scene.translate(1.2, 0, 0);
        this.leg.display();
        this.scene.translate(0, 0, 1);
        this.leg.display();
        this.scene.translate(-1.2, 0, 0);
        this.leg.display();
        this.scene.popMatrix();

        //Seat
        this.scene.pushMatrix();
        this.scene.translate(0.7, 1.05, 0.6);
        this.scene.scale(1.4, 0.15, 1.2);
        this.top.display();
        this.scene.popMatrix();

        //Back
        this.scene.pushMatrix();
        this.scene.translate(0.7, 1.6, 1.15);
        this.scene.scale(1.35, 1.2, 0.15)
        this.top.display();
        this.scene.popMatrix();
    }
}