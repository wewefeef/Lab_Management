import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PeopleIcon from "@mui/icons-material/People";

const Sidebar = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  // Lấy roleId trực tiếp từ localStorage (vì bạn lưu là key riêng)
  let roleId = localStorage.getItem("roleId");
  if (roleId) {
    roleId = parseInt(roleId, 10);
  } else {
    roleId = null;
  }

  // Nếu không có roleId (chưa đăng nhập), chuyển hướng về login và không render sidebar
  if (!roleId) {
    navigate("/login");
    return null;
  }

  // Định nghĩa các menu
  const menus = [
    {
      key: "dashboard",
      to: "/admin",
      icon: <DashboardIcon fontSize="medium" />,
      label: "Bảng điều khiển",
      roles: [1],
    },
    {
      key: "users",
      to: "/users",
      icon: <PersonOutlineIcon fontSize="medium" />,
      label: "Người dùng",
      roles: [1],
    },
    {
      key: "rooms",
      to: "/rooms",
      icon: <MeetingRoomIcon fontSize="medium" />,
      label: "Phòng",
      roles: [1, 2],
    },
    {
      key: "services",
      to: "/services",
      icon: <MiscellaneousServicesIcon fontSize="medium" />,
      label: "Dịch vụ",
      roles: [1, 2],
    },
    {
      key: "checkincheckout",
      to: "/checkincheckout",
      icon: <RoomServiceIcon fontSize="medium" />,
      label: "Nhận/Trả phòng",
      roles: [1, 2, 4],
    },
    {
      key: "payment",
      to: "/payment",
      icon: <CreditCardIcon fontSize="medium" />,
      label: "Thanh toán",
      roles: [1, 2, 3, 4],
    },
    {
      key: "customer",
      to: "/customer",
      icon: <PeopleIcon fontSize="medium" />,
      label: "Khách hàng",
      roles: [1, 2],
    },
    {
      key: "notification",
      to: "/notification",
      icon: <NotificationsNoneIcon fontSize="medium" />,
      label: "Thông báo",
      roles: [1],
    },
    {
      key: "log",
      to: "/log",
      icon: <PsychologyOutlinedIcon fontSize="medium" />,
      label: "Nhật ký",
      roles: [1],
    },
  ];

  // Lọc menu theo roleId
  const filteredMenus = menus.filter((item) => item.roles.includes(roleId));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const confirmLogout = () => {
    setShowConfirmation(false);
    navigate("/login", { replace: true });
  };
  const cancelLogout = () => setShowConfirmation(false);

  return (
    <div className="bg-white h-screen w-80 flex-shrink-0 flex flex-col py-8 border-r border-gray-100 shadow overflow-visible">
      <div className="flex items-center justify-center mb-8">
        <span className="font-extrabold text-2xl text-violet-700 tracking-wide drop-shadow">
          Booking
        </span>
      </div>
      <nav className="flex-1 w-full">
        <ul className="space-y-1">
          {filteredMenus.map((item) => (
            <li key={item.key}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-8 pl-12 pr-8 py-3 rounded-xl font-medium transition
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
          <li className="mt-6 border-t border-gray-200 pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-8 pl-12 pr-8 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 text-base w-full focus:outline-none rounded-xl font-medium transition"
            >
              <ExitToAppIcon fontSize="medium" />
              <span>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </nav>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-64">
            <p className="mb-4 text-center text-sm">
              Bạn có chắc chắn muốn đăng xuất?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                onClick={confirmLogout}
              >
                Đồng ý
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-1 rounded"
                onClick={cancelLogout}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
