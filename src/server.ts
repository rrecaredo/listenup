import bodyParser from "body-parser";
import express from 'express';
import lusca from "lusca";
import { userController } from './user/';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(lusca.xssProtection(true));
app.use(lusca.nosniff());

app.use('/users', userController);

export default app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
