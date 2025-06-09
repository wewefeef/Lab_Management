import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrashAlt } from "react-icons/fa";

const API_URL = "http://160.187.229.165:5000/Customer";

const defaultForm = {
  customerId: 0,
  userId: "",
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

  // Thêm khách hàng
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const now = new Date().toISOString();
      await axios.post(
        API_URL,
        {
          ...form,
          customerId: 0,
          userId: Number(form.userId) || 0,
          createdAt: now,
        },
        getAuthConfig()
      );
      setForm(defaultForm);
      fetchCustomers();
      toast.success("Thêm khách hàng thành công!");
    } catch (err) {
      toast.error("Lỗi khi thêm khách hàng");
    }
  };

  // Xóa khách hàng
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthConfig());
      fetchCustomers();
      toast.success("Xóa khách hàng thành công!");
    } catch (err) {
      toast.error("Lỗi khi xóa khách hàng");
    }
  };

  // Sửa khách hàng
  const handleEdit = (customer) => {
    setEditingId(customer.customerId);
    setForm({
      customerId: customer.customerId,
      userId: customer.userId,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      createdAt: customer.createdAt,
    });
  };

  // Cập nhật khách hàng
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/${editingId}`,
        {
          ...form,
          userId: Number(form.userId) || 0,
        },
        getAuthConfig()
      );
      setEditingId(null);
      setForm(defaultForm);
      fetchCustomers();
      toast.success("Cập nhật khách hàng thành công!");
    } catch (err) {
      toast.error("Lỗi khi cập nhật khách hàng");
    }
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
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <input
              type="text"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <form
              onSubmit={editingId ? handleUpdate : handleAdd}
              className="flex gap-2"
            >
              <input
                className="border border-gray-300 px-3 py-2 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="User ID"
                type="number"
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                required
              />
              <input
                className="border border-gray-300 px-3 py-2 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Họ tên"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
              />
              <input
                className="border border-gray-300 px-3 py-2 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                className="border border-gray-300 px-3 py-2 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Số điện thoại"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <input
                className="border border-gray-300 px-3 py-2 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Địa chỉ"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                {editingId ? "Cập nhật" : "Thêm"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition"
                  onClick={() => {
                    setEditingId(null);
                    setForm(defaultForm);
                  }}
                >
                  Hủy
                </button>
              )}
            </form>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 mt-4">
            <div className="font-semibold text-lg mb-2">
              Danh sách khách hàng
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-3 border-b">STT</th>
                    <th className="p-3 border-b">User ID</th>
                    <th className="p-3 border-b">Họ tên</th>
                    <th className="p-3 border-b">Email</th>
                    <th className="p-3 border-b">Số điện thoại</th>
                    <th className="p-3 border-b">Địa chỉ</th>
                    <th className="p-3 border-b">Ngày tạo</th>
                    <th className="p-3 border-b">PUT</th>
                    <th className="p-3 border-b">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((cus, idx) => (
                    <tr
                      key={cus.customerId}
                      className="text-center hover:bg-blue-50 transition"
                    >
                      <td className="p-3">{idx + 1}</td>
                      <td className="p-3">{cus.userId}</td>
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
                        colSpan={9}
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
