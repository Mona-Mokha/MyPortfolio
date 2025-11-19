
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const ProjectForm = () => {
const [project, setProject] = useState({ title: "", firstname: "", lastname: "", email: "", completion: "", description: "" });    const { id } = useParams();
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
        navigate("/projects");
    };

    return (
        <div className="form-container">
<h2>{id ? "Update Project" : "Create Project"}</h2>
<form onSubmit={handleSubmit}>
<label htmlFor="title">Title</label>
<input id="title" name="title" type="text" value={project.title} placeholder="Title" onChange={handleChange} required />


<label htmlFor="firstname">First Name</label>
<input id="firstname" name="firstname" type="text" value={project.firstname} placeholder="First name" onChange={handleChange} required />


<label htmlFor="lastname">Last Name</label>
<input id="lastname" name="lastname" type="text" value={project.lastname} placeholder="Last name" onChange={handleChange} required />


<label htmlFor="email">Email</label>
<input id="email" name="email" type="email" value={project.email} placeholder="Email" onChange={handleChange} required />


<label htmlFor="completion">Completion Date</label>
<input id="completion" name="completion" type="date" value={project.completion?.split("T")[0] || project.completion || ""} onChange={handleChange} required />


<label htmlFor="description">Description</label>
<textarea id="description" name="description" value={project.description} placeholder="Description" onChange={handleChange} required />


<div className="actions">
<button type="submit">{id ? "Update" : "Create"}</button>
</div>
</form>
        </div>
    );
};

export default ProjectForm;
