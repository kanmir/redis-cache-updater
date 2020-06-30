const express = require('express');
const { json } = require('body-parser');
const expressPino = require('express-pino-logger');

const logger = require('./lib/logger');
const updateAllRegions = require('./middlewares/updateAllRegions');

const app = express();

app.disable('x-powered-by');
app.use(expressPino({ logger }));
app.use(json());

app.get('/', (req, res) => {
    req.log.info(req, 'GET /');
    res.send({ status: 'ok' });
});

app.get('/update/all/', updateAllRegions);

app.listen(3000, () => {
    logger.info('Server listening on port 3000 🚀');
});