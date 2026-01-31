import api from "./api"
const API_URL = import.meta.env.VITE_AUTH_URL;
const CLASS_API_URL = import.meta.env.VITE_CLASS_URL;

const becomeTrainer = async () => {
    return await api.post(`${API_URL}/become-trainer`)
}

const getMyClasses = async () => {
  return await api.get(`${CLASS_API_URL}/my-classes`);
};

const trainerService = {
    becomeTrainer,
    getMyClasses
}

export default trainerService