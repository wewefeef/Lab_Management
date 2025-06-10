import React, { useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Datatable from "../../components/datatable/datatable.jsx";
import { notificationColumns } from "../../datatablesource.js";
import { useLog } from "../../logContext";

const Log = () => {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { logs } = useLog();

  // Tạo actionColumn để hiển thị chi tiết
  const actionColumn = [
    {
      field: "details",
      headerName: "Chi tiết",
      width: 400,
      renderCell: (params) => {
        const { endpoint, action, data } = params.row;
        const type = endpoint.split("/")[1];
        const dataSummary = data ? JSON.stringify(data) : "No data";
        return (
          <div className="text-left text-gray-700 text-sm">
            <span className="font-semibold text-blue-700">{action}</span>{" "}
            <span className="italic text-gray-500">{type}</span>:{" "}
            <span className="break-all">{dataSummary}</span>
          </div>
        );
      },
    },
  ];

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentLogs = logs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(logs.length / pageSize);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-start py-8 px-2">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center drop-shadow">
              Admin Dashboard - Logs
            </h3>
            <Datatable
              columns={notificationColumns}
              rows={currentLogs}
              setRows={() => {}}
              actionColumn={actionColumn}
            />
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Trang trước
              </button>
              <span className="font-medium text-gray-700">
                Trang {currentPage} / {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Trang sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
