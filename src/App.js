import "./App.css";
import React, { useRef, useEffect, useState } from "react";
import { ContentFrame } from "./components/ContentFrame/ContentFrame";

const App = () => {
  const ref = useRef(null);
  const _three = useRef(null);
  const _renderer = useRef(null);
  const _scene = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const sdk = ref.current;
    const showcaseWindow = sdk.contentWindow;

    sdk.addEventListener("load", async function () {
      let sdk;
      try {
        sdk = await showcaseWindow.MP_SDK.connect(showcaseWindow);
        const [model] = await sdk.Scene.query(["model"]);
        _scene.current = model.parent;
        await sdk.Scene.configure(function (renderer, three) {
          _three.current = three;
          _renderer.current = renderer;
          setLoaded(true);
        });
      } catch (e) {
        console.error(e);
        return;
      }
    });

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
      <ContentFrame
        loaded={loaded}
        three={_three.current}
        scene={_scene.current}
        src={
          "https://admin.treedis.com/login?_ga=2.105331530.893087370.1668653164-1072976840.1668653164&_gl=1*umzo4r*_ga*MTA3Mjk3Njg0MC4xNjY4NjUzMTY0*_ga_YLK9Q8X6JM*MTY2ODcwMzQ2OS4zLjAuMTY2ODcwMzQ2OS4wLjAuMA.."
        }
      />
    </div>
  );
};

export default App;
