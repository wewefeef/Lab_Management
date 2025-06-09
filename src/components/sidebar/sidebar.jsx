import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PeopleIcon from "@mui/icons-material/People";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => setShowConfirmation(true);
  const confirmLogout = () => {
    logout();
    setShowConfirmation(false);
    navigate("/login", { replace: true });
  };
  const cancelLogout = () => setShowConfirmation(false);

  return (
    <div className="bg-white h-screen w-72 flex-shrink-0 flex flex-col py-8 border-r border-gray-100 shadow">
      <div className="flex items-center justify-center mb-8">
        <span className="font-extrabold text-2xl text-violet-700 tracking-wide drop-shadow">
          Booking   
        </span>
      </div>
      <nav className="flex-1 w-full">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `flex items-center gap-8 pl-8 pr-4 py-3 rounded-xl font-medium transition
            ${
              isActive
                ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`
              }
            >
              <DashboardIcon fontSize="medium" />
              <span>Bảng điều khiển</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex items-center gap-8 pl-8 pr-4 py-3 rounded-xl font-medium transition
            ${
              isActive
                ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`
              }
            >
              <PersonOutlineIcon fontSize="medium" />
              <span>Người dùng</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                `flex items-center gap-8 pl-8 pr-4 py-3 rounded-xl font-medium transition
            ${
              isActive
                ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`
              }
            >
              <MeetingRoomIcon fontSize="medium" />
              <span>Phòng</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `flex items-center gap-8 pl-8 pr-4 py-3 rounded-xl font-medium transition
            ${
              isActive
                ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`
              }
            >
              <MiscellaneousServicesIcon fontSize="medium" />
              <span>Dịch vụ</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/checkincheckout"
              className={({ isActive }) =>
                `flex items-center gap-8 pl-8 pr-4 py-3 rounded-xl font-medium transition
            ${
              isActive
                ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`
              }
            >
              <RoomServiceIcon fontSize="medium" />
              <span>Nhận/Trả phòng</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/payment"
              className={({ isActive }) =>
                `flex items-center gap-8 pl-8 pr-4 py-3 rounded-xl font-medium transition
            ${
              isActive
                ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`
              }
            >
              <CreditCardIcon fontSize="medium" />
              <span>Thanh toán</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customer"
              className={({ isActive }) =>
                `flex items-center gap-8 pl-8 pr-4 py-3 rounded-xl font-medium transition
            ${
              isActive
                ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`
              }
            >
              <PeopleIcon fontSize="medium" />
              <span>Khách hàng</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notification"
              className={({ isActive }) =>
                `flex items-center gap-8 pl-8 pr-4 py-3 rounded-xl font-medium transition
            ${
              isActive
                ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`
              }
            >
              <NotificationsNoneIcon fontSize="medium" />
              <span>Thông báo</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/log"
              className={({ isActive }) =>
                `flex items-center gap-8 pl-8 pr-4 py-3 rounded-xl font-medium transition
            ${
              isActive
                ? "bg-blue-100 text-blue-700 shadow border-l-4 border-blue-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            }`
              }
            >
              <PsychologyOutlinedIcon fontSize="medium" />
              <span>Nhật ký</span>
            </NavLink>
          </li>
          <li className="mt-6 border-t border-gray-200 pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-8 pl-8 pr-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 text-base w-full focus:outline-none rounded-xl font-medium transition"
            >
              <ExitToAppIcon fontSize="medium" />
              <span>Đăng xuất</span>
            </button>
          </li>
          <li>
            <div className="flex items-center gap-8 pl-8 pr-4 py-3 text-gray-500 text-base rounded-xl">
              <SettingsApplicationsIcon fontSize="medium" />
              <span>Cài đặt</span>
            </div>
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
