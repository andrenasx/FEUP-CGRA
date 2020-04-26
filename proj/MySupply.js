const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
	constructor(scene) {
        super(scene);

        this.quad = new MyQuad(this.scene);
        this.initTexture(scene);
        this.state = SupplyStates.INACTIVE;
        this.x = 0;
        this.y = 10;
        this.z = 0;
    }

    initTexture(scene){
        this.tex = new CGFappearance(scene);
        this.tex.setAmbient(0.9, 0.9, 0.9, 1);
        this.tex.setDiffuse(0.0, 0.0, 0.0, 1);
        this.tex.setSpecular(0.0, 0.0, 0.0, 1);
        this.tex.setShininess(10.0);
        this.tex.loadTexture('textures/crate0.png');
        this.tex.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    update(t){
        if(this.state == SupplyStates.FALLING){
            if (this.lastUpdate==0) this.lastUpdate = t;
            var elapsedTime = t - this.lastUpdate;
            this.lastUpdate = t;

            this.y -= 0.1/*(10/3)*(elapsedTime/1000)*/;
            console.log(this.y);

            if(this.y <=0.5){
                this.land();
            }
        }
    }

    land(){
        this.y=0.5;
        this.state = SupplyStates.LANDED;
    }
    
    drop(x,z){
        this.state = SupplyStates.FALLING;
        this.x = x;
        this.z = z;

        console.log(this.x);
        console.log(this.z);
    }

    display(){
        if(this.state == SupplyStates.FALLING){
        this.scene.pushMatrix();
        this.tex.apply();
        
        this.scene.translate(this.x, this.y, this.z);

        //Front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
       
        //Back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Right
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Left
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI/2, 0,1,0);
        this.quad.display();
        this.scene.popMatrix();

        //Top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        //Bottom
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        }
    }

    enableNormalViz(){
        this.quad.enableNormalViz()
    }
    disableNormalViz(){
        this.quad.disableNormalViz();
    }
}