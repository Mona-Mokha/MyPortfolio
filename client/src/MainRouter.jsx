import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/Home';
import About from './components/About';
import ProjectsList from './components/ProjectsList';
import ProjectForm from './components/ProjectForm';
import Education from './components/Education';
import Services from './components/Services';
import Contact from './components/Contact';
import Signin from './components/Signin';
import Signup from './components/Signup';

const MainRouter = () => {
  return (
    <div>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/about" element={<About />} />
        <Route path="/projects-list" element={<ProjectsList />} />
        <Route path="/project-details/:id?" element={<ProjectForm />} />
        <Route path="/education" element={<Education />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
