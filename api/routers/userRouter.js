import { Router } from "express";
import { getAllUsers, loginUser, registerUser } from '../controllers/userController.js';

const router = Router();

//  Users routes
router.get('/', getAllUsers);

router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;