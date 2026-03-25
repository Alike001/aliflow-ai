import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./LoginPage.css";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from = location.state?.from?.pathname || "/courses";

  const [email,    setEmail]    = useState("aish@learn.io");
  const [password, setPassword] = useState("aish123");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  async function handleSubmit() {
    setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 600));
    
    const result = login(email, password);

    if (result.ok) {
      setError("");
    } else {
      setError(result.error);
    }

    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div className="login-page">
      <div className="login-page_inner fu">

        <div className="login-page_hero">
          <div className="login-page_logo-icon">💡</div>
          <h1 className="login-page_heading">Continue Your Learning</h1>
          <p className="login-page_subheading">
            Sign in to continue learning
          </p>
        </div>

        <div className="login-page_card">

          <div className="login-page_hint">
            <strong>Demo credentials pre-filled</strong>
            {" "} just click Sign in
          </div>

          <div className="login-page_field">
            <label className="login-page_label">
              Email
            </label>
            <input
              className="login-page_input"
              type="email"
              value={email}
              placeholder="aish@learn.io"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="login-page_field">
            <label className="login-page_label">
              Password
            </label>
            <input
              className="login-page_input"
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {error && (
            <div className="login-page_error">
              {error}
            </div>
          )}

          <button
            className="login-page_submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>

        </div>

        <p className="login-page_alt-hint">
          Alt account:{" "}
          <strong>hoye@learn.io</strong> / <strong>hoye1234</strong>
        </p>

      </div>
    </div>
  );
}