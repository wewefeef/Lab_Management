import React, { useState } from "react";
import "./newHotel.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { useLog } from "../../logContext"; // Import useLog

const NewHotel = () => {
  const { addLog } = useLog(); // Lấy addLog từ context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    description: "",
    contact: "",
    relationship: "Sub-hotel",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting hotel data:", formData);

    const newHotel = { ...formData, _id: Date.now() };

    // Ghi log
    addLog("/hotels/new", "POST", "Add Hotel");

    navigate("/hotels", { state: { newItem: newHotel } });

    setFormData({
      title: "",
      name: "",
      type: "",
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
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="new-hotel">
          <h1>Add New Hotel</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter hotel title"
                required
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter hotel name"
                required
              />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Enter hotel type"
                required
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                required
              />
            </div>
            <div className="form-group">
              <label>Distance from City Center:</label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                placeholder="Enter distance (km)"
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              />
            </div>
            <div className="form-group">
              <label>Contact:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter contact (phone/email)"
                required
              />
            </div>
            <div className="form-group">
              <label>Relationship:</label>
              <select name="relationship" value={formData.relationship} onChange={handleChange}>
                <option value="Sub-hotel">Sub-hotel</option>
                <option value="Affiliated">Affiliated</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button type="submit">Add Hotel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;