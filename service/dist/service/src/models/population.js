"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const PopulationSchema = new mongoose.Schema({
    fips: {
        type: Number,
        unique: true,
        required: true
    },
    year: {
        type: Number,
        unique: false,
        required: true
    },
    Population: {
        type: Number,
        unique: false,
        required: true
    },
});
module.exports = mongoose.model('Population', PopulationSchema);
//# sourceMappingURL=population.js.map