import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
  Suspense,
} from "react";

const MicrofrontendLoader = forwardRef(
  ({ scriptUrl, cssUrl, globalVarName, propsToPass = {}, onLoad, additionalLink }, ref) => {
    const [Component, setComponent] = useState(null);
    const [dynamicProps, setDynamicProps] = useState(propsToPass);

    useEffect(() => {

      const addedElements = [];

      const loadAsset = (url) => {
        const fileExtension = url.split('.').pop().split('?')[0];

        if (fileExtension === "js") {
          const script = document.createElement("script");
          script.src = url;
          script.async = true;
          document.body.appendChild(script);
          addedElements.push(script);
        } else if (fileExtension === "css") {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = url;
          document.head.appendChild(link);
          addedElements.push(link);
        } else {
          console.warn(`Unsupported file type for: ${url}`);
        }
      };

      if (Array.isArray(additionalLink)) {
        additionalLink.forEach(loadAsset);
      }


      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;

      // Optional: attach CSS
      if (cssUrl) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssUrl;
        document.head.appendChild(link);
      }

      script.onload = () => {
        const RemoteComponent = window[globalVarName];
        if (onLoad) onLoad();
        if (RemoteComponent) {
          setComponent(() => RemoteComponent);
        } else {
          console.error(`Global var ${globalVarName} not found`);
        }
      };

      script.onerror = () => {
        console.error(`Failed to load script: ${scriptUrl}`);
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        addedElements.forEach((el) => {
          if (el.parentNode) {
            el.parentNode.removeChild(el);
          }
        });
      };
    }, [scriptUrl, cssUrl, globalVarName]);

    // Allow parent to update props dynamically
    useImperativeHandle(ref, () => ({
      updateProps: (newProps) => {
        setDynamicProps((prevProps) => ({
          ...prevProps,
          ...newProps,
        }));
      },
    }));

    if (!Component) {
      return <div className="w-full h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>;
    }

    return (
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      }>
        <Component {...dynamicProps} />
      </Suspense>
    );
  }
);

export default MicrofrontendLoader;
