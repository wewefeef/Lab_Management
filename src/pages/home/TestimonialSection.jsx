import React, { useState } from 'react';

const TestimonialSection = () => {
  const reviews = [
    { 
      name: "Sarah Nguyen", 
      location: "San Francisco", 
      rating: 5.0, 
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      comment: "Tuyệt vời! Dịch vụ khách sạn rất chuyên nghiệp và thoải mái."
    },
    { 
      name: "Michael Rodriguez", 
      location: "San Diego", 
      rating: 4.5, 
      image: "https://decoxdesign.com/upload/images/khach-san-calchas-1300m2-phong-ngu-03-decox-design-1.jpg",
      comment: "Trải nghiệm tốt, nhân viên thân thiện. Giá cả hợp lý."
    },
    { 
      name: "Emily Johnson", 
      location: "Los Angeles", 
      rating: 5.0, 
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      comment: "Rất hài lòng với không gian và tiện nghi phòng ốc."
    },
    { 
      name: "David Kim", 
      location: "Seattle", 
      rating: 4.8, 
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      comment: "Dịch vụ nhanh chóng, sẽ quay lại lần nữa!"
    },
    { 
      name: "Anna Lee", 
      location: "Portland", 
      rating: 4.7, 
      image: "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      comment: "Phong cách hiện đại, rất đáng để thử."
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleReviews = 3;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - visibleReviews : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + visibleReviews >= reviews.length ? 0 : prev + 1));
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">What do people say about us?</h2>
      <div className="relative">
        <div className="flex justify-center gap-6 overflow-hidden">
          {reviews.slice(currentIndex, currentIndex + visibleReviews).map((review, index) => (
            <div key={index} className="bg-amber-100 p-6 rounded-lg w-1/4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={review.image} alt={review.name} className="rounded-lg w-full h-48 object-cover mb-4" />
              <h3 className="font-semibold text-lg">{review.name}</h3>
              <p className="text-gray-600 text-sm">{review.location}</p>
              <p className="text-yellow-500 text-sm">★ {review.rating}</p>
              <p className="text-gray-600 text-sm mt-2 italic">{review.comment}</p>
            </div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition-colors"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default TestimonialSection;