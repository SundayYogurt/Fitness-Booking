import { useState } from "react";
import Swal from "sweetalert2";
import classesService from "../../services/class.service";

const CreateClass = () => {
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
    status: "active",
    location: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate เบื้องต้น
    if (!imageFile) {
      Swal.fire({
        icon: "error",
        title: "กรุณาเลือกรูปภาพ",
        text: "ต้องอัปโหลดรูปคลาส",
      });
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("className", formData.className);
      data.append("trainerName", formData.trainerName);
      data.append("price", Number(formData.price));
      data.append("phone", formData.phone);
      data.append("duration", Number(formData.duration));
      data.append("classType", formData.classType);
      data.append("capacity", Number(formData.capacity));
      data.append("description", formData.description);
      data.append("classDate", new Date(formData.classDate).toISOString());
      data.append("status", formData.status);
      data.append("location", formData.location);
      data.append("cover", imageFile); // ชื่อต้องตรงกับ multer backend

      const res = await classesService.createClass(data);

      if (res.status === 201 || res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "สร้างคลาสสำเร็จ",
          text: res.data.message || "Class created successfully",
        });

        // reset form
        setFormData({
          className: "",
          trainerName: "",
          price: "",
          phone: "",
          duration: "",
          classType: "",
          capacity: "",
          description: "",
          classDate: "",
          status: "active",
          location: "",
        });
        setImageFile(null);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "สร้างคลาสไม่สำเร็จ",
        text:
          error?.response?.data?.message ||
          "ไม่สามารถสร้างคลาสได้ กรุณาลองใหม่",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl card bg-base-100 shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-6">Create Fitness Class</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          {/* Class Name */}
          <div>
            <label className="label">Class Name</label>
            <input
              type="text"
              name="className"
              className="input input-bordered w-full"
              value={formData.className}
              onChange={handleChange}
              required
            />
          </div>

          {/* Trainer Name */}
          <div>
            <label className="label">Trainer Name</label>
            <input
              type="text"
              name="trainerName"
              className="input input-bordered w-full"
              value={formData.trainerName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="label">Price</label>
            <input
              type="number"
              name="price"
              className="input input-bordered w-full"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="label">Phone</label>
            <input
              type="text"
              name="phone"
              className="input input-bordered w-full"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Duration */}
          <div>
            <label className="label">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              className="input input-bordered w-full"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          {/* Class Type */}
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

          {/* Capacity */}
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

          {/* Status */}
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

          {/* Class Date */}
          <div>
            <label className="label">Class Date & Time</label>
            <input
              type="datetime-local"
              name="classDate"
              className="input input-bordered w-full"
              value={formData.classDate}
              onChange={handleChange}
            />
          </div>

          {/* Location */}
          <div>
            <label className="label">Location</label>
            <input
              type="text"
              name="location"
              className="input input-bordered w-full"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          {/* Image */}
          <div className="col-span-2">
            <label className="label">Image</label>
            <input
              type="file"
              name="cover"
              className="file-input file-input-bordered w-full"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          {/* Description */}
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

          {/* Submit */}
          <div className="col-span-2 mt-4">
            <button
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Class"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateClass;
