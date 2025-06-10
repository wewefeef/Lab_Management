import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';
import DashboardAdmin from "./pages/dashboard-admin/dashboard-admin.jsx";
import Customer from './pages/customer/Customer.jsx';
import New from "./pages/new/new.jsx";
import { NotificationInputs, productInputs, userInputs } from "./formSource.js";
import Payment from "./pages/payment/payment.jsx";
import Services from "./pages/service/services.jsx";
import Rooms from "./pages/rooms/rooms.jsx";
import Log from "./pages/log/log.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import "./style/style.scss";
import CheckinCheckout from "./pages/checkincheckout/checkincheckout.jsx";
import Notification from "./pages/notification/notification.jsx";
import Users from "./pages/users/users.jsx";
import { LogProvider } from "./logContext.js";
import MainHome from "./pages/home/MainHome.jsx";
import Header from './pages/home/Header.jsx';
import IntroSection from "./pages/home/IntroSection.jsx";
import WhyChooseUs from "./pages/home/WhyChooseUs.jsx";
import HotelList from "./pages/home/hotellist.jsx";
import TestimonialSection from "./pages/home/TestimonialSection.jsx";
import Footer from "./pages/home/Footer.jsx";
import BookRoom from "./pages/home/bookRoom.jsx"; 

function App() {
  return (
    <LogProvider>
      <BrowserRouter>
        <Routes>

          {/* Trang chính */}
          <Route path="/admin" element={<DashboardAdmin />} />
          {/* Trang đăng nhập, đăng ký */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<MainHome />} />
          <Route path="/home" element={<MainHome />} />
          <Route path="/mainhome" element={<MainHome />} /> {/* Thêm dòng này nếu muốn truy cập /mainhome */}

          {/* Trang dịch vụ và checkincheckout */}
          <Route path="/services" element={<Services />} />
          <Route path="/checkincheckout" element={<CheckinCheckout />} />

          {/* Navbar, Sidebar */}
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/navbar" element={<Navbar />} />

          {/* Trang chính */}
          <Route path="/header" element={<Header />} />
          <Route path="/intro" element={<IntroSection />} />
          <Route path="/whychooseus" element={<WhyChooseUs />} />
          <Route path="/testimonial" element={<TestimonialSection />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/hotellist" element={<HotelList />} />

          {/* Users */}
          <Route path="/users" element={<Users />} />
          <Route path="/newUser" element={<New inputs={userInputs} title="Add New User" />} />

          {/* Rooms */}
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/bookRoom/:roomId" element={<BookRoom />} />

          {/* Notification */}
          <Route path="/notification" element={<Notification />} />
          <Route path="/newNotification" element={<New inputs={NotificationInputs} title="Add New Notification" />} />

          {/* Logs */}
          <Route path="/log" element={<Log />} />
          <Route path="/newLog" element={<New inputs={productInputs} title="Add New Log" />} />

          {/* Payment */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/newPayment" element={<New inputs={productInputs} title="Add New Payment" />} />
          <Route path="/customer" element={<Customer />} />

          {/* Wildcard route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </LogProvider>
  );
}

export default App;