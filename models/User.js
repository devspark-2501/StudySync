import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: "YYYY-MM-DD"
  count: { type: Number, default: 1 },
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String, default: '' },
    bio: { type: String, default: 'Welcome to my StudySync profile! Tracking my learning journey.' },
    skills: [{ type: String }],
    interests: [{ type: String }],
    activities: [ActivitySchema],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);