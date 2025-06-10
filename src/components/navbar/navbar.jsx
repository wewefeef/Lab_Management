import "./navbar.scss";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
        </div>
        <div className="items">
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <Link to="/account">
                <img src="https://cdn-icons-png.flaticon.com/512/6008/6008287.png" alt="avatar" className="avatar" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;