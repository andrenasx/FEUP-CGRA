/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyRoom extends CGFobject {
	constructor(scene) {
        super(scene);

        this.room = new MyQuad(this.scene);
    }

    display(){
        //Parede traseira
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.scale(15, 5, 0);
        this.room.display();
        this.scene.popMatrix();

        //Parede frontal
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 10);
        this.scene.scale(15, 5, 0);
        this.scene.rotate(Math.PI, 0,1,0);
        this.room.display();
        this.scene.popMatrix();

        //Esquerda
        this.scene.pushMatrix();
        this.scene.translate(-7.5, 0, 5);
        this.scene.scale(0, 5, 10);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.room.display();
        this.scene.popMatrix();

        //Direita
        this.scene.pushMatrix();
        this.scene.translate(7.5, 0, 5);
        this.scene.scale(0, 5, 10);
        this.scene.rotate(-Math.PI/2, 0,1,0);
        this.room.display();
        this.scene.popMatrix();
        
        //Chão
        this.scene.pushMatrix();
        this.scene.translate(0, -2.5, 5);
        this.scene.scale(15, 0, 10);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.room.display();
        this.scene.popMatrix();
    }
}