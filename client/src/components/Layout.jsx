// src/components/Layout.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <header>
        <nav className="navbar">
          <div className="container">
            {/* Logo */}
            <Link className="navbar-brand" to="/">
              <img src="/logo.png" alt="Logo" className="logo" />
            </Link>

           

            {/* Navbar links */}
            <div className={`collapse navbar-collapse ${navOpen ? 'show' : ''}`}>
              <ul className="navbar-nav me-auto">
                <li><Link className="nav-link" to="/">Home</Link></li>
                <li><Link className="nav-link" to="/about">About Me</Link></li>
                <li><Link className="nav-link" to="/projects">Projects</Link></li>
                <li><Link className="nav-link" to="/education">Education</Link></li>
                <li><Link className="nav-link" to="/services">Services</Link></li>
                <li><Link className="nav-link" to="/contacts">Contact</Link></li>
              </ul>

              <ul className="navbar-nav ms-auto">
                {user ? (
                  <>
                    <li className="nav-link">Welcome, {user.name}</li>
                    <li>
                      <button onClick={handleSignOut}>Sign Out</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="btn btn-signin" to="/signin">Sign In</Link>
                    </li>
                    <li>
                      <Link className="btn btn-signup" to="/signup">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Page container */}
      <div className="page-container">
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
