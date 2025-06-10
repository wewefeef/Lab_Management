import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import Chart from "../../components/chart/chart";

const Single = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left */}
            <div className="bg-white rounded-lg shadow p-6 flex-1">
              <button className="ml-auto block mb-4 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition text-sm">
                Edit
              </button>
              <h1 className="text-2xl font-bold mb-6 text-blue-700">ADMIN</h1>
              <div className="flex gap-6 items-center">
                <img
                  src="https://png.pngtree.com/png-clipart/20190903/original/pngtree-cartoon-customer-service-professional-male-png-free-material-png-image_4425164.jpg"
                  alt=""
                  className="w-32 h-32 object-cover rounded-full border-4 border-blue-200"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-semibold text-gray-800">
                    Nguyễn Trường
                  </h1>
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-600 min-w-[70px]">
                      Email:
                    </span>
                    <span className="text-gray-800">
                      nguyentruong0335520911@gmail.com
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-600 min-w-[70px]">
                      Phone:
                    </span>
                    <span className="text-gray-800">+84 3355 209 11</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-600 min-w-[70px]">
                      Address:
                    </span>
                    <span className="text-gray-800">
                      Bien Hoa . Dong Nai . Viet Nam
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-600 min-w-[70px]">
                      Country:
                    </span>
                    <span className="text-gray-800">VietNam</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right */}
            <div className="flex-1 min-w-[300px]">
              <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            {/* <h1 className="text-xl font-semibold mb-4 text-gray-800">Last Transactions</h1>
            <List/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;