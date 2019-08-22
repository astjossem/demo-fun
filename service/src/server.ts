import express from 'express';
import { ResponseCodes } from '../../datamodel/responseCodes';
import cors from 'cors';
import { censusApiService } from './services/censusApi';

const app = express();
app.use(cors()); 
const port = 8000; // default port to listen

app.get( "/messages", (req, res) => {
    res.status(ResponseCodes.Ok).json( 'Hello world!' );
});

app.post( "/messages", (req, res) => {
    const message = req.body;
    res.status(ResponseCodes.Ok).json( 'Roger!' );
});

app.get('/states', async (req, res) => {
    try {
        const data = (await censusApiService.getStatePop());
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
