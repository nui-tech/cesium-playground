import {
  Scene,
  DirectionalLight,
  AmbientLight,
  WebGLRenderer,
  PerspectiveCamera,
  SRGBColorSpace,
	Vector3,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TilesRenderer } from '3d-tiles-renderer';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



class B3DMApp {

  renderer = new WebGLRenderer({ antialias: true });
  scene = new Scene();
  camera = new PerspectiveCamera( 70,  window.innerWidth / window.innerHeight, 1, 200000 );
  controls: OrbitControls;

	tilesRenderer = new TilesRenderer( '/tiles/rainbow-nc/tileset.json' );
	loader = new GLTFLoader( this.tilesRenderer.manager );

  constructor() {
		const dracoLoader = new DRACOLoader().setDecoderPath( '/draco/' );
		dracoLoader.setDecoderConfig( { type: 'wasm' } );
		
		this.loader.setDRACOLoader( dracoLoader );
		this.tilesRenderer.manager.addHandler( /\.gltf$/, this.loader );

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xd8cec0);
    this.renderer.outputColorSpace = SRGBColorSpace;
    document.body.appendChild(this.renderer.domElement);

    // Camera
    this.camera.position.set(0, 70000, 0);
		// Controls
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.screenSpacePanning = false;
		this.controls.minDistance = 1;
		this.controls.maxDistance = 90000;
		this.controls.maxPolarAngle = Math.PI / 2;

    // lights
    const dirLight = new DirectionalLight(0xffffff);
    dirLight.position.set(1, 2, 3);
    this.scene.add(dirLight);

    const ambLight = new AmbientLight(0xffffff, 0.2);
    this.scene.add(ambLight);

		// this.controls.target.set(2533, 0, 3144);
		// this.camera.position.set(2533, 1200, 3144);
		
		this.tilesRenderer.setCamera( this.camera );
		
		// play with setting here
		this.tilesRenderer.autoDisableRendererCulling = false;

		this.tilesRenderer.setResolutionFromRenderer( this.camera, this.renderer );
		this.scene.rotateOnAxis(new Vector3(1, 0, 0), -Math.PI / 2);
		this.scene.add( this.tilesRenderer.group );

		this.scene.frustumCulled = false;



		this.debug();
  }

	renderLoop() {
		this.camera.updateMatrixWorld();
		this.tilesRenderer.update();
		this.renderer.render( this.scene, this.camera );
		requestAnimationFrame( () => this.renderLoop() );
	}


	debug() {
		this.controls.addEventListener( 'change', () => {
			console.log('target', this.controls.target);
			
			console.log( this.camera.position );
			console.log( this.camera.position.length() );
		} );
	}

}

export { B3DMApp };
