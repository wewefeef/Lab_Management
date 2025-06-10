import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import instance from "../../API/axios";

const Payment = () => {
  const [records, setRecords] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({
    invoiceId: 0,
    bookingId: "",
    customerId: "",
    status: 0,
    totalAmount: 0,
    createdAt: new Date().toISOString(),
  });
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState(""); // Thêm state cho ô tìm kiếm

  // Lấy danh sách hóa đơn từ API
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await instance.get("/Invoice");
        setInvoices(res.data);
      } catch (err) {
        setInvoices([]);
      }
    };
    fetchInvoices();
  }, []);

  // Hàm xuất hóa đơn
  const handleExportInvoice = async (e) => {
    e?.preventDefault();
    if (!form.customerId || !form.bookingId) {
      alert("Vui lòng nhập Customer ID và Booking ID!");
      return;
    }
    try {
      const payload = {
        invoiceId: 0,
        bookingId: Number(form.bookingId),
        customerId: Number(form.customerId),
        status: Number(form.status),
        totalAmount: Number(form.totalAmount),
        createdAt: new Date(form.createdAt).toISOString(),
      };
      await instance.post("/Invoice", payload);
      alert("Xuất hóa đơn thành công!");
      setShowModal(false);
      // Reload danh sách hóa đơn
      const res = await instance.get("/Invoice");
      setInvoices(res.data);
    } catch (err) {
      alert(
        "Có lỗi khi xuất hóa đơn!\n" +
          (err?.response?.data?.message || err?.message || "Lỗi không xác định")
      );
      console.error(err);
    }
  };

  // Lọc hóa đơn theo Invoice ID, Booking ID, Customer ID
  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.invoiceId.toString().includes(search) ||
      inv.bookingId?.toString().includes(search) ||
      inv.customerId?.toString().includes(search)
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-4 flex flex-col items-center">
          <div className="w-full mb-4 flex items-center">
            <input
              type="text"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Tìm kiếm theo Invoice ID, Booking ID, Customer ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition ml-4"
              onClick={() => setShowModal(true)}
            >
              Nhập hóa đơn
            </button>
          </div>

          {/* Modal nhập hóa đơn */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative animate-fade-in">
                <button
                  className="absolute top-3 right-4 text-gray-400 hover:text-blue-600 text-2xl transition"
                  onClick={() => setShowModal(false)}
                  title="Đóng"
                >
                  &times;
                </button>
                <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
                  Nhập hóa đơn
                </h1>
                <form className="w-full" onSubmit={handleExportInvoice}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <label className="font-medium text-gray-700">
                        Invoice ID
                      </label>
                      <input
                        type="number"
                        placeholder="Nhập Invoice ID"
                        value={form.invoiceId}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            invoiceId: Number(e.target.value),
                          })
                        }
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-medium text-gray-700">
                        Booking ID
                      </label>
                      <input
                        type="number"
                        placeholder="Nhập Booking ID"
                        value={form.bookingId}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            bookingId: Number(e.target.value),
                          })
                        }
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-medium text-gray-700">
                        Customer ID
                      </label>
                      <input
                        type="number"
                        placeholder="Nhập Customer ID"
                        value={form.customerId}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            customerId: Number(e.target.value),
                          })
                        }
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-medium text-gray-700">
                        Status
                      </label>
                      <input
                        type="number"
                        placeholder="Nhập Status"
                        value={form.status}
                        onChange={(e) =>
                          setForm({ ...form, status: Number(e.target.value) })
                        }
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-medium text-gray-700">
                        Total Amount
                      </label>
                      <input
                        type="number"
                        placeholder="Nhập Total Amount"
                        value={form.totalAmount}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            totalAmount: Number(e.target.value),
                          })
                        }
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-medium text-gray-700">
                        Created At
                      </label>
                      <input
                        type="datetime-local"
                        value={form.createdAt.slice(0, 16)}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            createdAt: new Date(e.target.value).toISOString(),
                          })
                        }
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Xuất hóa đơn
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

          <div className="w-full bg-white rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              Danh sách hóa đơn
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-3 py-2 border-b text-left">Invoice ID</th>
                    <th className="px-3 py-2 border-b text-left">Booking ID</th>
                    <th className="px-3 py-2 border-b text-left">
                      Customer ID
                    </th>
                    <th className="px-3 py-2 border-b text-left">Status</th>
                    <th className="px-3 py-2 border-b text-left">
                      Total Amount
                    </th>
                    <th className="px-3 py-2 border-b text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-4 text-gray-400"
                      >
                        Chưa có hóa đơn
                      </td>
                    </tr>
                  ) : (
                    filteredInvoices.map((inv, idx) => {
                      return (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-3 py-2 border-b">
                            {inv.invoiceId}
                          </td>
                          <td className="px-3 py-2 border-b">
                            {inv.bookingId}
                          </td>
                          <td className="px-3 py-2 border-b">
                            {inv.customerId}
                          </td>
                          <td className="px-3 py-2 border-b">{inv.status}</td>
                          <td className="px-3 py-2 border-b">
                            {inv.totalAmount}
                          </td>
                          <td className="px-3 py-2 border-b">
                            {inv.createdAt}
                          </td>
                        </tr>
                      );
                    })
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

export default Payment;
