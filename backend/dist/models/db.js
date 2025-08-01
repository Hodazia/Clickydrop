"use strict";
//  connect to the DB and define models
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksModel = exports.UserModel = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const resposne = await mongoose_1.default.connect(process.env.MONGO_DB_URL);
        //console.log("response ", resposne);
        console.log("Connected to the DB ");
    }
    catch (error) {
        console.log("Error connecting to the DB ", error);
    }
};
exports.connectDB = connectDB;
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Public profile fields
    profileTitle: {
        type: String,
        default: `My links`
    },
    bio: {
        type: String,
        maxlength: 160,
        default: ''
    },
    avatarUrl: {
        type: String,
        // A placeholder image URL if no avatar is provided
        default: 'https://placehold.co/200x200/4f0f69/fff?text=Avatar'
    },
    // The user's chosen theme, which could be a simple string (e.g., 'dark', 'light')
    theme: {
        type: String,
        default: 'default'
    }
}, {
    // Mongoose timestamps automatically add 'createdAt' and 'updatedAt' fields.
    // This is useful for tracking when a user was created or last updated.
    timestamps: true
});
const LinkSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
exports.LinksModel = mongoose_1.default.model("Links", LinkSchema);
//# sourceMappingURL=db.js.map