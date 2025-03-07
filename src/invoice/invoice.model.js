import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    paymentMethod: {
        cardName: {
            type: String,
            required: true
        },
        cardNumber: {
            type: String,
            required: true
        },
        expirationDate: {
            type: String,
            required: true
        },
        cvv: {
            type: String,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);
export default Invoice;