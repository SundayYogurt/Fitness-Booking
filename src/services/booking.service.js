import api from "./api"
const API_URL = import.meta.env.VITE_BOOKING_URL;

const booking = async (classId, data) => {
    return await api.post(`${API_URL}/${classId}`, data)
}

const myBooking = async () => {
    return await api.get(`${API_URL}/my-bookings`)
}

const bookingService = {
    booking,
    myBooking
}
export default bookingService