import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
const socket = io(process.env.REACT_APP_API_URL || "http://localhost:4000");

function AdminManage() {
  const [list, setList] = useState([]);
  const api = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const navigate = useNavigate();
  useEffect(() => {
    fetchList();
    socket.on("new-number", fetchList);
    socket.on("status", fetchList);
    return () => {
      socket.off("new-number");
      socket.off("status");
    };
  }, []);

  const fetchList = async () => {
    const res = await fetch(`${api}/api/all`);
    const data = await res.json();
    setList(data);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa số này không?")) return;
    const res = await fetch(`${api}/api/delete/${id}`, { method: "DELETE" });
    const j = await res.json();
    if (j.success) {
      setList(list.filter((item) => item._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-4xl w-full bg-pink-100 rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-pink-400">
          Quản lý danh sách số thứ tự
        </h2>
         <button
          onClick={() => navigate("/admin-photobun")}
          className="mt-4 text-sm text-gray-600 underline hover:text-blue-500"
        >
          → Trang gọi khách đang chờ
        </button>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3">#</th>
                <th className="py-2 px-3">Tên</th>
                <th className="py-2 px-3">Phòng chụp</th>
                <th className="py-2 px-3">Trạng thái</th>
                <th className="py-2 px-3">Thời gian</th>
                <th className="py-2 px-3 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? (
                list.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-3 font-medium text-blue-600">
                      {item.num}
                    </td>
                    <td className="py-2 px-3">{item.name || "-"}</td>
                    <td className="py-2 px-3">{item.phone || "-"}</td>
                    <td
                      className={`py-2 px-3 font-medium ${
                        item.status === "waiting"
                          ? "text-yellow-600"
                          : item.status === "called"
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="py-2 px-3 text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-gray-400 italic"
                  >
                    Chưa có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-right">
          <button
            onClick={fetchList}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Làm mới
          </button>
        </div>
      </div>

      <footer className="mt-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} Queue System Admin Manage
      </footer>
    </div>
  );
}

export default AdminManage;
