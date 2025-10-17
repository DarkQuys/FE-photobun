import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
const socket = io(process.env.REACT_APP_API_URL || "http://localhost:4000");

function Admin() {
  const [current, setCurrent] = useState(0);
  const [waiting, setWaiting] = useState([]);
  const [currentName, setCurrentName] = useState(""); 
  const [currentPhong, setCurrentPhong] = useState(""); 
  const api = process.env.REACT_APP_API_URL || "http://localhost:4000";
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
    socket.on("status", (data) => setCurrent(data.currentServing));
    socket.on("new-number", () => fetchData());

    return () => {
      socket.off("status");
      socket.off("new-number");
    };
  }, []);

  const fetchData = async () => {
    const [statusRes, waitingRes] = await Promise.all([
      fetch(`${api}/api/status`).then((r) => r.json()),
      fetch(`${api}/api/waiting`).then((r) => r.json()),
    ]);
    setCurrent(statusRes.currentServing);
    console.log('dđ',statusRes)
    setCurrentName(statusRes.name || "");
    setCurrentPhong(statusRes.phone || "");
    setWaiting(waitingRes);
  };

  const advance = async () => {
    const res = await fetch(`${api}/api/advance`, { method: "POST" });
    const j = await res.json();
    if (j.success) {
      setCurrent(j.currentServing);
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-2xl w-full bg-pink-100 rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-pink-400">
          Trang quản lý phục vụ
        </h2>
         <button
          onClick={() => navigate("/admin-manager")}
          className="mt-4 text-sm text-gray-600 underline hover:text-blue-500"
        >
          → Trang quản trị
        </button>
        {/* Số đang phục vụ */}
        <div className="text-center border border-blue-100 rounded-xl p-6 bg-blue-50">
          <p className="text-gray-600">Số đang phục vụ</p>
          <p className="text-6xl font-extrabold text-pink-400 my-2">
            {current}
          </p>
          {currentName && (
        <p className="text-lg font-semibold text-gray-700">
        {currentName}(Room : {currentPhong})
        </p>
        )}
          <button
            onClick={advance}
            className="mt-3 px-6 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-700 transition"
          >
            Gọi số tiếp theo
          </button>
        </div>

        {/* Danh sách chờ */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Danh sách khách đang chờ
          </h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3">Số</th>
                  <th className="py-2 px-3">Tên</th>
                  <th className="py-2 px-3">Phòng chụp</th>
                </tr>
              </thead>
              <tbody>
                {waiting.length > 0 ? (
                  waiting.map((w) => (
                    <tr key={w._id} className="border-t hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium text-blue-600">
                        {w.num}
                      </td>
                      <td className="py-2 px-3">{w.name || "-"}</td>
                      <td className="py-2 px-3 text-gray-600">
                        {w.phone || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-4 text-gray-400 italic"
                    >
                      Không có khách đang chờ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="mt-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} Queue System Admin
      </footer>
    </div>
  );
}

export default Admin;
