import React from "react";
import {
  HiOutlineMap,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineHandThumbUp,
} from "react-icons/hi2";

const WhyChooseUs = () => {
  return (
    <div className="p-10 bg-gradient-to-br from-white via-gray-50 to-white min-h-[400px]">
      <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
        Sao chọn chúng tôi
      </h2>
      <p className="text-center text-gray-600 mb-8 text-lg">
        Elevating Your Home Buying Experience with Expertise, Integrity, and
        Unmatched Personalized Service
      </p>
      <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="bg-blue-600 text-white p-6 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <HiOutlineMap className="h-10 w-10 mx-auto mb-2" />
          <h3 className="text-xl font-semibold mb-2">Chuyên gia hướng dẫn</h3>
          <p>
            Tận dụng lời tư vấn chuyên môn từ đội ngũ chuyên gia của chúng tôi
            để có trải nghiệm mua hàng suôn sẻ.
          </p>
        </div>
        <div className="bg-blue-600 text-white p-6 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <HiOutlineUser className="h-10 w-10 mx-auto mb-2" />
          <h3 className="text-xl font-semibold mb-2">Dịch vụ cá nhân</h3>
          <p>
            Các dịch vụ của chúng tôi phù hợp với nhu cầu riêng, giúp bạn tìm
            kiếm khách sạn phù hợp nhất.
          </p>
        </div>
        <div className="bg-blue-600 text-white p-6 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <HiOutlineDocumentText className="h-10 w-10 mx-auto mb-2" />
          <h3 className="text-xl font-semibold mb-2">Quá trình minh bạch</h3>
          <p>
            Cập nhật thông tin với cách tiếp cận rõ ràng và trung thực để đặt
            phòng của bạn trở nên dễ dàng.
          </p>
        </div>
        <div className="bg-blue-600 text-white p-6 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <HiOutlineHandThumbUp className="h-10 w-10 mx-auto mb-2" />
          <h3 className="text-xl font-semibold mb-2">Hỗ trợ đặc biệt</h3>
          <p>
            Mang lại sự an tâm với dịch vụ chăm sóc khách hàng chu đáo và tận
            tâm của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
