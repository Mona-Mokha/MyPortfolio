import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EducationForm = () => {
  const [edu, setEdu] = useState({ title: '', firstname: '', lastname: '', email: '', completion: '', description: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      fetch(`/api/educations/${id}`, { headers: { Authorization: `Bearer ${token}` }})
        .then(res => res.json())
        .then(data => setEdu(data))
        .catch(err => console.error(err));
    }
  }, [id, token]);

  const handleChange = e => setEdu({ ...edu, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/educations/${id}` : '/api/educations';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(edu)
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || body.message || 'Request failed');
      }

      // only navigate back when the create/update succeeded
      navigate('/education');
    } catch (err) {
      console.error('Education submit error:', err);
      // show a simple alert for now so user sees the failure (can replace with UI error)
      alert(err.message || 'Failed to save education');
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? 'Update Education' : 'Create Education'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input name="title" value={edu.title} onChange={handleChange} required />

        <label>First Name</label>
        <input name="firstname" value={edu.firstname} onChange={handleChange} required />

        <label>Last Name</label>
        <input name="lastname" value={edu.lastname} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={edu.email} onChange={handleChange} required />

        <label>Completion Date</label>
        <input type="date" name="completion" value={edu.completion?.split('T')[0]} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={edu.description} onChange={handleChange} required />

        <div className="actions">
          <button type="submit">{id ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
};

export default EducationForm;
