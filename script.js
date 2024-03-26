<<<<<<< HEAD
=======
var slider = document.getElementById("inp1")
slider.onInput = function() {
  console.log(this.value);
}
>>>>>>> baa5903516784b9fa8f4695e3be05e404325725c
const canvas = document.getElementById("renderCanvas"); // Get the canvas element
var startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};

var engine = null;
var scene = null;
var sceneToRender = null;

var createDefaultEngine = function () {
  return new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    disableWebGL2Support: false,
  });
};

const createScene = function () {
  // Creates a basic Babylon Scene object
  const scene = new BABYLON.Scene(engine);
  // Creates and positions a free camera
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    20,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0)
  );
  // Dim the light a small amount - 0 to 1
  light.intensity = 0.2;

  // Light Sphere
  var light0 = new BABYLON.SpotLight(
    "Omni0",
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(1, -1, 1),
    8,
    10,
    scene
  );
  light0.position = new BABYLON.Vector3(-6, 7, -6);
  light0.intensity = 1.5;
  light0.shadowEnabled = true;
  light0.shadowMinZ = 1;
  light0.shadowMaxZ = 12.5;

  var lightSphere0 = BABYLON.Mesh.CreateSphere("Sphere0", 16, 0.5, scene);
  lightSphere0.position = light0.position;
  lightSphere0.material = new BABYLON.StandardMaterial("red", scene);
  lightSphere0.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
  lightSphere0.material.specularColor = new BABYLON.Color3(0, 0, 0);
  lightSphere0.material.emissiveColor = new BABYLON.Color3(0.53, 0.79, 1);

  // var sphere = BABYLON.Mesh.CreateSphere("Sphere", 16, 3, scene);

  // Sphere material
  var material = new BABYLON.StandardMaterial("kosh", scene);
  // material.diffuseColor = new BABYLON.Color3(1, 1, 1);
  // sphere.material = material;
  material.maxSimultaneousLights = 16;

  // Lights colors
  light0.diffuse = new BABYLON.Color3(0.53, 0.79, 1);
  light0.specular = new BABYLON.Color3(0.53, 0.79, 1);

  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 25, height: 25 },
    scene
  );

  ground.position = new BABYLON.Vector3(0, -3, 0);

  // Box creation
  const box = BABYLON.SceneLoader.ImportMesh(
    "",
    "models/",
    "pumpkinBucketCarved.glb",
    scene,
    function (newMeshes) {
      const boxMat = new BABYLON.StandardMaterial("boxMat", scene);

      boxMat.diffuseTexture = new BABYLON.Texture(
        "textures/speckles.jpg",
        
        scene
      );
      const slider = document.getElementById("inp1");
      slider.oninput = function () {
        newMeshes[0].scaling.x = this.value;
        newMeshes[0].scaling.y = this.value;
        newMeshes[0].scaling.z = this.value;
        console.log(ground.position.y);
        newMeshes[0].position.y = +ground.position.y + +this.value + +2;
        newMeshes[0].material = boxMat;
        console.log(newMeshes[0].position.y)
      };

      const shadowGenerator = new BABYLON.ShadowGenerator(2048, light0);
      shadowGenerator.addShadowCaster(newMeshes[0]);
      shadowGenerator.getShadowMap().renderList.push(newMeshes[0]);
      ground.receiveShadows = true;

      const framerate = 30;
      //Animations
      const anim1 = new BABYLON.Animation(
        "anim1",
        "rotation.y",
        framerate,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      );

      const keyframes = [];
      keyframes.push({
        frame: 0,
        value: 0,
      });

      keyframes.push({
        frame: 30,
        value: 2 * Math.PI,
      });

      anim1.setKeys(keyframes);
      scene.beginDirectAnimation(newMeshes[0], anim1, 0, 30, true);
      scene.beginAnimation(anim1, 0, 30, true);

    }
  );
  return scene;
};
window.initFunction = async function () {
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log(
        "the available createEngine function failed. Creating the default engine instead"
      );
      return createDefaultEngine();
    }
  };

  engine = await asyncEngineCreation();
  if (!engine) throw "engine should not be null.";
  startRenderLoop(engine, canvas);
  scene = createScene();
};
initFunction().then(() => {
  sceneToRender = scene;
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
