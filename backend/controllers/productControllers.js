import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import APIFilters from "../utils/apiFilters.js";


export const getProducts = async (req, res) => {
    const resPerPage = 4;
    const apiFilters = new APIFilters(Product, req.query).search().filters();
  
    let products = await apiFilters.query;
    let filteredProductsCount = products.length;
  
    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();
  
    res.status(200).json({
      resPerPage,
      filteredProductsCount,
      products,
    });
  };


// Create new Product   =>  /api//admin/products
export const newProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    product,
  });
};

// Get single product details   =>  /api/products/:id
export const getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404))
  }
  res.status(200).json({
    product,
  });
};

// Update product details   =>  /api/products/:id
// controllers/productControllers.js

export const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                error: "Product not found",
            });
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({
            product,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete product   =>  /api/products/:id
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return res.status(404).json({
      error: "Producttt not found",
    });
  }

  await product.deleteOne();
  res.status(200).json({
    message: "Product Deleted",
  });
};