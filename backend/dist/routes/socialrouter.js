"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socialcontroller_1 = require("../controller/socialcontroller");
const auth_1 = require("../middlewares/auth");
const Socialrouter = express_1.default.Router();
Socialrouter.get("/getsocials", auth_1.verifyToken, socialcontroller_1.Socials);
Socialrouter.post("/postsocials", auth_1.verifyToken, socialcontroller_1.PostSocial);
exports.default = Socialrouter;
//# sourceMappingURL=socialrouter.js.map