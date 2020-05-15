/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;

        this.sphere = new MySphere(this.scene, this.slices, this.stacks);
        this.cockpit = new MyCockpit(this.scene, this.slices, this.stacks);
        this.engine = new MyEngine(this.scene, this.slices, this.stacks);
        this.rudderH = new MyRudder(this.scene);
        this.rudderV = new MyRudder(this.scene);
        this.flag = new MyFlag(this.scene);

        this.angle = 0; // YY
        this.speed = 0;
        this.x = 0; //Position
        this.y = 10;
        this.z = 0;

        this.auto_pilot = false; //Variables for Automatic Pilot
        this.x_center = 0;
        this.z_center = 0;

        this.lastUpdate = 0; //Moving per second

        this.initTexture(scene);
    }

    initTexture(scene){
        this.blimp = new CGFappearance(scene);
        this.blimp.setAmbient(1, 1, 1, 1);
        this.blimp.setDiffuse(0.5, 0.5, 0.5, 1);
        this.blimp.setSpecular(0.3, 0.3, 0.3, 1);
        this.blimp.setShininess(10.0);
        this.blimp.loadTexture('textures/blimp.png');
        this.blimp.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    update(t){
        if (this.lastUpdate==0) this.lastUpdate = t;
        var elapsedTime = (t - this.lastUpdate)/1000.0;
        this.lastUpdate = t;

        if(!this.auto_pilot){
            this.x += (this.speed * Math.sin(this.angle * Math.PI/180))*(elapsedTime);
            this.z += (this.speed * Math.cos(this.angle * Math.PI/180))*(elapsedTime);
            this.engine.rotateProp(this.speed*t);
        }
        else {
            this.x = this.x_center - 5*Math.cos(this.angle * Math.PI / 180);
            this.z = this.z_center + 5*Math.sin(this.angle * Math.PI / 180);
            this.turn(elapsedTime * 360/5);
            this.engine.rotateProp(20);
        }

        this.flag.update(t / 1000 % 1000, this.speed);
    }

    turn(val){
        this.angle += val;
        this.angle %= 360;
        this.rudderV.rotRudder(val*this.speed*0.2);
    }

    accelerate(val){
        this.speed += val;
        if(this.speed<0) this.speed=0;
    }

    reset(){
        this.x = 0;
        this.z = 0;
        this.angle = 0;
        this.speed = 0;
        this.auto_pilot = false;
        this.x_center = 0;
        this.z_center = 0;
        this.lastUpdate = 0;
    }

    autoPilot(){
        this.auto_pilot = true;
        var perpendicularAngle = (this.angle + 90) * Math.PI / 180;
        this.x_center = this.x + 5*Math.sin(perpendicularAngle);
        this.z_center = this.z + 5*Math.cos(perpendicularAngle);
    }

    display(){
        this.scene.setAmbient(1, 1, 1, 1);

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angle*Math.PI/180, 0, 1, 0);

        //Balloon
        this.scene.pushMatrix();
        
        this.blimp.apply();
        this.scene.scale(0.5, 0.5, 1);
        this.scene.rotate(Math.PI/2, 0,1,0);
        this.sphere.display();
        this.scene.popMatrix();

        //Cockpit
        this.scene.pushMatrix();
        this.scene.translate(0, -0.55, -0.3);
        this.cockpit.display();

        //Engines
        this.scene.pushMatrix();
        this.scene.translate(0.15, 0, -0.02);
        this.engine.display();
        this.scene.translate(-0.30,0,0);
        this.engine.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        //Rudders
        this.scene.pushMatrix();

            //Vertical
        this.scene.pushMatrix();
        this.scene.translate(0,0.3,-1);
        this.rudderV.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.3,-1);
        this.rudderV.display();
        this.scene.popMatrix();

            //Horizontal
        this.scene.pushMatrix();
        this.scene.translate(0.3, 0, -1);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.rudderH.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.3, 0, -1);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.rudderH.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        //Flag
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.8);
        this.flag.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    
}