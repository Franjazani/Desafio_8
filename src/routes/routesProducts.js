import express from 'express';
const router = express.Router();
import { created, list, single, update, deleted } from '../controllers/controllerProducts';
import isAdmin from '../middlewares/isAdmin.js';



router.get('/', list);
router.get('/:id', isAdmin, single);
router.put('/:id', isAdmin, update);
router.delete('/:id', isAdmin, deleted);
router.post('/', isAdmin, created);

export default router;