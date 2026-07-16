import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
            index: true
        },

        username: {
            type: String,
            default: "Anonymous"
        },

        role: {
            type: String,
            default: "Unknown"
        },

        action: {
            type: String,
            required: true,
            index: true
        },

        endpoint: {
            type: String,
            required: true
        },

        method: {
            type: String,
            required: true
        },

        ipAddress: {
            type: String
        },

        userAgent: {
            type: String
        },

        status: {
            type: String,
            enum: ["SUCCESS", "FAILED"],
            default: "SUCCESS"
        },

        details: {
            type: Object,
            default: {}
        }
    },
    {
        timestamps: true
    }
);

auditLogSchema.index({ createdAt: -1 });

export default mongoose.model(
    "AuditLog",
    auditLogSchema
);