import bodyParser from "body-parser";
import express from 'express';
import lusca from "lusca";
import { userController } from './user/';

const app = express();
const port = process.env.PORT || 8005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(lusca.xssProtection(true));
app.use(lusca.nosniff());

app.use('/users', userController);

export default app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
    console.log("  Press CTRL-C to stop\n");
});
