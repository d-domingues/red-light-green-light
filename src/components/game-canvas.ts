import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { Subject } from 'rxjs';
import {
  Color,
  DirectionalLight,
  Fog,
  HemisphereLight,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  sRGBEncoding,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Doll, Soldier } from '../models/mesh-model';

@customElement('game-canvas')
export class GameCanvas extends LitElement {
  scene!: Scene;
  camera!: PerspectiveCamera;
  renderer!: WebGLRenderer;
  constrols!: OrbitControls;

  daemon = new Subject<null>();

  doll = new Doll(this.daemon);
  soldier = new Soldier(this.daemon);

  constructor() {
    super();
    window.addEventListener('resize', this.setResponsiveSize, false);

    this.runRenderLoop();
    this.setScene();
    this.setCamera();
    this.setLight();
    this.setGround();
    this.setSky();
    this.loadModels().then(() => this.soldier.playAnimationAction(1));
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.setResponsiveSize);
    this.daemon.complete();
  }

  setResponsiveSize = () => {
    this.camera!.aspect = window.innerWidth / (window.innerHeight - 48);
    this.camera?.updateProjectionMatrix();
    this.renderer?.setSize(window.innerWidth, window.innerHeight - 48);
  };

  setScene() {
    this.scene = new Scene();
    this.scene.background = new Color(0x87ceeb); // new Color().setHSL(0.6, 0, 1);
    this.scene.fog = new Fog(new Color().setHSL(0.6, 0, 1), 1, 5000);
  }

  setCamera() {
    this.camera = new PerspectiveCamera(70, window.innerWidth / (window.innerHeight - 48), 1, 1000);
    this.camera.position.set(0, 8, 28);
    this.camera.lookAt(new Vector3(0, 8, 0));
  }

  setLight() {
    const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 30, 0);

    const dirLight = new DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-0.6, 0.8, 0.5);
    dirLight.position.multiplyScalar(30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    const d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;

    this.scene.add(dirLight, hemiLight);

    ///////// helpers
    // this.scene.add(new HemisphereLightHelper(hemiLight, 5), new DirectionalLightHelper(dirLight, 5));
  }

  setGround() {
    const groundGeo = new PlaneGeometry(1000, 1000);
    const groundMat = new MeshLambertMaterial({ color: 0xffffff });
    groundMat.color.setHSL(0.095, 1, 0.75);

    const ground = new Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  setSky() {}

  async loadModels() {
    const meshes = await Promise.all([this.doll.loadMesh(), this.soldier.loadMesh()]);
    this.scene.add(...meshes);
  }

  setRenderer(canvas?: Element) {
    this.renderer = new WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight - 48);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.shadowMap.enabled = true;

    ////////////
    // this.constrols = new OrbitControls(this.camera, this.renderer.domElement);
    // this.scene.add(new GridHelper(100, 10));
  }

  runRenderLoop = () => {
    requestAnimationFrame(this.runRenderLoop);
    this.daemon.next(null);
    this.renderer?.render(this.scene, this.camera);
  };

  ///////////
  async runSimulations() {
    this.soldier.playAnimationAction(1);
    await new Promise((r) => setTimeout(r, 2000));
    this.doll.lookForward();
    this.soldier.stop();
    await new Promise((r) => setTimeout(r, 1000));
    this.doll.lookBackwards();
    this.soldier.start();
    this.runSimulations();
  }

  render() {
    return html`<canvas ${ref(this.setRenderer)}></canvas>`;
  }
}
