import * as mongoose from 'mongoose';
import * as FKHelper from './helpers/foreign-key-helper';

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