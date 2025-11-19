import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const EducationList = () => {
  const [education, setEducation] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) return navigate("/signin");

    const fetchEducation = async () => {
      try {
        const res = await fetch("/api/educations", { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error("Failed to fetch education");
        const data = await res.json();
        setEducation(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEducation();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/signin");

      try {
      const res = await fetch(`/api/educations/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error("Failed to delete");
      setEducation(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container mt-5">
      <h1 className="text-center mb-4">Education</h1>
       {user?.role === 'admin' && (
        <div className="create-action text-center mt-3">
          <button className="btn btn-success" onClick={() => navigate('/education/new')}>Create Education</button>
        </div>
      )}

      {education.length ? (
        <div className="list-container">
          {education.map(e => (
            <div key={e._id} className="list-card">
              <h3 className="item-title">{e.title}</h3>
              <p className="item-meta">{e.firstname} {e.lastname}</p>
              <p className="item-meta">{e.email}</p>
              <p className="item-meta">Completed: {new Date(e.completion).toLocaleDateString()}</p>
              <p className="item-description">{e.description}</p>
              {user?.role === 'admin' && (
                <div className="item-actions">
                  <button className="btn btn-sm btn-primary" onClick={() => navigate(`/education/${e._id}`)}>Update</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(e._id)}>Delete</button>
                 </div>
      )}
    </div>
  ))}
</div>

      ) : (
        <p className="text-center text-muted">No education records available.</p>
      )}
    </div>
  );
};

export default EducationList;
