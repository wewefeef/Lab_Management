import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaHome, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './home.scss';

const Home = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setShowLogoutModal(false);
  };

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="home__navbar">
        <div className="home__logo">Hotel_N3</div>
        <ul className="home__navlist">
          <li><a href="#home">Home</a></li>
          <li><a href="#service">Service</a></li>
          <li><a href="#agents">Agents</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="home__user">
          {user ? (
            <div className="home__user-info">
              <FaUser />
              <span>{user}</span>
              <button className="home__logout-btn" onClick={() => setShowLogoutModal(true)} title="Đăng xuất">
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <button className="home__signup-btn">Sign up</button>
            </Link>
          )}
        </div>
      </nav>

      {/* Modal xác nhận đăng xuất */}
      {showLogoutModal && (
        <div className="home__modal-overlay">
          <div className="home__modal">
            <p>Bạn có muốn đăng xuất?</p>
            <div className="home__modal-actions">
              <button className="home__modal-confirm" onClick={handleLogout}>Đồng ý</button>
              <button className="home__modal-cancel" onClick={() => setShowLogoutModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="home__hero">
        <div className="home__hero-content">
          <h1>
            <span className="home__hero-title">Find Your</span>
            <span className="home__hero-title home__hero-title--highlight">Dream Home</span>
          </h1>
          <p className="home__hero-desc">
            Explore our curated selection of exquisite properties meticulously tailored to your unique dream home vision
          </p>
          <button className="home__book-btn">Đặt ngay</button>
        </div>
        <div className="home__hero-image">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5aadf482aa49a1d810879b88/1626698419120-J7CH9BPMB2YI728SLFPN/1.jpg"
            alt="Hotel"
          />
        </div>
      </div>

      {/* Search bar */}
      <div className="home__searchbar">
        <div className="home__searchfield">
          <FaMapMarkerAlt />
          <input type="text" placeholder="Location" />
        </div>
        <div className="home__searchfield">
          <FaHome />
          <input type="text" placeholder="Type" />
        </div>
        <div className="home__searchfield">
          <span className="home__searchfield-icon"><FaCalendarAlt /></span>
          <input type="text" placeholder="Price Range" />
        </div>
        <button className="home__search-btn">
          <FaSearch /> Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default Home;