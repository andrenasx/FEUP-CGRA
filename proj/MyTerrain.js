class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);

        this.plane = new MyPlane(scene,20);

        this.init(scene);
    }

    init(scene){
        //Texture
        this.terrainTex = new CGFtexture(scene, "textures/terrain.jpg");
        this.terrainMap = new CGFtexture(scene, "textures/heightmap.jpg");
        
        //Shader
        this.terrainShader = new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.terrainShader.setUniformsValues({uSampler1: 1});
		this.terrainShader.setUniformsValues({uSampler2: 2});
    }

    display(){
        this.scene.setActiveShader(this.terrainShader);
        this.terrainTex.bind(1);
        this.terrainMap.bind(2);
        this.plane.display();
        this.scene.setActiveShader(this.defaultShader);
    }
}