import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./rooms.scss";
import { useLog } from "../../logContext";
import instance from "../../API/axios";

const Rooms = () => {
  const { addLog } = useLog();
  const [newRoom, setNewRoom] = useState({
    roomNumber: "",
    roomType: "",
    price: 0,
    status: 0,
    description: "",
    imageUrl: "",
  });
  const [rooms, setRooms] = useState([]);
  const [searchRoomNumber, setSearchRoomNumber] = useState("");
  const [showAddForm, setShowAddForm] = useState(false); // Thêm state này

  // Lấy danh sách phòng khi load trang hoặc sau khi thêm phòng mới
  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await instance.get("/Room", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(res.data);
    } catch (err) {
      alert("Không lấy được danh sách phòng: " + (err.response?.data?.error || err.message));
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddRoom = async () => {
    const { roomNumber, roomType, price, status, description, imageUrl } = newRoom;
    if (
      roomNumber &&
      roomType &&
      price !== "" &&
      (status === 0 || status === 1 || status === "0" || status === "1") &&
      description &&
      imageUrl
    ) {
      try {
        const token = localStorage.getItem("token");
        await instance.post(
          "/Room",
          {
            roomNumber: String(roomNumber),
            roomType: String(roomType),
            price: Number(price),
            status: Number(status), // gửi số
            description: String(description),
            imageUrl: String(imageUrl),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        addLog("/Room", "POST", "Add Room");
        setNewRoom({
          roomNumber: "",
          roomType: "",
          price: 0,
          status: 0,
          description: "",
          imageUrl: "",
        });
        alert(`Đã thêm phòng ${roomNumber} thành công!`);
        fetchRooms(); // Cập nhật lại danh sách phòng
      } catch (err) {
        alert("Thêm phòng thất bại: " + (err.response?.data?.error || err.message));
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  // Lọc danh sách phòng theo số phòng
  const filteredRooms = rooms.filter(room =>
    room.roomNumber.toString().includes(searchRoomNumber)
  );

  return (
    <div className="rooms">
      <Sidebar />
      <div className="roomsContainer">
        <Navbar />

        {/* Thanh tìm kiếm và nút thêm phòng */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "20px 0" }}>
          <input
            type="text"
            placeholder="Tìm kiếm theo số phòng..."
            value={searchRoomNumber}
            onChange={e => setSearchRoomNumber(e.target.value)}
            style={{
              flex: "none",
              width: 220,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              background: "#f8fafc",
              color: "#555"
            }}
          />
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 24px",
              fontWeight: 500,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
            }}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "Đóng" : "Thêm phòng"}
          </button>
        </div>

        {/* Form thêm phòng chỉ hiện khi showAddForm = true */}
        {showAddForm && (
          <div
            className="addRoomForm"
            style={{
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
              padding: "32px 24px",
              margin: "24px 0",
              width: "100%",           // Căng rộng ra hết container cha
              marginLeft: 0,
              marginRight: 0
            }}
          >
            <h2>Thêm phòng mới</h2>
            <div className="formGroup">
              <label>Số phòng</label>
              <input
                type="text"
                value={newRoom.roomNumber}
                onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                placeholder="Nhập số phòng"
              />
            </div>
            <div className="formGroup">
              <label>Loại phòng</label>
              <input
                type="text"
                value={newRoom.roomType}
                onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
                placeholder="Nhập loại phòng (VIP/Thường)"
              />
            </div>
            <div className="formGroup">
              <label>Giá cả</label>
              <input
                type="number"
                value={newRoom.price}
                onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                placeholder="Nhập giá (USD)"
                min={0}
              />
            </div>
            <div className="formGroup">
              <label>Trạng thái</label>
              <input
                type="text"
                value={newRoom.status}
                onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
                placeholder="Nhập trạng thái (Còn trống/Đã đặt...)"
              />
            </div>
            <div className="formGroup">
              <label>Mô tả</label>
              <input
                type="text"
                value={newRoom.description}
                onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                placeholder="Nhập mô tả"
              />
            </div>
            <div className="formGroup">
              <label>Ảnh phòng (imageUrl)</label>
              <input
                type="text"
                value={newRoom.imageUrl}
                onChange={(e) => setNewRoom({ ...newRoom, imageUrl: e.target.value })}
                placeholder="Nhập đường dẫn ảnh"
              />
            </div>
            <button className="btn-submit" onClick={handleAddRoom}>
              Add Room
            </button>
          </div>
        )}

        {/* Bảng danh sách phòng */}
        <div className="roomsTable">
          <h2>Danh sách phòng</h2>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Số phòng</th>
                <th>Loại phòng</th>
                <th>Mô tả</th>
                <th>Giá cả (USD)</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>Không có phòng nào</td>
                </tr>
              ) : (
                filteredRooms.map((room, idx) => (
                  <tr key={room._id || room.roomNumber}>
                    <td>{idx + 1}</td>
                    <td>{room.roomNumber}</td>
                    <td>{room.roomType}</td>
                    <td>{room.description}</td>
                    <td>{room.price}</td>
                    <td>{room.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rooms;