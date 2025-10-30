import webImg from '../assets/images/web.png';
import webImg2 from '../assets/images/database.png';
import webImg3 from '../assets/images/ai.png';
import webImg4 from '../assets/images/uml.png';

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description:
        "Building responsive websites using React, HTML, CSS, and JavaScript.",
      image: webImg, // add a web development icon
    },
    {
      title: "Database Design & Management",
      description:
        "Designing and managing databases using SQL, Oracle, and SQL Server.",
      image: webImg2, // add a database icon
    },
    {
      title: "AI & Machine Learning",
      description:
        "Applying AI principles and building intelligent systems using Python and ML tools.",
      image: webImg3, // add an AI icon
    },
    {
      title: "Software Engineering Support",
      description:
        "Creating UML diagrams, analyzing requirements, and documenting software projects.",
      image: webImg4, // add a UML icon or screenshot
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Services</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 rounded-2xl shadow-lg bg-white"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-16 h-16 mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
