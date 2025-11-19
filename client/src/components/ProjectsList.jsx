import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !user) {
      navigate("/signin");
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch projects");

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      }
    };

    fetchProjects();
  }, [user, navigate]);

  const handleDelete = async (projectId) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/signin");

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed");

      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  return (
    <div className="form-container mt-5">
      <h1 className="text-center mb-4">Projects</h1>
{user?.role === "admin" && (
        <div className="create-action text-center mt-4">
          <button
            className="btn btn-success px-4"
            onClick={() => navigate("/projects/form")}
          >
            Create Project
          </button>
        </div>
      )}
      {projects.length > 0 ? (
        <div className="list-container">
          {projects.map((project) => (
            <div key={project._id} className="list-card">
              <h3 className="item-title">{project.title}</h3>
              <p className="item-description">{project.description}</p>

              <p className="item-meta">
                <strong>Completion:</strong>{" "}
                {project.completion ? new Date(project.completion).toLocaleDateString() : '—'}
              </p>

              {user?.role === 'admin' && (


                <div className="item-actions">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/projects/form/${project._id}`)}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                </div>
              ) }
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted mt-4">No projects available.</p>
      )}

      
    </div>
  );
};

export default ProjectsList;
