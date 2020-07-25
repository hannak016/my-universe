import Renderer from './renderer'
import {
  TextureLoader, Mesh, MeshBasicMaterial, CircleGeometry, 
  Line, BackSide, LineBasicMaterial, Vector3, PointLight, 
  AmbientLight, MeshPhongMaterial, RingGeometry, SphereGeometry, 
  LineLoop, DoubleSide, ShaderMaterial,SphereBufferGeometry,Group,Object3D//two imports added
} from 'three'
import ringVS from './shaders/saturn_ring.vs.glsl'
import ringFS from './shaders/saturn_ring.fs.glsl'


export default class SolarSystem extends Renderer {
  constructor() {
    super()
    this.params = {
      segment: 64,
      universe: {
        radius: 15000,
        texture: './assets/universe.jpg',
      },
      sun: { 
        radius: 50,
        distance: 0,
        selfRotate: 0.001,
        revolution: 0,
        texture: './assets/sun.jpg',
        light: {
          color: 0xffffff,
          intensity: 1,
          ambientColor: 0x090909,
          ambientIntensity: 1,
        }
      },
      planets: {
        mercury: {
          radius: 4,
          distance: 76,
          selfRotate: 0.005,
          revolution: 0.00413,
          texture: './assets/mercury.jpg',
        },
        venus: {
          radius: 8,
          distance: 144,
          selfRotate: 0.01,
          revolution: 0.0016,
          texture: './assets/venus.jpg',
        },
        earth: {
          radius: 9,
          distance: 200,
          selfRotate: 0.01,
          revolution: 0.00098,
          texture: './assets/earth.jpg',
          moon: {
            radius: 0.6,
            distance: 15, // distance to the earth
            selfRotate: 0.005,
            revolution: 0.12, // revolution around the earth
            texture: './assets/moon.jpg',
          },
        },
        mars: {
          radius: 5,
          distance: 304,
          selfRotate: 0.01,
          revolution: 0.0052,
          texture: './assets/mars.jpg',
        },
        jupiter: {
          radius: 51,
          distance: 1040,
          selfRotate: 0.007,
          revolution: 0.0017,
          texture: './assets/jupiter.jpg',
        },
        saturn: {
          radius: 42,
          distance: 1970,
          selfRotate: 0.01,
          revolution: 0.0011,
          texture: './assets/saturn.jpg',
          ring: {
            texture: './assets/saturn_ring.png',
            innerRadius: 45,
            outerRadius: 80,
            xRotate: Math.PI/3,
          }
        },
        uranus: {
          radius: 18.2,
          distance: 3843,
          selfRotate: 0.01,
          revolution: 0.0008,
          texture: './assets/uranus.jpg',
        },
        neptune: {
          radius: 17.6,
          distance: 6011,
          selfRotate: 0.01,
          revolution: 0.0006,
          texture: './assets/neptune.jpg',
        }
      },
      orbit: {
        color: 0xeeeeee,
        transparent: true,
        opacity: 0.2,
      }
    }
    this.sun = null
    this.planets = {
      mercury: {
        planet: null,
        orbit: null,
        revolution: 0,
      },
      venus: {
        planet: null,
        orbit: null,
        revolution: 0,
      },
      earth: {
        planet: null,
        orbit: null,
        revolution: 0,
        moon: {
          planet: null,
          orbit: null,
          revolution: 0,
        }
      },
      mars: {
        planet: null,
        orbit: null,
        revolution: 0,
      },
      jupiter: {
        planet: null,
        orbit: null,
        revolution: 0,
      },
      saturn: {
        planet: null,
        orbit: null,
        revolution: 0,
        ring: null
      },
      uranus: {
        planet: null,
        orbit: null,
        revolution: 0,
      },
      neptune: {
        planet: null,
        orbit: null,
        revolution: 0,
      }
    }
    this.setup()
    this.render()
  }


  orbitMaterial(){
    let myOrbitMat=new LineBasicMaterial({color:this.params.orbit.color,transparent:this.params.orbit.transparent,opacity:this.params.orbit.opacity});
    return myOrbitMat;
  }


