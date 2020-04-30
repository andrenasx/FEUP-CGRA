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

        this.supplyDropping = new MySupplyDropping(this.scene);
        /*this.quad = new MyQuad(this.scene);
        this.initTexture(scene);*/
        this.state = SupplyStates.INACTIVE;
        this.x = 0;
        this.y = 10;
        this.z = 0;

        this.lastUpdate = 0; //Moving per second
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

            this.y -= (10/3)*(elapsedTime/1000);

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
    }

    display(){
        if(this.state == SupplyStates.FALLING){
            this.scene.pushMatrix();
            this.scene.translate(this.x, this.y, this.z);
            this.supplyDropping.display();
            this.scene.popMatrix();
        }
        else if(this.state == SupplyStates.LANDED){
            this.scene.pushMatrix();
            this.scene.translate(this.x, 0.5, this.z);
            this.supplyDropping.display();
            this.scene.popMatrix();
        }
    }
}