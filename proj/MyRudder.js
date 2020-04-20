/**
 * MyRudder
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyRudder extends CGFobject {
	constructor(scene) {
        super(scene);
        this.quad2S = new MyQuad2S(this.scene);
        this.triangle2S = new MyTriangle2S(this.scene);
        this.quad2S.initBuffers();
        this.triangle2S.initBuffers();
		
	}
    
    display(){
        this.scene.setDiffuse(0,0,1);
        this.scene.setSpecular(0, 0, 0, 1);
        this.scene.setAmbient(0, 0, 0, 1);

        this.scene.pushMatrix();
        this.quad2S.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.triangle2S.display();
        this.scene.popMatrix();


        
    }
}

