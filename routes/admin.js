const express = require('express');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const router = express.Router();

// Get all rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new room
router.post('/rooms', async (req, res) => {
  const { type, basePrice, amenities } = req.body;
  try {
    const room = new Room({ type, basePrice, amenities });
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bookings
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId roomId');
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Cancel a booking
router.delete('/bookings/:id', async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      // Mark room as available
      const room = await Room.findById(booking.roomId);
      if (room) {
        room.availability = true;
        await room.save();
      }
  
      // Delete the booking
      await Booking.findByIdAndDelete(req.params.id);
  
      res.json({ message: 'Booking canceled successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Update payment status
  router.patch('/bookings/:id', async (req, res) => {
    const { paymentStatus } = req.body;
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      booking.paymentStatus = paymentStatus;
      await booking.save();
  
      res.json(booking);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
module.exports = router;