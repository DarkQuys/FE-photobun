// import io from "socket.io-client";
// import React, { useEffect, useState } from "react";
// const socket = io(process.env.REACT_APP_API_URL || "http://localhost:3001");

// function Body() {
//   const [current, setCurrent] = useState(0);
//   const [myNumber, setMyNumber] = useState(null);
//   // [myNumber, setMyNumber] = useState(null);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [isDisabled, setIsDisabled] = useState(false);
//   const [room , setRoom] = useState("")
  
//   useEffect(() => {
//     socket.on("status", (data) => setCurrent(data.currentServing));
//     socket.on("new-number", (data) => console.log("new number", data));
//     return () => {
//       socket.off("status");
//       socket.off("new-number");
//     };
//   }, []);

// // const takeNumber1 = async () => {
// //     if (!room) {
// //       alert("Vui lòng chọn phòng!");
// //       return;
// //     }
// //     const res = await fetch(`${api}/api/take`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ name, phone, room }),
// //     });
// //     const j = await res.json();
// //     if (j.success) setNumber(j.number);
// //   };

//   const takeNumber = async () => {
//     if(!room){
//       alert("Vui lòng chọn phòng")
//       return
//     }
//     const res = await fetch(
//       (process.env.REACT_APP_API_URL || "http://localhost:3001") + "/api/take",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, phone, room }),
//       }
//     );
//     const j = await res.json();
//     if (j.success || j.number) {
//         setMyNumber(j.number);  
//         setIsDisabled(true); 
//     }
        
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b  from-blue-50 to-white flex flex-col items-center justify-center px-4">
//       <div className="max-w-md w-full bg-pink-100 rounded-2xl shadow-lg p-6 space-y-6">
//         <h2 className="text-2xl font-bold text-center text-pink-400">
//           Hệ thống lấy số thứ tự PHOTOBUN'
//         </h2>

//         {/* Form lấy số */}
//         <div className="border border-gray-100 rounded-xl p-5 space-y-3 shadow-sm">
//           <h3 className="text-lg font-semibold text-gray-700 mb-2">Lấy số</h3>
//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Tên"
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {/* <input
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Phòng muốn chụp"
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           /> */}
//            <select
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//           className="w-full border rounded-lg px-3 py-2"
//         >
//           <option value="">-- Chọn phòng --</option>
//           <option value="phong1">Phòng 1</option>
//           <option value="phong2">Phòng 2</option>
//           <option value="phong3">Phòng 3</option>
//         </select>
//           <button
//             onClick={takeNumber}
//              disabled={isDisabled}
//             className={`w-full text-white py-2 rounded-lg font-medium  transition ${
//                 isDisabled
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-pink-400 hover:bg-pink-600"
//               }`}
//           >
//             {isDisabled ? "Đã lấy số" : "Lấy số"}
//           </button>

//           {/* Hiển thị số của bạn */}
//           {myNumber && (
//             <div className="mt-4 text-center bg-green-50 border border-green-200 rounded-xl py-4">
//               <div className="flex items-center space-x-1 justify-center">
//                 <p className="text-gray-600 ">Số của </p>
//                 <p className="text-green-600 text-2xl">{name}</p>
//                 <p className="text-gray-600 ">là : </p>
//               </div>
//               <p className="text-4xl font-bold text-green-600 my-1">
//                 {myNumber}
//               </p>
//               <p className="text-sm text-gray-500">Vui lòng chờ đến lượt!</p>
//             </div>
//           )}
//         </div>

//         {/* Khu hiển thị số đang phục vụ */}
//         {/* <div className="text-center border border-blue-100 rounded-xl p-6 bg-blue-50">
//           <p className="text-gray-600">Số đang phục vụ</p>
//           <p className="text-6xl font-extrabold text-pink-600 my-2">
//             {current}
//           </p>
//           <p className="text-sm text-gray-500">Cập nhật theo thời gian thực</p>
//         </div> */}

       
//       </div>

//       <footer className="mt-6 text-gray-400 text-sm">
//         © {new Date().getFullYear()} Queue System Demo
//       </footer>
//     </div>
//   );
// }

// export default Body;
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import "./style.css"


const socket = io(process.env.REACT_APP_API_URL || "http://localhost:3001");

function Body() {
  const [current, setCurrent] = useState(0);
  const [myNumber, setMyNumber] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("status", (data) => setCurrent(data.currentServing));
    socket.on("new-number", (data) => console.log("new number", data));
    return () => {
      socket.off("status");
      socket.off("new-number");
    };
  }, []);

  const takeNumber = async () => {
    if (!room) {
      alert("Vui lòng chọn phòng");
      return;
    }
    const res = await fetch(
      (process.env.REACT_APP_API_URL || "http://localhost:3001") + "/api/take",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, room }),
      }
    );
    const j = await res.json();
    if (j.success || j.number) {
      setMyNumber(j.number);
      setIsDisabled(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex flex-col items-center justify-start px-5 py-10 overflow-y-auto">
      <div className="w-full max-w-md bg-purple-100 rounded-3xl shadow-2xl p-8 space-y-8 border border-pink-100">
        {/* <h2 className="text-3xl font-bold text-center text-pink-400">
          Hệ thống lấy số thứ tự <br />
          <span className="text-pink-300 font-semibold text-2xl">PHOTOBUN'</span>
        </h2> */}
        <h2 className="text-3xl font-bold text-center neon-text">
          Hệ thống lấy số thứ tự <br />
          <span className="text-2xl">PHOTOBUN'</span>
          </h2>


        {/* Form lấy số */}
        <div className="border border-gray-100 rounded-2xl p-6 space-y-4 bg-pink-50/50">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Thông tin khách hàng</h3>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên của bạn"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-400"
          >
            <option value="">-- Chọn phòng chụp --</option>
            <option value="phong1">Phòng 1</option>
            <option value="phong2">Phòng 2</option>
            <option value="phong3">Phòng 3</option>
          </select>

          <button
            onClick={takeNumber}
            disabled={isDisabled}
            className={`w-full text-white py-3 rounded-lg font-medium text-lg transition ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600"
            }`}
          >
            {isDisabled ? "Đã lấy số" : "Lấy số"}
          </button>

          {myNumber && (
            <div className="mt-6 text-center bg-green-50 border border-green-200 rounded-2xl py-6 shadow-sm">
              <div className="flex items-center justify-center"> 
                <p className="text-gray-600 text-base">Số của</p>
                <p className="text-green-600 px-1 text-xl">{name}</p>
                <p className="text-gray-600 text-base">là:</p>
              </div>
              <p className="text-5xl font-bold text-green-600 my-3">{myNumber}</p>
              <p className="text-gray-500 text-sm italic">Vui lòng chờ đến lượt được gọi</p>
            </div>
          )}
        </div>

        {/* Số đang phục vụ */}
        {/* <div className="text-center border border-pink-100 rounded-2xl p-6 bg-pink-50 shadow-inner">
          <p className="text-gray-600">Số đang phục vụ</p>
          <p className="text-6xl font-extrabold text-pink-500 my-2">{current}</p>
          <p className="text-sm text-gray-500">Cập nhật theo thời gian thực</p>
        </div> */}
      </div>

      <footer className="mt-8 text-gray-400 text-sm text-center">
        © {new Date().getFullYear()} PHOTOBUN' — Queue System Demo
      </footer>
    </div>
  );
}

export default Body;
