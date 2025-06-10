import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../API/axios";

const HotelList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await instance.get("/Room");
        setRooms(res.data);
      } catch (err) {
        setRooms([]);
      }
    };
    fetchRooms();
  }, []);

  // Hàm xử lý khi click vào phòng
  const handleRoomClick = (roomId) => {
    navigate(`/bookRoom/${roomId}`);
  };

  // Ảnh phòng mặc định
  const defaultRoomImg =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="p-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h2 className="text-4xl font-extrabold mb-2 text-blue-900 drop-shadow">
        Những nơi nổi bật
      </h2>
      <p className="text-gray-500 mb-8 text-lg">
        Những nơi lưu trú phổ biến mà khách hàng giới thiệu cho bạn
      </p>
      <div className="flex justify-between items-center mb-8"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-2xl p-4 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer hover:scale-105"
            onClick={() => handleRoomClick(room.id)}
            title="Đặt phòng này"
          >
            <div className="relative">
              <img
                src={defaultRoomImg}
                alt="Phòng khách sạn"
                className="rounded-xl w-full h-48 object-cover mb-3"
              />
            </div>
            {/* Thêm tiêu đề cho từng phòng */}
            <div className="mb-2">
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mr-2">
                Số phòng: {room.roomNumber || "N/A"}
              </span>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                Loại: {room.roomType || "Chưa rõ"}
              </span>
            </div>
            <h3 className="font-bold mt-1 text-base text-blue-900 truncate">
              {room.name || `Phòng ${room.roomNumber}` || "Phòng"}
            </h3>
            <p className="text-gray-500 text-sm mb-1 line-clamp-2">
              {room.description || "Không có mô tả"}
            </p>
            <div className="flex items-center text-gray-400 text-xs mb-1">
              {room.beds ? (
                <span className="mr-2">{room.beds} giường</span>
              ) : null}
              {room.roomType ? (
                <span className="italic">{room.roomType}</span>
              ) : null}
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xl font-bold text-blue-700">
                {room.price ? `${room.price.toLocaleString()}₫/đêm` : ""}
              </span>
              <span className="flex items-center text-yellow-500 text-sm font-semibold">
                ★ {room.rating || 5}
                <span className="ml-1 text-gray-400 font-normal">
                  ({room.reviews || 0})
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10"></div>
    </div>
  );
};

export default HotelList;
