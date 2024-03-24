import express from 'express'
import {addCourse, deleteMyCourses, deleteReview, editCourse, getAllCourse, getCourseDetails, getCourseReviews, getMyCourses, rateTutorials} from '../Controllers/tutorControllers.js'
import { isAuthorised } from '../middleware/auth.js';

const router = express.Router();

router.route('/addCourse').post(isAuthorised, addCourse)

router.route('/editCourse/:id').put(isAuthorised, editCourse)

router.route('/getCourse').get(getAllCourse)

router.route('/getCourseDetails/:id').get(getCourseDetails)

router.route('/getMyCourse').get(isAuthorised, getMyCourses)

router.route('/deleteMyCourse/:id').delete(isAuthorised, deleteMyCourses)

router.route('/rate/:id').post(isAuthorised, rateTutorials)

router.route('/getReview').get(getCourseReviews)

router.route('/deleteReview/:id').delete(isAuthorised, deleteReview)

export default router;