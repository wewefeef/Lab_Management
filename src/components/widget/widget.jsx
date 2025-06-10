import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Widget = ({ type }) => {
  const [amount, setAmount] = useState(0);
  const [diff, setDiff] = useState(0);

  let data = {};

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        linkto: "/user",
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        api: "/user",
        getValue: (res) => (Array.isArray(res) ? res.length : 0),
      };
      break;
    case "order":
      data = {
        title: "Rooms",
        isMoney: false,
        linkto: "/room",
        link: "View all rooms",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
        api: "/room",
        getValue: (res) => (Array.isArray(res) ? res.length : 0),
      };
      break;
    case "earning":
      data = {
        title: "Service",
        isMoney: false,
        linkto: "/service",
        link: "View",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
        api: "/service",
        getValue: (res) => (Array.isArray(res) ? res.length : 0),
      };
      break;
    case "balance":
      data = {
        title: "Payment",
        isMoney: true,
        linkto: "/payment",
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
        api: "/invoice",
        getValue: (res) =>
          Array.isArray(res)
            ? res.reduce((sum, item) => sum + (item.amount || 0), 0)
            : 0,
      };
      break;
    default:
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(data.api, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        setAmount(data.getValue(result));
        setDiff(20); // Tạm thời giữ 20% như mẫu, có thể sửa sau
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
          {data.isMoney && "$"} {amount}
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