export const invoiceColumns = [
  { field: "_id", headerName: "Mã ID", width: 100 },
  { field: "customerName", headerName: "Tên Khách Hàng", width: 150 },
  {
    field: "room",
    headerName: "Phòng Đã Đặt",
    width: 200,
    renderCell: (params) => {
      const room = params.value;
      return (
        <div>
          {room.type} - {room.details.beds} giường, {room.details.kitchen} bếp, {room.details.livingRoom} phòng khách
        </div>
      );
    },
  },
  {
    field: "services",
    headerName: "Dịch Vụ",
    width: 150,
    renderCell: (params) => {
      return <div>{params.value.join(", ")}</div>;
    },
  },
  {
    field: "price",
    headerName: "Giá (VNĐ)",
    width: 120,
    renderCell: (params) => {
      return <div>{params.value.toLocaleString()}</div>;
    },
  },
  {
    field: "status",
    headerName: "Trạng Thái",
    width: 150,
    renderCell: (params) => {
      const { row, api } = params;
      const handleClick = () => {
        const newStatus = row.status === "Chưa thanh toán" ? "Đã thanh toán" : "Chưa thanh toán";
        const updatedRow = { ...row, status: newStatus };
        api.updateRows([updatedRow]);
        // Ghi log hành động
        const addLog = api.getContext().addLog;
        addLog(`/invoices/${row._id}`, "PATCH", "Update Payment Status");
      };
      return (
        <span
          onClick={handleClick}
          style={{
            cursor: "pointer",
            color: row.status === "Đã thanh toán" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {row.status}
        </span>
      );
    },
  },
];