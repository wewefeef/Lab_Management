import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-100 to-white py-8 px-12 text-gray-700">
      {/* Phần trên - Hỗ trợ (giữ nguyên) */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Do You Have Any Questions?</h2>
        <p className="text-lg mb-6">Get Help From Us</p>
        <div className="flex justify-center space-x-6 mb-6">
          <button className="flex items-center text-sm bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors">
            <span className="mr-2">💬</span> Chat live with our support team
          </button>
          <button className="flex items-center text-sm bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors">
            <span className="mr-2">🔍</span> Browse our FAQ
          </button>
        </div>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email address..."
            className="text-sm px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-600 w-64"
          />
          <button className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-900 transition-colors">
            Submit
          </button>
        </div>
      </div>

      {/* Phần dưới - Footer cột (cập nhật) */}
      <div className="max-w-5xl mx-auto grid grid-cols-5 gap-12 text-sm">
        <div>
          <h3 className="text-xl font-bold mb-3">Hotel</h3>
          <p className="text-sm">Bringing you closer to your dream hotel, one click at a time.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">About</h4>
          <ul className="space-y-2">
            <li><button className="hover:text-gray-900 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer">Our Story</button></li>
            <li><button className="hover:text-gray-900 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer">Careers</button></li>
            <li><button className="hover:text-gray-900 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer">Our Team</button></li>
            <li><button className="hover:text-gray-900 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer">Resources</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Support</h4>
          <ul className="space-y-2">
            <li><button className="hover:text-gray-900 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer">FAQ</button></li>
            <li><button className="hover:text-gray-900 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer">Contact Us</button></li>
            <li><button className="hover:text-gray-900 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer">Help Center</button></li>
            <li><button className="hover:text-gray-900 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer">Terms of Service</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Find Us</h4>
          <ul className="space-y-2">
            <li><button className="hover:text-gray-900 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer">Events</button></li>
            <li><button className="hover:text-gray-900 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer">Locations</button></li>
            <li><button className="hover:text-gray-900 transition-colors bg-transparent border-none p-0 m-0 cursor-pointer">Newsletter</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3">Our Social</h4>
          <ul className="space-y-2">
            <li className="flex items-center"><span className="w-3 h-3 bg-gray-700 rounded-full mr-2"></span> Instagram</li>
            <li className="flex items-center"><span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span> Facebook</li>
            <li className="flex items-center"><span className="w-3 h-3 bg-pink-500 rounded-full mr-2"></span> Twitter (x)</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;