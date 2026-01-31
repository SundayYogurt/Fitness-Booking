import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import adminService from "../../services/admin.service";
// import adminService from "../../services/admin.service"; // เดี๋ยวคุณต่อเอง

const ApproveTrainer = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ดึง list ผู้สมัคร trainer
  useEffect(() => {
  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await adminService.getTrainerRequests();

      console.log("Trainer request response:", res.data);

      if (res.status === 200) {
        // 🔴 แก้ key ตรงนี้
        setPendingUsers(res.data.user || []);

        Swal.fire({
          icon: "success",
          title: "โหลดข้อมูลสำเร็จ",
          text: res.data.message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "โหลดข้อมูลไม่สำเร็จ",
        text:
          err?.response?.data?.message ||
          "ไม่สามารถดึงข้อมูลผู้สมัครได้",
      });
    } finally {
      setLoading(false);
    }
  };

  fetchRequests();
}, []);



  const handleApprove = async (userId) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการอนุมัติ?",
      text: "คุณต้องการอนุมัติผู้ใช้คนนี้เป็น Trainer ใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "อนุมัติ",
      cancelButtonText: "ยกเลิก",
    });

    if (!confirm.isConfirmed) return;

    try {

      const res = await adminService.approveTrainer(userId);


      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "อนุมัติสำเร็จ",
          text: res.data.message,
        });

        // ลบ user ที่อนุมัติแล้วออกจาก list
        setPendingUsers((prev) =>
          prev.filter((user) => user._id !== userId)
        );
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "อนุมัติไม่สำเร็จ",
        text:
          err?.response?.data?.message ||
          "ไม่สามารถอนุมัติได้ กรุณาลองใหม่",
      });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Approve Trainer Requests</h1>

      {loading ? (
        <p>Loading...</p>
      ) : pendingUsers.length === 0 ? (
        <p className="text-base-content/70">
          ไม่มีผู้สมัครเป็น Trainer ในขณะนี้
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingUsers.map((user) => (
            <div
              key={user._id}
              className="card bg-base-200 shadow-md p-6"
            >
              <h2 className="text-xl font-semibold mb-2">
                {user.username}
              </h2>

              <p className="text-sm text-base-content/70">
                request-status: <a className="font-bold text-blue-600">{user.trainerRequest}</a>
              </p>

              <button
                onClick={() => handleApprove(user._id)}
                className="btn btn-success mt-4 w-full"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApproveTrainer;
