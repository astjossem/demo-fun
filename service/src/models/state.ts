import * as mongoose from 'mongoose';

const StateSchema = new mongoose.Schema({
    fips: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
});

module.exports = mongoose.model('State', StateSchema);