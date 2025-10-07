import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error
    setError("");
    setLoading(true);

    try {
      // Gọi API đăng nhập
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
        rememberMe,
      });

      console.log("Login success:", response.data);

      // Lưu token và thông tin user
      if (response.data.token) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", response.data.token);

        if (response.data.user) {
          storage.setItem("user", JSON.stringify(response.data.user));
        }
      }

      // Chuyển hướng sau khi đăng nhập thành công
      navigate("/");
    } catch (err) {
      console.error("Error:", err);

      // Xử lý lỗi
      if (err.response) {
        setError(err.response.data.error || "Đăng nhập thất bại!");
      } else if (err.request) {
        setError("Không thể kết nối đến server!");
      } else {
        setError("Có lỗi xảy ra!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center">
          <img src="/logoSnack.png" className="w-20 h-20" alt="logo" />
        </div>

        <h1 className="text-center text-3xl font-semibold text-gray-900 mb-8">
          Đăng nhập
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email field */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Tài khoản
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
              placeholder="Email hoặc tài khoản"
              disabled={loading}
            />
          </div>

          {/* Password field */}
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-2">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12"
                required
                placeholder="Nhập mật khẩu"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Ẩn" : "Hiện"}
              </button>
            </div>
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              disabled={loading}
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
              Nhớ mật khẩu
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-full font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Forgot password link */}
        <div className="text-center mt-6">
          <a href="#" className="text-sm text-gray-700 hover:underline">
            Quên mật khẩu
          </a>
        </div>

        {/* Register link */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Bạn chưa có tài khoản? </span>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-sm text-blue-600 hover:underline font-medium bg-transparent border-none cursor-pointer"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
