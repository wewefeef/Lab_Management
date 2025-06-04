import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./users.scss";
import { useLog } from "../../logContext"; // Import useLog

const Users = () => {
  const { addLog } = useLog(); // Lấy addLog từ context
  const [users, setUsers] = useState([
    { id: "U001", name: "Nguyễn Văn A", email: "vana@example.com", country: "Việt Nam", city: "Hà Nội", phone: "0901234567" },
    { id: "U002", name: "Trần Thị B", email: "thib@example.com", country: "Việt Nam", city: "TP.HCM", phone: "0912345678" },
  ]);

  const [newUser, setNewUser] = useState({ id: "", name: "", email: "", country: "", city: "", phone: "" });
  const [filterCountry, setFilterCountry] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour12: true, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour12: true, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3");
      setCurrentTime(now);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAddUser = () => {
    if (newUser.id && newUser.name && newUser.email && newUser.country && newUser.city && newUser.phone) {
      const updatedUser = { ...newUser, id: `U${(users.length + 1).toString().padStart(3, "0")}` };
      setUsers([...users, updatedUser]);

      // Ghi log
      addLog("/newUser", "POST", "Add User");

      setNewUser({ id: "", name: "", email: "", country: "", city: "", phone: "" });
      alert(`Đã thêm khách hàng ${newUser.name} thành công!`);
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === "Tất cả" || user.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

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
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="filterSelect"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Việt Nam">Việt Nam</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="addUserForm">
          <h2>Thêm khách hàng mới</h2>
          <div className="formGroup">
            <label>ID</label>
            <input
              type="text"
              value={newUser.id}
              onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
              placeholder="Nhập ID"
            />
          </div>
          <div className="formGroup">
            <label>Tên</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Nhập tên"
            />
          </div>
          <div className="formGroup">
            <label>Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="Nhập email"
            />
          </div>
          <div className="formGroup">
            <label>Quốc gia</label>
            <input
              type="text"
              value={newUser.country}
              onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
              placeholder="Nhập quốc gia"
            />
          </div>
          <div className="formGroup">
            <label>Thành phố</label>
            <input
              type="text"
              value={newUser.city}
              onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
              placeholder="Nhập thành phố"
            />
          </div>
          <div className="formGroup">
            <label>Số điện thoại</label>
            <input
              type="text"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
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
                <th>ID</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Quốc gia</th>
                <th>Thành phố</th>
                <th>Số điện thoại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>{user.city}</td>
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