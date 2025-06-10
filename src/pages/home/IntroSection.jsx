import React from 'react';

const IntroSection = () => {
  return (
    <div className="flex justify-between items-center p-8 bg-white min-h-[500px]">
      <div className="w-1/2 pr-8">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
          alt="Khách sạn" 
          className="rounded-3xl w-full h-[400px] object-cover"
        />
      </div>
      <div className="w-1/2 pl-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 leading-tight">
          We Help You To Find Your Dream Hotel
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          Tự nhiên ngôi nhà mơ ước của bạn đến với những khu diễm tuyệt sang trọng, điều chỉnh mọi thứ để phù hợp với bạn qua từng bước lựa chọn cẩn thận, đảm bảo căn phòng mơ ước của bạn trở thành hiện thực.
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">8K+</p>
            <p className="text-gray-600 text-sm">Hotel Available</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">6K+</p>
            <p className="text-gray-600 text-sm">Room booked</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">2K+</p>
            <p className="text-gray-600 text-sm">Trusted Agents</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;