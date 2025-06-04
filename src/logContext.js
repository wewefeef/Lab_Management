import React, { createContext, useState, useContext } from "react";

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const addLog = (endpoint, method, action, data = null) => { // Thêm tham số data
    // Lấy thời gian hiện tại và điều chỉnh múi giờ thủ công
    const now = new Date();
    const offset = 7 * 60; // +07:00 (7 giờ = 7 * 60 phút)
    const vietnamTime = new Date(now.getTime() + offset * 60 * 1000);
    const formattedTime = vietnamTime.toISOString().slice(0, 19).replace("T", " ");

    // Tạo signature để kiểm tra trùng lặp
    const logSignature = `${endpoint}-${method}-${action}`;
    const lastLog = logs[logs.length - 1];

    // Kiểm tra nếu log cuối cùng có cùng signature và cách nhau dưới 1 giây
    if (
      lastLog &&
      lastLog.logSignature === logSignature &&
      (new Date(formattedTime) - new Date(lastLog.timestamp)) < 1000
    ) {
      return; // Bỏ qua nếu log trùng và gần nhau
    }

    const newLog = {
      _id: crypto.randomUUID(), // Thay Date.now() bằng crypto.randomUUID()
      logSignature, // Thêm logSignature để kiểm tra trùng lặp
      timestamp: formattedTime,
      userId: `U${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
      endpoint,
      method,
      action,
      data, // Lưu dữ liệu chi tiết của mục bị thay đổi
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLog = () => useContext(LogContext);