import React, { useState } from "react";
import "./invoices.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Datatable from "../../components/datatable/datatable.jsx";
import { invoiceColumns } from "../../invoicedatatable.js";
import { useLog } from "../../logContext.js";

const Invoices = () => {
  const { addLog } = useLog();

  const [invoices, setInvoices] = useState([
    {
      _id: "INV-001",
      customerName: "Nguyễn Văn A",
      room: { type: "VIP", details: { beds: 2, kitchen: 1, livingRoom: 1 } },
      services: ["Spa", "Tắm nắng"],
      price: 1500000,
      status: "Chưa thanh toán",
    },
    {
      _id: "INV-002",
      customerName: "Trần Thị B",
      room: { type: "Thường", details: { beds: 1, kitchen: 0, livingRoom: 0 } },
      services: ["Spa"],
      price: 800000,
      status: "Đã thanh toán",
    },
  ]);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="invoices-content">
          <h3>Admin Dashboard - Invoices</h3>
          <Datatable
            columns={invoiceColumns}
            rows={invoices}
            setRows={setInvoices}
            context={{ addLog }} // Truyền addLog vào context của DataGrid
          />
        </div>
      </div>
    </div>
  );
};

export default Invoices;