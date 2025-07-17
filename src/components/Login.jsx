import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/css/style.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    // Nếu có state từ Đăng ký, tự động điền tên đăng nhập và mật khẩu
    if (state && state.username && state.password) {
      setUsername(state.username);
      setPassword(state.password);
      setSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
    }
    // Nếu đã có token thì chuyển hướng về dashboard
    if (localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate, state]);

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Kiểm tra nhập đủ thông tin
    if (!username || !password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Kiểm tra độ dài mật khẩu (tối thiểu 6 ký tự)
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Lấy danh sách user từ localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => (u.email === username || u.username === username) && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("token", "fake-token");
      localStorage.setItem("username", foundUser.email);
      setSuccess("Đăng nhập thành công! Đang chuyển hướng...");
      setTimeout(() => {
        navigate("/admin");
      }, 1200);
    } else {
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div style={{ background: "#4287f5", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: 400,
          margin: "0 auto",
          paddingTop: 100,
          paddingBottom: 100,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            padding: 32,
          }}
        >
          <h2
            style={{
              color: "#1877f2",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Đăng nhập
          </h2>
          <div
            style={{
              textAlign: "center",
              color: "#444",
              marginBottom: 24,
              fontSize: 15,
            }}
          >
            Chào mừng bạn đến với trang Web Quản lý phòng LAB.
          </div>
          <form onSubmit={login}>
            <div className="mb-3">
              <label className="form-label" htmlFor="username">
                Username/Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="username"
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="abc123@gmail.com"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Mật khẩu <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                required
              />
            </div>
            <div className="mb-3 text-end">
              <Link to="#" style={{ fontSize: 13 }}>
                Quên mật khẩu?
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ fontWeight: 600, fontSize: 17 }}
            >
              Đăng nhập
            </button>
            {error && (
              <div className="text-danger text-center mt-2">{error}</div>
            )}
            {success && (
              <div className="text-success text-center mt-2">{success}</div>
            )}
          </form>
          <div
            className="text-center mt-3"
            style={{ fontSize: 15, color: "#444" }}
          >
            Bạn chưa có tài khoản?{" "}
            <Link to="/register" style={{ color: "#1877f2", fontWeight: 600 }}>
              Tạo tài khoản ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
