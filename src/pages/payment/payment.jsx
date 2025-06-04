import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./payment.scss";
import { useLog } from "../../logContext"; // Import useLog

const Payment = () => {
  const { addLog } = useLog(); // Lấy addLog từ context
  const [payments, setPayments] = useState([
    { id: 1, customer: "Nguyễn Văn A", roomType: "2 phòng ngủ, 1 phòng khách, 1 bếp", services: "Spa, Đồ ăn", totalPrice: "5000", status: "Đã thanh toán" },
    { id: 2, customer: "Trần Thị B", roomType: "1 phòng ngủ, 1 bếp", services: "Tắm nắng", totalPrice: "3000", status: "Chưa thanh toán" },
  ]);

  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour12: true, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour12: true, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3");
      setCurrentTime(now);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = (id) => {
    const updatedPayments = payments.map((payment) =>
      payment.id === id
        ? { ...payment, status: payment.status === "Đã thanh toán" ? "Chưa thanh toán" : "Đã thanh toán" }
        : payment
    );
    setPayments(updatedPayments);

    // Ghi log
    const newStatus = updatedPayments.find((p) => p.id === id).status;
    addLog("/payment", "PUT", `Update Payment Status to ${newStatus}`);

    alert(`Đã cập nhật trạng thái cho khách ${payments.find((p) => p.id === id).customer}`);
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "Tất cả" || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="payment">
      <Sidebar />
      <div className="paymentContainer">
        <Navbar />
        <h1 className="title">Quản lý Thanh toán</h1>

        <div className="clock">Thời gian hiện tại: {currentTime}</div>

        <div className="filterSection">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên khách..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="searchInput"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filterSelect"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Đã thanh toán">Đã thanh toán</option>
            <option value="Chưa thanh toán">Chưa thanh toán</option>
          </select>
        </div>

        <div className="paymentTable">
          <h2>Danh sách thanh toán</h2>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Khách hàng</th>
                <th>Loại phòng</th>
                <th>Dịch vụ</th>
                <th>Tổng giá</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr key={payment.id}>
                  <td>{index + 1}</td>
                  <td>{payment.customer}</td>
                  <td>{payment.roomType}</td>
                  <td>{payment.services}</td>
                  <td>{payment.totalPrice}</td>
                  <td
                    className={
                      payment.status === "Đã thanh toán"
                        ? "status-paid"
                        : "status-unpaid"
                    }
                  >
                    {payment.status}
                  </td>
                  <td>
                    <button
                      className="btn btn-update"
                      onClick={() => handleUpdateStatus(payment.id)}
                    >
                      Cập nhật trạng thái
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

export default Payment;