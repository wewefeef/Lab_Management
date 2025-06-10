import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";

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
    {
      id: 1,
      title: "Khuyến mãi Spa",
      type: "Khuyến mãi",
      content: "Giảm 20% dịch vụ Spa",
      time: "09:25 AM, 03/06/2025",
      rooms: "101, 102",
      status: "Đã gửi",
    },
  ]);

  // State cho thời gian thực
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

  // Cập nhật thời gian thực theo giờ Việt Nam
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
    }, 60000); // Cập nhật mỗi phút
    return () => clearInterval(interval);
  }, []);

  // Xử lý gửi thông báo
  const handleSendNotification = (e) => {
    e.preventDefault();
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-6 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-4 text-center">Quản lý Thông báo</h1>
          {/* Đồng hồ thời gian thực */}
          <div className="mb-6 text-gray-600 text-center">
            <span className="font-semibold">Thời gian hiện tại:</span> {currentTime}
          </div>
          {/* Form tạo thông báo */}
          <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Tạo thông báo mới</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSendNotification}>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Tiêu đề</label>
                <input
                  type="text"
                  value={notification.title}
                  onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                  placeholder="Nhập tiêu đề"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Loại thông báo</label>
                <select
                  value={notification.type}
                  onChange={(e) => setNotification({ ...notification, type: e.target.value })}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Khuyến mãi">Khuyến mãi</option>
                  <option value="Bảo trì">Bảo trì</option>
                  <option value="Khẩn cấp">Khẩn cấp</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Nội dung</label>
                <textarea
                  value={notification.content}
                  onChange={(e) => setNotification({ ...notification, content: e.target.value })}
                  placeholder="Nhập nội dung"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Phòng nhận</label>
                <input
                  type="text"
                  value={notification.rooms}
                  onChange={(e) => setNotification({ ...notification, rooms: e.target.value })}
                  placeholder="Nhập số phòng (ví dụ: 101, 102)"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="mt-2 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
              >
                Gửi thông báo
              </button>
            </form>
          </div>
          {/* Bảng danh sách thông báo */}
          <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">Lịch sử thông báo</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-3 py-2 border-b text-left">STT</th>
                    <th className="px-3 py-2 border-b text-left">Tiêu đề</th>
                    <th className="px-3 py-2 border-b text-left">Loại</th>
                    <th className="px-3 py-2 border-b text-left">Nội dung</th>
                    <th className="px-3 py-2 border-b text-left">Thời gian gửi</th>
                    <th className="px-3 py-2 border-b text-left">Phòng nhận</th>
                    <th className="px-3 py-2 border-b text-left">Trạng thái</th>
                    <th className="px-3 py-2 border-b text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notification, index) => (
                    <tr key={notification.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border-b">{index + 1}</td>
                      <td className="px-3 py-2 border-b">{notification.title}</td>
                      <td
                        className={`px-3 py-2 border-b font-semibold ${
                          notification.type === "Khuyến mãi"
                            ? "text-green-600"
                            : notification.type === "Bảo trì"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {notification.type}
                      </td>
                      <td className="px-3 py-2 border-b">{notification.content}</td>
                      <td className="px-3 py-2 border-b">{notification.time}</td>
                      <td className="px-3 py-2 border-b">{notification.rooms}</td>
                      <td className="px-3 py-2 border-b">{notification.status}</td>
                      <td className="px-3 py-2 border-b">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                  {notifications.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-4 text-gray-400">
                        Không có thông báo nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;