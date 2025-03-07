import { Schema, model } from "mongoose";


const shopSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: [
        {
            productoId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            stock: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

export default model("Shop", shopSchema);