import expres from 'express';
import { createTask, deleteTask, getallTask, getsingleTask, updateTask } from './TaskControll.js';
import { verifyToken } from './../../middleware/Tokenverification.js';
const task_router = expres.Router();
task_router.post("/create", verifyToken, createTask)
task_router.get("/get/:id", getsingleTask)
task_router.get("/getall", getallTask)
task_router.put("/update/:id", updateTask)
task_router.delete("/delete/:id", deleteTask)

export default task_router;