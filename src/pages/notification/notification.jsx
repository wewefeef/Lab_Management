import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./notification.scss";

const Notification = () => {
  // State cho form thông báo
  const [notification, setNotification] = useState({
    title: "",
    type: "Khuyến mãi",
    content: "",
    rooms: "",
  });

  // State cho danh sách thông báo
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Khuyến mãi Spa", type: "Khuyến mãi", content: "Giảm 20% dịch vụ Spa", time: "09:25 AM, 03/06/2025", rooms: "101, 102", status: "Đã gửi" },
  ]);

  // State cho thời gian thực
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour12: true, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"));

  // Cập nhật thời gian thực theo giờ Việt Nam
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour12: true, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3");
      setCurrentTime(now);
    }, 60000); // Cập nhật mỗi phút
    return () => clearInterval(interval);
  }, []);

  // Xử lý gửi thông báo
  const handleSendNotification = () => {
    if (notification.title && notification.content && notification.rooms) {
      const newNotification = {
        id: notifications.length + 1,
        title: notification.title,
        type: notification.type,
        content: notification.content,
        time: currentTime,
        rooms: notification.rooms,
        status: "Đã gửi",
      };
      setNotifications([...notifications, newNotification]);
      setNotification({ title: "", type: "Khuyến mãi", content: "", rooms: "" });
      alert(`Đã gửi thông báo "${notification.title}" đến ${notification.rooms}`);
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  // Xử lý xóa thông báo
  const handleDeleteNotification = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa thông báo này?")) {
      const updatedNotifications = notifications.filter((n) => n.id !== id);
      setNotifications(updatedNotifications);
      alert("Đã xóa thông báo!");
    }
  };

  return (
    <div className="notification">
      <Sidebar />
      <div className="notificationContainer">
        <Navbar />
        <h1 className="title">Quản lý Thông báo</h1>

        {/* Đồng hồ thời gian thực */}
        <div className="clock">Thời gian hiện tại: {currentTime}</div>

        {/* Form tạo thông báo */}
        <div className="notificationForm">
          <h2>Tạo thông báo mới</h2>
          <div className="formGroup">
            <label>Tiêu đề</label>
            <input
              type="text"
              value={notification.title}
              onChange={(e) => setNotification({ ...notification, title: e.target.value })}
              placeholder="Nhập tiêu đề"
            />
          </div>
          <div className="formGroup">
            <label>Loại thông báo</label>
            <select
              value={notification.type}
              onChange={(e) => setNotification({ ...notification, type: e.target.value })}
            >
              <option value="Khuyến mãi">Khuyến mãi</option>
              <option value="Bảo trì">Bảo trì</option>
              <option value="Khẩn cấp">Khẩn cấp</option>
            </select>
          </div>
          <div className="formGroup">
            <label>Nội dung</label>
            <textarea
              value={notification.content}
              onChange={(e) => setNotification({ ...notification, content: e.target.value })}
              placeholder="Nhập nội dung"
            />
          </div>
          <div className="formGroup">
            <label>Phòng nhận</label>
            <input
              type="text"
              value={notification.rooms}
              onChange={(e) => setNotification({ ...notification, rooms: e.target.value })}
              placeholder="Nhập số phòng (ví dụ: 101, 102)"
            />
          </div>
          <button className="btn-submit" onClick={handleSendNotification}>
            Gửi thông báo
          </button>
        </div>

        {/* Bảng danh sách thông báo */}
        <div className="notificationTable">
          <h2>Lịch sử thông báo</h2>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tiêu đề</th>
                <th>Loại</th>
                <th>Nội dung</th>
                <th>Thời gian gửi</th>
                <th>Phòng nhận</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification, index) => (
                <tr key={notification.id}>
                  <td>{index + 1}</td>
                  <td>{notification.title}</td>
                  <td className={`type-${notification.type.toLowerCase().replace(" ", "-")}`}>
                    {notification.type}
                  </td>
                  <td>{notification.content}</td>
                  <td>{notification.time}</td>
                  <td>{notification.rooms}</td>
                  <td>{notification.status}</td>
                  <td>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      Xóa
                    </button>
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

export default Notification;