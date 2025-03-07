import Invoice from "./invoice.model.js";

export const getInvoiceHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        const invoices = await Invoice.find({ userId }).populate('product.productId');

        if (!invoices || invoices.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron facturas para este usuario"
            });
        }

        res.status(200).json({
            success: true,
            invoices
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al recuperar las facturas",
            error: error.message
        });
    }
};