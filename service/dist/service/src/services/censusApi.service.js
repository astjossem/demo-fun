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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rp = __importStar(require("request-promise-native"));
const config_json_1 = __importDefault(require("../../../config.json"));
const regionType_1 = require("../../../datamodel/regionType");
const electionData_service_1 = require("./electionData.service");
class CensusApiService {
    getStatePop() {
        return __awaiter(this, void 0, void 0, function* () {
            const states = [];
            const result = (yield this.getPop(config_json_1.default.baseUri, [config_json_1.default.currentQuery], config_json_1.default.key))[0];
            const priorPop = yield this.getPop(config_json_1.default.baseUri, config_json_1.default.queries, config_json_1.default.key);
            result.map((state) => {
                if (state[0] !== 'GEONAME' && state[2] !== '72') {
                    const election = electionData_service_1.electionDataService.stateResults(state[0]);
                    const oldPop = [];
                    for (const year of priorPop) {
                        const oldState = this.findState(state[2], year);
                        if (oldState) {
                            oldPop.push(oldState[0]);
                        }
                    }
                    states.push({
                        fips: state[2],
                        name: state[0],
                        type: regionType_1.RegionType.state,
                        popCurrent: state[1],
                        oldPop,
                        election
                    });
                }
            });
            return states;
        });
    }
    getPop(baseUri, query, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const pop = [];
            for (const q of query) {
                pop.push(JSON.parse((yield rp.get(baseUri + q + key, { resolveWithFullResponse: true })).body));
            }
            return pop;
        });
    }
    findState(fips, popArray) {
        return popArray.find((ele) => {
            return ele[1] === fips;
        });
    }
}
exports.censusApiService = new CensusApiService;
//# sourceMappingURL=censusApi.service.js.map