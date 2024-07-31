// activity-diary-backend/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
 activityName: {
    type: String,
    required: true,
 },
 deadline: {
    type: Date,
    default:Date.now(),
    required: true,
 },
 status: {
    type: String,
    default: 'In Progress',
    enum: ['In Progress', 'Completed','Cancelled'],
 },
});

module.exports = mongoose.model('Activity', activitySchema);
