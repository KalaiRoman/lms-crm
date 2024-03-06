import express from 'express';
import auth_router from '../Controls/auth/index.js';
import task_router from '../Controls/task/index.js';
import admin_router from '../Controls/admin/index.js';

const router = express.Router();
// auth
router.use("/auth", auth_router);

// task

router.use("/task", task_router)

// admin

router.use("/admin", admin_router)



export default router;