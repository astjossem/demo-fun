import express from 'express';
import { ResponseCodes } from '../../datamodel/responseCodes';
import cors from 'cors';
import { mongoDataBase } from './db/db';

const app = express();
app.use(cors()); 
const port = 8000; // default port to listen
mongoDataBase.initialize();

app.get('/states', async (req, res) => {
    try {
        const data = await mongoDataBase.getAllStates();
        if (data) {
            res.status(ResponseCodes.Ok).json(data);
        } else {
            res.status(ResponseCodes.NoContent);
        }
    } catch (err) {
        console.log(`Error on /states: ${err}`);
        res.status(ResponseCodes.ServerError);
    }
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at localhost:${ port }` );
} );
