import React from "react";

const UserFormModal = ({
  show,
  onClose,
  onSubmit,
  userData,
  setUserData,
  roles,
  isEdit,
  getRoleNameVN,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-700"
          onClick={onClose}
          title="Đóng"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-6 text-center">
          {isEdit ? "Chỉnh sửa khách hàng" : "Thêm khách hàng mới"}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              placeholder="Nhập username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isEdit}
            />
          </div>
          {!isEdit && (
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                value={userData.password || ""}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                placeholder="Nhập password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Họ và tên</label>
            <input
              type="text"
              value={userData.fullName}
              onChange={(e) =>
                setUserData({ ...userData, fullName: e.target.value })
              }
              placeholder="Nhập họ và tên"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Nhập email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Số điện thoại</label>
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              placeholder="Nhập số điện thoại"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Vai trò</label>
            <select
              value={userData.roleId || userData.role?.roleId || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  roleId: Number(e.target.value),
                  role: {
                    ...userData.role,
                    roleId: Number(e.target.value),
                    roleName:
                      roles.find((r) => r.roleId === Number(e.target.value))
                        ?.roleName || "",
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Chọn vai trò</option>
              {roles.map((role) => (
                <option key={role.roleId} value={role.roleId}>
                  {getRoleNameVN(role.roleName)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
              onClick={onSubmit}
            >
              {isEdit ? "Lưu" : "Add User"}
            </button>
            <button
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded-lg transition"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;