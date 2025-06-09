import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./payment.scss";
import instance from "../../API/axios";

const Payment = () => {
  const [records, setRecords] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({
    invoiceId: 0,
    bookingId: "",
    customerId: "",
    status: 0,
    totalAmount: 0,
    createdAt: new Date().toISOString(),
  });

  // Lấy danh sách hóa đơn từ API
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await instance.get("/Invoice");
        setInvoices(res.data);
      } catch (err) {
        setInvoices([]);
      }
    };
    fetchInvoices();
  }, []);


  // Hàm xuất hóa đơn
  const handleExportInvoice = async () => {
    if (!form.customerId || !form.roomId) {
      alert("Vui lòng nhập Customer ID và Room ID!");
      return;
    }
    try {
      const payload = {
        invoiceId: 0,
        bookingId: Number(form.roomId), // mapping roomId to bookingId nếu không có bookingId riêng
        customerId: Number(form.customerId),
        status: 0,
        totalAmount: 0,
        createdAt: new Date().toISOString(),
      };
      await instance.post("/Invoice", payload);
      alert("Xuất hóa đơn thành công!");
      // Reload danh sách hóa đơn
      const res = await instance.get("/Invoice");
      setInvoices(res.data);
    } catch (err) {
      alert(
        "Có lỗi khi xuất hóa đơn!\n" +
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
        <h1 className="title">Nhập hóa đơn</h1>
        <form className="paymentForm pretty-form">
          <div className="form-row">
            <div className="form-group">
              <label>Invoice ID</label>
              <input
                type="number"
                placeholder="Nhập Invoice ID"
                value={form.invoiceId}
                onChange={(e) => setForm({ ...form, invoiceId: Number(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Booking ID</label>
              <input
                type="number"
                placeholder="Nhập Booking ID"
                value={form.bookingId}
                onChange={(e) => setForm({ ...form, bookingId: Number(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Customer ID</label>
              <input
                type="number"
                placeholder="Nhập Customer ID"
                value={form.customerId}
                onChange={(e) => setForm({ ...form, customerId: Number(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <input
                type="number"
                placeholder="Nhập Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: Number(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Total Amount</label>
              <input
                type="number"
                placeholder="Nhập Total Amount"
                value={form.totalAmount}
                onChange={(e) => setForm({ ...form, totalAmount: Number(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Created At</label>
              <input
                type="datetime-local"
                value={form.createdAt.slice(0, 16)}
                onChange={(e) =>
                  setForm({ ...form, createdAt: new Date(e.target.value).toISOString() })
                }
                required
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="submit-btn"
                onClick={handleExportInvoice}
              >
                Xuất hóa đơn
              </button>
            </div>
          </div>
        </form>
        <div className="paymentTable pretty-table">
          <h2>Danh sách hóa đơn</h2>
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Booking ID</th>
                <th>Customer ID</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#aaa" }}>
                    Chưa có hóa đơn
                  </td>
                </tr>
              ) : (
                invoices.map((inv, idx) => (
                  <tr key={idx}>
                    <td>{inv.invoiceId}</td>
                    <td>{inv.bookingId}</td>
                    <td>{inv.customerId}</td>
                    <td>{inv.status}</td>
                    <td>{inv.totalAmount}</td>
                    <td>{inv.createdAt}</td>
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

export default Payment;