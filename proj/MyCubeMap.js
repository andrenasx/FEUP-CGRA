/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene) {
        super(scene);

        this.quad = new MyQuad(this.scene);
        this.initTexture(scene);
    }

    initTexture(scene){
        //From Z=inf
        this.front = new CGFappearance(scene);
        this.front.setAmbient(0.9, 0.9, 0.9, 1);
        this.front.setDiffuse(0.0, 0.0, 0.0, 1);
        this.front.setSpecular(0.0, 0.0, 0.0, 1);
        this.front.setShininess(10.0);
        this.front.loadTexture('images/split_cubemap/front.png');
        this.front.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.left = new CGFappearance(scene);
        this.left.setAmbient(0.9, 0.9, 0.9, 1);
        this.left.setDiffuse(0.0, 0.0, 0.0, 1);
        this.left.setSpecular(0.0, 0.0, 0.0, 1);
        this.left.setShininess(10.0);
        this.left.loadTexture('images/split_cubemap/left.png');
        this.left.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        
        this.right = new CGFappearance(scene);
        this.right.setAmbient(0.9, 0.9, 0.9, 1);
        this.right.setDiffuse(0.0, 0.0, 0.0, 1);
        this.right.setSpecular(0.0, 0.0, 0.0, 1);
        this.right.setShininess(10.0);
        this.right.loadTexture('images/split_cubemap/right.png');
        this.right.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.back = new CGFappearance(scene);
        this.back.setAmbient(0.9, 0.9, 0.9, 1);
        this.back.setDiffuse(0.0, 0.0, 0.0, 1);
        this.back.setSpecular(0.0, 0.0, 0.0, 1);
        this.back.setShininess(10.0);
        this.back.loadTexture('images/split_cubemap/back.png');
        this.back.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.top = new CGFappearance(scene);
        this.top.setAmbient(0.9, 0.9, 0.9, 1);
        this.top.setDiffuse(0.0, 0.0, 0.0, 1);
        this.top.setSpecular(0.0, 0.0, 0.0, 1);
        this.top.setShininess(10.0);
        this.top.loadTexture('images/split_cubemap/top.png');
        this.top.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.bot = new CGFappearance(scene);
        this.bot.setAmbient(0.9, 0.9, 0.9, 1);
        this.bot.setDiffuse(0.0, 0.0, 0.0, 1);
        this.bot.setSpecular(0.0, 0.0, 0.0, 1);
        this.bot.setShininess(10.0);
        this.bot.loadTexture('images/split_cubemap/bottom.png');
        this.bot.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    updateTexture(scene){
        if(scene.landscape == 0){
            this.front.loadTexture('images/split_cubemap/front.png');
            this.left.loadTexture('images/split_cubemap/left.png');
            this.right.loadTexture('images/split_cubemap/right.png');
            this.back.loadTexture('images/split_cubemap/back.png');
            this.top.loadTexture('images/split_cubemap/top.png');
            this.bot.loadTexture('images/split_cubemap/bottom.png');
        }
        else if(scene.landscape == 1) {
            this.front.loadTexture('images/split_cubemap2/front.png');
            this.left.loadTexture('images/split_cubemap2/left.png');
            this.right.loadTexture('images/split_cubemap2/right.png');
            this.back.loadTexture('images/split_cubemap2/back.png');
            this.top.loadTexture('images/split_cubemap2/top.png');
            this.bot.loadTexture('images/split_cubemap2/bottom.png');
        }
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(50,50,50);

        this.front.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.back.apply();        
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        this.left.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        this.right.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        this.top.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        this.bot.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    enableNormalViz(){
        this.quad.enableNormalViz()
    }
    disableNormalViz(){
        this.quad.disableNormalViz();
    }
}