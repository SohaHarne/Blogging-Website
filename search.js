import React, { useState } from "react";
import "./search.css";
function Search() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/search?query=${query}`
      );
      console.log("Status:", response.status);

      const data = await response.json();
      console.log("Data:",data)

      setResults(data);

      const updatedHistory = history.includes(query)
        ? history
        : [query, ...history];

      setHistory(updatedHistory);

      localStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
  <div className="search-container">
    <div className="search-card">

      <h1 className="search-title">Search Users</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search accounts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="content-area">

        <div className="history-section">
          <h2>Recent Searches</h2>

          {history.length === 0 ? (
            <p>Search history will appear here.</p>
          ) : (
            <ul className="history-list">
              {history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="results-section">
          <h2>Results</h2>

          {results.length === 0 ? (
            <p className="no-results">No users found</p>
          ) : (
            results.map((user) => (
              <div className="result-card" key={user.id}>
                <strong>@{user.name}</strong>
                <p>{user.email}</p>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  </div>
);}

export default Search;
