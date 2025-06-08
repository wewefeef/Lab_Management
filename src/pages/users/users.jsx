import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./users.scss";
import { useLog } from "../../logContext"; // Import useLog
import instance from "../../API/axios";

const Users = () => {
  const { addLog } = useLog();

  // Xóa dữ liệu mẫu, khởi tạo rỗng
  const [users, setUsers] = useState([]);

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date()
      .toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
        .toLocaleString("en-US", {
          timeZone: "Asia/Ho_Chi_Minh",
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3");
      setCurrentTime(now);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Lấy danh sách user từ API khi load trang
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await instance.get("/User", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data); // Giả sử API trả về mảng user
      } catch (err) {
        console.error("Lỗi lấy danh sách user:", err.response?.data || err.message);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (
      newUser.username &&
      newUser.password &&
      newUser.fullName &&
      newUser.email &&
      newUser.phone
    ) {
      try {
        const token = localStorage.getItem("token"); // Lấy token đã lưu sau khi đăng nhập
        if (!token) {
          alert("Bạn chưa đăng nhập hoặc token đã hết hạn!");
          return;
        }
        const payload = {
          roleId: "4", // hoặc "1" nếu muốn tạo admin, tuỳ backend yêu cầu
          username: newUser.username,
          password: newUser.password,
          fullName: newUser.fullName,
          email: newUser.email,
          phone: newUser.phone,
        };
        await instance.post(
          "/User",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Đảm bảo giống Swagger
            },
          }
        );
        setUsers([...users, newUser]);
        addLog("/User", "POST", "Add User");
        setNewUser({
          username: "",
          password: "",
          fullName: "",
          email: "",
          phone: "",
        });
        alert(`Đã thêm khách hàng ${newUser.fullName} thành công!`);
      } catch (err) {
        console.error("API error:", err.response?.data || err.message);
        alert("Thêm user thất bại: " + (err.response?.data?.error || err.message));
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const userStr = localStorage.getItem("user");
  let user = null;
  try {
    if (userStr && userStr !== "undefined") {
      user = JSON.parse(userStr);
    }
  } catch (e) {
    user = null;
  }

  return (
    <div className="users">
      <Sidebar />
      <div className="usersContainer">
        <Navbar />
        <h1 className="title">Quản lý Khách hàng</h1>

        <div className="clock">Thời gian hiện tại: {currentTime}</div>

        <div className="stats">Tổng số khách hàng: {users.length}</div>

        <div className="filterSection">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput"
          />
        </div>

        <div className="addUserForm">
          <h2>Thêm khách hàng mới</h2>
          <div className="formGroup">
            <label>Username</label>
            <input
              type="text"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              placeholder="Nhập username"
            />
          </div>
          <div className="formGroup">
            <label>Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              placeholder="Nhập password"
            />
          </div>
          <div className="formGroup">
            <label>Họ và tên</label>
            <input
              type="text"
              value={newUser.fullName}
              onChange={(e) =>
                setNewUser({ ...newUser, fullName: e.target.value })
              }
              placeholder="Nhập họ và tên"
            />
          </div>
          <div className="formGroup">
            <label>Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Nhập email"
            />
          </div>
          <div className="formGroup">
            <label>Số điện thoại</label>
            <input
              type="text"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              placeholder="Nhập số điện thoại"
            />
          </div>
          <button className="btn-submit" onClick={handleAddUser}>
            Add User
          </button>
        </div>

        <div className="usersTable">
          <h2>Danh sách khách hàng</h2>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Username</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.username + index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button className="btn btn-view">Đã cập nhật</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;