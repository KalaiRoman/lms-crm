import expres from 'express';
import { DeleteUser } from './AdminControll.js';
const admin_router = expres.Router();
admin_router.put("/update/:id", DeleteUser)
export default admin_router;