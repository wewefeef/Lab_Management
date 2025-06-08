import React, { useState, useEffect } from "react";
import "./invoices.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Datatable from "../../components/datatable/datatable.jsx";
import { useLog } from "../../logContext.js";
import api from "../../API/axios.js";

const invoiceColumns = [
  { field: "invoiceId", headerName: "Mã hóa đơn", width: 120 },
  { field: "bookingId", headerName: "Mã đặt phòng", width: 120 },
  { field: "customerId", headerName: "Mã khách hàng", width: 120 },
  { field: "status", headerName: "Trạng thái", width: 150 },
  { field: "totalAmount", headerName: "Tổng tiền", width: 150 },
  { field: "createdAt", headerName: "Ngày tạo", width: 180 },
];

const Invoices = () => {
  const { addLog } = useLog();
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({
    invoiceId: "",
    bookingId: "",
    customerId: "",
    status: "",
    totalAmount: "",
    createdAt: new Date().toISOString(),
  });

  // Lấy danh sách hóa đơn từ API
  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/Invoice", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setInvoices(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Hàm thay đổi giá trị trường trong biểu mẫu
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Hàm xuất hóa đơn mới
  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    try {
      if (
        !form.invoiceId ||
        !form.bookingId ||
        !form.customerId ||
        !form.status ||
        !form.totalAmount
      ) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      // Gửi trực tiếp object hóa đơn
      const invoiceData = {
        invoiceId: Number(form.invoiceId),
        bookingId: Number(form.bookingId),
        customerId: Number(form.customerId),
        status: form.status,
        totalAmount: Number(form.totalAmount),
        createdAt: new Date().toISOString(),
      };

      const token = localStorage.getItem("token");
      const res = await api.post("/Invoice", invoiceData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const newInvoice = res.data;
      setInvoices((prev) => [...prev, newInvoice]);
      addLog(`Xuất hóa đơn mới: ${newInvoice.invoiceId}`);
      setForm({
        invoiceId: "",
        bookingId: "",
        customerId: "",
        status: "",
        totalAmount: "",
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      alert("Xuất hóa đơn thất bại! Lỗi: " + (err?.response?.data?.message || err.message));
      console.error(err);
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="invoices-content">
          <div className="card invoice-card">
            <h2>Xuất hóa đơn</h2>
            <form className="invoice-form" onSubmit={handleCreateInvoice}>
              <div className="form-row">
                <div className="form-group">
                  <label>Mã hóa đơn</label>
                  <input
                    type="text"
                    name="invoiceId"
                    placeholder="Nhập Invoice ID"
                    value={form.invoiceId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mã đặt phòng</label>
                  <input
                    type="number"
                    name="bookingId"
                    placeholder="Nhập Booking ID"
                    value={form.bookingId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mã khách hàng</label>
                  <input
                    type="number"
                    name="customerId"
                    placeholder="Nhập Customer ID"
                    value={form.customerId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <input
                    type="text"
                    name="status"
                    placeholder="Nhập Trạng thái"
                    value={form.status}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tổng tiền</label>
                  <input
                    type="number"
                    name="totalAmount"
                    placeholder="Nhập Tổng tiền"
                    value={form.totalAmount}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group form-group-btn">
                  <button type="submit" className="btn-primary">
                    Xuất hóa đơn
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="card invoice-card">
            <h2>Danh sách hóa đơn</h2>
            <div className="custom-table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã hóa đơn</th>
                    <th>Mã đặt phòng</th>
                    <th>Mã khách hàng</th>
                    <th>Trạng thái</th>
                    <th>Tổng tiền</th>
                    <th>Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", color: "#888" }}>
                        Chưa có hóa đơn
                      </td>
                    </tr>
                  ) : (
                    invoices.map((row, idx) => (
                      <tr key={row.invoiceId}>
                        <td>{idx + 1}</td>
                        <td>{row.invoiceId}</td>
                        <td>{row.bookingId}</td>
                        <td>{row.customerId}</td>
                        <td>{row.status}</td>
                        <td>{row.totalAmount}</td>
                        <td>{new Date(row.createdAt).toLocaleString()}</td>
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

export default Invoices;