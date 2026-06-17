import React, { useState } from "react";

const JOBS = [
  { id: 1, title: "Frontend Developer", company: "Acme", location: "Karachi", desc: "React, JavaScript" },
  { id: 2, title: "Backend Engineer", company: "TechCo", location: "Lahore", desc: "Node, Express" },
  { id: 3, title: "Fullstack Developer", company: "StartupX", location: "Islamabad", desc: "MERN" },
  { id: 4, title: "Data Analyst", company: "DataCorp", location: "Karachi", desc: "SQL, Python" }
];

export default function Search() {
  const [query, setQuery] = useState("");

  const results = JOBS.filter((job) =>
    `${job.title} ${job.company} ${job.location} ${job.desc}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2>Search Jobs</h2>
      <input
        className="search"
        placeholder="Search by title, company, location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="results">
        {results.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          results.map((job) => (
            <div key={job.id} className="job">
              <h3>{job.title}</h3>
              <p>{job.company} • {job.location}</p>
              <p>{job.desc}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}