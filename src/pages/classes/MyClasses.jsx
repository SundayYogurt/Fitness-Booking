import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import trainerService from "../../services/trainer.service";
import classesService from "../../services/class.service";

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyClasses = async () => {
      try {
        setLoading(true);
        const res = await trainerService.getMyClasses();
        if (res.status === 200) {
          setClasses(res.data.classes || []);
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "โหลดข้อมูลไม่สำเร็จ",
          text:
            err?.response?.data?.message ||
            "ไม่สามารถดึงข้อมูลคลาสของคุณได้",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMyClasses();
  }, []);

  //  delete class
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "ยืนยันการลบ?",
      text: "คุณต้องการลบคลาสนี้ใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await classesService.deleteClass(id);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "ลบสำเร็จ",
        });

        // เอาออกจาก state
        setClasses((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ลบไม่สำเร็จ",
        text:
          err?.response?.data?.message ||
          "ไม่สามารถลบคลาสได้",
      });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Classes</h1>

      {loading ? (
        <p>Loading...</p>
      ) : classes.length === 0 ? (
        <p className="text-base-content/70">
          คุณยังไม่มีคลาสที่สร้างไว้
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((item) => (
            <div
              key={item._id}
              className="card bg-base-200 shadow-md p-5"
            >
              <img
                src={item.cover}
                alt={item.className}
                className="w-full h-40 object-cover rounded mb-4"
              />

              <h2 className="text-xl font-semibold mb-2">
                {item.className}
              </h2>

              <p className="text-sm mb-1">Type: {item.classType}</p>
              <p className="text-sm mb-1">Duration: {item.duration} นาที</p>
              <p className="text-sm mb-1">Price: {item.price} บาท</p>
              <p className="text-sm mb-1">Capacity: {item.capacity} คน</p>

              <p className="text-sm mb-3">
                Date: {new Date(item.classDate).toLocaleString()}
              </p>

              <span
                className={`badge ${
                  item.status === "active"
                    ? "badge-success"
                    : "badge-ghost"
                }`}
              >
                {item.status}
              </span>

              <div className="flex gap-2 mt-4">
                <button
                  className="btn btn-sm btn-outline w-1/2"
                  onClick={() => navigate(`/update-class/${item._id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-error w-1/2"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyClasses;
