import React from "react";
import SimpleParallax from "simple-parallax-js";
import nosotros from "../../assests/images/IMG20240814215206.jpg";

const ParallaxTest = () => (
  <SimpleParallax
    delay={0.2}
    orientation={"down left"}
    scale={1.7}
    overflow
    maxTransition={80}>
    <img src={nosotros} alt="Prueba parallax" />
  </SimpleParallax>
);

export default ParallaxTest;
