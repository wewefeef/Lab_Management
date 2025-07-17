import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName || !email || !password || !rePassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không đúng định dạng.");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    if (password !== rePassword) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }

    // Lưu user vào localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      setError("Email đã được đăng ký.");
      return;
    }
    users.push({ fullName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Đăng ký thành công! Đang chuyển sang đăng nhập...");
    setTimeout(() => {
      navigate("/login", { state: { username: email, password } });
    }, 1200);
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
            Đăng ký
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
          <form onSubmit={register}>
            <div className="mb-3">
              <label className="form-label" htmlFor="fullName">
                Họ và tên <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="fullName"
                type="text"
                className="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ex: Nguyen Van A"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ex: abc123@gmail.com"
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
            <div className="mb-3">
              <label className="form-label" htmlFor="rePassword">
                Nhập lại mật khẩu <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="rePassword"
                type="password"
                className="form-control"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="******"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ fontWeight: 600, fontSize: 17 }}
            >
              Đăng ký
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
            Bạn đã có tài khoản?{" "}
            <Link to="/login" style={{ color: "#1877f2", fontWeight: 600 }}>
              Đăng nhập ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};