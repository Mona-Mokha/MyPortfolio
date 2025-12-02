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
          <nav className="navbar navbar-expand-md navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand" to="/">
      <img src="/logo.png" alt="Logo" className="w-10 h-10" />
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/about">About Me</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/education">Education</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/services">Services</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/contacts">Contact</Link></li>
      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-md-0">
        {user ? (
          <>
            <li className="nav-item w-100 text-start mb-2 mb-md-0">
              <span className="nav-link">Welcome, {user.name}</span>
            </li>
            <li className="nav-item w-100 text-start mb-2 mb-md-0">
              <button className="btn btn-outline-danger w-100" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item w-100 text-start mb-2 mb-md-0">
              <Link className="btn btn-outline-primary w-100" to="/signin">Sign In</Link>
            </li>
            <li className="nav-item w-100 text-start mb-2 mb-md-0">
              <Link className="btn btn-primary w-100" to="/signup">Sign Up</Link>
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
