import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { useLog } from "../../logContext";
import instance from "../../API/axios";

const Service = () => {
  const { addLog } = useLog();
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    price: "",
    description: "",
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await instance.get("/Service", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(res.data);
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
          price: Number(serviceData.price),
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
    addLog("/services", "PUT", "Confirm Service");
    alert(`Đã xác nhận dịch vụ ID ${id}`);
  };

  const handleCancelService = (id) => {
    const updatedServices = services.map((service) =>
      service.id === id ? { ...service, status: "Đã hủy" } : service
    );
    setServices(updatedServices);
    addLog("/services", "PUT", "Cancel Service");
    alert(`Đã hủy dịch vụ ID ${id}`);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">Quản lý Dịch vụ</h1>

          {/* Form */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1">Service Name</label>
                <input
                  type="text"
                  value={serviceData.serviceName}
                  onChange={(e) => setServiceData({ ...serviceData, serviceName: e.target.value })}
                  placeholder="Service Name"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-1">Price</label>
                <input
                  type="text"
                  value={serviceData.price}
                  onChange={(e) => setServiceData({ ...serviceData, price: e.target.value })}
                  placeholder="Price"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">Description</label>
              <textarea
                value={serviceData.description}
                onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
                placeholder="Description"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Trạng thái dịch vụ</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">STT</th>
                    <th className="py-2 px-4 border-b text-left">Tên người</th>
                    <th className="py-2 px-4 border-b text-left">ID dịch vụ</th>
                    <th className="py-2 px-4 border-b text-left">Loại dịch vụ</th>
                    <th className="py-2 px-4 border-b text-left">Giá dịch vụ</th>
                    <th className="py-2 px-4 border-b text-left">Trạng thái</th>
                    <th className="py-2 px-4 border-b text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">Khách hàng {index + 1}</td>
                      <td className="py-2 px-4 border-b">{service.serviceId}</td>
                      <td className="py-2 px-4 border-b">{service.serviceName}</td>
                      <td className="py-2 px-4 border-b">{service.price}</td>
                      <td
                        className={`py-2 px-4 border-b font-semibold ${
                          service.status === "Đã xác nhận"
                            ? "text-green-600"
                            : service.status === "Đã hủy"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {service.status}
                      </td>
                      <td className="py-2 px-4 border-b space-x-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm"
                          onClick={() => handleConfirmService(service.id)}
                          disabled={service.status === "Đã xác nhận"}
                        >
                          Xác nhận
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                          onClick={() => handleCancelService(service.id)}
                          disabled={service.status === "Đã hủy"}
                        >
                          Hủy
                        </button>
                      </td>
                    </tr>
                  ))}
                  {services.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-4 text-gray-500">
                        Không có dịch vụ nào.
                      </td>
                    </tr>
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

export default Service;