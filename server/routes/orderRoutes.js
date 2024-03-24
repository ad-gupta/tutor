import express from 'express'
import {addToCart, getMyOrders, deleteOrder, getClientOrders, checkOut, getKey} from '../Controllers/orderControllers.js'
import { isAuthorised } from '../middleware/auth.js';

const router = express.Router();

router.route('/addtoCart/:id').post(isAuthorised, addToCart);

router.route('/myOrders').get( isAuthorised, getMyOrders)

router.route('/myOrders/delete/:id').delete(isAuthorised, deleteOrder)

router.route('/getClientOrders').get(isAuthorised, getClientOrders)

router.route('/checkout').post(isAuthorised, checkOut);

router.route('/config/stripe').get(getKey)

export default router;