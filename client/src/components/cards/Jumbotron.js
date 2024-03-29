import React from "react";
import Typewriter from "typewriter-effect";

const jumbotron = ({ text }) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default jumbotron;
