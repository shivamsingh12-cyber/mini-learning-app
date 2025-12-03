import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (e: any) {
      setError(e.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        {error && (
          <p className="text-red-400 text-center mb-4 text-sm">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Login
          </button>
        </div>

        <p className="text-gray-400 text-sm text-center mt-6">
          No account?{" "}
          <Link className="text-blue-400 hover:text-blue-500" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
