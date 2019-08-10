"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const responseCodes_1 = require("../../datamodel/responseCodes");
const app = express_1.default();
const port = 8000; // default port to listen
// define a route handler for the default home page
app.get("/messages", (req, res) => {
    return res.status(responseCodes_1.ResponseCodes.Ok).json('Hello world!');
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map