import express from "express";
import {registerUser, loginUser, logout, forgotPassword, resetPassword, myProfile, updateProfile, updatePassword} from '../Controllers/userController.js'
import { isAuthorised } from "../middleware/auth.js";

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').get(logout)

router.route('/me').get(isAuthorised, myProfile).put(isAuthorised, updateProfile);

router.route('/password/update').put( isAuthorised, updatePassword)

router.route('/password/forgot').post(forgotPassword)

router.route('/password/reset/:token').post(resetPassword)

export default router