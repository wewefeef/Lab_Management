import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./services.scss";
import { useLog } from "../../logContext"; // Import useLog

const Service = () => {
  const { addLog } = useLog(); // Lấy addLog từ context
  const [serviceData, setServiceData] = useState({
    serviceId: "",
    serviceName: "",
    price: "",
    description: "",
  });

  const [services, setServices] = useState([]);

  const handleSubmit = () => {
    if (serviceData.serviceId && serviceData.serviceName && serviceData.price && serviceData.description) {
      const newService = {
        id: services.length + 1,
        serviceId: serviceData.serviceId,
        serviceName: serviceData.serviceName,
        price: serviceData.price,
        status: "Đang chờ xử lý",
      };
      setServices([...services, newService]);

      // Ghi log
      addLog("/services", "POST", "Add Service");

      setServiceData({ serviceId: "", serviceName: "", price: "", description: "" });
      alert(`Đã thêm dịch vụ mới: ${serviceData.serviceName} (ID: ${serviceData.serviceId})`);
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
              <label>Service ID</label>
              <input
                type="text"
                value={serviceData.serviceId}
                onChange={(e) => setServiceData({ ...serviceData, serviceId: e.target.value })}
                placeholder="Service ID"
              />
            </div>
            <div className="formGroup">
              <label>Service Name</label>
              <input
                type="text"
                value={serviceData.serviceName}
                onChange={(e) => setServiceData({ ...serviceData, serviceName: e.target.value })}
                placeholder="Service Name"
              />
            </div>
          </div>
          <div className="formRow">
            <div className="formGroup">
              <label>Price</label>
              <input
                type="text"
                value={serviceData.price}
                onChange={(e) => setServiceData({ ...serviceData, price: e.target.value })}
                placeholder="Price"
              />
            </div>
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
                <th>Hành động</th>
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
                  <td>
                    {service.status === "Đang chờ xử lý" && (
                      <>
                        <button
                          className="btn btn-confirm"
                          onClick={() => handleConfirmService(service.id)}
                        >
                          Xác nhận
                        </button>
                        <button
                          className="btn btn-cancel"
                          onClick={() => handleCancelService(service.id)}
                        >
                          Hủy
                        </button>
                      </>
                    )}
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