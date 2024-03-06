import mongoose from 'mongoose';
const auth_Shema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    roleNo: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
    },
    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});
mongoose.models = {};
export default mongoose.model("auth", auth_Shema);