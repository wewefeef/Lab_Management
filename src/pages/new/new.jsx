import React from "react";

const New = ({ inputs, title }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          {title}
        </h1>
        <form className="flex flex-col gap-5">
          {inputs.map((input) => (
            <div className="flex flex-col gap-2" key={input.id}>
              <label className="font-semibold text-gray-700">{input.label}</label>
              <input
                type={input.type}
                placeholder={input.placeholder}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default New;
