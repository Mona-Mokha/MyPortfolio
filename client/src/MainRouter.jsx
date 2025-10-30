import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Education from './components/Education';
import Services from './components/Services';
import Contact from './components/Contact';


const MainRouter = () => {
    return (
    
        <div>
        <Layout />
        
        <Routes>
            <Route path="/" element={<Home />} />   
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

        </Routes>
        </div>
        

    )
}  
export default MainRouter; 