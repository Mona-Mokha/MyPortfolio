import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ContactForm = () => {
  const [contact, setContact] = useState({ firstname: '', lastname: '', email: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      fetch(`/api/contacts/${id}`, { headers: { Authorization: `Bearer ${token}` }})
        .then(res => res.json())
        .then(data => setContact(data))
        .catch(err => console.error(err));
    }
  }, [id, token]);

  const handleChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/contacts/${id}` : '/api/contacts';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(contact)
    });
    navigate('/contacts');
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Update Contact' : 'Create Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input name="firstname" value={contact.firstname} onChange={handleChange} required />

        <label>Last Name</label>
        <input name="lastname" value={contact.lastname} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={contact.email} onChange={handleChange} required />

        <div className="actions">
          <button type="submit">{id ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
