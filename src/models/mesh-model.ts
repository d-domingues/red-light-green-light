import { Subject } from 'rxjs';
import { AnimationAction, AnimationMixer, Clock, Euler, Object3D, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const halfCircle = ~~Math.PI / 2;

/* extends Object3D */
export class MeshModel {
  meshSrc!: string;
  config!: Partial<Object3D>;
  mesh!: Object3D;

  mixer!: AnimationMixer;
  actions!: AnimationAction[];
  currentAction!: AnimationAction;

  clock = new Clock();

  daemon!: Subject<null>;

  constructor(meshSrc: string, config?: Partial<Object3D>, daemon?: Subject<null>) {
    // super();
    Object.assign(this, { meshSrc, config, daemon });
  }

  async loadMesh() {
    const gltf = await new GLTFLoader().loadAsync(this.meshSrc);

    /* Maybe another time...
    this.copy({ ...gltf.scene, ...this.config } as any);
    this.config.rotation && this.rotation.copy(this.config.rotation);
    */

    this.mesh = gltf.scene;
    this.mixer = new AnimationMixer(this.mesh);
    this.actions = gltf.animations.map((a) => this.mixer.clipAction(a));

    if (this.config) {
      const { position, rotation, scale } = this.config;
      position && this.mesh.position.copy(position);
      rotation && this.mesh.rotation.copy(rotation);
      scale && this.mesh.scale.copy(scale);
    }

    this.mesh.traverse((o) => (o.castShadow = true));

    return gltf.scene;
  }

  playAnimationAction(id: number) {
    // this.daemon.subscribe(() => this.mixer.update(this.clock.getDelta()));
    // this.mixer.stopAllAction();
    this.currentAction?.fadeOut(0.3);
    this.currentAction = this.actions[id].fadeIn(0.3).play();
  }

  updateMixer = (step: 'forward' | 'backwards') => {
    this.mixer.update(this.clock.getDelta() * (step === 'forward' ? 0.3 : -0.3));
  };

  start = () => (this.currentAction.paused = false);

  stop = () => (this.currentAction.paused = true);
}

export class Doll extends MeshModel {
  constructor(daemon?: Subject<null>) {
    super('/models/doll/scene.gltf', { position: new Vector3(-16, 4.8, 10), rotation: new Euler(0, -halfCircle, 0) }, daemon);
  }

  lookForward = () => {
    const subscr = this.daemon.subscribe(
      () => !!this.mesh && (this.mesh.rotation.y < halfCircle ? this.mesh.rotateY(0.1) : subscr.unsubscribe())
    );
  };

  lookBackwards = () => {
    const subscr = this.daemon.subscribe(
      () => !!this.mesh && (this.mesh.rotation.y > -halfCircle ? this.mesh.rotateY(-0.1) : subscr.unsubscribe())
    );
  };
}

export class Soldier extends MeshModel {
  constructor(daemon?: Subject<null>) {
    super(
      '/models/Soldier.glb',
      { position: new Vector3(20, 0, 10), rotation: new Euler(0, halfCircle, 0), scale: new Vector3(3, 3, 3) },
      daemon
    );
  }
}
