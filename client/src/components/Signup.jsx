// src/pages/Signup.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Signup = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    // don't call e.preventDefault() on change handlers
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1) Create the user
      const createRes = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (!createRes.ok) {
        // try to extract error message
        const errBody = await createRes.json().catch(() => null);
        throw new Error(errBody?.error || errBody?.message || "Signup failed");
      }

      // Backend returns message (no token). Now sign the user in to get a token.
      const signinRes = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!signinRes.ok) {
        const errBody = await signinRes.json().catch(() => null);
        throw new Error(errBody?.error || "Signin after signup failed");
      }

      const data = await signinRes.json();
      // API returns { token, user: { _id, name, email, role } }
      // Use the AuthContext login so context + localStorage are updated
      if (login) login(data.token, data.user.name, data.user.role ?? "user");

      // keep backward-compatibility if a parent passed setUser
      if (setUser) setUser({ name: data.user.name, role: data.user.role });

      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          required
        />

        <label htmlFor="password">Password (min 6 chars)</label>
        <input
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          minLength={6}
          required
        />

        <div className="actions">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
