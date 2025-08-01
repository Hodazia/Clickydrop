"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usercontroller_1 = require("../controller/usercontroller");
router.post("/signup", usercontroller_1.signup);
exports.default = router;
//# sourceMappingURL=userrouter.js.map