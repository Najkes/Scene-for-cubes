// const { shadowMapFragment } = require("@babylonjs/core/Shaders/ShadersInclude/shadowMapFragment");

// const { RotationXBlock } = require("@babylonjs/core");

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
        const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); // Generate the BABYLON 3D engine
        const createScene = function () {

                // Creates a basic Babylon Scene object
                const scene = new BABYLON.Scene(engine);
                // Creates and positions a free camera
                const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 20, new BABYLON.Vector3(0, 0, 0), scene);
                camera.attachControl(canvas, true,);
                const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));
                // Dim the light a small amount - 0 to 1
                light.intensity = 0.2;


                // Light Sphere
                var light0 = new BABYLON.SpotLight("Omni0", new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(1, -1, 1), 8, 10, scene);
                light0.position = new BABYLON.Vector3(-6, 7, -6)
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

                const ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 25, height: 25}, scene);
                ground.position = new BABYLON.Vector3(0, -3, 0);

                // Box creation
                const box = BABYLON.MeshBuilder.CreateBox('box', {width: 5, height: 5, depth:5}, scene);

                const boxMat = new BABYLON.StandardMaterial("boxMat", scene)
                boxMat.diffuseTexture = new BABYLON.Texture("textures/speckles.jpg", scene)
                
                box.material = boxMat;

                const framerate = 60;
                //Animations 
                const anim1 = new BABYLON.Animation("anim1", "rotation.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
                
                const keyframes = []; 
                keyframes.push({
                    frame: 0,
                    value: 0
                });

                keyframes.push({
                        frame: framerate,
                        value: 2 * framerate
                })
            
                keyframes.push({
                    frame: 60,
                    value: 9000
                });

                anim1.setKeys(keyframes);
                box.animations = [];
                box.animations.push(anim1);


                const shadowGenerator = new BABYLON.ShadowGenerator(2048, light0);
                shadowGenerator.useBlurCloseExponentialShadowMap = true; 
                box.receiveShadows = true;
                shadowGenerator.addShadowCaster(box);
                // const shadowGenerator = new BABYLON.ShadowGenerator(2048, light0);
                // shadowGenerator.getShadowMap().renderList.push(box);
                // shadowGenerator.useContactHardeningShadow = true;
                // shadowGenerator.contactHardeningLightSizeUVRatio = 0.075;
                // shadowGenerator.useBlurExponentialShadowMap = true;
                // shadowGenerator.useKernelBlur = true;
                // shadowGenerator.blurKernel = 64;
                // shadowGenerator.blurScale = 10
                // light0.shadowEnabled = true;
                ground.receiveShadows = true;
                // box.receiveShadows = true;
                scene.beginAnimation(anim1, 0, 60, true);
                return scene;
        };
        const scene = createScene(); //Call the createScene function
        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
                scene.render();
        });
        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () {
                engine.resize();
        });

        
        