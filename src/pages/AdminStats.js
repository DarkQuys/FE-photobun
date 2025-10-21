
import React, { useEffect, useState } from "react";

function AdminStats() {
  const api = process.env.REACT_APP_API_URL || "http://localhost:3001";

  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [stats, setStats] = useState([]);
  const [totalShots, setTotalShots] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [loading, setLoading] = useState(false);

//   const fetchStats = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${api}/api/stats?date=${date}`);
//       const data = await res.json();

//       // 🔥 Chuyển object -> mảng [{ room, totalShots, totalIncome }]
//       const formattedStats = data.details
//         ? Object.entries(data.details.stats).map(([room, values]) => ({
//             room,
//             totalShots: values.totalShots || 0,
//             totalIncome: values.totalIncome || 0,
//           }))
//         : [];

//       setStats(formattedStats);
//       console.log("haha",data)
//       setTotalShots(data.totalShots || 0);
//       setTotalIncome(data.totalIncome || 0);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
const fetchStats = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${api}/api/stats?date=${date}`);
    const data = await res.json();
    if (!data || !data.details[0].stats) {
      setStats([]);
      setTotalShots(0);
      setTotalIncome(0);
      return;
    }

    //Chuyển object stats -> mảng
    const formattedStats = [
      { room: "phong1", ...data.details[0].stats.phong1 },
      { room: "phong2", ...data.details[0].stats.phong2 },
      { room: "phong3", ...data.details[0].stats.phong3 },
    ];
   
    setStats(formattedStats);
    setTotalShots(data.totalShots || 0);
    setTotalIncome(data.totalIncome || 0);
  } catch (err) {
    console.error("Lỗi lấy thống kê:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchStats();
  }, [date]);

  const formatMoney = (v) => v.toLocaleString("vi-VN") + " ₫";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-pink-500 mb-4">
          📊 Thống kê doanh thu & lượt chụp
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <label className="text-gray-700 font-medium">
            Chọn ngày:{" "}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-lg p-2 ml-2"
            />
          </label>
          <button
            onClick={fetchStats}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Làm mới
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Đang tải dữ liệu...
          </p>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-200 text-center">
              <thead className="bg-pink-100 text-gray-700">
                <tr>
                  <th className="border border-gray-200 py-2 px-4">Phòng</th>
                  <th className="border border-gray-200 py-2 px-4">Lượt chụp</th>
                  <th className="border border-gray-200 py-2 px-4">Doanh thu</th>
                </tr>
              </thead>
              <tbody>
                {stats.length > 0 ? (
                  stats.map((s) => (
                    <tr key={s.room} className="hover:bg-pink-50">
                      <td className="border border-gray-200 py-2 font-semibold text-pink-500">
                        {s.room.toUpperCase()}
                      </td>
                      <td className="border border-gray-200 py-2">{s.totalShots}</td>
                      <td className="border border-gray-200 py-2">{formatMoney(s.totalIncome)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-4 text-gray-400 italic">
                      Không có dữ liệu cho ngày này
                    </td>
                  </tr>
                )}
              </tbody>
              {stats.length > 0 && (
                <tfoot className="bg-pink-50 font-semibold">
                  <tr>
                    <td className="border border-gray-200 py-2">Tổng</td>
                    <td className="border border-gray-200 py-2">{totalShots}</td>
                    <td className="border border-gray-200 py-2">{formatMoney(totalIncome)}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </>
        )}
      </div>

      <footer className="mt-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} PHOTOBUN' — Admin Dashboard
      </footer>
    </div>
  );
}

export default AdminStats;
