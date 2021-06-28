import React from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import CountryTable from "./components/CountryTable";

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <CountryTable></CountryTable>
      <Footer></Footer>
    </div>
  );
}

export default App;
