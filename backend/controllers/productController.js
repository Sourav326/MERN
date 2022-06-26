//import the product model
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");


//Get all product list
//instead of using try catch for async we created the middleware for async with name catchAsyncError to make our code shorter
exports.getAllProducts = catchAsyncError(async (req, res) => {
    
    const apiFeatures = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter();//for searching the product, class under utils
    
    // const products = await Product.find();
    const products = await apiFeatures.query;

    res.status(200).json({
        success:true,
        products
    });
});

//Get single product
exports.getSingleProduct = catchAsyncError(async (req, res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        // return res.status(500).json({
        //     success:false,
        //     message:"Product not found"
        // })
        //now write the above code as this, as we created the utils and middleware
        return next(new ErrorHandler("Product not found",400));
    }
    res.status(200).json({
        success:true,
        product
    });
});


//create Product
exports.createProduct = catchAsyncError(async(req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    });
});


//Update product
exports.updateProduct = catchAsyncError(async (req,res,next) => {
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",400));
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
});

//Delete Product
exports.deleteProduct = catchAsyncError(async (req,res,next) => {

    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",400));
    }
    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })

});