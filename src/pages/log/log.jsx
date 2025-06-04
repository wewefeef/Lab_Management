import React, { useState } from "react";
import "./log.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Datatable from "../../components/datatable/datatable.jsx";
import { notificationColumns } from "../../datatablesource.js";
import { useLog } from "../../logContext"; // Import useLog hook

const Log = () => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { logs } = useLog(); // Lấy logs từ context

  // Tạo actionColumn để hiển thị chi tiết
  const actionColumn = [
    {
      field: "details",
      headerName: "Details",
      width: 300,
      renderCell: (params) => {
        const { endpoint, action, data } = params.row;
        const type = endpoint.split("/")[1]; // Lấy loại mục (user, hotel, v.v.)
        const dataSummary = data ? JSON.stringify(data) : "No data";
        return (
          <div>
            {action} {type}: {dataSummary}
          </div>
        );
      },
    },
  ];

  // Calculate the logs to display based on pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentLogs = logs.slice(startIndex, endIndex);

  const totalPages = Math.ceil(logs.length / pageSize);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="log-content">
          <h3>Admin Dashboard - Logs</h3>
          <Datatable 
            columns={notificationColumns} 
            rows={currentLogs} 
            setRows={() => {}} 
            actionColumn={actionColumn} // Truyền actionColumn để hiển thị chi tiết
          />
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;