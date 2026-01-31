import { useNavigate } from "react-router";
import trainerService from "../../services/trainer.service";
import Swal from "sweetalert2";

const TrainerSignup = () => {
  const navigate = useNavigate();

  const handleBecomeTrainer = async () => {
    try {
      const res = await trainerService.becomeTrainer()

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "สมัครเป็น Trainer สำเร็จ",
          text: res.data.message || "ระบบได้รับคำขอของคุณแล้ว",
          confirmButtonText: "ตกลง",
        }).then(() => {
          navigate("/"); 
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "สมัครไม่สำเร็จ",
        text:
          err?.response?.data?.message ||
          "ไม่สามารถส่งคำขอได้ กรุณาลองใหม่",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card bg-base-200 shadow-md p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Become a Trainer</h1>

        <p className="mb-6 text-base-content/70">
          เมื่อสมัครเป็น Trainer ระบบจะส่งคำขอให้แอดมินตรวจสอบก่อน
        </p>

        <button
          onClick={handleBecomeTrainer}
          className="btn btn-primary w-full"
        >
          สมัครเป็น Trainer
        </button>
      </div>
    </div>
  );
};

export default TrainerSignup;
