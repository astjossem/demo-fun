import express from 'express';
import { ResponseCodes } from '../../datamodel/responseCodes';
import cors from 'cors';

const app = express();
app.use(cors()); 
const port = 8000; // default port to listen

app.get( "/messages", (req, res) => {
    res.status(ResponseCodes.Ok).json( 'Hello world!' );
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at localhost:${ port }` );
} );
