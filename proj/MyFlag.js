
/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
        this.flag1 = new MyPlane(this.scene, 15);
        this.flag2 = new MyPlane(this.scene, 15);
        this.support1 = new MyQuad2S(this.scene);
        this.support2 = new MyQuad2S(this.scene);
        //TODO por shaders

		this.initBuffers();
		}
	
	display(){
        this.scene.pushMatrix();
        this.scene.translate(0,-0.2,0.47);
        this.scene.rotate(80.0*Math.PI/180.0,1,0,0);
        this.scene.rotate(90.0*Math.PI/180.0,0,1,0);
        this.scene.scale(0.025,1,1);
        this.support1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.2,0.47);
        this.scene.rotate(-80.0*Math.PI/180.0,1,0,0);
        this.scene.rotate(90.0*Math.PI/180.0,0,1,0);
        this.scene.scale(0.025,1,1);
        this.support2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 0.6, 1);
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(90*Math.PI/180, 0, 1, 0);
        this.flag1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1, 0.6, 1);
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(-90*Math.PI/180, 0, 1, 0);
        this.flag2.display();
        this.scene.popMatrix();
    }
}

