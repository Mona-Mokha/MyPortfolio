import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) return navigate("/signin");

    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contacts", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch contacts");
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContacts();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/signin");

    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete");
      setContacts(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h1 className="text-center mb-4">Contacts</h1>
      
      
      {user?.role === 'admin' && (
        <div className="create-action text-center mt-3">
          <button className="btn btn-success" onClick={() => navigate('/contacts/new')}>Create Contact</button>
        </div>
      )}

      {contacts.length ? (
        <div className="list-container">
  {contacts.map(c => (
    <div key={c._id} className="list-card">
      <h3 className="item-title">{c.firstname} {c.lastname}</h3>
      <p className="item-meta">{c.email}</p>
      {user?.role === 'admin' && (
        <div className="item-actions">
          <button className="btn btn-sm btn-primary" onClick={() => navigate(`/contacts/${c._id}`)}>Update</button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      )}
    </div>
  ))}
</div>
      ) : (
        <p className="text-center text-muted">No contacts available.</p>
      )}
      
      <h2>Contact Me</h2>
      {/* Contact Info Panel */}
      <div className="contact-info-panel">
        <h3>Contact Information</h3>
        <p>Email: mjmokha@gmail.com</p>
        <p>Phone: +1 647 803 5878</p>
        <p>Address: 1275 wintergreen place, Milton Canada</p>
      </div>
    </div>
  );
};

export default ContactsList;
