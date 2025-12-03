import { Link, Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <h2>Mini Learning App</h2>
        </Link>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {user && user.role === "admin" && (
            <Link to="/admin/lessons">Admin Panel</Link>
          )}
          {user && <span>XP: {user.xp}</span>}
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link> |{" "}
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </header>
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
