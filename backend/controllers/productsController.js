import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})
	res.json(products)
})

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private/Admin
const updateProductQuantity = asyncHandler(async (req, res) => {
	const { countInStock } = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		product.countInStock = countInStock

		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} else {
		res.status(404)
		throw new Error('Product not found')
	}
})

export { getProducts, updateProductQuantity }
