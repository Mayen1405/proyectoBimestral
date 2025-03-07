import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "se requiere un nombre"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username:{
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    profilePicture: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true,
    },
    role: {
        type: String,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"],
        default: "CLIENT_ROLE"
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    versionKey: false,
    timestamps: true
});

userSchema.methods.toJSON = function(){
    const {_v, password, _id, ...user} = this.toObject()
    user.uid = _id;
    return user;
};

export default model("User", userSchema);