import bodyParser from 'body-parser';
import express from 'express';
import lusca from 'lusca';
var morgan = require('morgan')
import { userController } from './user/';
import { useErrorMiddleware } from './cross/error-handling';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8005;

app.use(morgan('common'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(lusca.xssProtection(true));
app.use(lusca.nosniff());

app.use('/users', userController);

useErrorMiddleware(app);

export default app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
