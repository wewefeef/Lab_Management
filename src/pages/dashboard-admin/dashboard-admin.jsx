import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Widget from "../../components/widget/widget";
import Featured from "../../components/featured/featured";
import Chart from "../../components/chart/chart";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6 flex flex-col gap-8">
          {/* Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          {/* Charts */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white rounded-lg shadow p-4">
              <Featured />
            </div>
            <div className="flex-1 bg-white rounded-lg shadow p-4">
              <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;