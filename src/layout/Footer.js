import React from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import "../style.css";

function Footer() {
  return (
    <footer className="text-center mt-auto py-3  bg-light">
      <div className="container pt-3">
        <h3>Contact Me</h3>
        <section className="d-flex justify-content-center mb-2">
          <a
            className="btn text-dark m-3 p-3 icon"
            href="https://github.com/akinkemer"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub size="2em" />
          </a>
          <a
            className="btn text-dark m-3 p-3 icon"
            href="https://www.linkedin.com/in/akinkemer/"
            target="_blank"
            rel="noreferrer"
          >
            <FiLinkedin size="2em" />
          </a>
          <a
            className="btn text-dark m-3 p-3 icon"
            href="mailto:kemerakin@gmail.com"
          >
            <FiMail size="2em" />
          </a>
        </section>
      </div>

      <div
        className="text-center text-dark p-3"
        style={{ backgroundColor: "#dcdcdc" }}
      >
        © {new Date().getFullYear()} Copyright:
        <a className="text-dark" href="mailto:kemerakin@gmail.com" id="footer">
          Akın Kemer
        </a>
      </div>
    </footer>
  );
}
export default Footer;
