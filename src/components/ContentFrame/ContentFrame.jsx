import React, { useEffect, useRef } from "react";

export const ContentFrame = ({ loaded, three, scene, src }) => {
  const cssRef = useRef(null);
  const _element = useRef(null);

  useEffect(() => {
    if (loaded && scene && !_element.current) {
      const camera = scene.getObjectByName("CameraRig").camera;
      const cssScene = new three.Scene();
      const element = initDomElement();
      const domObject = initDomObject(three, element);
      const renderer2 = initCSS3DRenderer(three);
      cssScene.add(domObject);

      const animate = () => {
        if (camera && cssScene) {
          renderer2.render(cssScene, camera);
        }
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [loaded]);

  const initDomElement = () => {
    const element = document.createElement("iframe");
    _element.current = element;
    element.style.width = "600px";
    element.style.height = "380px";
    element.style.opacity = 0.999;
    element.src = src;
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
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      ref={cssRef}
    />
  );
};
