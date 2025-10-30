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
      <div className="contact-form">
        <h3>Send a Message</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
