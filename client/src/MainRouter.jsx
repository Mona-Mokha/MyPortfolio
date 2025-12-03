import { Routes, Route } from 'react-router-dom';
import ContactsList from './components/ContactsList.jsx';
import ContactForm from './components/ContactForm.jsx';
import EducationForm from './components/EducationForm.jsx';
import EducationsList from './components/EducationsList.jsx';
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import ProjectsList from './components/ProjectsList.jsx';
import ProjectForm from './components/ProjectForm.jsx';
import Services from './components/Services.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';



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
        <Route path="/education" element={<EducationsList />} />
        <Route path="/education/new" element={<EducationForm />} /> 
        <Route path="/education/new/:id" element={<EducationForm />} />
        <Route path="/education/:id" element={<EducationForm />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/form" element={<ProjectForm />} />
        <Route path="/projects/form/:id" element={<ProjectForm />} />
        <Route path="/contacts/new" element={<ContactForm />} />
        <Route path="/contacts/:id" element={<ContactForm />} />
        <Route path="/contacts" element={<ContactsList />} />
        <Route path="/contacts/new" element={<ContactForm />} />
        <Route path="/contacts/:id" element={<ContactForm />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
