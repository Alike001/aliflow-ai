import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar_inner">

        <Link to="/" className="navbar_logo">
          <div className="navbar_logo-icon">💡</div>
          <span className="navbar_logo-text">AliFlow AI</span>
        </Link>

        {isAuthenticated && (
          <div className="navbar_links">
            {[
              { to: "/courses",   label: "Catalog"   },
              { to: "/dashboard", label: "Dashboard" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="navbar_link"
              >
                {label}
              </Link>
            ))}

          </div>
        )}

        <div className="navbar_actions">

          {isAuthenticated ? (
            <>
              <div className="navbar_avatar-chip">
                <div className="navbar_avatar-circle">
                  {user.avatar}
                </div>
                <span className="navbar_avatar-name">
                  {user.name.split(" ")[0]}
                </span>
              </div>

              <button
                className="navbar_signout-btn"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </>

          ) : (

            <Link to="/login">
              <button className="navbar_signin-btn">
                Sign in
              </button>
            </Link>

          )}

        </div>
      </div>
    </nav>
  );
}