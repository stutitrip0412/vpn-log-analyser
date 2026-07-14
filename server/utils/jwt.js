import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const generateTokens = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const accessToken =
        user.generateAccessToken();

    const refreshToken =
        user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
        validateBeforeSave: false
    });

    return {
        accessToken,
        refreshToken
    };
};

export const verifyAccessToken = (token) => {

    return jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET
    );

};

export const verifyRefreshToken = (token) => {

    return jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET
    );

};

export const cookieOptions = {

    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: "strict",

    maxAge: 7 * 24 * 60 * 60 * 1000

};