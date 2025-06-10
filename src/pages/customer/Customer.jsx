import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrashAlt } from "react-icons/fa";

const API_URL = "http://160.187.229.165:5000/Customer";

const defaultForm = {
  customerId: 0,
  userId: 0,
  fullName: "",
  email: "",
  phone: "",
  address: "",
  createdAt: "",
};

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Lấy danh sách khách hàng
  const fetchCustomers = async () => {
    try {
      const res = await axios.get(API_URL, getAuthConfig());
      setCustomers(res.data);
    } catch (err) {
      toast.error("Lỗi khi lấy danh sách khách hàng");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Thêm hoặc cập nhật khách hàng
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const now = new Date().toISOString();
      if (editingId) {
        await axios.put(
          `${API_URL}/${editingId}`,
          {
            customerId: form.customerId,
            userId: form.userId,
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            address: form.address,
            createdAt: form.createdAt,
          },
          getAuthConfig()
        );
        toast.success("Cập nhật khách hàng thành công!");
      } else {
        await axios.post(
          API_URL,
          {
            customerId: 0,
            userId: Number(localStorage.getItem("userId")), // Lấy userId từ localStorage
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            address: form.address,
            createdAt: now,
          },
          getAuthConfig()
        );
        toast.success("Thêm khách hàng thành công!");
      }
      setForm(defaultForm);
      setEditingId(null);
      setShowModal(false);
      fetchCustomers();
    } catch (err) {
      toast.error(
        editingId ? "Lỗi khi cập nhật khách hàng" : "Lỗi khi thêm khách hàng"
      );
    }
  };

  // Xóa khách hàng (dùng alert thay cho modal)
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      try {
        await axios.delete(`${API_URL}/${id}`, getAuthConfig());
        fetchCustomers();
        toast.success("Xóa khách hàng thành công!");
      } catch (err) {
        toast.error("Lỗi khi xóa khách hàng");
      }
    }
  };

  // Sửa khách hàng
  const handleEdit = (customer) => {
    setEditingId(customer.customerId);
    setForm({
      customerId: customer.customerId,
      userId: customer.userId ?? 0, // Nếu không có thì để 0
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      createdAt: customer.createdAt,
    });
    setShowModal(true);
  };

  // Lọc khách hàng theo tên hoặc email
  const filteredCustomers = customers.filter(
    (cus) =>
      cus.fullName.toLowerCase().includes(search.toLowerCase()) ||
      cus.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="max-w-full mx-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 px-0">
            <input
              type="text"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              onClick={() => {
                setForm(defaultForm);
                setEditingId(null);
                setShowModal(true);
              }}
            >
              Thêm khách hàng
            </button>
          </div>

          {/* Modal thêm/sửa khách hàng */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 transition-all">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
                <button
                  className="absolute top-3 right-4 text-gray-400 hover:text-blue-600 text-2xl transition"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setForm(defaultForm);
                  }}
                  title="Đóng"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 tracking-tight">
                  {editingId ? "Cập nhật khách hàng" : "Thêm khách hàng"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      className="block mb-1 font-medium text-gray-700"
                      htmlFor="fullName"
                    >
                      Họ tên
                    </label>
                    <input
                      id="fullName"
                      className="border border-gray-200 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 placeholder-gray-400 transition"
                      placeholder="Họ tên"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-1 font-medium text-gray-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      className="border border-gray-200 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 placeholder-gray-400 transition"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-1 font-medium text-gray-700"
                      htmlFor="phone"
                    >
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      className="border border-gray-200 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 placeholder-gray-400 transition"
                      placeholder="Số điện thoại"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-1 font-medium text-gray-700"
                      htmlFor="address"
                    >
                      Địa chỉ
                    </label>
                    <input
                      id="address"
                      className="border border-gray-200 px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-700 placeholder-gray-400 transition"
                      placeholder="Địa chỉ"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex gap-3 justify-end mt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition-all focus:ring-2 focus:ring-blue-300"
                    >
                      {editingId ? "Cập nhật" : "Thêm"}
                    </button>
                    <button
                      type="button"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-semibold shadow transition-all"
                      onClick={() => {
                        setShowModal(false);
                        setEditingId(null);
                        setForm(defaultForm);
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
              <style>
                {`
                @keyframes fade-in {
                  from { opacity: 0; transform: translateY(40px);}
                  to { opacity: 1; transform: translateY(0);}
                }
                .animate-fade-in {
                  animation: fade-in 0.3s cubic-bezier(.4,0,.2,1);
                }
              `}
              </style>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow p-4 mt-4 mx-0">
            <div className="font-semibold text-lg mb-2">
              Danh sách khách hàng
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-3 border-b">STT</th>
                    <th className="p-3 border-b">Họ tên</th>
                    <th className="p-3 border-b">Email</th>
                    <th className="p-3 border-b">Số điện thoại</th>
                    <th className="p-3 border-b">Địa chỉ</th>
                    <th className="p-3 border-b">Ngày tạo</th>
                    <th className="p-3 border-b">Sửa</th>
                    <th className="p-3 border-b">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((cus, idx) => (
                    <tr
                      key={cus.customerId}
                      className="text-center hover:bg-blue-50 transition"
                    >
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3">{cus.fullName}</td>
                      <td className="p-3">{cus.email}</td>
                      <td className="p-3">{cus.phone}</td>
                      <td className="p-3">{cus.address}</td>
                      <td className="p-3">
                        {cus.createdAt
                          ? new Date(cus.createdAt).toLocaleString()
                          : ""}
                      </td>
                      <td className="p-3">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition"
                          onClick={() => handleEdit(cus)}
                        >
                          Sửa
                        </button>
                      </td>
                      <td className="p-3">
                        <button
                          className="hover:bg-red-100 rounded-full p-2 transition"
                          onClick={() => handleDelete(cus.customerId)}
                        >
                          <FaTrashAlt className="text-red-500 text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-6 text-gray-400"
                      >
                        Không có khách hàng nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Customer;
