const express = require('express');
const Booking = require('../models/Booking');
const { Room, segmentTree } = require('../models/Room');
const auth = require('../middleware/auth');
const router = express.Router();

// Book a room
router.post('/book', auth, async (req, res) => {
  const { roomId, checkInDate, checkOutDate } = req.body;
  try {
    const room = await Room.findById(roomId);
    if (!room || !room.availability) {
      return res.status(400).json({ error: 'Room not available' });
    }

    // Update demand in Segment Tree
    const index = roomId.toString().slice(-2) % 100; // Generate index from roomId
    const currentDemand = segmentTree.query(0, 99);
    segmentTree.update(index, currentDemand + 1);

    // Calculate dynamic price
    const dynamicPrice = room.getDynamicPrice();

    // Create booking
    const booking = new Booking({
      userId: req.user.id,
      roomId,
      checkInDate,
      checkOutDate,
      price: dynamicPrice,
    });
    await booking.save();

    // Mark room as unavailable
    room.availability = false;
    await room.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user bookings
router.get('/bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('roomId');
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;