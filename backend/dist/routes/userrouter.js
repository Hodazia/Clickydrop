"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middlewares/auth");
const usercontroller_1 = require("../controller/usercontroller");
router.post("/signup", usercontroller_1.Signup);
router.post("/signin", usercontroller_1.Signin);
router.get("/me", auth_1.verifyToken, usercontroller_1.GetData);
exports.default = router;
//# sourceMappingURL=userrouter.js.map