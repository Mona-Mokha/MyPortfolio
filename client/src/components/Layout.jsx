// src/components/Layout.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About Me</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/education">Education</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contacts">Contact</Link></li>
            </ul>

            <ul className="navbar-nav ms-auto">
              {user ? (
            <>
              <li className="nav-item nav-link">Welcome, {user.name}</li>
              <li className="nav-item">
                <button className="btn btn-outline-danger me-2" onClick={handleSignOut}>
                  Sign Out
                </button>
              </li>
            </>
              ) : (
            <>
              <li className="nav-item">
                <Link className="btn btn-outline-primary me-2" to="/signin">Sign In</Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary" to="/signup">Sign Up</Link>
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
