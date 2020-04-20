/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        //this.initBuffers();

        this.sphere = new MySphere(this.scene, this.slices, this.stacks);
        this.cockpit = new MyCockpit(this.scene, this.slices, this.stacks);
        this.engineR = new MyEngine(this.scene, this.slices, this.stacks);
        this.engineL = new MyEngine(this.scene, this.slices, this.stacks);
        this.rudderH = new MyRudder(this.scene);
        this.rudderV = new MyRudder(this.scene);

        this.angle = 0; //eixo YY
        this.speed = 0;
        this.x = 0; //Position
        this.y = 0;
        this.z = 0;
        this.lastUpdate = 0;
    }
    /*initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,1,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }*/
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    update(t){
        if (this.lastUpdate=0) this.lastUpdate = t;
        var elapsedTime = t - this.lastUpdate;
        this.lastUpdate = t;

        this.x += (this.speed * Math.sin(this.angle * Math.PI/180))/*(elapsedTime/1000)*/;
        this.z += (this.speed * Math.cos(this.angle * Math.PI/180))/*(elapsedTime/1000)*/;

        this.engineL.rotateProp(this.speed*t);
        this.engineR.rotateProp(this.speed*t);

        /*console.log(this.speed);
        console.log(this.x);
        console.log(this.z);*/
    }

    turn(val){
        this.angle += val;
        this.rudderV.rotRudder(val*this.speed*3);
    }

    accelerate(val){
        this.speed += val;
    }

    reset(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.angle = 0;
        this.speed = 0;
    }

    display(){
        this.scene.setDiffuse(0,0,1);
        this.scene.setSpecular(0, 0, 0, 1);
        this.scene.setAmbient(0, 0, 0.5, 1);

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.angle*Math.PI/180, 0, 1, 0);

        //Balao
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.sphere.display();
        this.scene.popMatrix();

        //Cockpit
        this.scene.pushMatrix();
        this.scene.translate(0, -0.55, -0.3);
        this.cockpit.display();

        //Engines
        this.scene.pushMatrix();
        this.scene.translate(0.15, 0, -0.02);
        this.engineL.display();
        this.scene.translate(-0.30,0,0);
        this.engineR.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        //Rudders
        this.scene.pushMatrix();

            //horizontal
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0, -0.4);
        this.rudderH.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, -0.4);
        this.rudderH.display();
        this.scene.popMatrix();

            //Vertical
        this.scene.pushMatrix();
        this.scene.translate(0,0.4,-0.4);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.rudderV.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.4,-0.4);
        this.scene.rotate(Math.PI/2, 0,0,1);
        this.rudderV.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.popMatrix();
    }
}