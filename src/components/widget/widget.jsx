import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import instance from "../../API/axios";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(0);
  const [diff, setDiff] = useState(0);

  let data = {};

  switch (type) {
    case "user":
      data = {
        title: "Khách Hàng",
        isMoney: false,
        linkto: "/customers",
        link: "Xem tất cả khách hàng",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        api: "/Customer",
        getValue: (res) => (Array.isArray(res) ? res.length : 0),
      };
      break;
    case "order":
      data = {
        title: "Phòng",
        isMoney: false,
        linkto: "/rooms",
        link: "Xem tất cả phòng",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        api: "/Room",
        getValue: (res) => (Array.isArray(res) ? res.length : 0),
      };
      break;
    case "earning":
      data = {
        title: "Dịch Vụ",
        isMoney: false,
        linkto: "/services",
        link: "Xem dịch vụ",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        api: "/Service",
        getValue: (res) => (Array.isArray(res) ? res.length : 0),
      };
      break;
    case "balance":
      data = {
        title: "Người Dùng",
        isMoney: false,
        linkto: "/user",
        link: "Xem tất cả tài khoản",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        api: "/User",
        getValue: (res) => (Array.isArray(res) ? res.length : 0),
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get(data.api);
        setAmount(data.getValue(res.data));
        setDiff(20); // Tạm thời giữ 20%
      } catch (e) {
        setAmount(0);
        setDiff(0);
      }
    };
    if (data.api) fetchData();
  }, [data.api]);

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "₫"} {amount}
        </span>
        <Link to={data.linkto || "#"} className="link-to">
          <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
