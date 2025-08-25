"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./models/db");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const userrouter_1 = __importDefault(require("./routes/userrouter"));
const userlinksrouter_1 = __importDefault(require("./routes/userlinksrouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = require("./generated/prisma");
const socialrouter_1 = __importDefault(require("./routes/socialrouter"));
const prisma = new prisma_1.PrismaClient();
async function createuser(username, email, password) {
    // define a user
    const res = await prisma.user.create({
        data: {
            username,
            password,
            email
        }
    });
    console.log(res);
}
async function getUser(username) {
    //
}
dotenv_1.default.config();
app.use(express_1.default.json());
//add a cookie parser
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
// define which frontend website can access the backend, 
// important configurations for the fe+be to remain sync
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Make sure this matches your frontend's URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.get("/", (req, res) => {
    res.send("Hello World");
});
// MVC template 
app.use("/api/v1/user", userrouter_1.default); // for the users. 
app.use("/api/v1/social", socialrouter_1.default); // for the social media links
// for the links , 
app.use("/api/v1/links", userlinksrouter_1.default);
app.listen(3000, () => {
    (0, db_1.connectDB)();
    // createuser("ZIA#243","zia23hoda@gmail.com","zia23hoda");
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map