import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import instance from "../../API/axios";

const CheckInOut = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    customerId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
  });

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await instance.get("/CheckInOut");
        setRecords(res.data);
      } catch (err) {
        setRecords([]);
      }
    };
    fetchRecords();
  }, []);

  const handleSubmit = async (e, type) => {
    e.preventDefault();

    if (
      !form.customerId ||
      !form.roomId ||
      !form.checkInDate ||
      !form.checkOutDate ||
      Number(form.customerId) <= 0 ||
      Number(form.roomId) <= 0
    ) {
      alert("Vui lòng nhập đầy đủ và đúng các trường!");
      return;
    }

    try {
      const payload = {
        customerId: Number(form.customerId),
        roomId: Number(form.roomId),
        checkInDate: form.checkInDate,
        checkOutDate: form.checkOutDate,
      };
      const endpoint = type === "checkin" ? "/CheckIn" : "/CheckOut";
      await instance.post(endpoint, payload);
      alert(
        type === "checkin" ? "Check-in thành công!" : "Check-out thành công!"
      );
      setForm({
        customerId: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: "",
      });
      const res = await instance.get("/CheckInOut");
      setRecords(res.data);
    } catch (err) {
      alert(
        "Có lỗi khi gửi dữ liệu!\n" +
          (err?.response?.data?.message || err?.message || "Lỗi không xác định")
      );
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 flex flex-col">
        <Navbar />
        <div className="w-full mt-8">
          <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">
            Nhập thông tin Check-in/Check-out
          </h1>
          <form className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Customer ID</label>
                <input
                  type="number"
                  placeholder="Nhập Customer ID"
                  value={form.customerId}
                  onChange={(e) =>
                    setForm({ ...form, customerId: e.target.value })
                  }
                  required
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Room ID</label>
                <input
                  type="number"
                  placeholder="Nhập Room ID"
                  value={form.roomId}
                  onChange={(e) => setForm({ ...form, roomId: e.target.value })}
                  required
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">
                  Check In Date
                </label>
                <input
                  type="datetime-local"
                  value={form.checkInDate}
                  onChange={(e) =>
                    setForm({ ...form, checkInDate: e.target.value })
                  }
                  required
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">
                  Check Out Date
                </label>
                <input
                  type="datetime-local"
                  value={form.checkOutDate}
                  onChange={(e) =>
                    setForm({ ...form, checkOutDate: e.target.value })
                  }
                  required
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
                onClick={(e) => handleSubmit(e, "checkin")}
              >
                Check In
              </button>
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
                onClick={(e) => handleSubmit(e, "checkout")}
              >
                Check Out
              </button>
            </div>
          </form>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Danh sách Check-in/Check-out
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">
                      Customer ID
                    </th>
                    <th className="py-2 px-4 border-b text-left">Room ID</th>
                    <th className="py-2 px-4 border-b text-left">
                      Check In Date
                    </th>
                    <th className="py-2 px-4 border-b text-left">
                      Check Out Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-4 text-gray-500"
                      >
                        Chưa có dữ liệu
                      </td>
                    </tr>
                  ) : (
                    records.map((r, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{r.customerId}</td>
                        <td className="py-2 px-4 border-b">{r.roomId}</td>
                        <td className="py-2 px-4 border-b">{r.checkInDate}</td>
                        <td className="py-2 px-4 border-b">{r.checkOutDate}</td>
                      </tr>
                    ))
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

export default CheckInOut;
