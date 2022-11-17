import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import { ContentFrame } from "./components/ContentFrame/ContentFrame";
import { cloneJSON } from "three/addons/libs/ecsy.module";

const App = () => {
  const ref = useRef(null);
  const cssRef = useRef(null);

  useEffect(() => {
    const sdk = ref.current;
    const showcaseWindow = sdk.contentWindow;

    let scene2;
    let renderer2;
    let camera;
    let mesh;
    let domObject;

    sdk.addEventListener("load", async function () {
      let sdk;
      try {
        sdk = await showcaseWindow.MP_SDK.connect(showcaseWindow);
        const [model] = await sdk.Scene.query(["model"]);
        const scene = model.parent;

        await sdk.Scene.configure(function (renderer, three) {
          scene2 = new three.Scene();
          // Iframe
          let element = document.createElement("iframe");
          element.style.width = "300px";
          element.style.height = "200px";
          element.style.opacity = 0.999;
          element.src =
            "https://kenneth.io/post/detecting-multi-touch-trackpad-gestures-in-javascript";

          domObject = new three.CSS3DObject(element);
          domObject.scale.set(0.005, 0.005, 0.005);
          domObject.position.set(5.445350646972656, 1.3341099739074707, 21);
          domObject.rotation.set(0, Math.PI * 0.96, 0);
          scene2.add(domObject);

          console.log(domObject);

          console.log(scene.children[0].children[0]);
          camera = scene.children[0].children[0];

          //Plane
          var material = new three.MeshBasicMaterial({
            opacity: 0.2,
            color: new three.Color("red"),
            blending: three.NoBlending,
            side: three.DoubleSide,
          });
          var geometry = new three.PlaneGeometry(1, 1);
          mesh = new three.Mesh(geometry, material);
          mesh.scale.set(0.5, 0.5, 0.5);
          mesh.name = "box";
          mesh.position.set(5.445350646972656, 1.6341099739074707, 21);

          //  renderer
          renderer2 = new three.CSS3DRenderer();
          renderer2.setSize(window.innerWidth, window.innerHeight);
          renderer2.domElement.style.position = "absolute";
          renderer2.domElement.style.top = 0;
          cssRef.current.appendChild(renderer2.domElement);
        });
      } catch (e) {
        console.error(e);
        return;
      }
    });

    function animate() {
      if (camera && scene2) {
        renderer2.render(scene2, camera);
      }
      requestAnimationFrame(animate);
    }
    animate();

    //TODO: add some more actions using sdk. E.g. sdk.Scene()...
  }, []);
  return (
    <div className="App">
      <iframe
        ref={ref}
        src="/mp-sdk/3.1.63/showcase.html?applicationKey=wywq0cnqwhu6x2baz33k4u75c&m=bSubdPA5LXJ&play=1&search=0&title=0&brand=0&hl=0&tourcta=1&dh=1&mt=1&nozoom=0&pin=1&mls=0&qs=0&gt=1&portal=1&f=1&wh=1&kb=1&lp=0&vr=1&help=1&nt=0"
        frameBorder="0"
        allowFullScreen
        allow="vr"
      ></iframe>
      <div id="css" style={{ pointerEvents: "none" }} ref={cssRef}></div>
    </div>
  );
};

export default App;
