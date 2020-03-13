/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

		this.diamond = new MyDiamond(this.scene);
		this.triangle = new MyTriangle(this.scene);
		this.parallelogram = new MyParallelogram(this.scene);
		this.triangleSmallRed = new MyTriangleSmall(this.scene);
		this.triangleSmallPurple = new MyTriangleSmall(this.scene);
		this.triangleBigBlue = new MyTriangleBig(this.scene);
		this.triangleBigOrange = new MyTriangleBig(this.scene);
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
        this.scene.setDiffuse(0, 1, 0, 1);
		this.diamond.display();
        this.scene.popMatrix();
        

        //Triangulo Medio Rosa
        this.scene.pushMatrix();
        this.scene.translate(2.84,0,0);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.setDiffuse(1, 0.6078, 0.8118, 1);
        this.triangle.display();
        this.scene.popMatrix();


        //Paralelograma Amarelo
        this.scene.pushMatrix();
        this.scene.scale(-1,1,1);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.scene.setDiffuse(1, 1, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();


        //Triangulo Pequeno Vermelho
        this.scene.pushMatrix();
        this.scene.translate(-0.71, -0.7, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.setDiffuse(1, 0, 0, 1);
        this.triangleSmallRed.display();
        this.scene.popMatrix();


        //Triangulo Pequeno Roxo
        this.scene.pushMatrix();
        this.scene.translate(0.7, 0.71, 0);
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.setDiffuse(0.6, 0.2, 0.6, 1);
        this.triangleSmallPurple.display();
        this.scene.popMatrix();


        //Triangulo Grande Azul
        this.scene.pushMatrix();
        this.scene.translate(-2.84, 0, 0);
        this.scene.rotate(-3*Math.PI/4, 0, 0, 1);
        this.scene.setDiffuse(0, 0.75, 1, 1);
        this.triangleBigBlue.display();
        this.scene.popMatrix();


        //Triangulo Grande Laranja
        this.scene.pushMatrix();
        this.scene.translate(4.26, 0, 0);
        this.scene.rotate(3*Math.PI/4, 0, 0, 1);
        this.scene.setDiffuse(1, 0.561, 0, 1);
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
}