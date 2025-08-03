"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usercontroller_1 = require("../controller/usercontroller");
const auth_1 = require("../middlewares/auth");
router.post("/signup", usercontroller_1.signup);
router.post("/signin", usercontroller_1.signin);
router.post("/logout", usercontroller_1.logout);
router.get("/me", auth_1.verifyToken, usercontroller_1.getMe);
router.get("/check-auth", usercontroller_1.checkAuth);
exports.default = router;
//# sourceMappingURL=userrouter.js.map