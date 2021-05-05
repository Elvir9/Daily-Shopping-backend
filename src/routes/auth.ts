import {Router} from 'express';
import {register, login, changePassword} from '../controllers/auth';
import { requireAuth } from '../middlewares/authJwt';
import {checkDuplicateUsername} from '../middlewares/verifySignUp';

const router = Router();

router.post('/signup', checkDuplicateUsername, register);
router.post('/signin', requireAuth, login);
router.patch('/reset-password', requireAuth, changePassword);

export default router;