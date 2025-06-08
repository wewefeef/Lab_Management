import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import Home from "./pages/home/home";
import List from "./pages/list/list";
import Single from "./pages/single/single";
import New from "./pages/new/new";
import { NotificationInputs, productInputs, userInputs } from "./formSource";
import { hotelColumns, roomColumns, userColumns, notificationColumns } from "./datatablesource.js";
import NewHotel from "./pages/newHotel/newHotel";
import Payment from "./pages/payment/payment";
import Services from "./pages/service/services";
import Rooms from "./pages/rooms/rooms";
import Log from "./pages/log/log";
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import "./style/style.scss";
import CheckinCheckout from "./pages/checkincheckout/checkincheckout";
import Notification from "./pages/notification/notification";
import Users from "./pages/users/users";
import { LogProvider } from "./logContext";
import Invoices from "./pages/invoices/invoices"; 

function App() {
  return (
    <LogProvider>
      <BrowserRouter>
        <Routes>
          {/* Trang đăng nhập, đăng ký */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />

          {/* Trang dịch vụ và checkincheckout */}
          <Route path="/services" element={<Services />} />
          <Route path="/checkincheckout" element={<CheckinCheckout />} />

          {/* Navbar, Sidebar */}
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/navbar" element={<Navbar />} />

          {/* Trang chính */}
          <Route path="/home" element={<Home />} />

          {/* Users */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<Single />} />
          <Route path="/newUser" element={<New inputs={userInputs} title="Add New User" />} />

          {/* Hotels */}
          <Route path="/hotels" element={<NewHotel />} />   {/* Sửa dòng này */}
          <Route path="/hotels/new" element={<NewHotel />} />
          <Route path="/hotels/:hotelId" element={<Single />} />

          {/* Rooms */}
          <Route path="/rooms" element={<Rooms />} />
          {/* <Route path="/rooms/new" element={<Rooms />} /> */} {/* XÓA hoặc COMMENT dòng này */}
          <Route path="/rooms/:roomId" element={<Single />} />

          {/* Notification */}
          <Route path="/notification" element={<Notification />} />
          <Route path="/notification/:notificationId" element={<Single />} />
          <Route path="/newNotification" element={<New inputs={NotificationInputs} title="Add New Notification" />} />

          {/* Logs */}
          <Route path="/log" element={<Log />} />
          <Route path="/log/:logId" element={<Single />} />
          <Route path="/newLog" element={<New inputs={productInputs} title="Add New Log" />} />

          {/* Payment */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/newPayment" element={<New inputs={productInputs} title="Add New Payment" />} />

          {/* Invoices */}
          <Route path="/invoices" element={<Invoices />} /> {/* Thêm route */}

          {/* Wildcard route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </LogProvider>
  );
}

export default App;