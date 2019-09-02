"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statePresidential_json_1 = __importDefault(require("../../../data/statePresidential.json"));
class ElectionDataService {
    stateResults(name) {
        const years = [];
        const fips = this.nameToFips(name);
        years.push(this.electionResults(2016, fips));
        years.push(this.electionResults(2012, fips));
        years.push(this.electionResults(2008, fips));
        return years;
    }
    electionResults(year, fips) {
        const dem = statePresidential_json_1.default.find((item) => {
            return item.year === year && item.party === 'democrat' && item.state_fips === fips;
        });
        const rep = statePresidential_json_1.default.find((item) => {
            return item.year === year && item.party === 'republican' && item.state_fips === fips;
        });
        return ((rep.candidatevotes * 100 / rep.totalvotes) - (dem.candidatevotes * 100 / dem.totalvotes)).toFixed(1);
    }
    nameToFips(name) {
        const fips = statePresidential_json_1.default.find((item) => {
            return item.state === name;
        });
        return fips.state_fips;
    }
}
exports.electionDataService = new ElectionDataService();
//# sourceMappingURL=electionData.service.js.map