import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./rooms.scss";
import { useLog } from "../../logContext"; // Import useLog

const Rooms = () => {
  const { addLog } = useLog(); // Lấy addLog từ context
  const [rooms, setRooms] = useState([
    { id: "R001", title: "Phòng VIP", description: "2 giường, 1 phòng khách, 1 nhà vệ sinh, 1 bếp", price: "2000", maxPeople: 4 },
    { id: "R002", title: "Phòng Thường", description: "1 giường, 1 nhà vệ sinh", price: "1000", maxPeople: 2 },
  ]);

  const [newRoom, setNewRoom] = useState({ id: "", title: "", description: "", price: "", maxPeople: "" });
  const [filterPriceRange, setFilterPriceRange] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour12: true, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour12: true, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3");
      setCurrentTime(now);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleAddRoom = () => {
    if (newRoom.id && newRoom.title && newRoom.description && newRoom.price && newRoom.maxPeople) {
      const updatedRoom = { ...newRoom, id: `R${(rooms.length + 1).toString().padStart(3, "0")}` };
      setRooms([...rooms, updatedRoom]);

      // Ghi log
      addLog("/rooms", "POST", "Add Room");

      setNewRoom({ id: "", title: "", description: "", price: "", maxPeople: "" });
      alert(`Đã thêm phòng ${newRoom.title} thành công!`);
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  const handleDeleteRoom = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phòng này?")) {
      const updatedRooms = rooms.filter((room) => room.id !== id);
      setRooms(updatedRooms);

      // Ghi log
      addLog("/rooms", "DELETE", "Delete Room");

      alert("Đã xóa phòng!");
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.id.toLowerCase().includes(searchTerm.toLowerCase()) || room.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriceRange =
      filterPriceRange === "Tất cả" ||
      (filterPriceRange === "Rẻ" && parseInt(room.price) <= 1500) ||
      (filterPriceRange === "Trung bình" && parseInt(room.price) > 1500 && parseInt(room.price) <= 2500) ||
      (filterPriceRange === "Cao" && parseInt(room.price) > 2500);
    return matchesSearch && matchesPriceRange;
  });

  return (
    <div className="rooms">
      <Sidebar />
      <div className="roomsContainer">
        <Navbar />
        <h1 className="title">Quản lý Phòng</h1>

        <div className="clock">Thời gian hiện tại: {currentTime}</div>

        <div className="stats">Tổng số phòng: {rooms.length}</div>

        <div className="filterSection">
          <input
            type="text"
            placeholder="Tìm kiếm theo ID hoặc title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput"
          />
          <select
            value={filterPriceRange}
            onChange={(e) => setFilterPriceRange(e.target.value)}
            className="filterSelect"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Rẻ">Rẻ (≤ 1500)</option>
            <option value="Trung bình">Trung bình (1500-2500)</option>
            <option value="Cao">Cao (≥ 2500)</option>
          </select>
        </div>

        <div className="addRoomForm">
          <h2>Thêm phòng mới</h2>
          <div className="formGroup">
            <label>ID</label>
            <input
              type="text"
              value={newRoom.id}
              onChange={(e) => setNewRoom({ ...newRoom, id: e.target.value })}
              placeholder="Nhập ID"
            />
          </div>
          <div className="formGroup">
            <label>Title</label>
            <input
              type="text"
              value={newRoom.title}
              onChange={(e) => setNewRoom({ ...newRoom, title: e.target.value })}
              placeholder="Nhập loại phòng (VIP/Thường)"
            />
          </div>
          <div className="formGroup">
            <label>Mô tả</label>
            <input
              type="text"
              value={newRoom.description}
              onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
              placeholder="Nhập mô tả (giường, phòng khách, v.v.)"
            />
          </div>
          <div className="formGroup">
            <label>Giá cả</label>
            <input
              type="number"
              value={newRoom.price}
              onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
              placeholder="Nhập giá (USD)"
            />
          </div>
          <div className="formGroup">
            <label>Max People</label>
            <input
              type="number"
              value={newRoom.maxPeople}
              onChange={(e) => setNewRoom({ ...newRoom, maxPeople: e.target.value })}
              placeholder="Nhập số người tối đa"
            />
          </div>
          <button className="btn-submit" onClick={handleAddRoom}>
            Add Room
          </button>
        </div>

        <div className="roomsTable">
          <h2>Danh sách phòng</h2>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>ID</th>
                <th>Title</th>
                <th>Mô tả</th>
                <th>Giá cả (USD)</th>
                <th>Max People</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room, index) => (
                <tr key={room.id}>
                  <td>{index + 1}</td>
                  <td>{room.id}</td>
                  <td>{room.title}</td>
                  <td>{room.description}</td>
                  <td>{room.price}</td>
                  <td>{room.maxPeople}</td>
                  <td>
                    <button className="btn btn-delete" onClick={() => handleDeleteRoom(room.id)}>
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

export default Rooms;