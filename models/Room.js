const mongoose = require('mongoose');
const SegmentTree = require('../utils/segmentTree');

// Initialize Segment Tree for dynamic pricing (shared across all rooms)
const segmentTree = new SegmentTree(100); // Assuming 100 rooms

const RoomSchema = new mongoose.Schema({
  type: { type: String, required: true },
  basePrice: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  amenities: { type: [String], default: [] },
});

// Method to calculate dynamic price based on demand
RoomSchema.methods.getDynamicPrice = function () {
  const demand = segmentTree.query(0, 99);
  return this.basePrice * (1 + demand / 100);
};

// Export the Segment Tree instance for use in other files
module.exports = {
  Room: mongoose.model('Room', RoomSchema),
  segmentTree,
};