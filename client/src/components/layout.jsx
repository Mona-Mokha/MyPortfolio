
import { Link } from 'react-router-dom';


function Layout() {
  return (
    <>
      <header className="flex items-center justify-between p-4 shadow-md bg-white">
        {/* Logo + site name */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        
        </Link>
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/about">About Me</Link> | 
          <Link to="/projects">Projects</Link> | 
          <Link to="/education">Education</Link> | 
          <Link to="/services">Services</Link> | 
          <Link to="/contact">Contact Me</Link>
        </nav>
        <br/>
        <hr />
      </header>
    </>
  );
}

export default Layout;