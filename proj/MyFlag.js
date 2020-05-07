
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
        
        //Flag texture
        this.texture = new CGFappearance(this.scene);
        this.fofo = new CGFtexture(scene, 'textures/nemo.jpg');
        this.texture.setAmbient(0.9, 0.9, 0.9, 1);
        this.texture.setDiffuse(0.0, 0.0, 0.0, 1);
        this.texture.setSpecular(0.0, 0.0, 0.0, 1);
        this.texture.setShininess(10.0);
        this.texture.loadTexture('textures/nemo.jpg');
        this.texture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        
        //Movement Shaders
        this.shaderleft=new CGFshader(this.scene.gl, "shaders/flagleft.vert", "shaders/flag.frag");
        this.shaderleft.setUniformsValues({ uSampler1: 1 });
        this.shaderleft.setUniformsValues({ speed: 0 });
        this.shaderleft.setUniformsValues({ timeFactor: 0 });

        this.shaderright = new CGFshader(this.scene.gl, "shaders/flagright.vert", "shaders/flag.frag");
        this.shaderright.setUniformsValues({ uSampler1: 1 });
        this.shaderright.setUniformsValues({ speed: 0 });
        this.shaderright.setUniformsValues({ timeFactor: 0 });

    }
    
    update(t, s){
        this.shaderleft.setUniformsValues({ speed: s });
        this.shaderleft.setUniformsValues({ timeFactor: t });

        this.shaderright.setUniformsValues({ speed: s });
        this.shaderright.setUniformsValues({ timeFactor: t});
    }
	
	display(){
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.pushMatrix();
        this.scene.translate(0,-0.2,0.47);
        this.scene.rotate(80.0*Math.PI/180.0,1,0,0);
        this.scene.rotate(90.0*Math.PI/180.0,0,1,0);
        this.scene.scale(0.025,1,1);
        this.support.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.2,0.47);
        this.scene.rotate(-80.0*Math.PI/180.0,1,0,0);
        this.scene.rotate(90.0*Math.PI/180.0,0,1,0);
        this.scene.scale(0.025,1,1);
        this.support.display();
        this.scene.popMatrix();

        this.texture.apply();
        this.scene.setActiveShader(this.shaderright);
        this.fofo.bind(1);
        this.scene.pushMatrix();
        this.scene.scale(1, 0.6, 1);
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(90*Math.PI/180, 0, 1, 0);
        this.flag.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.setActiveShader(this.shaderleft);
        this.fofo.bind(1);
        this.scene.pushMatrix();
        this.scene.scale(1, 0.6, 1);
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(-90*Math.PI/180, 0, 1, 0);
        this.flag.display();
        this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
    }
}

