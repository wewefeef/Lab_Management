import React, { useState } from "react";
import "./newHotel.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useLog } from "../../logContext";

const NewHotel = () => {
  const { addLog } = useLog();
  const [formData, setFormData] = useState({
    // Xóa title và type
    name: "",
    city: "",
    address: "",
    distance: "",
    description: "",
    contact: "",
    relationship: "Sub-hotel",
    status: "Active",
  });
  const [hotels, setHotels] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddHotel = (e) => {
    e.preventDefault();
    // Validate
    if (
      !formData.name ||
      !formData.city ||
      !formData.address ||
      !formData.distance ||
      !formData.description ||
      !formData.contact
    ) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    // Add hotel to list
    setHotels([
      ...hotels,
      {
        ...formData,
        id: Date.now(),
      },
    ]);
    addLog("/hotels", "POST", "Add Hotel");
    setFormData({
      // Xóa title và type
      name: "",
      city: "",
      address: "",
      distance: "",
      description: "",
      contact: "",
      relationship: "Sub-hotel",
      status: "Active",
    });
  };

  return (
    <div className="rooms">
      <Sidebar />
      <div className="roomsContainer">
        <Navbar />
        <div className="addRoomForm">
          <h2>Thêm khách sạn mới</h2>
          <form onSubmit={handleAddHotel}>
            {/* Bỏ phần Tiêu đề */}
            {/* <div className="formGroup">
              <label>Tiêu đề</label>
              <input ... />
            </div> */}
            <div className="formGroup">
              <label>Tên khách sạn</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên khách sạn"
              />
            </div>
            {/* Bỏ phần Loại */}
            {/* <div className="formGroup">
              <label>Loại</label>
              <input ... />
            </div> */}
            <div className="formGroup">
              <label>Thành phố</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Nhập thành phố"
              />
            </div>
            <div className="formGroup">
              <label>Địa chỉ</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ"
              />
            </div>
            <div className="formGroup">
              <label>Khoảng cách đến trung tâm (km)</label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                placeholder="Nhập khoảng cách"
                min={0}
              />
            </div>
            <div className="formGroup">
              <label>Mô tả</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập mô tả"
              />
            </div>
            <div className="formGroup">
              <label>Liên hệ</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Nhập liên hệ (số điện thoại/email)"
              />
            </div>
            <div className="formGroup">
              <label>Quan hệ</label>
              <select name="relationship" value={formData.relationship} onChange={handleChange}>
                <option value="Sub-hotel">Sub-hotel</option>
                <option value="Affiliated">Affiliated</option>
              </select>
            </div>
            <div className="formGroup">
              <label>Trạng thái</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button className="btn-submit" type="submit">
              Add Hotel
            </button>
          </form>
        </div>

        {/* Bảng danh sách khách sạn (bỏ cột Tiêu đề và Loại) */}
        <div className="roomsTable">
          <h2>Danh sách khách sạn</h2>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Thành phố</th>
                <th>Địa chỉ</th>
                <th>Khoảng cách (km)</th>
                <th>Mô tả</th>
                <th>Liên hệ</th>
                <th>Quan hệ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {hotels.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>Không có khách sạn nào</td>
                </tr>
              ) : (
                hotels.map((hotel, idx) => (
                  <tr key={hotel.id}>
                    <td>{idx + 1}</td>
                    <td>{hotel.name}</td>
                    <td>{hotel.city}</td>
                    <td>{hotel.address}</td>
                    <td>{hotel.distance}</td>
                    <td>{hotel.description}</td>
                    <td>{hotel.contact}</td>
                    <td>{hotel.relationship}</td>
                    <td>{hotel.status}</td>
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

export default NewHotel;