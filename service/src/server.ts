import express from 'express';
import { ResponseCodes } from '../../datamodel/responseCodes';

const app = express();
const port = 8000; // default port to listen

// define a route handler for the default home page
app.get( "/messages", (req, res) => {
    return res.status(ResponseCodes.Ok).json( 'Hello world!' );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at https://localhost:${ port }` );
} );