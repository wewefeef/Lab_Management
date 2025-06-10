import "./list.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Datatable from "../../components/datatable/datatable";
import { useNavigate } from "react-router-dom";

const List = ({ columns }) => {
  const navigate = useNavigate();

  const handleAddNew = () => {
    // Simulate a new item (example for hotels)
    const newItem = {
      title: "New Hotel",
      name: "New Hotel Name",
      type: "Hotel",
      city: "Hanoi",
      address: "123 Le Loi",
    };
    // Log the add action
    const logAction = {
      endpoint: "/hotels/new",
      method: "POST",
      action: "Add",
    };
    localStorage.setItem("logAction", JSON.stringify(logAction));
    // Navigate with newItem data
    navigate("/hotels/new", { state: { newItem } });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Danh sách</h1>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Thêm mới
            </button>
          </div>
          <Datatable columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default List;