/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
        super(scene);

        this.quad = new MyQuad(this.scene);
        this.initTexture(scene);
    }

    initTexture(scene){
        this.top = new CGFappearance(this.scene);
        this.top.setAmbient(0.1, 0.1, 0.1, 1);
        this.top.setDiffuse(0.9, 0.9, 0.9, 1);
        this.top.setSpecular(0.1, 0.1, 0.1, 1);
        this.top.setShininess(10.0);
        this.top.loadTexture('images/mineTop.png');
        this.top.setTextureWrap('REPEAT', 'REPEAT');

        this.side = new CGFappearance(this.scene);
        this.side.setAmbient(0.1, 0.1, 0.1, 1);
        this.side.setDiffuse(0.9, 0.9, 0.9, 1);
        this.side.setSpecular(0.1, 0.1, 0.1, 1);
        this.side.setShininess(10.0);
        this.side.loadTexture('images/mineSide.png');
        this.side.setTextureWrap('REPEAT', 'REPEAT');

        this.bot = new CGFappearance(this.scene);
        this.bot.setAmbient(0.1, 0.1, 0.1, 1);
        this.bot.setDiffuse(0.9, 0.9, 0.9, 1);
        this.bot.setSpecular(0.1, 0.1, 0.1, 1);
        this.bot.setShininess(10.0);
        this.bot.loadTexture('images/mineBottom.png');
        this.bot.setTextureWrap('REPEAT', 'REPEAT');
    }

    display(){

        this.side.apply(); //for all sides
        if (this.scene.nfilter)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        //Face frontal
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        //Tras        
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Esquerda
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Direita
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Cima
        this.top.apply();
        if (this.scene.nfilter)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        //Baixo
        this.bot.apply();
        if (this.scene.nfilter)
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        else
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.quad.display();
        this.scene.popMatrix();
    }
}