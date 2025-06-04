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
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default List;