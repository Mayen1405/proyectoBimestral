import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "se requiere un nombre"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "breve descripcion requerida"],
        unique: true
    },
    category: {
        type: String,
        required: [true, "se requiere una categoria"]
    },
    price: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    versionKey: false,
    timestamps: true
});

productSchema.methods.toJSON = function(){
    const {_v, password, _id, ...product} = this.toObject()
    product.prod = _id;
    return product;
};

export default model("Product", productSchema);