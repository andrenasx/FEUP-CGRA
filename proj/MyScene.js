/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cube = new MyCubeMap(this);
        this.vehicle = new MyVehicle(this, 20, 10);
        this.terrain = new MyTerrain(this);

        this.landscape = 1;
        this.landscapeList = {
            'Default':0,
            'Mountain':1
        }

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displayObject = false;
        this.displayCubeMap = true;
        this.displayTerrain = true;
        this.speedFactor = 1; //default value
        this.scaleFactor = 1;

        this.autoPilotCooldown = 0;

        //Supplies
        this.nSuppliesDelivered = 0;
        this.supplies = [];
        for (var i=0; i<5; i++){
            this.supplies.push(new MySupply(this));
        }
        this.suppliesCooldown = 0;
        this.billboard = new MyBillboard(this);

        //Material
        this.material=new CGFappearance(this);
        this.material.setAmbient(0.1,0.1,0.1,1);
        this.material.setDiffuse(0.9,0.9,0.9,1);
        this.material.setDiffuse(0.2,0.2,0.2,1);
        this.material.setShininess(10);
    }
    initLights() {
        this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(35, 30, 35), vec3.fromValues(0, 5, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    updateLandscape(){
        this.cube.updateTexture(this);
        this.terrain.updateTexture(this);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.vehicle.update(t);
        for (var i=0 ; i<5; i++){
            this.supplies[i].update(t);
        }
        if(this.suppliesCooldown>0) this.suppliesCooldown--;
        if(this.autoPilotCooldown>0) this.autoPilotCooldown--;
    }
    checkKeys(){
        var keysPressed = false;

        // Check for key codes e.g. in https://keycode.info/

        if (this.gui.isKeyPressed("KeyW")){
            if(!this.vehicle.auto_pilot)    this.vehicle.accelerate(this.speedFactor);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyS")){
            if(!this.vehicle.auto_pilot)    this.vehicle.accelerate(-this.speedFactor);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyA")){
            if(!this.vehicle.auto_pilot)    this.vehicle.turn(3);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyD")){
            if(!this.vehicle.auto_pilot)    this.vehicle.turn(-3);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyR")){
            this.vehicle.reset();
            this.nSuppliesDelivered=0;
            for (var i=0 ; i<5; i++){
                this.supplies[i].state = SupplyStates.INACTIVE;
                this.supplies[i].y=10;
                this.supplies[i].lastUpdate=0;
            }
            this.suppliesCooldown = 10;
            this.billboard.reset();
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyP") && this.autoPilotCooldown==0){
            this.vehicle.toggleAutoPilot();
            this.autoPilotCooldown=3;
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyL") && this.suppliesCooldown==0 && this.nSuppliesDelivered<5){
            this.supplies[this.nSuppliesDelivered].drop(this.vehicle.x, this.vehicle.z);
            this.nSuppliesDelivered+=1;
            this.suppliesCooldown=10;
            keysPressed=true;
        }

        if(!keysPressed && !this.vehicle.auto_pilot) this.vehicle.turn(0);
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();
        this.lights[0].update();

        // ---- BEGIN Primitive drawing section

        if(this.displayCubeMap){
            this.cube.display();
        }
        
        if(this.displayTerrain){
            this.terrain.display();
        }
        
        //Show vehicle
        this.pushMatrix();
        this.translate(this.vehicle.x, this.vehicle.y, this.vehicle.z);
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.translate(-this.vehicle.x, -this.vehicle.y, -this.vehicle.z);
        this.vehicle.display();
        this.popMatrix();

        //Show supplies
        for (var i=0 ; i<5; i++){
            this.supplies[i].display();
        }

        this.billboard.display();

        // ---- END Primitive drawing section
        this.setActiveShaderSimple(this.defaultShader);
    }
}