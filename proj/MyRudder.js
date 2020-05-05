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
        this.angle = 0;

        this.initTexture(scene);
    }

    initTexture(scene){
        this.rudder = new CGFappearance(scene);
        this.rudder.setAmbient(0.9, 0.9, 0.9, 1);
        this.rudder.setDiffuse(0.0, 0.0, 0.0, 1);
        this.rudder.setSpecular(0.0, 0.0, 0.0, 1);
        this.rudder.setShininess(10.0);
        this.rudder.loadTexture('textures/rudder.png');
        this.rudder.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.white = new CGFappearance(scene);
        this.white.setAmbient(0.9, 0.9, 0.9, 1);
        this.white.setDiffuse(0.0, 0.0, 0.0, 1);
        this.white.setSpecular(0.0, 0.0, 0.0, 1);
        this.white.setShininess(10.0);
    }
    
    rotRudder(ang){
        this.angle = ang;
    }

    
    display(){
        this.scene.pushMatrix();
        this.scene.rotate(-this.angle*Math.PI/180, 1,0,0);
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.6);
        this.scene.scale(0.3, 1, 0.3);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        
        this.rudder.apply();
        this.quad2S.display();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.white.apply();
        this.triangle2S.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}

