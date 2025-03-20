import Booking from '../Models/bookingModel.js';
import Room from '../Models/roomModel.js';
import User from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ success: true, message: 'Admin login successful', token });
    }
    res.status(401).json({ success: false, message: 'Invalid admin credentials' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('roomId', 'roomNumber currentPrice');
    res.status(200).json({ message: 'Bookings retrieved', count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const validStatuses = ['pending', 'confirmed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    booking.status = status;
    await booking.save();

    if (status === 'cancelled') {
      await Room.findByIdAndUpdate(booking.roomId, { isAvailable: true });
    }

    res.status(200).json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await Booking.findByIdAndDelete(bookingId);
    await Room.findByIdAndUpdate(booking.roomId, { isAvailable: true });

    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addRoom = async (req, res) => {
  try {
    const { roomNumber, type, basePrice, capacity, description } = req.body;
    const room = new Room({
      roomNumber,
      type,
      basePrice,
      currentPrice: basePrice,
      capacity,
      description,
      isAvailable: true,
    });
    await room.save();
    res.status(201).json({ message: 'Room added', room });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json({ message: 'Rooms retrieved', rooms });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const deleteRoom = async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ message: 'Room not found' });
  
      await Room.findByIdAndDelete(roomId);
      res.status(200).json({ message: 'Room deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  export const updateRoom = async (req, res) => {
    try {
      const { roomId } = req.params;
      const { roomNumber, type, basePrice, capacity, description } = req.body;
      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ message: 'Room not found' });
  
      room.roomNumber = roomNumber || room.roomNumber;
      room.type = type || room.type;
      room.basePrice = basePrice || room.basePrice;
      room.currentPrice = basePrice || room.currentPrice; 
      room.capacity = capacity || room.capacity;
      room.description = description || room.description;
  
      await room.save();
      res.status(200).json({ message: 'Room updated', room });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  export const getDashboardStats = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalBookings = await Booking.countDocuments();
      const totalRevenue = await Booking.aggregate([
        { $match: { status: 'confirmed' } },
        { $group: { _id: null, total: { $sum: '$totalPrice' } } },
      ]);
  
      res.status(200).json({
        totalUsers,
        totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };