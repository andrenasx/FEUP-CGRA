/**
 * MyTableLeg
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTableLeg extends CGFobject {
	constructor(scene) {
        super(scene);

        this.leg = new MyUnitCubeQuad(this.scene);
    }
    
    display(){
        this.scene.pushMatrix();
        this.scene.translate(0, 0.75, 0);   
        this.scene.scale(0.2, 1.5, 0.2);
        this.leg.display();
        this.scene.popMatrix();
    }
}