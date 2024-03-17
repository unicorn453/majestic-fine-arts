import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import Hero from "./Hero";
function Home() {
  <div className="overview-wrapper">
    <div className="overview-content">
      <div className="components-wrapper">
        <div className="form-wrapper">
          <Header />
        </div>
        <div className="graphs-wrapper">
          <Hero />
          {/* <Transactions /> */}
        </div>
      </div>
    </div>
  </div>;
}

export default Home;
