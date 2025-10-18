import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Home, Settings } from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const menus = [
    {
      name: "Quản lý số thứ tự",
      path: "/admin-manager",
      icon: <ClipboardList className="w-8 h-8 text-pink-500" />,
      desc: "Xem và gọi khách đang chờ chụp",
    },
    {
      name: "Xem các phòng",
      path: "/admin-manager2",
      icon: <Home className="w-8 h-8 text-blue-500" />,
      desc: "Theo dõi realtime danh sách từng phòng chụp",
    },
    {
      name: "Cài đặt / Reset",
      path: "/admin-settings",
      icon: <Settings className="w-8 h-8 text-green-500" />,
      desc: "Setting cấu hình hệ thống",
    },
  ];

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-pink-400 mb-10">
        Bảng điều khiển Admin
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {menus.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className="cursor-pointer bg-white shadow-lg hover:shadow-xl rounded-2xl p-6 text-center transition border border-gray-100 hover:-translate-y-1"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.name}
            </h3>
            <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <footer className="mt-10 text-gray-400 text-sm">
        © {new Date().getFullYear()} Queue System Admin
      </footer>
    </div>
  );
}

export default AdminDashboard;
