import React from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import CountryTableContainer from "./components/CountryTableContainer";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <CountryTableContainer></CountryTableContainer>
      <Footer></Footer>
    </div>
  );
}

export default App;
