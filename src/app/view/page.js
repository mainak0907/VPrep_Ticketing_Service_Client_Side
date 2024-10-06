'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ViewTickets() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('');
  const [showReplies, setShowReplies] = useState({}); // To track visibility of replies for each ticket

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await fetch('/api/tickets');
      const data = await res.json();
      setTickets(data);
    };

    fetchTickets(); // Fetch initially

    // Set interval to refresh every 180 seconds
    const intervalId = setInterval(fetchTickets, 180000); // 180000 ms = 180 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const toggleReplyVisibility = (ticketId) => {
    setShowReplies((prevState) => ({
      ...prevState,
      [ticketId]: !prevState[ticketId], // Toggle visibility of the reply
    }));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredTickets = filter
    ? tickets.filter((ticket) => ticket.category === filter)
    : tickets;

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <h2>Ticketing System</h2>
        </div>
        <ul className="navbar-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/view">View Tickets</Link></li>
        </ul>
      </nav>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-black mb-6">View Tickets</h1>
          <div className="mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
            >
              <option value="">All Categories</option>
              <option value="OD for Placement Activities">OD for Placement Activities</option>
              <option value="ReCAT">ReCAT</option>
              <option value="Problems in Link/Company Portal">Problems in Link/Company Portal</option>
              <option value="Unclear Eligibility Criteria">Unclear Eligibility Criteria</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <ul className="space-y-4">
            {filteredTickets.map((ticket) => (
              <li key={ticket._id} className="bg-white shadow-lg p-4 rounded-md relative">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-black">{ticket.companyName}</h3>
                    <p className="text-black">{ticket.issue}</p>
                    <span className="block mt-2 text-sm text-black">Category: {ticket.category}</span>
                  </div>

                  {/* Email, Roll No, and Status */}
                  <div className="text-right text-sm text-gray-600">
                    <p>Email: {ticket.email}</p>
                    <p>Roll No: {ticket.rollNumber}</p>
                    {/* Display status with color */}
                    <p className={`text-sm mt-2 font-bold ${ticket.status === 'Open' ? 'text-green-500' : 'text-red-500'}`}>
                      Status: {ticket.status}
                    </p>
                    {/* Format and show creation time */}
                    <p className="text-sm text-black">Created: {formatDate(ticket.createdAt)}</p>
                  </div>
                </div>

                {/* View Reply Button */}
                <button
                  onClick={() => toggleReplyVisibility(ticket._id)}
                  className="mt-4 text-blue-600 underline"
                >
                  {showReplies[ticket._id] ? 'Hide Reply' : 'View Reply'}
                </button>

                {/* Show reply if the button is clicked */}
                {showReplies[ticket._id] && (
                  <div className="mt-2 p-4 bg-gray-200 rounded-md">
                    <p className="text-black">{ticket.reply || 'No reply yet.'}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
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
      `}</style>
    </div>
  );
}
