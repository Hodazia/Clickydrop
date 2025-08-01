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
dotenv_1.default.config();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
// MVC template 
app.use("/api/v1/user", userrouter_1.default);
app.listen(3000, () => {
    (0, db_1.connectDB)();
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map