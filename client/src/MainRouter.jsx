import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/Home';
import About from './components/About';
import ProjectsList from './components/ProjectsList';
import ProjectForm from './components/ProjectForm';
import Education from './components/Education';
import Services from './components/Services';
import ContactsList from './components/ContactsList';
import ContactForm from './components/ContactForm';
import Signin from './components/Signin';
import Signup from './components/Signup';



const MainRouter = () => {
  return (
    <div>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projectsList" element={<ProjectsList />} />
        <Route path="/ProjectsForm" element={<ProjectForm />} />
        <Route path="/ProjectsForm/:id" element={<ProjectForm />} />
        {/* Contacts routes: list and form (new/edit) */}
        <Route path="/contacts" element={<ContactsList />} />
        <Route path="/contacts/new" element={<ContactForm />} />
        <Route path="/contacts/:id" element={<ContactForm />} />
        
      </Routes>
    </div>
  );
}

export default MainRouter;
