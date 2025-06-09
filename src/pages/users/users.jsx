import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import DeleteUserModal from "../../components/users/DeleteUserModal";
import UserFormModal from "../../components/users/UserFormModal";
import {
  fetchUsers,
  fetchRoles,
  addUser,
  updateUser,
} from "../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import { useLog } from "../../logContext";
import { FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const getRoleNameVN = (roleName) =>
  ({
    Admin: "Quản trị viên",
    Receptionist: "Nhân viên lễ tân",
    Accountant: "Kế toán",
    Customer: "Khách hàng",
  }[roleName] || roleName);

const Users = () => {
  const { addLog } = useLog();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    roleId: "",
  });
  const [editUserData, setEditUserData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    roleId: "",
    role: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchUsers(token)
      .then((res) => setUsers(res.data))
      .catch(() => toast.error("Lỗi lấy danh sách user"));
    fetchRoles(token)
      .then((res) => setRoles(res.data))
      .catch(() => toast.error("Lỗi lấy danh sách vai trò"));
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = async () => {
    if (Object.values(newUser).some((v) => !v))
      return toast.warning("Vui lòng nhập đầy đủ thông tin!");
    try {
      const token = localStorage.getItem("token");
      await addUser(token, newUser);
      setUsers([...users, newUser]);
      addLog("/User", "POST", "Add User");
      setNewUser({
        username: "",
        password: "",
        fullName: "",
        email: "",
        phone: "",
        roleId: "",
      });
      setShowAddForm(false);
      toast.success(`Đã thêm khách hàng ${newUser.fullName} thành công!`);
    } catch (err) {
      toast.error(
        "Thêm user thất bại: " + (err.response?.data?.error || err.message)
      );
    }
  };

  const handleEditClick = (user) => {
    setEditUserId(user.userId);
    setEditUserData({
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      roleId: user.role?.roleId || "",
      role: user.role || null,
    });
  };

  const handleSaveEdit = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await updateUser(token, userId, editUserData);
      setUsers(
        users.map((u) => (u.userId === userId ? { ...u, ...editUserData } : u))
      );
      setEditUserId(null);
      toast.success("Cập nhật thành công!");
    } catch (err) {
      toast.error(
        "Lỗi cập nhật: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar className="w-16 flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-2">Quản lý User</h1>
          <div className="mb-4 text-gray-600">
            Tổng số khách hàng:{" "}
            <span className="font-semibold">{users.length}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-56 px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className={`px-6 py-2 rounded-lg font-medium text-base shadow transition ${
                showAddForm
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? "Đóng" : "Thêm khách hàng"}
            </button>
          </div>
          {/* Bảng danh sách khách hàng */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Danh sách khách hàng</h2>
            <div className="overflow-x-auto rounded-lg shadow bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-center font-medium text-gray-700">
                      STT
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700">
                      Username
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700">
                      Họ và tên
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700">
                      Email
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700">
                      Số điện thoại
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700">
                      Vai trò
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700">
                      Xóa
                    </th>
                    <th className="px-4 py-2 text-center font-medium text-gray-700">
                      Sửa
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredUsers.map((user, idx) => (
                    <tr
                      key={user.userId || user.username + idx}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 text-center">{idx + 1}</td>
                      <td className="px-4 py-2">{user.username}</td>
                      <td className="px-4 py-2">{user.fullName}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.phone}</td>
                      <td className="px-4 py-2">
                        {getRoleNameVN(user.role?.roleName) || ""}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="text-red-600 hover:text-red-800 text-lg"
                          onClick={() => {
                            setUserIdToDelete(user.userId);
                            setShowDeleteModal(true);
                          }}
                          title="Xóa"
                        >
                          <FaTrash />
                        </button>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded px-4 py-1 transition"
                          onClick={() => handleEditClick(user)}
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Các modal */}
          <UserFormModal
            show={showAddForm}
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddUser}
            userData={newUser}
            setUserData={setNewUser}
            roles={roles}
            isEdit={false}
            getRoleNameVN={getRoleNameVN}
          />
          <UserFormModal
            show={!!editUserId}
            onClose={() => setEditUserId(null)}
            onSubmit={() => handleSaveEdit(editUserId)}
            userData={editUserData}
            setUserData={setEditUserData}
            roles={roles}
            isEdit={true}
            getRoleNameVN={getRoleNameVN}
          />
          <DeleteUserModal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            userId={userIdToDelete}
            setUsers={setUsers}
            users={users}
          />
          <ToastContainer position="top-right" autoClose={2000} />
        </main>
      </div>
    </div>
  );
};

export default Users;
