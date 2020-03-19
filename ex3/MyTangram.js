/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
        super(scene);
        this.initMaterials(scene);

		this.diamond = new MyDiamond(this.scene);
		this.triangle = new MyTriangle(this.scene);
		this.parallelogram = new MyParallelogram(this.scene);
		this.triangleSmallRed = new MyTriangleSmall(this.scene);
		this.triangleSmallPurple = new MyTriangleSmall(this.scene);
		this.triangleBigBlue = new MyTriangleBig(this.scene);
		this.triangleBigOrange = new MyTriangleBig(this.scene);
    }
    
    initMaterials(scene) {
        this.green = new CGFappearance(scene);
        this.green.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.green.setDiffuse(0, 1, 0, 1);
        this.green.setSpecular(1, 1, 1, 1);
        this.green.setShininess(10.0);

        this.pink = new CGFappearance(scene);
        this.pink.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.pink.setDiffuse(1, 0.6078, 0.8118, 1);
        this.pink.setSpecular(1, 1, 1, 1);
        this.pink.setShininess(10.0);

        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.yellow.setDiffuse(1, 1, 0, 1);
        this.yellow.setSpecular(1, 1, 1, 1);
        this.yellow.setShininess(10.0);

        this.red = new CGFappearance(scene);
        this.red.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.red.setDiffuse(1, 0, 0, 1);
        this.red.setSpecular(1, 1, 1, 1);
        this.red.setShininess(10.0);

        this.purple = new CGFappearance(scene);
        this.purple.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.purple.setDiffuse(0.6, 0.2, 0.6, 1);
        this.purple.setSpecular(1, 1, 1, 1);
        this.purple.setShininess(10.0);
        
        this.blue = new CGFappearance(scene);
        this.blue.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.blue.setDiffuse(0, 0.75, 1, 1);
        this.blue.setSpecular(1, 1, 1, 1);
        this.blue.setShininess(10.0);

        this.orange = new CGFappearance(scene);
        this.orange.setAmbient(0.2, 0.2, 0.2, 1.0);
        this.orange.setDiffuse(1, 0.561, 0, 1);
        this.orange.setSpecular(1, 1, 1, 1);
        this.orange.setShininess(10.0);
    }

	display() {
		//Quadrado Verde
        var tra = [1, 0, 0, 0,
                    0, 1 ,0, 0,
                    0, 0, 1, 0,
                    -1, 0, 0 ,1];

        var rot = [Math.cos(-Math.PI/4), Math.sin(-Math.PI/4), 0, 0,
                    -Math.sin(-Math.PI/4), Math.cos(-Math.PI/4), 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1];
		
		this.scene.pushMatrix();
        this.scene.multMatrix(rot);
        this.scene.multMatrix(tra);
        //this.green.apply();
		this.diamond.display();
        this.scene.popMatrix();
        

        //Triangulo Medio Rosa
        this.scene.pushMatrix();
        this.scene.translate(2.84,0,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.pink.apply();
        this.triangle.display();
        this.scene.popMatrix();


        //Paralelograma Amarelo
        this.scene.pushMatrix();
        this.scene.scale(-1,1,1);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();


        //Triangulo Pequeno Vermelho
        this.scene.pushMatrix();
        this.scene.translate(-0.71, -0.7, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.red.apply();
        this.triangleSmallRed.display();
        this.scene.popMatrix();


        //Triangulo Pequeno Roxo
        this.scene.pushMatrix();
        this.scene.translate(0.7, 0.71, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.purple.apply();
        this.triangleSmallPurple.display();
        this.scene.popMatrix();


        //Triangulo Grande Azul
        this.scene.pushMatrix();
        this.scene.translate(-2.84, 0, 0);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.blue.apply();
        this.triangleBigBlue.display();
        this.scene.popMatrix();


        //Triangulo Grande Laranja
        this.scene.pushMatrix();
        this.scene.translate(4.26, 0, 0);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.orange.apply();
        this.triangleBigOrange.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
		this.triangle.enableNormalViz();
		this.parallelogram.enableNormalViz();
		this.triangleSmallRed.enableNormalViz();
        this.triangleSmallPurple.enableNormalViz();
        this.triangleBigBlue.enableNormalViz();
        this.triangleBigOrange.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
		this.triangle.disableNormalViz();
		this.parallelogram.disableNormalViz();
        this.triangleSmallRed.disableNormalViz();
        this.triangleSmallPurple.disableNormalViz();
        this.triangleBigBlue.disableNormalViz();
        this.triangleBigOrange.disableNormalViz();
    }

    updateBuffers(complexity){
		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}