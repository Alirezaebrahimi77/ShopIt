const express = require("express");

const router = express.Router();

const {getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts} = require("../controllers/productController");

const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth");


// Get all products
router.route("/products").get(getProducts);

// Get all products (admin)
router.route("/admin/products").get(getAdminProducts);

//Get single product
router.route("/product/:id").get(getSingleProduct);

// Post a product
router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);


// Update product by id AND delete
router.route("/admin/product/:id")
                .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
                .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);


router.route("/review").put(isAuthenticatedUser, createProductReview)
router.route("/reviews").get(isAuthenticatedUser, getProductReviews)
router.route("/reviews").delete(isAuthenticatedUser, deleteReview)

module.exports = router;