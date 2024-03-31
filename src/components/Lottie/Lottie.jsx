import lottie from "lottie-web";
import React, { useEffect, createRef } from "react";
import animation from "./../../animation/7726-clock.json";
import "./Lottie.css";

function LottieComp() {
  let animationContainer = createRef(null);
  lottie.loadAnimation({
    container: animationContainer.current, // current instance of our container!
    animationData: animation, // animation file!
    renderer: "svg",
    loop: false,
    autoplay: true,
  });
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animation,
      speed: 1, // Velocidad normal
    });

    return () => anim.destroy(); // Limpieza opcional al desmontar el componente
  }, []);

  return <div className="animation-container" ref={animationContainer} />;
}

export default LottieComp;
