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
    <div className="container mt-5 project-list-container">
      <h1 className="text-center page-title">Projects</h1>

      {projects.length > 0 ? (
        <div className="project-cards-wrapper">
          {projects.map((project) => (
            <div key={project._id} className="project-card shadow-sm">
              <h3 className="project-title">{project.name}</h3>
              <p className="project-description">{project.description}</p>

              <p className="project-dates">
                <strong>Start:</strong>{" "}
                {new Date(project.startDate).toLocaleDateString()} <br />
                <strong>End:</strong>{" "}
                {new Date(project.endDate).toLocaleDateString()}
              </p>

              {user?.role === "admin" ? (
                <div className="d-flex gap-2 mt-3">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate(`/ProjectsForm/${project._id}`)}
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
              ) : (
                <p className="text-muted fst-italic mt-2">View Only</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted mt-4">No projects available.</p>
      )}

      {user?.role === "admin" && (
        <div className="text-center mt-4">
          <button
            className="btn btn-success px-4"
            onClick={() => navigate("/ProjectsForm")}
          >
            Create Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
