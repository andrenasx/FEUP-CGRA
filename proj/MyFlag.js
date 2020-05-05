
/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
        super(scene);
        this.flag1 = new MyPlane(this.scene, 15);
        this.flag2 = new MyPlane(this.scene, 15);
        this.support1 = new MyQuad2S(this.scene);
        this.support2 = new MyQuad2S(this.scene);

        //Flag texture
        this.texture = new CGFtexture(this.scene, 'textures/nemo.jpg');
        
        //Movement Shaders
        this.shaderleft=new CGFshader(this.scene.gl, "shaders/flagleft.vert", "shaders/flag.frag");
        this.shaderright = new CGFshader(this.scene.gl, "shaders/flagright.vert", "shaders/flag.frag");

        this.shaderleft.setUniformsValues({ uSampler1: 1 });
        this.shaderleft.setUniformsValues({ speed: 0 });
        this.shaderleft.setUniformsValues({ timeFactor: 0 });

        this.shaderright.setUniformsValues({ uSampler1: 1 });
        this.shaderright.setUniformsValues({ speed: 0 });
        this.shaderright.setUniformsValues({ timeFactor: 0 });

		this.initBuffers();
    }

    update(s, t){
        console.log(s);
        console.log(t);
        this.shaderleft.setUniformsValues({ speed: s });
        this.shaderleft.setUniformsValues({ timeFactor: t/1000 });

        this.shaderright.setUniformsValues({ speed: s });
        this.shaderright.setUniformsValues({ timeFactor: t/1000 });
    }
	
	display(){
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.pushMatrix();
        this.scene.translate(0,-0.2,0.47);
        this.scene.rotate(80.0*Math.PI/180.0,1,0,0);
        this.scene.rotate(90.0*Math.PI/180.0,0,1,0);
        this.scene.scale(0.025,1,1);
        this.support1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.2,0.47);
        this.scene.rotate(-80.0*Math.PI/180.0,1,0,0);
        this.scene.rotate(90.0*Math.PI/180.0,0,1,0);
        this.scene.scale(0.025,1,1);
        this.support2.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.shaderright);
        this.texture.bind(1);

        this.scene.pushMatrix();
        this.scene.scale(1, 0.6, 1);
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(90*Math.PI/180, 0, 1, 0);
        this.flag1.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.shaderleft);

        this.scene.pushMatrix();
        this.scene.scale(1, 0.6, 1);
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(-90*Math.PI/180, 0, 1, 0);
        this.flag2.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}

