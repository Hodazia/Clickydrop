//  connect to the DB and define models

import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const resposne = await mongoose.connect(process.env.MONGO_DB_URL as string);
        //console.log("response ", resposne);
        console.log("Connected to the DB ");
    }
    catch(error)
    {
        console.log("Error connecting to the DB ", error);
    }
}

const UserSchema = new mongoose.Schema({
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

const LinkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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
})

export const UserModel = mongoose.model("User",UserSchema);
export const LinksModel = mongoose.model("Links",LinkSchema);

