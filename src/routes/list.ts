import {Router} from 'express';
import { aggregateList, deleteList, editList, getList, shoppingList } from '../controllers/list';
import { requireAuth } from '../middlewares/authJwt';

const router = Router();

router.post('/create-list', requireAuth, shoppingList);
router.delete('/delete/:id', requireAuth, deleteList)
router.get('/list/:userId', requireAuth, getList);
router.patch('/edit/:id', requireAuth, editList);
router.get('/aggregate', aggregateList);
export default router;