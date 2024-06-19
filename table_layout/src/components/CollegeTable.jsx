import React, { useState, useEffect } from "react";
import "./CollegeTable.css";

const CollegeTable = ({ colleges }) => {
  const [visibleColleges, setVisibleColleges] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showToast, setShowToast] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const filteredColleges = colleges.filter((college) =>
      college.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setVisibleColleges(filteredColleges.slice(0, page * itemsPerPage));

    if (searchQuery && filteredColleges.length > 0) {
      setShowToast({ message: "Search result found", type: "success" });
    } else if (searchQuery && filteredColleges.length === 0) {
      setShowToast({ message: "No search result found", type: "error" });
    }
  }, [page, searchQuery, colleges]);

  const sortColleges = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });

    const sortedColleges = [...colleges].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setVisibleColleges(sortedColleges.slice(0, page * itemsPerPage));
  };

  const handleScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setVisibleColleges(
      colleges
        .filter((college) =>
          college.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, itemsPerPage)
    );
  };

  const renderToast = () => {
    if (showToast) {
      return (
        <div className={`toast ${showToast.type}`}>{showToast.message}</div>
      );
    }
    return null;
  };

  return (
    <div className="college-table-container" onScroll={handleScroll}>
      {renderToast()}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by college name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortColleges("name")}>
              College Name
              <span>
                {sortConfig.key === "name"
                  ? sortConfig.direction === "ascending"
                    ? " ▲"
                    : " ▼"
                  : " ▲"}
              </span>
            </th>
            <th onClick={() => sortColleges("collegedunia_rating")}>
              Rating
              <span>
                {sortConfig.key === "collegedunia_rating"
                  ? sortConfig.direction === "ascending"
                    ? " ▲"
                    : " ▼"
                  : " ▲"}
              </span>
            </th>
            <th onClick={() => sortColleges("fees")}>
              Fees
              <span>
                {sortConfig.key === "fees"
                  ? sortConfig.direction === "ascending"
                    ? " ▲"
                    : " ▼"
                  : " ▲"}
              </span>
            </th>
            <th onClick={() => sortColleges("user_review_rating")}>
              User Review
              <span>
                {sortConfig.key === "user_review_rating"
                  ? sortConfig.direction === "ascending"
                    ? " ▲"
                    : " ▼"
                  : " ▲"}
              </span>
            </th>
            <th>Featured</th>
          </tr>
        </thead>
        <tbody>
          {visibleColleges.length > 0 ? (
            visibleColleges.map((college, index) => (
              <tr key={index}>
                <td>{college.name}</td>
                <td>{college.collegedunia_rating}</td>
                <td>{college.fees}</td>
                <td>{college.user_review_rating}</td>
                <td>{college.featured ? "Yes" : "No"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No search results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CollegeTable;
