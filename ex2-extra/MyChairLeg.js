/**
 * MyChairLeg
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyChairLeg extends CGFobject {
	constructor(scene) {
        super(scene);

        this.leg = new MyUnitCubeQuad(this.scene);
    }
    
    display(){
        this.scene.pushMatrix();
        this.scene.translate(0.1, 0.5, 0.1);   
        this.scene.scale(0.15, 1, 0.15);
        this.leg.display();
        this.scene.popMatrix();
    }
}