import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./services.scss";
import { useLog } from "../../logContext";
import instance from "../../API/axios"; // Đảm bảo đã import axios instance

const Service = () => {
  const { addLog } = useLog();
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    price: "",
    description: "",
  });

  const [services, setServices] = useState([]);

  // Lấy danh sách dịch vụ từ API khi load trang
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await instance.get("/Service", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(res.data); // Giả sử API trả về mảng dịch vụ
      } catch (err) {
        alert("Không lấy được danh sách dịch vụ: " + (err.response?.data?.error || err.message));
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async () => {
    if (serviceData.serviceName && serviceData.price && serviceData.description) {
      try {
        const token = localStorage.getItem("token");
        const payload = {
          serviceName: serviceData.serviceName,
          price: Number(serviceData.price), // Đảm bảo gửi kiểu số
          description: serviceData.description,
        };
        await instance.post(
          "/Service",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        addLog("/Service", "POST", "Add Service");
        setServiceData({ serviceName: "", price: "", description: "" });
        alert(`Đã thêm dịch vụ mới: ${serviceData.serviceName}`);
      } catch (err) {
        alert("Thêm dịch vụ thất bại: " + (err.response?.data?.error || err.message));
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  const handleConfirmService = (id) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, status: "Đã xác nhận" } : service
    );
    setServices(updatedServices);

    // Ghi log
    addLog("/services", "PUT", "Confirm Service");

    alert(`Đã xác nhận dịch vụ ID ${id}`);
  };

  const handleCancelService = (id) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, status: "Đã hủy" } : service
    );
    setServices(updatedServices);

    // Ghi log
    addLog("/services", "PUT", "Cancel Service");

    alert(`Đã hủy dịch vụ ID ${id}`);
  };

  return (
    <div className="service">
      <Sidebar />
      <div className="serviceContainer">
        <Navbar />
        <h1 className="title">Quản lý Dịch vụ</h1>

        <div className="formContainer">
          <div className="formRow">
            <div className="formGroup">
              <label>Service Name</label>
              <input
                type="text"
                value={serviceData.serviceName}
                onChange={(e) => setServiceData({ ...serviceData, serviceName: e.target.value })}
                placeholder="Service Name"
              />
            </div>
            <div className="formGroup">
              <label>Price</label>
              <input
                type="text"
                value={serviceData.price}
                onChange={(e) => setServiceData({ ...serviceData, price: e.target.value })}
                placeholder="Price"
              />
            </div>
          </div>
          <div className="formRow">
            <div className="formGroup">
              <label>Description</label>
              <textarea
                value={serviceData.description}
                onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
                placeholder="Description"
              />
            </div>
          </div>
          <button className="btn-submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <div className="serviceTable">
          <h2>Trạng thái dịch vụ</h2>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên người</th>
                <th>ID dịch vụ</th>
                <th>Loại dịch vụ</th>
                <th>Giá dịch vụ</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.id}>
                  <td>{index + 1}</td>
                  <td>Khách hàng {index + 1}</td>
                  <td>{service.serviceId}</td>
                  <td>{service.serviceName}</td>
                  <td>{service.price}</td>
                  <td
                    className={
                      service.status === "Đã xác nhận"
                        ? "status-confirmed"
                        : service.status === "Đã hủy"
                        ? "status-canceled"
                        : "status-pending"
                    }
                  >
                    {service.status}
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

export default Service;