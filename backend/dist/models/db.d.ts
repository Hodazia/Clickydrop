import mongoose from "mongoose";
export declare const connectDB: () => Promise<void>;
export declare const UserModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profileTitle: string;
    bio: string;
    avatarUrl: string;
    theme: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profileTitle: string;
    bio: string;
    avatarUrl: string;
    theme: string;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profileTitle: string;
    bio: string;
    avatarUrl: string;
    theme: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profileTitle: string;
    bio: string;
    avatarUrl: string;
    theme: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profileTitle: string;
    bio: string;
    avatarUrl: string;
    theme: string;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    username: string;
    email: string;
    password: string;
    profileTitle: string;
    bio: string;
    avatarUrl: string;
    theme: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const LinksModel: mongoose.Model<{
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    title: string;
    url: string;
    imageUrl?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    title: string;
    url: string;
    imageUrl?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    title: string;
    url: string;
    imageUrl?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    title: string;
    url: string;
    imageUrl?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    title: string;
    url: string;
    imageUrl?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    user: mongoose.Types.ObjectId;
    title: string;
    url: string;
    imageUrl?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=db.d.ts.map