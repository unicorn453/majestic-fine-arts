import React from "react";

function Footer() {
  return (
    <div>
      <footer className="footer">
        <a
          href="https://www.instagram.com/de_busschere_fine_arts/"
          className="ig"
          target="_blank"
        >
          <h4>Instagram</h4>
        </a>

        <a
          href="https://www.google.com/maps/place/de+Beukelaer+%26+de+Bussch%C3%A8re+Fine+Arts/@51.2167034,4.3925864,17z/data=!3m1!4b1!4m6!3m5!1s0x47c3f7460dca8f2b:0xabb192bfb6062198!8m2!3d51.2167001!4d4.3951667!16s%2Fg%2F11fl9j1kjb?entry=ttu"
          target="_blank"
        >
          <h4>Maps</h4>
        </a>

        <a href={`mailto:paintings@debusschere.eu`} className="pn">
          <h4>Email</h4>
        </a>
      </footer>
    </div>
  );
}

export default Footer;
