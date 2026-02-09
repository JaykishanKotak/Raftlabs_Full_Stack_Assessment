import { Router } from 'express';
import { getDistinctList } from '../controllers/common.controller';

const router = Router();

router.get('/cities', getDistinctList('city'));
router.get('/states', getDistinctList('state'));

export default router;
