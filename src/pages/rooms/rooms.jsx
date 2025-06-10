import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useLog } from "../../logContext";
import instance from "../../API/axios";
import { FaTrash } from "react-icons/fa";

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
  const [showAddForm, setShowAddForm] = useState(false);
  const [editRoomId, setEditRoomId] = useState(null);
  const [editRoomData, setEditRoomData] = useState({
    roomNumber: "",
    roomType: "",
    price: 0,
    status: 0,
    description: "",
    imageUrl: "",
  });

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
            status: Number(status),
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
        fetchRooms();
      } catch (err) {
        alert("Thêm phòng thất bại: " + (err.response?.data?.error || err.message));
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  const handleEditClick = (room) => {
    setEditRoomId(room._id || room.roomNumber);
    setEditRoomData({ ...room });
  };

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

  const filteredRooms = rooms.filter(room =>
    room.roomNumber.toString().includes(searchRoomNumber)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        {/* Thanh tìm kiếm và nút thêm phòng */}
        <div className="flex items-center gap-4 my-6">
          <input
            type="text"
            placeholder="Tìm kiếm theo số phòng..."
            value={searchRoomNumber}
            onChange={e => setSearchRoomNumber(e.target.value)}
            className="w-56 px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="bg-blue-600 text-white rounded-lg px-6 py-2 font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "Đóng" : "Thêm phòng"}
          </button>
        </div>
        {/* Form thêm phòng */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-lg p-8 my-6 w-full max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Thêm phòng mới</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Số phòng</label>
                <input
                  type="text"
                  value={newRoom.roomNumber}
                  onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                  placeholder="Nhập số phòng"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Loại phòng</label>
                <input
                  type="text"
                  value={newRoom.roomType}
                  onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
                  placeholder="Nhập loại phòng (VIP/Thường)"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Giá cả</label>
                <input
                  type="number"
                  value={newRoom.price}
                  onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                  placeholder="Nhập giá (USD)"
                  min={0}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700">Trạng thái</label>
                <input
                  type="number"
                  value={newRoom.status}
                  onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
                  placeholder="Nhập trạng thái (0: Còn trống, 1: Đã đặt)"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="font-medium text-gray-700">Mô tả</label>
                <input
                  type="text"
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                  placeholder="Nhập mô tả"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="font-medium text-gray-700">Ảnh phòng (imageUrl)</label>
                <input
                  type="text"
                  value={newRoom.imageUrl}
                  onChange={(e) => setNewRoom({ ...newRoom, imageUrl: e.target.value })}
                  placeholder="Nhập đường dẫn ảnh"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <button
              className="mt-6 bg-green-600 text-white font-semibold px-8 py-2 rounded hover:bg-green-700 transition"
              onClick={handleAddRoom}
            >
              Add Room
            </button>
          </div>
        )}
        {/* Bảng danh sách phòng */}
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6 mx-auto">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Danh sách phòng</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-3 py-2 border-b">STT</th>
                  <th className="px-3 py-2 border-b">Số phòng</th>
                  <th className="px-3 py-2 border-b">Loại phòng</th>
                  <th className="px-3 py-2 border-b">Mô tả</th>
                  <th className="px-3 py-2 border-b">Giá cả (USD)</th>
                  <th className="px-3 py-2 border-b">Trạng thái</th>
                  <th className="px-3 py-2 border-b text-center">PUT</th>
                  <th className="px-3 py-2 border-b text-center">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-400">Không có phòng nào</td>
                  </tr>
                ) : (
                  filteredRooms.map((room, idx) => (
                    <tr key={room._id || room.roomNumber} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border-b">{idx + 1}</td>
                      <td className="px-3 py-2 border-b">
                        {editRoomId === (room._id || room.roomNumber) ? (
                          <input
                            type="text"
                            value={editRoomData.roomNumber}
                            onChange={e => setEditRoomData({ ...editRoomData, roomNumber: e.target.value })}
                            className="border border-gray-300 rounded px-2 py-1 w-20"
                          />
                        ) : (
                          room.roomNumber
                        )}
                      </td>
                      <td className="px-3 py-2 border-b">
                        {editRoomId === (room._id || room.roomNumber) ? (
                          <input
                            type="text"
                            value={editRoomData.roomType}
                            onChange={e => setEditRoomData({ ...editRoomData, roomType: e.target.value })}
                            className="border border-gray-300 rounded px-2 py-1 w-24"
                          />
                        ) : (
                          room.roomType
                        )}
                      </td>
                      <td className="px-3 py-2 border-b">
                        {editRoomId === (room._id || room.roomNumber) ? (
                          <input
                            type="text"
                            value={editRoomData.description}
                            onChange={e => setEditRoomData({ ...editRoomData, description: e.target.value })}
                            className="border border-gray-300 rounded px-2 py-1 w-32"
                          />
                        ) : (
                          room.description
                        )}
                      </td>
                      <td className="px-3 py-2 border-b">
                        {editRoomId === (room._id || room.roomNumber) ? (
                          <input
                            type="number"
                            value={editRoomData.price}
                            onChange={e => setEditRoomData({ ...editRoomData, price: e.target.value })}
                            className="border border-gray-300 rounded px-2 py-1 w-20"
                          />
                        ) : (
                          room.price
                        )}
                      </td>
                      <td className="px-3 py-2 border-b">
                        {editRoomId === (room._id || room.roomNumber) ? (
                          <input
                            type="number"
                            value={editRoomData.status}
                            onChange={e => setEditRoomData({ ...editRoomData, status: e.target.value })}
                            className="border border-gray-300 rounded px-2 py-1 w-16"
                          />
                        ) : (
                          room.status
                        )}
                      </td>
                      {/* Cột Sửa */}
                      <td className="px-3 py-2 border-b text-center">
                        <div className="flex flex-col items-center justify-center">
                          {editRoomId === (room._id || room.roomNumber) ? (
                            <div className="flex flex-row gap-2 bg-blue-50 rounded-lg px-2 py-1">
                              <button
                                onClick={handleSaveEdit}
                                className="bg-green-600 text-white rounded-lg px-4 py-1 font-semibold hover:bg-green-700 transition"
                              >
                                Lưu
                              </button>
                              <button
                                onClick={() => setEditRoomId(null)}
                                className="bg-gray-500 text-white rounded-lg px-4 py-1 hover:bg-gray-700 transition"
                              >
                                Hủy
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEditClick(room)}
                              className="bg-blue-600 text-white rounded-full px-5 py-1 font-semibold hover:bg-blue-700 transition"
                            >
                              Sửa
                            </button>
                          )}
                        </div>
                      </td>
                      {/* Cột Xóa */}
                      <td className="px-3 py-2 border-b text-center">
                        <div className="flex flex-col items-center">
                          <span className="h-4"></span>
                          <FaTrash
                            className="text-red-500 cursor-pointer text-xl mt-1 hover:text-red-700 transition"
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
    </div>
  );
};

export default Rooms;