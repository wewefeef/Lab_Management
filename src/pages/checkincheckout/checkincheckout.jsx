import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./checkincheckout.scss";
import { useLog } from "../../logContext"; // Import useLog

const CheckinCheckout = () => {
  const { addLog } = useLog(); // Lấy addLog từ context
  const [guests, setGuests] = useState([
    { id: 1, name: "Nguyễn Văn A", bookingId: "BK001", room: "101", checkinTime: "08:30 AM, 03/06/2025", checkoutTime: "", status: "Đã nhận phòng" },
    { id: 2, name: "Trần Thị B", bookingId: "BK002", room: "102", checkinTime: "", checkoutTime: "", status: "Chưa nhận phòng" },
  ]);

  const [checkinName, setCheckinName] = useState("");
  const [checkinRoom, setCheckinRoom] = useState("");
  const [checkoutBookingId, setCheckoutBookingId] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour12: true, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3"));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh", hour12: true, hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }).replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3");
      setCurrentTime(now);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckin = () => {
    if (checkinName && checkinRoom) {
      const newGuest = {
        id: guests.length + 1,
        name: checkinName,
        bookingId: `BK${(guests.length + 1).toString().padStart(3, "0")}`,
        room: checkinRoom,
        checkinTime: currentTime,
        checkoutTime: "",
        status: "Đã nhận phòng",
      };
      setGuests([...guests, newGuest]);

      // Ghi log
      addLog("/checkincheckout", "POST", "Check-in");

      setCheckinName("");
      setCheckinRoom("");
      alert(`Check-in thành công cho ${checkinName} tại phòng ${checkinRoom}`);
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  const handleCheckout = () => {
    if (checkoutBookingId) {
      const guestIndex = guests.findIndex((guest) => guest.bookingId === checkoutBookingId);
      if (guestIndex !== -1 && guests[guestIndex].checkinTime && !guests[guestIndex].checkoutTime) {
        const updatedGuests = [...guests];
        updatedGuests[guestIndex].checkoutTime = currentTime;
        updatedGuests[guestIndex].status = "Đã trả phòng";
        setGuests(updatedGuests);

        // Ghi log
        addLog("/checkincheckout", "POST", "Check-out");

        setCheckoutBookingId("");
        alert(`Check-out thành công cho mã đặt phòng ${checkoutBookingId}`);
      } else {
        alert("Mã đặt phòng không hợp lệ hoặc khách chưa check-in!");
      }
    } else {
      alert("Vui lòng nhập mã đặt phòng!");
    }
  };

  const handleScanQR = (type) => {
    alert(`Quét QR để ${type === "checkin" ? "check-in" : "check-out"} (Tính năng giả lập)`);
  };

  return (
    <div className="checkinCheckout">
      <Sidebar />
      <div className="checkinCheckoutContainer">
        <Navbar />
        <h1 className="title">Quản lý Check-in / Check-out</h1>

        <div className="clock">Thời gian hiện tại: {currentTime}</div>

        <div className="statusTable">
          <h2>Trạng thái khách</h2>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên khách</th>
                <th>Mã đặt phòng</th>
                <th>Phòng</th>
                <th>Thời gian Check-in</th>
                <th>Thời gian Check-out</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr key={guest.id}>
                  <td>{index + 1}</td>
                  <td>{guest.name}</td>
                  <td>{guest.bookingId}</td>
                  <td>{guest.room}</td>
                  <td>{guest.checkinTime || "-"}</td>
                  <td>{guest.checkoutTime || "-"}</td>
                  <td className={guest.status === "Đã nhận phòng" ? "status-checkin" : "status-checkout"}>
                    {guest.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="content">
          <div className="box checkin">
            <h2>Check-in</h2>
            <input
              type="text"
              placeholder="Tên khách hàng"
              value={checkinName}
              onChange={(e) => setCheckinName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Số phòng"
              value={checkinRoom}
              onChange={(e) => setCheckinRoom(e.target.value)}
            />
            <div className="buttonGroup">
              <button className="btn btn-checkin" onClick={handleCheckin}>
                Xác nhận Check-in
              </button>
              <button className="btn btn-qr" onClick={() => handleScanQR("checkin")}>
                Quét QR
              </button>
            </div>
          </div>

          <div className="box checkout">
            <h2>Check-out</h2>
            <input
              type="text"
              placeholder="Mã đặt phòng / ID"
              value={checkoutBookingId}
              onChange={(e) => setCheckoutBookingId(e.target.value)}
            />
            <div className="buttonGroup">
              <button className="btn btn-checkout" onClick={handleCheckout}>
                Xác nhận Check-out
              </button>
              <button className="btn btn-qr" onClick={() => handleScanQR("checkout")}>
                Quét QR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckinCheckout;