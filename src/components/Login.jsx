import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../assets/css/style.css";
import instance from "../API/axios";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    // Nếu có state từ Đăng ký, tự động điền tên đăng nhập và mật khẩu
    if (state && state.username && state.password) {
      setUsername(state.username);
      setPassword(state.password);
    }
    // Nếu đã có token thì chuyển hướng về trang chủ
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate, state]);

  const login = async (e) => {
    e.preventDefault();
    setError("");

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

    const payload = { username, password };
    try {
      const response = await instance.post("/login", payload);
      const data = response.data;
      // Kiểm tra dữ liệu trả về
      if (!data.token || !data.username) {
        setError("Sai tài khoản hoặc mật khẩu!");
        return;
      }
      // Sau khi đăng nhập thành công:
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId); // <-- Lưu userId đúng key
      localStorage.setItem("username", data.username);
      localStorage.setItem("roleId", data.roleId);
      localStorage.setItem("email", data.email);
      navigate("/"); // hoặc navigate("/admin")
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Đăng nhập thất bại. Vui lòng thử lại."
      );
      console.error("Lỗi đăng nhập:", err);
    }
  };

  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Đăng nhập tài khoản
                    </h5>
                    <p className="text-center small">
                      Nhập tên đăng nhập và mật khẩu để đăng nhập
                    </p>
                  </div>
                  <form className="row g-3 needs-validation" onSubmit={login}>
                    <div className="col-12">
                      <label htmlFor="username" className="form-label">
                        Tên đăng nhập
                      </label>
                      <div className="input-group has-validation">
                        <input
                          type="text"
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control"
                          id="username"
                          required
                        />
                        <div className="invalid-feedback">
                          Vui lòng nhập tên đăng nhập.
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        id="password"
                        required
                      />
                      <div className="invalid-feedback">
                        Vui lòng nhập mật khẩu!
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="remember"
                          value="true"
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                        >
                          Ghi nhớ đăng nhập
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit">
                        Đăng nhập
                      </button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0 text-center">
                        Chưa có tài khoản?{" "}
                        <Link
                          to="/register"
                          onClick={() => console.log("Nhấn tạo tài khoản mới")}
                        >
                          Đăng ký ngay
                        </Link>
                      </p>
                    </div>
                  </form>
                  {error && <p className="text-danger text-center">{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
