
/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
        this.flag = new MyPlane(this.scene, 15);
        this.support = new MyQuad2S(this.scene);
        
        this.initTexture(this.scene);

    }

    initTexture(scene){
        //Flag texture
        this.texture = new CGFappearance(this.scene);
        this.f = new CGFtexture(scene, 'textures/flag.png');
        this.texture.setAmbient(0.9, 0.9, 0.9, 1);
        this.texture.setDiffuse(0.0, 0.0, 0.0, 1);
        this.texture.setSpecular(0.0, 0.0, 0.0, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('textures/flag.png');
        this.texture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        
        //Movement Shaders
        this.shader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.shader.setUniformsValues({ uSampler1: 1 });
        this.shader.setUniformsValues({ speed: 0 });
        this.shader.setUniformsValues({ timeFactor: 0 });

    }

    update(t, s){
        this.shader.setUniformsValues({ speed: s });
        this.shader.setUniformsValues({ timeFactor: t });
    }
	
	display(){
        //Supports for the flag
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.pushMatrix();
        this.scene.translate(0,-0.2,0.5);
        this.scene.rotate(80.0*Math.PI/180.0,1,0,0);
        this.scene.rotate(90.0*Math.PI/180.0,0,1,0);
        this.scene.scale(0.025,1,1);
        this.support.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.2,0.5);
        this.scene.rotate(-80.0*Math.PI/180.0,1,0,0);
        this.scene.rotate(90.0*Math.PI/180.0,0,1,0);
        this.scene.scale(0.025,1,1);
        this.support.display();
        this.scene.popMatrix();

        //Flag
        this.texture.apply();
        this.scene.setActiveShader(this.shader);
        this.f.bind(1);
        this.scene.pushMatrix();
        this.scene.scale(1, 0.6, 1);
        this.scene.translate(0, 0, -0.49);
        this.scene.rotate(90*Math.PI/180, 0, 1, 0);
        this.shader.setUniformsValues({side: 0});
        this.flag.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.setActiveShader(this.shader);
        this.f.bind(1);
        this.scene.pushMatrix();
        this.scene.scale(1, 0.6, 1);
        this.scene.translate(0, 0, -0.49);
        this.scene.rotate(-90*Math.PI/180, 0, 1, 0);
        this.shader.setUniformsValues({side: 1});
        this.flag.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}

