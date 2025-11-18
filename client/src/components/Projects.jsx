import { useNavigate } from "react-router-dom";

const Projects = () => {
    const navigate = useNavigate();
    const staticProjects = [
        { id: 1, name: "Project A", description: "Old static project A" },
        { id: 2, name: "Project B", description: "Old static project B" }
    ];

    return (
        <div className="projects-page">
            <h1 className="text-center">My Projects</h1>
            <div className="projects-grid">
                {staticProjects.map(p => (
                    <div key={p.id} className="project-card">
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                    </div>
                ))}
            </div>
            <button className="btn btn-primary mt-4" onClick={() => navigate("/projects-list")}>
                See All Projects
            </button>
        </div>
    );
};

export default Projects;
