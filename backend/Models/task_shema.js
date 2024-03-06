import mongoose from 'mongoose';

const TaskShema = new mongoose.Schema({
    assigned: Boolean,
    rejected: Boolean,
},
    {
        timestamps: true
    });

const task_Shema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 5,
        max: 10,
        unique: true
    },
    description: {
        type: String,
        required: true,
        min: 5,
        max: 10,
        unique: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "auth",
        required: true
    },
    task: [TaskShema]
},
    {
        timestamps: true
    });

mongoose.models = {};

export default mongoose.model("task", task_Shema);