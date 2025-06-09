import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./checkincheckout.scss";
import instance from "../../API/axios";

const CheckInOut = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    customerId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
  });

  // Lấy danh sách check-in/check-out từ API
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await instance.get("/CheckInOut"); // Đổi endpoint phù hợp với API của bạn
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
      // Đổi endpoint phù hợp với API của bạn
      const endpoint = type === "checkin" ? "/CheckIn" : "/CheckOut";
      await instance.post(endpoint, payload);
      alert(type === "checkin" ? "Check-in thành công!" : "Check-out thành công!");
      setForm({ customerId: "", roomId: "", checkInDate: "", checkOutDate: "" });
      // Reload danh sách
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
    <div className="payment">
      <Sidebar />
      <div className="paymentContainer">
        <Navbar />
        <h1 className="title">Nhập thông tin Check-in/Check-out</h1>
        <form className="paymentForm pretty-form">
          <div className="form-row">
            <div className="form-group">
              <label>Customer ID</label>
              <input
                type="number"
                placeholder="Nhập Customer ID"
                value={form.customerId}
                onChange={(e) => setForm({ ...form, customerId: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Room ID</label>
              <input
                type="number"
                placeholder="Nhập Room ID"
                value={form.roomId}
                onChange={(e) => setForm({ ...form, roomId: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Check In Date</label>
              <input
                type="datetime-local"
                value={form.checkInDate}
                onChange={(e) => setForm({ ...form, checkInDate: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Check Out Date</label>
              <input
                type="datetime-local"
                value={form.checkOutDate}
                onChange={(e) => setForm({ ...form, checkOutDate: e.target.value })}
                required
              />
            </div>
            <div className="button-row-right">
              <button
                type="button"
                className="btn-checkin"
                onClick={(e) => handleSubmit(e, "checkin")}
              >
                Check In
              </button>
              <button
                type="button"
                className="btn-checkout"
                onClick={(e) => handleSubmit(e, "checkout")}
              >
                Check Out
              </button>
            </div>
          </div>
        </form>
        <div className="paymentTable pretty-table">
          <h2>Danh sách Check-in/Check-out</h2>
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Room ID</th>
                <th>Check In Date</th>
                <th>Check Out Date</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "#aaa" }}>
                    Chưa có dữ liệu
                  </td>
                </tr>
              ) : (
                records.map((r, idx) => (
                  <tr key={idx}>
                    <td>{r.customerId}</td>
                    <td>{r.roomId}</td>
                    <td>{r.checkInDate}</td>
                    <td>{r.checkOutDate}</td>
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

export default CheckInOut;