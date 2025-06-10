import React from 'react';

const HotelList = () => {
  const rooms = [
    { 
      name: "The Lounge & Bar", 
      location: "Quận 5, Thành phố HCM", 
      price: "1,255,000 VND/đêm", 
      rating: 4.9, 
      reviews: 122, 
      discount: "10% today", 
      beds: 3, 
      image: "https://media-cdn.tripadvisor.com/media/photo-s/0a/18/e7/e0/rose-hotel.jpg" 
    },
    { 
      name: "The Lounge & Bar", 
      location: "Quận 8, Thành phố HCM", 
      price: "1,295,000 VND/đêm", 
      rating: 4.9, 
      reviews: 122, 
      discount: "10% today", 
      beds: 2, 
      image: "https://dyf.vn/wp-content/uploads/2021/11/thiet-ke-noi-that-phong-khach-san-hien-dai.jpg" 
    },
    { 
      name: "The Lounge & Bar", 
      location: "Quận 7, Thành phố HCM", 
      price: "1,500,000 VND/đêm", 
      rating: 4.9, 
      reviews: 122, 
      discount: "10% today", 
      beds: 3, 
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
    },
    { 
      name: "The Lounge & Bar", 
      location: "Quận 12, Thành phố HCM", 
      price: "1,380,000 VND/đêm", 
      rating: 4.9, 
      reviews: 122, 
      discount: "10% today", 
      beds: 2, 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQc4O5R29AXNp7tnU4MjHiVrkjIdmEpLlM3g&s" 
    },
    { 
      name: "The Lounge & Bar", 
      location: "Quận 1, Thành phố HCM", 
      price: "1,345,000 VND/đêm", 
      rating: 4.9, 
      reviews: 122, 
      discount: "10% today", 
      beds: 2, 
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
    },
    { 
      name: "The Lounge & Bar", 
      location: "Quận 10, Thành phố HCM", 
      price: "1,850,000 VND/đêm", 
      rating: 4.9, 
      reviews: 122, 
      discount: "10% today", 
      beds: 2, 
      image: "https://media-cdn.tripadvisor.com/media/photo-s/1d/30/29/68/hinh-nh-phong-khach-s.jpg" 
    },
    { 
      name: "The Lounge & Bar", 
      location: "Quận 11, Thành phố HCM", 
      price: "1,440,000 VND/đêm", 
      rating: 4.9, 
      reviews: 122, 
      discount: "10% today", 
      beds: 2, 
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
    },
    { 
      name: "The Lounge & Bar", 
      location: "Quận 9, Thành phố HCM", 
      price: "1,575,000 VND/đêm", 
      rating: 4.9, 
      reviews: 122, 
      discount: "10% today", 
      beds: 2, 
      image: "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" 
    },
  ];

  return (
    <div className="p-6 bg-white">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Những nơi nổi bật</h2>
      <p className="text-gray-600 mb-6">Những nơi lưu trú phổ biến mà khách hàng giới thiệu cho bạn</p>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Sài Gòn</button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">Đà Nẵng</button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">Hà Nội</button>
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">Thành phố Huế</button>
        </div>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center">Search more <span className="ml-2">→</span></button>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {rooms.map((room, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <img src={room.image} alt="Phòng khách sạn" className="rounded-lg w-full h-48 object-cover mb-2" />
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">{room.discount}</span>
            <h3 className="font-semibold mt-2 text-sm">{room.name}</h3>
            <p className="text-gray-600 text-xs">{room.location}</p>
            <p className="text-gray-600 text-xs">{room.beds} beds, 1 living room, {room.beds === 2 ? '2 bathrooms' : '1 bathroom'}, 1 kitchen</p>
            <p className="text-lg font-bold mt-2">{room.price}</p>
            <p className="text-yellow-500 text-xs">★ {room.rating} ({room.reviews})</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg">Hiển thị thêm</button>
      </div>
    </div>
  );
};

export default HotelList;