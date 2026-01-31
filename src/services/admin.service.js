import api from "./api"
const API_URL = import.meta.env.VITE_AUTH_URL;

const getTrainerRequests = async () => {
  return await api.get(`${API_URL}/request`);
};

const approveTrainer = async (id) => {
  return await api.patch(`${API_URL}/admin/approve-trainer/${id}`);
};

export default {
  getTrainerRequests,
  approveTrainer,
};