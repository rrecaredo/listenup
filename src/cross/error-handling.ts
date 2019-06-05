import { Express } from "express";

export const useErrorMiddleware = (app: Express) => {
    app.use((err, req, res, next) => {
        console.error(err.message);
        if (err.response && err.response.status)
            res.status(err.response.status).send(err.message);
        else if (!err.statusCode)
            err.statusCode = 500;
        else
            res.status(err.statusCode).send(err.message);
    });
};
