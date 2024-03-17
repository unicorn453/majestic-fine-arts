import React from "react";

function ArtistsGrid() {
  return (
    <div>
      {" "}
      <div className="subHeading">
        <h3>Shop by Artist</h3>
      </div>
      <section id="categoryGrid">
        <a
          href="./ameglio.html"
          target="_blank"
          id="ameglio"
          className="categoryGridArea"
        >
          <div className="heading">Ameglio</div>
        </a>
        <div id="artist1" className="categoryGridArea">
          <div className="heading">artist1</div>
        </div>
        <div id="artist2" className="categoryGridArea">
          <div className="heading">artist2</div>
        </div>
        <div id="artist3" className="categoryGridArea">
          <div className="heading">artist3</div>
        </div>
        <div id="artist4" className="categoryGridArea">
          <div className="heading">artist4</div>
        </div>
      </section>
    </div>
  );
}

export default ArtistsGrid;
