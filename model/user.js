import mongoose from "mongoose";
import { roles } from "../middleware/roles.js";


const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },

    sap: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:[roles.admin,roles.student],
        default:roles.student
    }


}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

export default User