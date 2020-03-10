/**
 * MyLaptop
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLaptop extends CGFobject {
	constructor(scene) {
        super(scene);

        this.top = new MyUnitCubeQuad(this.scene);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(1.3, 0.1, 0.9);
        this.top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.5);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.scene.scale(1.3, 0.1, 0.9);
        this.top.display();
        this.scene.popMatrix();
    }
}