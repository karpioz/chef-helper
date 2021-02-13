// This file contains all routes involved products and ingredients

import express from 'express'
const router = express.Router()

// Importing controllers
import {
	getProducts,
	updateProductQuantity
} from '../controllers/productsController.js'

// routes
// read all products data
router.get('/', getProducts)

// update product data
router.patch('/:id', updateProductQuantity)

export default router
