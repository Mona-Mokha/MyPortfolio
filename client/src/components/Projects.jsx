import { useState } from "react";
import dbmsImg from "../assets/images/dbms-shoes.png";
import portfolioImg from "../assets/images/portfolio.png";
import amsImg from "../assets/images/ams.png";

export default function Projects() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [selectedDesc, setSelectedDesc] = useState("");

  const projects = [
    {
      name: "Database Management System - Online Shoe Store",
      img: dbmsImg,
      description:
        "Designed and implemented a database using Oracle Database and SQL Server Developer. Managed customers, products, orders, and returns, ensuring efficient data storage and transaction processing."
    },
    {
      name: "Portfolio Website",
      img: portfolioImg,
      description:
        "Built a responsive portfolio using React and Tailwind CSS. Focused on clean design, smooth navigation, and showcasing skills effectively."
    },
    {
      name: "Asset Management System",
      img: amsImg,
      description:
        "Developed an Asset Management System to catalog and track physical assets. Applied UML design and object-oriented principles to optimize usage."
    }
  ];

  const handleClick = (img, desc) => {
    setSelectedImg(img);
    setSelectedDesc(desc);
  };

  return (
    <div className="projects-page">
      <h2>My Projects</h2>

      {/* Projects Grid */}
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="project-card"
            onClick={() => handleClick(project.img, project.description)}
          >
            <img src={project.img} alt={project.name} />
            <h3>{project.name}</h3>
            <p>{project.description.substring(0, 80)}...</p>
          </div>
        ))}
      </div>

      {/* Modal for Expanded Image */}
      {selectedImg && (
        <div className="modal" onClick={() => setSelectedImg(null)}>
          <div className="modal-content">
            <img src={selectedImg} alt="Expanded Project" />
            <p>{selectedDesc}</p>
          </div>
        </div>
      )}
    </div>
  );
}
