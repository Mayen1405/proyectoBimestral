import Shop from "./shop.model.js";
import Product from "../product/product.model.js";
import Invoice from "../invoice/invoice.model.js";

export const addProductsToShop = async (req, res) => {
    try {
        const { products } = req.body;
        const userId = req.user._id;

        let shop = await Shop.findOne({ userId });

        if (!shop) {
            shop = new Shop({ userId, products: [] });
        }

        products.forEach(product => {
            const existingProduct = shop.products.find(p => p.productId.toString() === product.productId);
            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                shop.products.push({
                    productId: product.productId,
                    quantity: product.quantity
                });
            }
        });

        await shop.save();

        res.status(200).json({
            success: true,
            message: "Products added to shop",
            shop
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error adding products to shop",
            error: err.message
        });
    }
};

export const getProductsFromShop = async (req, res) => {
    try {
        const userId = req.user._id;
        const shop = await Shop.findOne({ userId }).populate('products.productId');

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: "Shop not found"
            });
        }

        res.status(200).json({
            success: true,
            products: shop.products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error getting products from shop",
            error: err.message
        });
    }
};

export const completePurchase = async (req, res) => {
    try {
        const userId = req.user._id;
        const { cardName, cardNumber, expirationDate, cvv } = req.body;
        const shopId = req.params.shopId;

        if (!cardName || !cardNumber || !expirationDate || !cvv) {
            return res.status(400).json({
                success: false,
                message: "Incomplete payment method information"
            });
        }

        const shop = await Shop.findById(shopId).populate('products.productId');

        if (!shop || shop.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "The shop is empty or does not exist"
            });
        }

        for (const item of shop.products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${item.productId} not found`
                });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product ${product.name}`
                });
            }
            product.stock -= item.quantity;
            await product.save();
        }

        
        const invoice = new Invoice({
            userId,
            products: shop.products,
            total: shop.products.reduce((acc, item) => acc + item.productId.price * item.quantity, 0),
            paymentMethod: {
                cardName,
                cardNumber,
                expirationDate,
                cvv
            }
        });
        await invoice.save();

        await Shop.findByIdAndDelete(shopId);

        res.status(200).json({
            success: true,
            message: "Purchase completed successfully",
            invoice
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error completing purchase",
            error: err.message
        });
    }
};