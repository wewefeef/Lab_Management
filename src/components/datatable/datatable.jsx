import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Datatable = ({ columns, rows, setRows, hideAddNew = false, actionColumn = [], context = {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState(rows || []);

  useEffect(() => {
    if (location.state && location.state.newItem) {
      const newItem = { ...location.state.newItem, _id: Date.now() };
      const updatedList = [...list, newItem];
      setList(updatedList);
      if (setRows) setRows(updatedList);
      navigate(location.pathname, { state: null, replace: true });
    }
  }, [location.state, navigate, setRows, list, location.pathname]);

  const handleDelete = (id) => {
    const updatedList = list.filter((item) => item._id !== id);
    setList(updatedList);
    if (setRows) setRows(updatedList);
  };

  const defaultActionColumn = actionColumn.length === 0 && path !== "invoices" ? [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton" style={{ cursor: "not-allowed", opacity: 0.5 }}>
              View
            </div>
            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ] : [];

  const finalActionColumn = actionColumn.length > 0 ? actionColumn : defaultActionColumn;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        {!hideAddNew && path !== "log" && path !== "invoices" && (
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        )}
      </div>
      <DataGrid
        className="datagrid"
        rows={list || []}
        columns={columns.concat(finalActionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        context={context}
      />
    </div>
  );
};

export default Datatable;