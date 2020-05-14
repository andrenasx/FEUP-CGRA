class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new MyPlane(scene,20);

        this.init(scene);
    }

    init(scene){
        //Appearance
        this.terrain = new CGFappearance(scene);
        this.terrain.setAmbient(0.9, 0.9, 0.9, 1);
        this.terrain.setDiffuse(0.0, 0.0, 0.0, 1);
        this.terrain.setSpecular(0.0, 0.0, 0.0, 1);
        this.terrain.setShininess(10.0);
        this.terrain.loadTexture("textures/terrain.jpg");
        this.terrain.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        
        //Texture
        this.terrainTex = new CGFtexture(scene, "textures/terrain.jpg");
        this.terrainMap = new CGFtexture(scene, "textures/heightmapcenter.jpg");
        
        //Shader
        this.terrainShader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.terrainShader.setUniformsValues({uSampler1: 1});
		this.terrainShader.setUniformsValues({uSampler2: 2});
    }

    updateTexture(scene){
        if(scene.landscape == 0){
            this.terrainTex = new CGFtexture(scene, "textures/terrain.jpg");
        }
        else if(scene.landscape == 1) {
            this.terrainTex = new CGFtexture(scene, "textures/snow.jpg");
        }
    }

    display(){
        this.terrain.apply();
        this.scene.setActiveShader(this.terrainShader);
        this.terrainTex.bind(1);
        this.terrainMap.bind(2);
        this.scene.pushMatrix();
        this.scene.scale(50,8,50);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}