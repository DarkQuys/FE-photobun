import io from "socket.io-client";
import React, { useEffect, useState } from "react";
const socket = io(process.env.REACT_APP_API_URL || "http://localhost:3001");

function Body() {
  const [current, setCurrent] = useState(0);
  const [myNumber, setMyNumber] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    socket.on("status", (data) => setCurrent(data.currentServing));
    socket.on("new-number", (data) => console.log("new number", data));
    return () => {
      socket.off("status");
      socket.off("new-number");
    };
  }, []);

  const takeNumber = async () => {
    const res = await fetch(
      (process.env.REACT_APP_API_URL || "http://localhost:3001") + "/api/take",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      }
    );
    const j = await res.json();
    if (j.success || j.number) {
        setMyNumber(j.number);  
        setIsDisabled(true); 
    }
        
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-pink-100 rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-pink-400">
          Hệ thống lấy số thứ tự PHOTOBUN'
        </h2>

        {/* Khu hiển thị số đang phục vụ */}
        <div className="text-center border border-blue-100 rounded-xl p-6 bg-blue-50">
          <p className="text-gray-600">Số đang phục vụ</p>
          <p className="text-6xl font-extrabold text-pink-600 my-2">
            {current}
          </p>
          <p className="text-sm text-gray-500">Cập nhật theo thời gian thực</p>
        </div>

        {/* Form lấy số */}
        <div className="border border-gray-100 rounded-xl p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Lấy số</h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Họ và tên"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Số điện thoại"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={takeNumber}
             disabled={isDisabled}
            className={`w-full bg-pink-400 text-white py-2 rounded-lg font-medium  transition ${
                isDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-400 hover:bg-pink-600"
              }`}
          >
            {isDisabled ? "Đã lấy số" : "Lấy số"}
          </button>

          {/* Hiển thị số của bạn */}
          {myNumber && (
            <div className="mt-4 text-center bg-green-50 border border-green-200 rounded-xl py-4">
              <p className="text-gray-600">Số của bạn</p>
              <p className="text-4xl font-bold text-green-600 my-1">
                {myNumber}
              </p>
              <p className="text-sm text-gray-500">Vui lòng chờ đến lượt!</p>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} Queue System Demo
      </footer>
    </div>
  );
}

export default Body;