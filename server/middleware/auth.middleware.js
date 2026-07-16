import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {

    try {

        // --------------------------
        // Get Token
        // --------------------------

        const token =

            req.cookies?.accessToken ||

            req.header("Authorization")?.replace(
                "Bearer ",
                ""
            );

        if (!token) {

            return res.status(401).json({

                success: false,

                message: "Access token missing."

            });

        }

        // --------------------------
        // Verify Token
        // --------------------------

        const decoded = jwt.verify(

            token,

            process.env.JWT_ACCESS_SECRET

        );

        // --------------------------
        // Find User
        // --------------------------

        const user = await User.findById(

            decoded._id

        ).select(

            "-password -refreshToken"

        );

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid access token."

            });

        }

        if (!user.isActive) {

            return res.status(403).json({

                success: false,

                message: "User account disabled."

            });

        }

        // --------------------------
        // Attach User
        // --------------------------

        req.user = user;

        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message: "Unauthorized.",

            error: error.message

        });

    }

};