  setup() {

   //starry sky background
    const universeTexture = new TextureLoader().load( this.params.universe.texture);
    const myUniverseGeometry = new SphereBufferGeometry(this.params.universe.radius,this.params.segment,this.params.segment); 
    const myUniverseMaterial = new MeshBasicMaterial({map:universeTexture,side:BackSide}) 
    universeTexture.anisotropy = 16;
    this.universe = new Mesh(myUniverseGeometry,myUniverseMaterial)
    this.scene.add(this.universe);


    //sun 
    const sunTexture = new TextureLoader().load( this.params.sun.texture);
    const mySunGeometry = new SphereBufferGeometry(this.params.sun.radius,this.params.segment,this.params.segment); 
    const mySunMaterial = new MeshBasicMaterial({map:sunTexture})
    sunTexture.anisotropy = 16;
    this.sun=new Mesh(mySunGeometry,mySunMaterial);
    //to test the anisotropy: this.sun.rotation.x -= Math.PI/2
    this.scene.add(this.sun);


   //pointlight
    const sunLight = new PointLight(this.params.sun.light.color,this.params.sun.light.intensity)
    this.scene.add(sunLight);

   //ambientlight
    const myAmbientLight = new AmbientLight(this.params.sun.light.ambientColor,this.params.sun.light.ambientIntensity)
    this.scene.add(myAmbientLight);
   

 


  //turn object into array to manipulate
    this.planetsArray = [
    this.planets.mercury,
    this.planets.venus, 
    this.planets.earth,
    this.planets.mars,
    this.planets.jupiter,
    this.planets.saturn,
    this.planets.uranus,
    this.planets.neptune]
    this.obj3D=[];//for external access
    this.planetsGroup = new Group();
    
  // planets
    for(let i = 0 ; i < this.planetsArray.length; i++){ 
      let obj3D = new Object3D();//local variable

    

      //meshes for planets
      let texture = new TextureLoader().load(Object.values(this.params.planets)[i].texture);
      let geo = new SphereBufferGeometry(Object.values(this.params.planets)[i].radius,this.params.segment,this.params.segment);
      let material = new MeshPhongMaterial({map:texture});
      texture.anisotropy = 16;
      let newPlanet = new Mesh(geo,material);
      this.planetsArray[i].planet= newPlanet ;
      this.planetsArray[i].planet.position.x=Object.values(this.params.planets)[i].distance;
      obj3D.add(this.planetsArray[i].planet);

      
  


      //orbits for planets
      let radius=Object.values(this.params.planets)[i].distance;
      let orbitGeo =new CircleGeometry(radius, this.params.segment,this.params.segment);
      orbitGeo.vertices.splice(0, 1); 
      this.planetsArray[i].orbit = new Line(orbitGeo,this.orbitMaterial())
      this.planetsArray[i].orbit.rotation.x-= Math.PI/2;
      obj3D.add(this.planetsArray[i].orbit);
      

      this.obj3D.push(obj3D);//for extern accesss
      this.planetsGroup.add(obj3D);

    };

  // moon  constructed seperately 
  { 
    
//moon Mesh
    const moonTexture = new TextureLoader().load( this.params.planets.earth.moon.texture);
    let geo = new SphereBufferGeometry(this.params.planets.earth.moon.radius,this.params.segment,this.params.segment);
    let material = new MeshPhongMaterial({map:moonTexture});
    moonTexture.anisotropy = 16;
    let moonMesh = new Mesh(geo,material);
    this.planets.earth.moon.planet = moonMesh;//
    this.planets.earth.moon.planet.position.x=this.params.planets.earth.moon.distance;

//moon Orbit
    let moonOrbitGeo =new CircleGeometry(this.params.planets.earth.moon.distance, this.params.segment,this.params.segment);
    moonOrbitGeo.vertices.splice(0, 1); 
    let orbitMesh = new Line(moonOrbitGeo,this.orbitMaterial());
    this.planets.earth.moon.orbit = orbitMesh;
    this.planets.earth.moon.orbit.rotation.x-= Math.PI/2;

//moon Object
    this.moon_obj3D = new Object3D();

    this.moon_obj3D.position.x=this.params.planets.earth.distance;
    this.moon_obj3D.add(this.planets.earth.moon.planet);
    this.moon_obj3D.add(this.planets.earth.moon.orbit);
//add moon to earth (this.obj3D[2])
    this.obj3D[2].add(this.moon_obj3D);
  }


    this.scene.add(this.planetsGroup);



//:saturn_ring
{   
    const ringGeo = new RingGeometry(this.params.planets.saturn.ring.innerRadius,this.params.planets.saturn.ring.outerRadius,this.params.segment);
    const ringMat =  new ShaderMaterial({
      uniforms:{
        ringTexture:{value:new TextureLoader().load(this.params.planets.saturn.ring.texture)}
      },
      vertexShader:ringVS,
      fragmentShader:ringFS,
      side:DoubleSide
    });  
    this.planets.saturn.ring = new Mesh(ringGeo,ringMat);
    this.planets.saturn.ring.rotation.x-= Math.PI/2;

    

    this.planets.saturn.ring.rotation.x= this.params.planets.saturn.ring.xRotate;

  
    this.planets.saturn.ring.position.x=this.params.planets.saturn.distance;
    
    this.obj3D[5].add(this.planets.saturn.ring);

  }

 

  }
  update()  {

    //sun self-rotation
    this.sun.rotation.y += this.params.sun.selfRotate;
  
  
    //planets self-rotation+revolution
    for(let i = 0 ; i < this.planetsArray.length; i++){  

      this.planetsArray[i].planet.rotation.y+=Object.values(this.params.planets)[i].selfRotate;
      this.obj3D[i].rotation.y+=Object.values(this.params.planets)[i].revolution;

    };

    //moon self-rotation+revolution
      this.planets.earth.moon.planet.rotation.y+=this.params.planets.earth.moon.selfRotate;
      this.moon_obj3D.rotation.y+=this.params.planets.earth.moon.revolution;



     
  }
}

new SolarSystem()







