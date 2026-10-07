import mongoose from 'mongoose';

const DailyLogSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: "YYYY-MM-DD"
  status: { type: String, enum: ['completed', 'failed', 'pending'], default: 'pending' },
});

const TaskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    timeSlot: { type: String, default: 'Anytime' }, // e.g., "07:00 AM" or "School"
    category: { type: String, default: 'General' },
    logs: [DailyLogSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);