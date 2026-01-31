import api from "./api"
const API_URL = import.meta.env.VITE_CLASS_URL;

const getAllClasses = async () => {
  return await api.get(API_URL);
};

const createClass = async (data) => {
  return await api.post(API_URL, data,{
    headers:{
      "Content-Type": "multipart/form-data"
    }
  });
};

const updateClass = async (id, data) => {
  return await api.patch(`${API_URL}/${id}`, data);
};

const deleteClass = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const classesService = {
  getAllClasses,
  createClass,
  updateClass,
  deleteClass,
};

export default classesService;