"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const responseCodes_1 = require("../../datamodel/responseCodes");
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
const port = 8000; // default port to listen
app.get("/messages", (req, res) => {
    res.status(responseCodes_1.ResponseCodes.Ok).json('Hello world!');
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
//# sourceMappingURL=server.js.map