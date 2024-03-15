import express from 'express'
import {getPapers, postPaper} from '../Controllers/paperController.js'
import { isAuthorised } from '../middleware/auth.js';

const router = express.Router();

router.route('/postPaper').post(isAuthorised, postPaper)

router.route('/getPapers').get(getPapers)

export default router