"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    issue: "",
    email: "",
    rollNumber: "",
    severity: "Low",
    companyName: "",
    category: "",
    reply: '',
    status: 'open'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    response.ok ? alert("Ticket created successfully!") : alert("Failed to create ticket.");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <h2>Ticketing System</h2>
        </div>
        <ul className="navbar-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/view">View Tickets</Link></li>
        </ul>
      </nav>

      {/* Ticket creation form */}
      <div className="container">
        <h1 className="page-title">Create a Ticket</h1>
        <form onSubmit={handleSubmit} className="ticket-form">
          <label htmlFor="issue">Issue:</label>
          <input type="text" name="issue" value={formData.issue} onChange={handleChange} required />

          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="rollNumber">University Roll Number:</label>
          <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />

          <label htmlFor="severity">Severity:</label>
          <select name="severity" value={formData.severity} onChange={handleChange} required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label htmlFor="companyName">Company Name:</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />

          <label htmlFor="category">Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select a category</option>
            <option value="OD for Placement Activities">OD for Placement Activities</option>
            <option value="ReCAT">ReCAT</option>
            <option value="Problems in Link/Company Portal">Problems in Link/Company Portal</option>
            <option value="Unclear Eligibility Criteria">Unclear Eligibility Criteria</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>

          <button type="submit" className="submit-button">Submit Ticket</button>
        </form>

        <Link href="/view">
          <button className="view-tickets-btn">View Tickets</button>
        </Link>
      </div>

      {/* Styles */}
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
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #f4f7f9;
          border: 1px solid #1b5e20;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .page-title {
          text-align: center;
          font-size: 2rem;
          color: #1b5e20;
          font-weight: bold;
          margin-bottom: 2rem;
        }
        .ticket-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        label {
          color: black; /* Set label text color to black */
          font-weight: bold;
        }
        input,
        select {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          color: black;
          background-color: #f9f9f9;
        }
        button {
          padding: 0.75rem;
          background-color: #1b5e20;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #2e7d32;
        }
        .view-tickets-btn {
          margin-top: 1rem;
          width: 100%;
          text-align: center;
          padding: 0.75rem;
          background-color: #388e3c;
          color: white;
          font-weight: bold;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .view-tickets-btn:hover {
          background-color: #2e7d32;
        }
      `}</style>
    </div>
  );
}
