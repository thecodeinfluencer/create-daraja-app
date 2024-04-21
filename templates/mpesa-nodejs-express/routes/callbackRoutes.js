import express from 'express';
import { stkCallback } from '../controllers/callbackController.js';

const router = express.Router();

router.route('/callback').post(stkCallback);

export default router;
