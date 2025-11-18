import "./forms.css";


import { useState } from "react";

export default function ContactForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact data:", { firstname, lastname, email });
    // TODO: call your API POST /api/contacts
  };

  return (
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
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}
