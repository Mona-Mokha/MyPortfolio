import "./App.css";


import { useState } from "react";

export default function EducationForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completion, setCompletion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Education data:", { title, description, completion });
    // TODO: call your API POST /api/educations
  };

  return (
    <div className="form-container">
      <h2>Education Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label>Completion Date:</label>
        <input
          type="date"
          value={completion}
          onChange={(e) => setCompletion(e.target.value)}
          required
        />
        <button type="submit">Add Education</button>
      </form>
    </div>
  );
}
