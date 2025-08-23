// src/Components/Navbar.js
import React from "react";
import { MdLogout } from "react-icons/md";
import "../Styles/custom.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-left flex items-center gap-2 px-4 py-3">
        <img
          className="brand-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Standard_Chartered_Logo_%282021%2C_Logo_only%29.svg"
          alt="SC Logo"
        />
        <span className="brand-name">
          <h3>
            Standard <br /> Chartered
          </h3>
        </span>
      </div>

      <div className="navbar-right">
        {/* Just the icon — no handler attached */}
        <MdLogout size={30} color="white" className="nav-icon" />
      </div>
    </div>
  );
}

export default Navbar;
