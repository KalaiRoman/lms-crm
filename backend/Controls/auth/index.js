import expres from 'express';
import { AuthRegister, AuthLogin, GetSingleUserData, SingleUserUpdate, AllUsers } from './Auth_controlls.js';
const auth_router = expres.Router();
auth_router.post("/register", AuthRegister)
auth_router.post("/login", AuthLogin)
auth_router.get("/get/:id", GetSingleUserData)
auth_router.put("/update/:id", SingleUserUpdate)
auth_router.get("/alluser", AllUsers)

export default auth_router;