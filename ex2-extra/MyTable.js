/**
 * MyTable
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTable extends CGFobject {
	constructor(scene) {
        super(scene);

        this.leg = new MyTableLeg(this.scene);
        this.top = new MyUnitCubeQuad(this.scene);
    }

    display(){
        //Legs
        this.scene.pushMatrix();
        this.scene.translate(0.1, 0, 0.1);
        this.leg.display();
        this.scene.translate(3, 0, 0);
        this.leg.display();
        this.scene.translate(0, 0, 1.5);
        this.leg.display();
        this.scene.translate(-3, 0, 0);
        this.leg.display();
        this.scene.popMatrix();

        //Top
        this.scene.pushMatrix();
        this.scene.translate(1.6, 1.65, 0.85);
        this.scene.scale(3.5, 0.3, 2);
        this.top.display();
        this.scene.popMatrix();
    }
}