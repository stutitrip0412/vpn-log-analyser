import AuditLog from "../models/auditLog.model.js";

export const audit = (action) => {

    return async (req, res, next) => {

        res.on("finish", async () => {

            try {

                await AuditLog.create({

                    user: req.user?._id || null,

                    username:
                        req.user?.username || "Anonymous",

                    role:
                        req.user?.role || "Unknown",

                    action,

                    endpoint: req.originalUrl,

                    method: req.method,

                    ipAddress:

                        req.ip ||

                        req.connection.remoteAddress,

                    userAgent:

                        req.get("User-Agent"),

                    status:

                        res.statusCode < 400

                            ? "SUCCESS"

                            : "FAILED"

                });

            }

            catch (err) {

                console.error(

                    "Audit Log Error:",

                    err.message

                );

            }

        });

        next();

    };

};