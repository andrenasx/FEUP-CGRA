/**
 * MyBillboard
 * @constructor
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.board = new MyPlane(this.scene, 40);
        this.supports = new MyPlane(this.scene, 30);
        this.progressbar = new MyPlane(this.scene, 30);
		this.initBuffers();
		
	}
	
	display(){
        this.scene.pushMatrix();
        this.scene.translate(0, 5, 0);
        
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.95, -1, 0);
        this.scene.scale(0.1, 1, 0);
        this.supports.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.95, -1, 0);
        this.scene.scale(0.1, 1, 0);
        this.supports.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.3, 0);
        this.scene.scale(1.5, 0.2, 1);
        this.progressbar.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

