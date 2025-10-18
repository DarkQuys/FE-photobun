
// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { QRCodeCanvas } from "qrcode.react";
// import { Wifi } from "lucide-react";

// function AdminRooms() {
//   const [rooms, setRooms] = useState({ phong1: [], phong2: [], phong3: [] });
//   const api = process.env.REACT_APP_API_URL || "http://localhost:4000";
//   const socket = io(api);

//   const fetchRooms = async () => {
//     const updated = {};
//     for (const r of ["phong1", "phong2", "phong3"]) {
//       const data = await fetch(`${api}/api/waiting/${r}`).then((res) => res.json());
//       updated[r] = data;
//     }
//     setRooms(updated);
//   };

//  useEffect(() => {
//   fetchRooms();

//   socket.on("new-number", () => {
//     fetchRooms();
//   });
//   socket.on("status", () => {
//     fetchRooms();
//   });
// //   socket.on("deleted-number", () => {
// //     fetchRooms();
// //   });

//   return () => {
//     socket.off("new-number");
//     socket.off("deleted-number");
//   };
// }, []); 


//   return (
//     <div className="min-h-screen bg-pink-100 flex flex-col items-center p-6">
//       <h2 className="text-2xl font-bold text-pink-500 mb-6">
//         Danh sách khách theo phòng 
//       </h2>


//       {/* 🔹 QR + Wifi Section */}
//       <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8 bg-white shadow-md rounded-xl p-6 border border-gray-100 w-full max-w-4xl">
//         {/* QR Image */}
//         <div className="flex flex-col items-center">
//           {/* <img
//             src="/qr-code.png" // 👈 Thay bằng đường dẫn QR thật (VD: ảnh tải lên public/)
//             alt="QR Code"
//             className="w-40 h-40 border border-gray-300 rounded-lg shadow-sm"
//           /> */}
//           <QRCodeCanvas value="youtobe.com" size={160} />
//           <p className="text-gray-600 font-bold text-2xl mt-2">
//             Quét mã để lấy số thứ tự 
//           </p>
//         </div>

//         {/* Wifi Info */}
//         <div className="text-center text-xl md:text-left">
//       <h3 className="text-lg font-semibold text-pink-500 mb-2 flex items-center justify-center md:justify-start gap-2">
//         <Wifi className="w-5 h-5 text-pink-500" />
//         Thông tin Wi-Fi
//       </h3>
//       <p className="text-gray-700">
//         <strong>Tên Wi-Fi:</strong> PhotoBun1
//       </p>
//       <p className="text-gray-700">
//         <strong>Mật khẩu:</strong>{" "}
//         <span className="bg-gray-100 px-2 py-1 rounded-md font-mono">
//           987654321
//         </span>
//       </p>
//     </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
//         {Object.entries(rooms).map(([room, list]) => (
//           <div key={room} className="bg-white shadow-md rounded-xl p-4 border border-gray-100">

//             <h3 className="text-lg font-semibold text-center mb-3 capitalize">
//               {room.replace("phong", "Phòng ")}
//             </h3>

//             <table className="w-full text-sm border-collapse border border-gray-200 text-center">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-3 py-2 border border-gray-200 w-1/4">STT</th>
//                   <th className="px-3 py-2 border border-gray-200 w-3/4">Tên</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {list.map((p) => (
//                   <tr key={p._id} className="border-t hover:bg-gray-50 transition">
//                     <td className="px-3 py-2 border border-gray-200 text-blue-500 font-semibold">
//                       {p.num}
//                     </td>
//                     <td className="px-3 py-2 border border-gray-200 text-gray-700">
//                       {p.name || "-"}
//                     </td>
//                   </tr>
//                 ))}
//                 {list.length === 0 && (
//                   <tr>
//                     <td colSpan="2" className="py-3 text-gray-400 italic border border-gray-200">
//                       Chưa có khách
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AdminRooms;

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { QRCodeCanvas } from "qrcode.react";
import { Wifi } from "lucide-react";

function AdminRooms() {
  const [rooms, setRooms] = useState({ phong1: [], phong2: [], phong3: [] });
  const api = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const socket = io(api);

  // mô tả phòng
  
  const roomDescriptions = {
  phong1: "Phòng 1 – phòng chụp với tông đỏ nổi bật và ánh sáng mềm mại. Mọi khung hình đều toát lên sự quyến rũ, sang trọng và cá tính riêng biệt.",
  phong2: "Phòng 2 – Phòng chụp với background đa phong cách. Màu sắc tươi tắn và ánh sáng rực rỡ giúp ghi lại những khoảnh khắc tràn đầy năng lượng.",
  phong3: "Phòng 3 – Phòng ‘Gấu’ nổi bật ở vị trí trên cao, mang phong cách vintage ấm áp. view bao quát,lý tưởng cho bộ ảnh nghệ thuật độc đáo.",
};


  const fetchRooms = async () => {
    const updated = {};
    for (const r of ["phong1", "phong2", "phong3"]) {
      const data = await fetch(`${api}/api/waiting/${r}`).then((res) =>
        res.json()
      );
      updated[r] = data;
    }
    setRooms(updated);
  };

  useEffect(() => {
    fetchRooms();
    socket.on("new-number", fetchRooms);
    socket.on("status", fetchRooms);
    return () => {
      socket.off("new-number");
      socket.off("status");
    };
  }, []);

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold text-pink-500 mb-6">
        Danh sách khách theo phòng
      </h2>

      {/* 🔹 QR + Wifi Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8 bg-white shadow-md rounded-xl p-6 border border-gray-100 w-full max-w-4xl">
        <div className="flex flex-col items-center">
          <QRCodeCanvas value="https://fe-photobun-h63f.vercel.app" size={160} />
          <p className="text-gray-600 font-bold text-2xl mt-2">
            Quét mã để lấy số thứ tự
          </p>
        </div>

        <div className="text-center text-xl md:text-left">
          <h3 className="text-lg font-semibold text-pink-500 mb-2 flex items-center justify-center md:justify-start gap-2">
            <Wifi className="w-5 h-5 text-pink-500" />
            Thông tin Wi-Fi
          </h3>
          <p className="text-gray-700">
            <strong>Tên Wi-Fi:</strong> PhotoBun1
          </p>
          <p className="text-gray-700">
            <strong>Mật khẩu:</strong>{" "}
            <span className="bg-gray-100 px-2 py-1 rounded-md font-mono">
              987654321
            </span>
          </p>
        </div>
      </div>

      {/* 🔹 Danh sách các phòng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {Object.entries(rooms).map(([room, list]) => (
          <div
            key={room}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-100 flex flex-col"
          >
            {/* Tiêu đề + mô tả */}
            <div className="mb-3 text-center">
              <h3 className="text-lg font-bold text-pink-600 mb-1 capitalize">
                {room.replace("phong", "Phòng ")}
              </h3>
              <p className="text-sm text-gray-900 leading-snug">
                {roomDescriptions[room]}
              </p>
            </div>

            {/* Bảng danh sách */}
            <table className="w-full text-sm border-collapse border border-gray-200 text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border border-gray-200 w-1/4">STT</th>
                  <th className="px-3 py-2 border border-gray-200 w-3/4">
                    Tên
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr
                    key={p._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-3 py-2 border border-gray-200 text-blue-500 font-semibold">
                      {p.num}
                    </td>
                    <td className="px-3 py-2 border border-gray-200 text-gray-700">
                      {p.name || "-"}
                    </td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr>
                    <td
                      colSpan="2"
                      className="py-3 text-gray-400 italic border border-gray-200"
                    >
                      Chưa có khách
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRooms;
