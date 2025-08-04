"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middlewares/auth");
const linkscontroller_1 = require("../controller/linkscontroller");
const multer_1 = __importDefault(require("multer"));
// all of these routes are authenticated routes
/*
when u try to add, u need to be sign in and have a cookie, which
will be sent by the browser without us manually sharing the cookies
in the headers,

Same is true for delete, modify

*/
// have a place to store all your files,
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post("/add", auth_1.verifyToken, upload.single("image"), linkscontroller_1.createLinks);
router.post("/delete", auth_1.verifyToken);
exports.default = router;
//# sourceMappingURL=userlinksrouter.js.map