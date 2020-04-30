/**
 * MyBillboard
 * @constructor
 */
class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.board = new MyPlane(this.scene, 40);
        this.back = new MyPlane(this.scene, 40);
        this.supports = new MyPlane(this.scene, 30);
        this.progressbar = new MyPlane(this.scene, 30);
        
        this.progressShader = new CGFshader(scene.gl, 'shaders/progressbar.vert', 'shaders/progressbar.frag');
        this.dropped = 0;

        this.progressShader.setUniformsValues({ drops: 0 });
        this.initMaterials();
		
    }
    
    initMaterials(){
        this.front = new CGFappearance(this.scene);
        this.front.setAmbient(0.1, 0.1, 0.1, 1);
        this.front.setDiffuse(0.5, 0.5, 0.5, 1);
        this.front.setSpecular(0.1, 0.1, 0.1, 1);
        this.front.setShininess(10.0);

        this.support = new CGFappearance(this.scene);
        this.support.setAmbient(0.1, 0.1, 0.1, 1);
        this.support.setDiffuse(0.1, 0.1, 0.1, 1);
        this.support.setSpecular(0.1, 0.1, 0.1, 1);
        this.support.setShininess(10.0);
    }

    updateBillboard() {
        this.progressShader.setUniformsValues({ drops: ++this.dropped});
    }

    resetBillboard() {
        this.dropped = 0;
        this.progressShader.setUniformsValues({ drops: 0 });
    }

	display(){
        this.scene.pushMatrix();
        this.scene.translate(5,8,5);
        this.scene.rotate(45*Math.PI/180.0, 0, 1, 0);
        
        this.front.apply();
        this.scene.pushMatrix();
        this.scene.scale(2, 1, 1);
        this.board.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-180.0*Math.PI/180.0, 0, 1, 0);
        this.scene.scale(2, 1, 1);
        this.back.display();
        this.scene.popMatrix();

        this.support.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.95, -1, 0);
        this.scene.scale(0.1, 1, 0);
        this.supports.display();
        this.scene.popMatrix();

        this.support.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.95, -1, 0);
        this.scene.scale(0.1, 1, 0);
        this.supports.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.progressShader);
        this.scene.pushMatrix();
        this.scene.translate(0, -0.3, 0);
        this.scene.scale(1.5, 0.2, 1);
        this.progressbar.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
    }
}

