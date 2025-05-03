import React, { useState } from "react";
import { NavLink } from "react-router-dom"; 

const Header = ({ toggleCartModal }) => {
  const [showCollapsedMenu, setShowCollapsedMenu] = useState(false);

  const toggleMenu = () => {
    setShowCollapsedMenu((prevShowCollapsedMenu) => !prevShowCollapsedMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Majestic Fine Arts
        </a>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarSupportedContent"
          aria-expanded={showCollapsedMenu ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={
            "collapse navbar-collapse" + (showCollapsedMenu ? " show" : "")
          }
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                activeclassname="active"
                exact={true.toString()}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/aboutUs"
                className="nav-link"
                activeclassname="active"
                exact={true.toString()}
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-link"
                activeclassname="active"
                exact={true.toString()}
              >
                Contact
              </NavLink>
            </li>
            {/* Shopping Cart Link replaced by a Button */}
            <li className="nav-item">
              <button
                onClick={toggleCartModal}  // Toggle the cart modal when clicked
                className="nav-link btn btn-link"
              >
                Shopping Cart
              </button>
            </li>
            <li className="nav-item">
              <NavLink
                to="/checkout"
                className="nav-link"
                activeclassname="active"
                exact={true.toString()}
              >
                Checkout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
