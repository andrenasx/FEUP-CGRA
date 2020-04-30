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
        this.vehicle = new MyVehicle(this, 16, 8);
        this.terrain = new MyTerrain(this);
        this.objects=[
            this.cylinder = new MyCylinder(this, 6),
            this.sphere = new MySphere(this, 16, 8),
            this.cube = new MyCubeMap(this)
        ]
        //this.billboard = new MyBillboard(this);
        this.objectsList={
            'Sphere':0,
            'Cylinder':1,
            'CubeMap':2
        }

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayNormals = false;
        this.displayObject = true;
        this.currentObject = 2;
        //this.displayCubeMap = true;
        this.displayVehicle = true;
        this.displayTerrain = true;
        this.speedFactor = 1; //default value
        this.scaleFactor = 1;

        //Supplies
        this.nSuppliesDelivered = 0;
        this.supplies = [];
        for (var i=0; i<5; i++){
            this.supplies.push(new MySupply(this));
        }
        this.billboard = new MyBillboard(this);
        //Material
        this.material=new CGFappearance(this);
        this.material.setAmbient(0.1,0.1,0.1,1);
        this.material.setDiffuse(0.9,0.9,0.9,1);
        this.material.setDiffuse(0.2,0.2,0.2,1);
        this.material.setShininess(10);
        this.material.loadTexture('images/earth.jpg');
        this.material.setTextureWrap('REPEAT','REPEAT');

        //Texture
        this.earth = new CGFtexture(this, 'images/earth.jpg');
        this.material.setTexture(this.earth);

        this.nemo = new CGFtexture(this, 'textures/nemogroovy.jpg');
        this.material.setTexture(this.nemo);
    }
    initLights() {
        this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(40, 30, 40), vec3.fromValues(0, 5, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    updateObject(){
        this.objects[this.currentObject];
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
        this.vehicle.update(t);
        for (var i=0 ; i<5; i++){
            this.supplies[i].update(t);
        }
    }
    checkKeys(){
        var keysPressed = false;

        // Check for key codes e.g. in https://keycode.info/

        if (this.gui.isKeyPressed("KeyW")){
            this.vehicle.accelerate(this.speedFactor);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyS")){
            this.vehicle.accelerate(-this.speedFactor);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyA")){
            this.vehicle.turn(10);
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyD")){
            this.vehicle.turn(-10);
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
            this.billboard.resetBillboard();
            keysPressed = true;
        }
        if (this.gui.isKeyPressed("KeyP")){
            this.vehicle.setAutomatic();
            keysPressed = true;
        }

        if (this.gui.isKeyPressed("KeyL") && this.nSuppliesDelivered<5){
            this.supplies[this.nSuppliesDelivered].drop(this.vehicle.x, this.vehicle.z);
            this.nSuppliesDelivered+=1;
            console.log(this.nSuppliesDelivered);
            this.billboard.updateBillboard();
        }

        if(!keysPressed) this.vehicle.turn(0);
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

        //this.material.apply();
        //this.sphere.display();
        if(this.displayObject){
            if(this.displayNormals){
                this.objects[this.currentObject].enableNormalViz();
            }
            else{
                this.objects[this.currentObject].disableNormalViz();
            }
            this.objects[this.currentObject].display();
        }

        /*if(this.displayCubeMap){
            this.cube.display();
        }*/
        
        if(this.displayTerrain){
            this.terrain.display();
        }
        //this.billboard.display();
        if(this.displayVehicle){
            this.pushMatrix();
            this.translate(0,10,0);
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.material.apply();
            this.vehicle.display();
            this.popMatrix();
        }

        for (var i=0 ; i<5; i++){
            this.supplies[i].display();
        }

        this.billboard.display();
        // ---- END Primitive drawing section
        this.setActiveShader(this.defaultShader);
    }
}