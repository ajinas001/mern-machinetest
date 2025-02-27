import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    mobile: String
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User