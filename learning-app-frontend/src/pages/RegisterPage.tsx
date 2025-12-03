import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (e: any) {
      setError(e.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create an Account
        </h2>

        {error && (
          <p className="mb-4 text-red-400 bg-red-900/30 p-2 rounded text-sm text-center">
            {error}
          </p>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="text-gray-300 text-sm">Name</label>
          <input
            className="w-full mt-1 px-3 py-2 bg-gray-700 text-white rounded-lg 
                       outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-gray-300 text-sm">Email</label>
          <input
            className="w-full mt-1 px-3 py-2 bg-gray-700 text-white rounded-lg 
                       outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-gray-300 text-sm">Password</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 bg-gray-700 text-white rounded-lg 
                       outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Role Selector */}
        <div className="mb-4">
          <label className="text-gray-300 text-sm block mb-1">Role</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={role === "user"}
                onChange={() => setRole("user")}
                className="text-indigo-500"
              />
              <span className="text-gray-300">User</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
                className="text-indigo-500"
              />
              <span className="text-gray-300">Admin</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={submit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg 
                     transition-all mt-2 font-semibold"
        >
          Register
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
