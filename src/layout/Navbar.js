import React from "react";

function Navbar() {
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
        <span className="navbar-brand mb-0 h1">Rest Countries</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
            </ul>
          </div>
        </div>
      </nav>
  );
}
export default Navbar;
