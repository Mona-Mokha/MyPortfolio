
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const ProjectForm = () => {
    const [project, setProject] = useState({ name: "", description: "", startDate: "", endDate: "" });
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (id) {
            fetch(`/api/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(res => res.json())
                .then(data => setProject(data))
                .catch(err => console.error(err));
        }
    }, [id, token]);

    const handleChange = e => setProject({ ...project, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        const method = id ? "PUT" : "POST";
        const url = id ? `/api/projects/${id}` : `/api/projects`;
        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(project)
        });
        navigate("/projects-list");
    };

    return (
        <div className="form-container">
            <h2>{id ? "Update Project" : "Create Project"}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={project.name} placeholder="Name" onChange={handleChange} required />

                <label htmlFor="description">Description</label>
                <input id="description" name="description" type="text" value={project.description} placeholder="Description" onChange={handleChange} required />

                <label htmlFor="startDate">Start Date</label>
                <input id="startDate" name="startDate" type="date" value={project.startDate?.split("T")[0]} onChange={handleChange} required />

                <label htmlFor="endDate">End Date</label>
                <input id="endDate" name="endDate" type="date" value={project.endDate?.split("T")[0]} onChange={handleChange} required />

                <div className="actions">
                  <button type="submit">{id ? "Update" : "Create"}</button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
