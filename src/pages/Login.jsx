import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { POST } from "../Utility/POST";
import { useTheme } from "../context/ThemeProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { Auth, SetAuth } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.Token) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const login = await POST("Login", form,false);
    if (login) {
      //save token to localStorage
      console.log(login.token);
      localStorage.setItem("Token", JSON.stringify(login.token));

      SetAuth(true);
      setLoading(false);
      navigate("/Blog");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[--color-primary] to-[--color-secondary] dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-8 relative">
        {/* Judul */}
        <h2 className="text-3xl font-bold text-center text-primary-dark dark:text-primary mb-6">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Masuk untuk melanjutkan ke dashboard Anda
        </p>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type="text"
              name="username"
              placeholder="username"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[--color-secondary]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600  dark:hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[--color-secondary] bg-slate-900 dark:bg-slate-700  text-white dark:text-primary font-semibold shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
