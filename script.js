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
                light.intensity = 0.0;


                // Light Sphere
                var light0 = new BABYLON.SpotLight("Omni0", new BABYLON.Vector3(0, 10, 0), scene);
                light0.position = new BABYLON.Vector3(-5, 7, -6)
                light0.intensity = 1;

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

                const box = BABYLON.MeshBuilder.CreateBox('box', {width: 5, height: 5, depth:5}, scene);

                const shadowGenerator = new BABYLON.ShadowGenerator(512, light0);
                shadowGenerator.getShadowMap().renderList.push(box);
                shadowGenerator.useContactHardeningShadow = true;
                shadowGenerator.contactHardeningLightSizeUVRatio = 0.0075;
                // shadowGenerator.useBlurExponentialShadowMap = true;
                // shadowGenerator.useKernelBlur = true;
                // shadowGenerator.blurKernel = 64;
                // shadowGenerator.blurScale = 10
                // light0.shadowEnabled = true;
                ground.receiveShadows = true;
                // box.receiveShadows = true;

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

        
        