import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Hero from "./Hero";
import "../css/styles.css";

function Home() {
  return (
    <div className="overview-wrapper">
      <div className="overview-content">
        <div className="components-wrapper">
          <Header />
          <Hero />

          <div className="graphs-wrapper">{/* <Transactions /> */}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
