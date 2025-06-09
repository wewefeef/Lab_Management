import React from "react";
import { toast } from "react-toastify";
import instance from "../../API/axios";

const DeleteUserModal = ({
  show,
  onClose,
  userId,
  setUsers,
  users,
}) => {
  if (!show) return null;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await instance.delete(`/User/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.userId !== userId));
      toast.success("Đã xóa thành công!");
      onClose();
    } catch (err) {
      toast.error(
        "Lỗi xóa: " + (err.response?.data?.error || err.message)
      );
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Xác nhận xóa
        </h2>
        <p className="mb-6 text-center">
          Bạn có chắc chắn muốn xóa khách hàng này không?
        </p>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            onClick={handleDelete}
          >
            Xóa
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition"
            onClick={onClose}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;