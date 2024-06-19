import React, { useState, useEffect } from "react";
import CollegeTable from "./components/CollegeTable";
// import SearchBar from "./components/SearchBar";
import collegesData from "./data/college.json";
import "./style.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    setColleges(collegesData);
  }, []);

  return (
    <div className="app">
      {/* <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
      <CollegeTable colleges={colleges} searchQuery={searchQuery} />
    </div>
  );
};

export default App;
