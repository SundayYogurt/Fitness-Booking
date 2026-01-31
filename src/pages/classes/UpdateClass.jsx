import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import classesService from "../../services/class.service";

const UpdateClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    className: "",
    trainerName: "",
    price: "",
    phone: "",
    duration: "",
    classType: "",
    capacity: "",
    description: "",
    classDate: "",
    status: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  // โหลดข้อมูลคลาสเดิม
  useEffect(() => {
    const fetchClass = async () => {
      try {
        setLoading(true);
        const res = await classesService.getAllClasses(); 
        const found = res.data.classes.find((c) => c._id === id);

        if (!found) {
          Swal.fire("ไม่พบคลาสนี้");
          navigate("/my-classes");
          return;
        }

        setFormData({
          className: found.className,
          trainerName: found.trainerName,
          price: found.price,
          phone: found.phone,
          duration: found.duration,
          classType: found.classType,
          capacity: found.capacity,
          description: found.description,
          classDate: found.classDate.slice(0, 16),
          status: found.status,
          location: found.location,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "โหลดข้อมูลไม่สำเร็จ",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        price: Number(formData.price),
        capacity: Number(formData.capacity),
        duration: Number(formData.duration),
        classDate: new Date(formData.classDate).toISOString(),
      };

      const res = await classesService.updateClass(id, payload);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "อัปเดตสำเร็จ",
        }).then(() => {
          navigate("/my-classes");
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "อัปเดตไม่สำเร็จ",
        text:
          err?.response?.data?.message ||
          "ไม่สามารถอัปเดตคลาสได้",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl card bg-base-100 shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-6">Update Class</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <div>
            <label className="label">Class Name</label>
            <input
              type="text"
              name="className"
              className="input input-bordered w-full"
              value={formData.className}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Trainer Name</label>
            <input
              type="text"
              name="trainerName"
              className="input input-bordered w-full"
              value={formData.trainerName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Price</label>
            <input
              type="number"
              name="price"
              className="input input-bordered w-full"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Duration</label>
            <input
              type="number"
              name="duration"
              className="input input-bordered w-full"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Class Type</label>
            <input
              type="text"
              name="classType"
              className="input input-bordered w-full"
              value={formData.classType}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Capacity</label>
            <input
              type="number"
              name="capacity"
              className="input input-bordered w-full"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Status</label>
            <select
              name="status"
              className="select select-bordered w-full"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="label">Class Date</label>
            <input
              type="datetime-local"
              name="classDate"
              className="input input-bordered w-full"
              value={formData.classDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2">
            <label className="label">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-2 mt-4">
            <button
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateClass;
