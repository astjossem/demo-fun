"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const responseCodes_1 = require("../../datamodel/responseCodes");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db/db");
const app = express_1.default();
app.use(cors_1.default());
const port = 8000; // default port to listen
db_1.mongoDataBase.initialize();
app.get('/states', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const data = yield db_1.mongoDataBase.getAllStates();
        if (data) {
            res.status(responseCodes_1.ResponseCodes.Ok).json(data);
        }
        else {
            res.status(responseCodes_1.ResponseCodes.NoContent);
        }
    }
    catch (err) {
        console.log(`Error on /states: ${err}`);
        res.status(responseCodes_1.ResponseCodes.ServerError);
    }
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
//# sourceMappingURL=server.js.map