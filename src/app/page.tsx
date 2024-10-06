"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    issue: "",
    email: "",
    rollNumber: "",
    severity: "Low", // Default severity set to 'Low'
    companyName: "",
    category: "",
    reply: '',  // Reply will be empty initially
    status: 'open'  // Status will be open initially
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // POST request to create a ticket
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Ticket created successfully!");
    } else {
      alert("Failed to create ticket.");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <h2>Ticketing System</h2>
        </div>
        <ul className="navbar-links">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/view">View Tickets</Link>
          </li>
        </ul>
      </nav>

      {/* Landing page content */}
      <div className="container">
        <h1>Create a Ticket</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="issue">Issue:</label>
          <input
            type="text"
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="rollNumber">University Roll Number:</label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            required
          />

          <label htmlFor="severity">Severity:</label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />

          <label htmlFor="category">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="OD for Placement Activities">
              OD for Placement Activities
            </option>
            <option value="ReCAT">ReCAT</option>
            <option value="Problems in Link/Company Portal">
              Problems in Link/Company Portal
            </option>
            <option value="Unclear Eligibility Criteria">
              Unclear Eligibility Criteria
            </option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>

          <button type="submit">Submit Ticket</button>
        </form>

        {/* Button to View Tickets */}
        <Link href="/view">
          <button className="view-tickets-btn">View Tickets</button>
        </Link>
      </div>

      {/* Add styles inline or in globals.css */}
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          background-color: #333;
          padding: 1rem;
          color: white;
        }
        .navbar-links {
          list-style: none;
          display: flex;
          gap: 1rem;
        }
        .navbar-links a {
          color: white;
          text-decoration: none;
        }
        .container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        input,
        select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          color: black; /* Set the text color to black */
        }
        button {
          padding: 0.75rem;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #555;
        }
        .view-tickets-btn {
          margin-top: 1rem;
          background-color: #0070f3;
          align-self: center;
        }
        .view-tickets-btn:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
}
