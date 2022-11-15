import './App.css';
import React, { useRef, useEffect } from 'react';

const App = () => {
  const ref = useRef(null);
  useEffect(() => {
    const sdk = ref.current
    const showcaseWindow = sdk.contentWindow;
    sdk.addEventListener('load', async function() {
      let sdk;
      try {
        sdk = await showcaseWindow.MP_SDK.connect(showcaseWindow);
        console.log(sdk);
        const [model] = await sdk.Scene.query(['model']);
        console.log(model);
      }
      catch(e) {
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
            allowFullScreen allow="vr">
        </iframe>
    </div>
  );
}

export default App;
