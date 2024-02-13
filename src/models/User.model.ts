import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    default: "credentials"
  },
  images: [String],
  image: String
});

const User = mongoose.models.User || mongoose.model('User', usersSchema)

export default User

