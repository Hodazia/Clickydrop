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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
app.use(express_1.default.json());
//add a cookie parser
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use((0, cors_1.default)());
// MVC template 
app.use("/api/v1/user", userrouter_1.default);
app.listen(3000, () => {
    (0, db_1.connectDB)();
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map