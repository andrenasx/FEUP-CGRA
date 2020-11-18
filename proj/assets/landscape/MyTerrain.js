class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new MyPlane(scene,20);

        this.init(scene);
    }

    init(scene){
        //Texture
        this.terrainTex = new CGFtexture(scene, "textures/snow.jpg");
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
        this.scene.setActiveShaderSimple(this.terrainShader);
        this.terrainTex.bind(1);
        this.terrainMap.bind(2);
        this.scene.pushMatrix();
        this.scene.scale(50,8,50);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.plane.display();
        this.scene.popMatrix();
        this.scene.setActiveShaderSimple(this.scene.defaultShader);
    }
}