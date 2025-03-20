import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5776/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export const register = (data) => API.post('/users/register', data);
export const loginUser = (data) => API.post('/users/login', data); // Added
export const getProfile = () => API.get('/users/profile');
export const createBooking = (data) => API.post('/users/bookings', data);
export const getUserBookings = () => API.get('/users/bookings');
export const getAvailableRooms = () => API.get('/users/rooms');


export const loginAdmin = (data) => API.post('/admin/login', data); // Added
export const getAllBookings = () => API.get('/admin/bookings');
export const updateBookingStatus = (data) => API.put('/admin/bookings/status', data);
export const deleteBooking = (bookingId) => API.delete(`/admin/bookings/${bookingId}`);
export const addRoom = (data) => API.post('/admin/rooms', data);
export const getAllRooms = () => API.get('/admin/rooms');
export const deleteRoom = (roomId) => API.delete(`/admin/rooms/${roomId}`);
export const updateRoom = (roomId, data) => API.put(`/admin/rooms/${roomId}`, data);
export const getDashboardStats = () => API.get('/admin/dashboard');