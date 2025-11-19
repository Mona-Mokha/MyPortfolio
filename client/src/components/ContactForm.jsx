

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = body?.error || body?.message || 'Failed to save contact';
        throw new Error(msg);
      }

      // success — navigate to contacts list
      navigate('/contacts');
    } catch (err) {
      console.error(err);
      alert('Unable to save contact: ' + err.message);
    }
  };

  return (
    <div className="contact-page">
      <h2>Contact Me</h2>

      {/* Contact Info Panel */}
      <div className="contact-info-panel">
        <h3>Contact Information</h3>
        <p>Email: mjmokha@gmail.com</p>
        <p>Phone: +1 647 803 5878</p>
        <p>Address: 1275 wintergreen place, Milton Canada</p>
      </div>
      {/* Interactive Form */}
      <div className="form-container">
        <h2>Contact Form</h2>
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <label>Last Name:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="actions">
            <button type="submit">Add Contact</button>
          </div>
        </form>
      </div>
    </div>
  );
}
