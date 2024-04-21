import express from 'express';
import { stk } from '../controllers/stkController.js';

const router = express.Router();

router.route('/stk').post(stk);

export default router;
