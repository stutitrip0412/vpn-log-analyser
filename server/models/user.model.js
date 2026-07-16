import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ROLES } from "../constants/role.js";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.ANALYST
    },

    department: {
      type: String,
      default: "Cyber Forensics",
    },

    badgeId: {
      type: String,
      default: null,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(
        this.password,
        12
    );

});


userSchema.methods.isPasswordCorrect =
async function (password) {

    return await bcrypt.compare(
        password,
        this.password
    );

};


userSchema.methods.generateAccessToken =
function () {

    return jwt.sign(

        {
            _id: this._id,
            username: this.username,
            email: this.email,
            role: this.role,
        },

        process.env.JWT_ACCESS_SECRET,

        {
            expiresIn:
                process.env.ACCESS_TOKEN_EXPIRY,
        }

    );

};

userSchema.methods.generateRefreshToken =
function () {

    return jwt.sign(

        {
            _id: this._id,
        },

        process.env.JWT_REFRESH_SECRET,

        {
            expiresIn:
                process.env.REFRESH_TOKEN_EXPIRY,
        }

    );

};

const User = mongoose.model(
    "User",
    userSchema
);

export default User;