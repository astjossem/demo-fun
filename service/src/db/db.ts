import * as MongoClient from 'mongodb';
import { censusApiService } from '../services/censusApi.service';

class MongoDataBase {
    //Set up default mongoose connection
    private url = 'mongodb://127.0.0.1/db';
    private options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    public async initialize(): Promise<void> {
        MongoClient.connect(this.url, this.options, async (err, client) => {
            if (err) {
                console.log(`Error with connecting to DB: ${err}`);
                return;
            }
            const db = await client.db('db');
            const created = await this.createCollection(db, 'States');
            if (created) {
                const states = await censusApiService.getStatePop();
                await db.collection('States').insertMany(states);
            }
        });
    }

    public async getAllStates(): Promise<any> {
        let result: any = [];
        const client = await MongoClient.connect(this.url, this.options);
        const db = client.db('db');
        result = await db.collection('States').find({}, { projection: {'_id': 0 } }).toArray();
        return result;
    }

    private async createCollection(db: MongoClient.Db, name: string): Promise<boolean> {
        const collection = await db.listCollections( (col: MongoClient.Collection) => {
            col.collectionName === name;
        }, { nameOnly: true }).toArray();
        if (collection.length) {
            console.log(`Collection: \'${name}\' exists`);
            return false;
        } 
        await db.createCollection(name, (err, res) => {
            if (err) {
                console.log(`Error with creating collection: ${err}`);
                throw err;
            }
            console.log('\'States\' collection created');
        });
        return true;
    }

}

export const  mongoDataBase = new MongoDataBase;