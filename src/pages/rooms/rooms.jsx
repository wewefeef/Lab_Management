import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./rooms.scss";
import { useLog } from "../../logContext";
import instance from "../../API/axios";
import { FaTrash } from "react-icons/fa"; // Thêm icon thùng rác

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
  const [editRoomId, setEditRoomId] = useState(null);
  const [editRoomData, setEditRoomData] = useState({
    roomNumber: "",
    roomType: "",
    price: 0,
    status: 0,
    description: "",
    imageUrl: "",
  });

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

  // Hàm mở form sửa
  const handleEditClick = (room) => {
    setEditRoomId(room._id || room.roomNumber);
    setEditRoomData({ ...room });
  };

  // Hàm lưu thông tin đã sửa
  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      await instance.put(
        `/Room/${editRoomId}`,
        {
          ...editRoomData,
          price: Number(editRoomData.price),
          status: Number(editRoomData.status),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addLog("/Room", "PUT", "Edit Room");
      setEditRoomId(null);
      fetchRooms();
      alert("Cập nhật phòng thành công!");
    } catch (err) {
      alert("Cập nhật thất bại: " + (err.response?.data?.error || err.message));
    }
  };

  // Hàm xóa phòng
  const handleDeleteRoom = async (roomId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phòng này không?")) {
      try {
        const token = localStorage.getItem("token");
        await instance.delete(`/Room/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        addLog("/Room", "DELETE", "Delete Room");
        fetchRooms();
        alert("Đã xóa phòng thành công!");
      } catch (err) {
        alert("Xóa phòng thất bại: " + (err.response?.data?.error || err.message));
      }
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
              width: "100%",           
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
                <th style={{ textAlign: "center" }}>PUT</th>
                <th style={{ textAlign: "center" }}>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>Không có phòng nào</td>
                </tr>
              ) : (
                filteredRooms.map((room, idx) => (
                  <tr key={room._id || room.roomNumber}>
                    <td>{idx + 1}</td>
                    <td>
                      {editRoomId === (room._id || room.roomNumber) ? (
                        <input
                          type="text"
                          value={editRoomData.roomNumber}
                          onChange={e => setEditRoomData({ ...editRoomData, roomNumber: e.target.value })}
                        />
                      ) : (
                        room.roomNumber
                      )}
                    </td>
                    <td>
                      {editRoomId === (room._id || room.roomNumber) ? (
                        <input
                          type="text"
                          value={editRoomData.roomType}
                          onChange={e => setEditRoomData({ ...editRoomData, roomType: e.target.value })}
                        />
                      ) : (
                        room.roomType
                      )}
                    </td>
                    <td>
                      {editRoomId === (room._id || room.roomNumber) ? (
                        <input
                          type="text"
                          value={editRoomData.description}
                          onChange={e => setEditRoomData({ ...editRoomData, description: e.target.value })}
                        />
                      ) : (
                        room.description
                      )}
                    </td>
                    <td>
                      {editRoomId === (room._id || room.roomNumber) ? (
                        <input
                          type="number"
                          value={editRoomData.price}
                          onChange={e => setEditRoomData({ ...editRoomData, price: e.target.value })}
                        />
                      ) : (
                        room.price
                      )}
                    </td>
                    <td>
                      {editRoomId === (room._id || room.roomNumber) ? (
                        <input
                          type="number"
                          value={editRoomData.status}
                          onChange={e => setEditRoomData({ ...editRoomData, status: e.target.value })}
                        />
                      ) : (
                        room.status
                      )}
                    </td>
                    {/* Cột Sửa */}
                    <td style={{ textAlign: "center" }}>
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        {editRoomId === (room._id || room.roomNumber) ? (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 8,
                              background: "#eaf6ff", // nền sáng nhẹ
                              borderRadius: 16,
                              padding: "6px 10px",
                              margin: "0 auto",
                            }}
                          >
                            <button
                              onClick={handleSaveEdit}
                              style={{
                                background: "#22c55e", // xanh lá
                                color: "#fff",
                                border: "none",
                                borderRadius: "12px",
                                padding: "8px 22px",
                                fontWeight: 500,
                                fontSize: 16,
                                cursor: "pointer",
                                minWidth: 60,
                              }}
                            >
                              Lưu
                            </button>
                            <button
                              onClick={() => setEditRoomId(null)}
                              style={{
                                background: "#64748b", // xám
                                color: "#fff",
                                border: "none",
                                borderRadius: "12px",
                                padding: "8px 22px",
                                fontSize: 16,
                                cursor: "pointer",
                                minWidth: 60,
                              }}
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(room)}
                            style={{
                              background: "#2563eb",
                              color: "#fff",
                              border: "none",
                              borderRadius: "20px",
                              padding: "10px 28px",
                              fontWeight: 500,
                              fontSize: 16,
                              cursor: "pointer",
                              minWidth: 80
                            }}
                          >
                            Sửa
                          </button>
                        )}
                      </div>
                    </td>
                    {/* Cột Xóa */}
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ height: 18 }}></span>
                        <FaTrash
                          style={{ color: "red", cursor: "pointer", fontSize: 22, marginTop: 2 }}
                          onClick={() => handleDeleteRoom(room._id || room.roomNumber)}
                          title="Xóa phòng"
                        />
                      </div>
                    </td>
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