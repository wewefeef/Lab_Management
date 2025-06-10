import { useParams } from "react-router-dom";
import { useState } from "react";
import instance from "../../API/axios"; // Thêm dòng này để gọi API

const BookRoom = () => {
  const { roomId } = useParams();
  const [form, setForm] = useState({
    checkin: "",
    checkout: "",
  });
  const [loading, setLoading] = useState(false);

  // Giả lập customerId, thực tế bạn nên lấy từ user đăng nhập
  const customerId = 0;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await instance.post("/Booking", {
        customerId: customerId,
        roomId: Number(roomId),
        checkInDate: form.checkin,
        checkOutDate: form.checkout,
      });
      alert("Đặt phòng thành công!");
    } catch (err) {
      alert("Có lỗi xảy ra khi đặt phòng!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">
        Đặt phòng #{roomId}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Ngày nhận phòng</label>
            <input
              type="date"
              name="checkin"
              value={form.checkin}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Ngày trả phòng</label>
            <input
              type="date"
              name="checkout"
              value={form.checkout}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-blue-400"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Đang đặt phòng..." : "Đặt phòng"}
        </button>
      </form>
    </div>
  );
};

export default BookRoom;
