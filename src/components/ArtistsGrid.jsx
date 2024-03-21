import React from "react";
import { Link } from "react-router-dom";
import "../css/styles.css";

function ArtistsGrid() {
  return (
    <div>
      <div className="subHeading">
        <h3>Shop by Artist</h3>
      </div>
      <section id="categoryGrid">
        <Link to="/artist/ameglio" className="categoryGridArea" id="ameglio">
          <div className="heading">Ameglio</div>
        </Link>
        <Link to="/artist/artist1" className="categoryGridArea" id="artist1">
          <div className="heading">artist1</div>
        </Link>
        <Link to="/artist/artist2" className="categoryGridArea" id="artist2">
          <div className="heading">artist2</div>
        </Link>
        <Link to="/artist/artist3" className="categoryGridArea" id="artist3">
          <div className="heading">artist3</div>
        </Link>
        <Link to="/artist/artist4" className="categoryGridArea" id="artist4">
          <div className="heading">artist4</div>
        </Link>
      </section>
    </div>
  );
}

export default ArtistsGrid;
