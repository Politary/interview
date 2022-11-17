import "./App.css";
import React, { useRef, useEffect } from "react";
import { ContentFrame } from "./components/ContentFrame/ContentFrame";

const App = () => {
  const ref = useRef(null);
  const cssRef = useRef(null);

  useEffect(() => {
    const sdk = ref.current;
    const showcaseWindow = sdk.contentWindow;

    let cssScene;
    let renderer2;
    let camera;

    sdk.addEventListener("load", async function () {
      let sdk;
      try {
        sdk = await showcaseWindow.MP_SDK.connect(showcaseWindow);
        const [model] = await sdk.Scene.query(["model"]);
        const scene = model.parent;
        camera = scene.getObjectByName("CameraRig").camera;
        await sdk.Scene.configure(function (renderer, three) {
          cssScene = new three.Scene();
          const element = initDomElement();
          const domObject = initDomObject(three, element);
          renderer2 = initCSS3DRenderer(three);
          cssScene.add(domObject);
        });
      } catch (e) {
        console.error(e);
        return;
      }
    });

    const animate = () => {
      if (camera && cssScene) {
        renderer2.render(cssScene, camera);
      }
      requestAnimationFrame(animate);
    };
    animate();

    //TODO: add some more actions using sdk. E.g. sdk.Scene()...
  }, []);

  const initDomElement = () => {
    const element = document.createElement("iframe");
    element.style.width = "600px";
    element.style.height = "380px";
    element.style.opacity = 0.999;
    element.src =
      "https://admin.treedis.com/login?_ga=2.105331530.893087370.1668653164-1072976840.1668653164&_gl=1*umzo4r*_ga*MTA3Mjk3Njg0MC4xNjY4NjUzMTY0*_ga_YLK9Q8X6JM*MTY2ODcwMzQ2OS4zLjAuMTY2ODcwMzQ2OS4wLjAuMA..";
    return element;
  };

  const initDomObject = (three, element) => {
    const domObject = new three.CSS3DObject(element);
    domObject.scale.set(0.003, 0.003, 0.003);
    domObject.position.set(5.445350646972656, 1.3341099739074707, 21);
    domObject.rotation.set(0, Math.PI * 0.96, 0);
    return domObject;
  };

  const initCSS3DRenderer = (three) => {
    const renderer2 = new three.CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = "absolute";
    renderer2.domElement.style.top = 0;
    cssRef.current.appendChild(renderer2.domElement);
    return renderer2;
  };

  return (
    <div className="App">
      <iframe
        ref={ref}
        src="/mp-sdk/3.1.63/showcase.html?applicationKey=wywq0cnqwhu6x2baz33k4u75c&m=bSubdPA5LXJ&play=1&search=0&title=0&brand=0&hl=0&tourcta=1&dh=1&mt=1&nozoom=0&pin=1&mls=0&qs=0&gt=1&portal=1&f=1&wh=1&kb=1&lp=0&vr=1&help=1&nt=0"
        frameBorder="0"
        allowFullScreen
        allow="vr"
      ></iframe>
      <ContentFrame refProp={cssRef} />
    </div>
  );
};

export default App;
