import { useState, useEffect } from "react";

const EducationsList = () => {
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    fetch("/api/educations")
      .then(res => res.json())
      .then(setEducations)
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Educations</h2>
      <ul>
        {educations.map(ed => (
          <li key={ed._id}>
            {ed.title} - {ed.firstname} {ed.lastname} ({new Date(ed.completion).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationsList;
