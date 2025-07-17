import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import AssessmentIcon from "@mui/icons-material/Assessment";

// Thêm icon vào menuList
const menuList = [
  { label: "Calendar", icon: <CalendarTodayIcon />, to: "/calendar" },
  { label: "Task", icon: <AssignmentIcon />, to: "/task" },
  { label: "User", icon: <PersonOutlineIcon />, to: "/users" },
  { label: "Project", icon: <WorkOutlineIcon />, to: "/project" },
  { label: "Event", icon: <EventNoteIcon />, to: "/event" },
  { label: "Device", icon: <DevicesOtherIcon />, to: "/device" },
  { label: "Borrow", icon: <AssignmentReturnIcon />, to: "/borrow" },
  { label: "KPI", icon: <AssessmentIcon />, to: "/kpi" },
  { label: "Task", icon: <AssignmentIcon />, to: "/task2" },
];

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    // Fix ResizeObserver loop error
    const handleResizeObserverErr = () => {};
    window.addEventListener('error', handleResizeObserverErr);

    return () => {
      window.removeEventListener('error', handleResizeObserverErr);
    };
  }, [navigate]);

  const widgets = [
    {
      label: "User",
      value: 0,
      icon: <PeopleAltOutlinedIcon className="text-3xl text-white" />,
      bg: "bg-indigo-400",
      iconBg: "bg-indigo-100",
    },
    {
      label: "Total Task",
      value: 0,
      icon: <AddTaskOutlinedIcon className="text-3xl text-yellow-600" />,
      bg: "bg-yellow-100",
      iconBg: "bg-yellow-200",
    },
    {
      label: "KPI",
      value: 0,
      icon: <AssessmentOutlinedIcon className="text-3xl text-green-600" />,
      bg: "bg-green-100",
      iconBg: "bg-green-200",
    },
    {
      label: "Event",
      value: 0,
      icon: <EventNoteOutlinedIcon className="text-3xl text-red-600" />,
      bg: "bg-red-100",
      iconBg: "bg-red-200",
    },
  ];

  // Hàm chuyển trang và ẩn menu phụ
  const handleMenuClick = (to) => {
    navigate(to);
    setShowMenu(false);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        {/* Main content */}
        <div className="p-8 flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
          {/* Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {widgets.map((w) => (
              <div
                key={w.label}
                className={`rounded-xl shadow flex flex-col items-start px-6 py-6 min-w-[180px] min-h-[120px] ${w.bg}`}
              >
                <div className={`rounded-full p-2 mb-2 ${w.iconBg}`}>
                  {w.icon}
                </div>
                <div className="text-gray-600 text-base">{w.label}</div>
                <div className="text-2xl font-bold mt-1">{w.value}</div>
              </div>
            ))}
          </div>
          {/* Chart section */}
          <div className="bg-white rounded-xl shadow p-8 mt-4">
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold text-xl">Chart</div>
              <select className="border rounded px-3 py-1 text-sm">
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
            {/* Chart placeholder */}
            <div className="h-72 flex items-center justify-center text-gray-400">
              {/* Replace this with your chart component */}
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-300 text-lg">Chart here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;