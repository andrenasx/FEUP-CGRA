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
        this.rudder.setAmbient(1, 1, 1, 1);
        this.rudder.setDiffuse(0.5, 0.5, 0.5, 1);
        this.rudder.setSpecular(0.3, 0.3, 0.3, 1);
        this.rudder.setShininess(10.0);
        this.rudder.loadTexture('textures/rudder.png');
        this.rudder.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.white = new CGFappearance(scene);
        this.white.setAmbient(1, 1, 1, 1);
        this.white.setDiffuse(0.5, 0.5, 0.5, 1);
        this.white.setSpecular(0.2, 0.2, 0.2, 1);
        this.white.setShininess(10.0);
    }
    
    rotRudder(ang){
        this.angle = ang;
    }

    
    display(){
        this.scene.pushMatrix();
        this.scene.rotate(-this.angle*Math.PI/180, 0,1,0);
        this.scene.rotate(Math.PI/2, 0,1,0)
        this.scene.scale(0.3, 0.3, 1);

        this.scene.pushMatrix();
        this.rudder.apply();
        this.quad2S.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.white.apply();
        this.triangle2S.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

