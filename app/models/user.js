import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);