"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient = __importStar(require("mongodb"));
const censusApi_service_1 = require("../services/censusApi.service");
class MongoDataBase {
    constructor() {
        //Set up default mongoose connection
        this.url = 'mongodb://127.0.0.1/db';
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            MongoClient.connect(this.url, this.options, (err, client) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(`Error with connecting to DB: ${err}`);
                    return;
                }
                const db = yield client.db('db');
                const created = yield this.createCollection(db, 'States');
                if (created) {
                    const states = yield censusApi_service_1.censusApiService.getStatePop();
                    yield db.collection('States').insertMany(states);
                }
            }));
        });
    }
    getAllStates() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            const client = yield MongoClient.connect(this.url, this.options);
            const db = client.db('db');
            result = yield db.collection('States').find({}, { projection: { '_id': 0 } }).toArray();
            return result;
        });
    }
    createCollection(db, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield db.listCollections((col) => {
                col.collectionName === name;
            }, { nameOnly: true }).toArray();
            if (collection.length) {
                console.log(`Collection: \'${name}\' exists`);
                return false;
            }
            yield db.createCollection(name, (err, res) => {
                if (err) {
                    console.log(`Error with creating collection: ${err}`);
                    throw err;
                }
                console.log('\'States\' collection created');
            });
            return true;
        });
    }
}
exports.mongoDataBase = new MongoDataBase;
//# sourceMappingURL=db.js.map