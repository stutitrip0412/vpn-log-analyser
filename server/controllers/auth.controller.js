import User from "../models/user.model.js";
import { generateTokens, cookieOptions } from "../utils/jwt.js";
import { ROLES } from "../constants/role.js";
import jwt from "jsonwebtoken";
/**
 * Register User
 */
export const registerUser = async (req, res) => {

    try {

        const {
            fullName,
            username,
            email,
            password,
            role,
            department,
            badgeId
        } = req.body;

        // -------------------------
        // Validate Required Fields
        // -------------------------

        if (
            !fullName ||
            !username ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message: "All required fields must be provided."

            });

        }

        // -------------------------
        // Check Existing User
        // -------------------------

        const existingUser = await User.findOne({

            $or: [

                { email },

                { username }

            ]

        });

        if (existingUser) {

            return res.status(409).json({

                success: false,

                message:
                    "Username or email already exists."

            });

        }

        // -------------------------
        // Create User
        // -------------------------

        const user = await User.create({

            fullName,

            username,

            email,

            password,

            role:role || ROLES.ANALYST,

            department,

            badgeId

        });

        // -------------------------
        // Generate JWT Tokens
        // -------------------------

        const {

            accessToken,

            refreshToken

        } = await generateTokens(user._id);

        // -------------------------
        // Fetch Created User
        // -------------------------

        const createdUser = await User.findById(user._id)

            .select("-password -refreshToken");

        // -------------------------
        // Response
        // -------------------------

        return res

            .status(201)

            .cookie(

                "accessToken",

                accessToken,

                cookieOptions

            )

            .cookie(

                "refreshToken",

                refreshToken,

                cookieOptions

            )

            .json({

                success: true,

                message:

                    "User registered successfully.",

                user: createdUser,

                accessToken,

                refreshToken

            });

    }

   catch (error) {

    console.error("========== REGISTER ERROR ==========");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
        success: false,
        message: error.message
    });

}
};

/**
 * Login User
 */
export const loginUser = async (req, res) => {

    try {

        const {
            email,
            username,
            password
        } = req.body;

        if ((!email && !username) || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email/Username and password are required."

            });

        }

        // -----------------------
        // Find User
        // -----------------------

        const user = await User.findOne({

            $or: [

                { email },

                { username }

            ]

        }).select("+password +refreshToken");

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found."

            });

        }

        // -----------------------
        // Verify Password
        // -----------------------

        const isPasswordValid =

            await user.isPasswordCorrect(password);

        if (!isPasswordValid) {

            return res.status(401).json({

                success: false,

                message: "Invalid credentials."

            });

        }

        // -----------------------
        // Check Active Status
        // -----------------------

        if (!user.isActive) {

            return res.status(403).json({

                success: false,

                message:
                    "Account has been disabled."

            });

        }

        // -----------------------
        // Generate Tokens
        // -----------------------

        const {

            accessToken,

            refreshToken

        } = await generateTokens(user._id);

        // -----------------------
        // Update Last Login
        // -----------------------

        user.lastLogin = new Date();

        await user.save({

            validateBeforeSave: false

        });

        // -----------------------
        // Remove Sensitive Fields
        // -----------------------

        const loggedInUser = await User.findById(

            user._id

        ).select(

            "-password -refreshToken"

        );

        // -----------------------
        // Response
        // -----------------------

        return res

            .status(200)

            .cookie(

                "accessToken",

                accessToken,

                cookieOptions

            )

            .cookie(

                "refreshToken",

                refreshToken,

                cookieOptions

            )

            .json({

                success: true,

                message: "Login successful.",

                user: loggedInUser,

                accessToken,

                refreshToken

            });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const refreshAccessToken = async (req, res) => {

    try {

        const incomingRefreshToken =

            req.cookies?.refreshToken ||

            req.body.refreshToken;

        if (!incomingRefreshToken) {

            return res.status(401).json({

                success: false,

                message: "Refresh token required."

            });

        }

        // Verify JWT

        const decoded = jwt.verify(

            incomingRefreshToken,

            process.env.JWT_REFRESH_SECRET

        );

        const user = await User.findById(

            decoded._id

        ).select("+refreshToken");

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid refresh token."

            });

        }

        // Compare stored refresh token

        if (

            incomingRefreshToken !==

            user.refreshToken

        ) {

            return res.status(401).json({

                success: false,

                message: "Refresh token mismatch."

            });

        }

        // Generate new tokens

        const {

            accessToken,

            refreshToken

        } = await generateTokens(user._id);

        return res

            .status(200)

            .cookie(

                "accessToken",

                accessToken,

                cookieOptions

            )

            .cookie(

                "refreshToken",

                refreshToken,

                cookieOptions

            )

            .json({

                success: true,

                accessToken,

                refreshToken

            });

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message: error.message

        });

    }

};

export const logoutUser = async (req, res) => {

    try {

        await User.findByIdAndUpdate(

            req.user._id,

            {

                $unset: {

                    refreshToken: 1

                }

            }

        );

        return res

            .status(200)

            .clearCookie(

                "accessToken",

                cookieOptions

            )

            .clearCookie(

                "refreshToken",

                cookieOptions

            )

            .json({

                success: true,

                message: "Logged out successfully."

            });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

export const getCurrentUser = async (req, res) => {

    return res.status(200).json({

        success: true,

        user: req.user

    });

};