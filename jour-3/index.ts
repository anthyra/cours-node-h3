import express from 'express';
import bodyParser, {urlencoded} from 'body-parser';
import multer from 'multer';
import cookieParser from 'cookie-parser';

import { Iusers, Role } from './Model/Iusers';
import Routes from './Routes/index';

const port = 3000;
const host = 'localhost';
const app = express();

/*
    On indique qu'on veut récupérer du json
 */
app.use(urlencoded())
app.use(express.json());



app.use('/', Routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');

});