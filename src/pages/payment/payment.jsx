import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./payment.scss";
import instance from "../../API/axios";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    invoiceId: "",
    serviceId: "",
    quantity: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào
    if (
      !form.invoiceId ||
      !form.serviceId ||
      !form.quantity ||
      Number(form.invoiceId) <= 0 ||
      Number(form.serviceId) <= 0 ||
      Number(form.quantity) <= 0
    ) {
      alert("Vui lòng nhập đầy đủ và đúng các trường (lớn hơn 0)!");
      return;
    }

    try {
      const payload = {
        invoiceId: Number(form.invoiceId),
        serviceId: Number(form.serviceId),
        quantity: Number(form.quantity),
      };
      const res = await instance.post("/InvoiceService", payload);
      setPayments([...payments, res.data]);
      setForm({ invoiceId: "", serviceId: "", quantity: "" });
      alert("Gửi thành công!");
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
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
        <h1 className="title">Nhập thông tin thanh toán</h1>
        <form onSubmit={handleSubmit} className="paymentForm pretty-form">
          <div className="form-row">
            <div className="form-group">
              <label>Invoice ID</label>
              <input
                type="number"
                placeholder="Nhập Invoice ID"
                value={form.invoiceId}
                onChange={(e) => setForm({ ...form, invoiceId: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Service ID</label>
              <input
                type="number"
                placeholder="Nhập Service ID"
                value={form.serviceId}
                onChange={(e) => setForm({ ...form, serviceId: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                placeholder="Nhập Quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="submit-btn">
                Xuất hóa đơn
              </button>
            </div>
          </div>
        </form>
        <div className="paymentTable pretty-table">
          <h2>Danh sách thanh toán</h2>
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Service ID</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center", color: "#aaa" }}>
                    Chưa có dữ liệu thanh toán
                  </td>
                </tr>
              ) : (
                payments.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.invoiceId}</td>
                    <td>{p.serviceId}</td>
                    <td>{p.quantity}</td>
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