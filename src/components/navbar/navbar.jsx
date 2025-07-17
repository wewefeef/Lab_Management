import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import AssessmentIcon from "@mui/icons-material/Assessment";

const menuList = [
  { label: "Calendar", icon: <CalendarTodayIcon />, to: "/calendar" },
  { label: "Task", icon: <AssignmentIcon />, to: "/task" },
  { label: "User", icon: <PersonOutlineIcon />, to: "/users" },
  { label: "Project", icon: <WorkOutlineIcon />, to: "/project" },
  { label: "Event", icon: <EventNoteIcon />, to: "/event" },
  { label: "Device", icon: <DevicesOtherIcon />, to: "/device" },
  { label: "Borrow", icon: <AssignmentReturnIcon />, to: "/borrow" },
  { label: "KPI", icon: <AssessmentIcon />, to: "/kpi" },
  { label: "Task 2", icon: <AssignmentIcon />, to: "/task2" },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  // Đóng menu khi chuyển route
  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  return (
    <div className="w-full bg-white h-16 flex items-center px-6 shadow-sm border-b relative z-40">
      <div className="flex-1 flex items-center relative">
        {/* Dropdown menu */}
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute left-0 top-12 w-48 bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl z-50 py-4 px-2 flex flex-col gap-2 border border-gray-100"
            style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)" }}
          >
            {menuList.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-2 px-3 py-2 bg-white/80 rounded-full hover:bg-blue-50 hover:shadow-md border border-transparent hover:border-blue-200 text-gray-700 transition-all duration-150 text-sm font-medium"
                onClick={() => navigate(item.to)}
              >
                <span className="text-lg text-blue-500">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="flex flex-col items-start">
          <span className="font-semibold text-sm text-gray-800">N.Truong</span>
          <span className="text-xs text-gray-500">Admin</span>
        </div>
        <button className="ml-2 text-gray-400 hover:text-gray-600">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;