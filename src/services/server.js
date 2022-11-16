import express from "express";
import mainRouter from "../routes/routesIndex.js";
import http from 'http';

const app = express();

app.use('/api', mainRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (err, req, res, next) {
    return res.status('500').json({
        msg: 'Error',
        error: err.message,
    });
});

const httpServer = http.Server(app);

export default httpServer;
