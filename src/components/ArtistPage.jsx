import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import artistsData from "../data/artists.json"; // Import artists data from JSON file
import "../css/ameglio.css";

function ArtistPage() {
  let { id } = useParams(); // Get the artist ID from the URL

  // State to track artist information
  const [artistInfo, setArtistInfo] = useState(null);

  // Effect to fetch artist data when component mounts or id changes
  useEffect(() => {
    // Fetch artist data from imported JSON file
    const data = artistsData[id];
    if (data) {
      setArtistInfo(data);
    } else {
      // Handle case where artist data is not found
      console.error(`Artist with ID ${id} not found`);
    }
  }, [id]);

  // State to track whether the image is popped out or not
  const [isPoppedOut, setIsPoppedOut] = useState(false);

  // Function to toggle the pop-out state
  const togglePopOut = () => {
    setIsPoppedOut(!isPoppedOut);
  };

  // Render loading indicator if artist info is being fetched
  if (!artistInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Artist: {artistInfo.name}</h2>
      <section className="heroArtist">
        <div className="artistInfo">
          <h2>{artistInfo.name}</h2>
          <p>
            {artistInfo.nationality} | {artistInfo.lifespan}
          </p>
          <p>{artistInfo.bio}</p>
        </div>
      </section>

      <div className="container text-center">
        <div className="row g-2">
          <div className="col-6">
            <div
              className={`p-3 ${isPoppedOut ? "pop-out" : ""}`}
              onClick={togglePopOut}
            >
              <img
                src={artistInfo.image} // Use image URL from artist data
                alt={artistInfo.name}
              />
              {/* <div className="pictureText">
                <h2>Heading</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente excepturi, odit ut molestias voluptas repellat
                  blanditiis accusamus consequatur autem. Eos?
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPage;
