import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Captured Data:", formData); // Just to check input
    navigate("/"); // Redirect to Home Page
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
        <h3>Send a Message</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor="contactNumber">Contact Number</label>
          <input
            id="contactNumber"
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <div className="actions">
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
