import './style.css'
import { B3DMApp } from './3d/b3dm-no-draco'
import { B3dmDracoApp } from './3d/b3dm-draco';

// const app = new B3DMApp();
// app.renderLoop();

const app = new B3dmDracoApp();
app.renderLoop();


// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
