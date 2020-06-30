const fs = require('fs');

const logger = require('./lib/logger');

const regionIds = [];

logger.info(`Генерю 2000 regionId`);
for (let regionId = 1; regionId <= 2000; regionId++) {
    regionIds.push(regionId);
}

fs.writeFileSync('regions.json', JSON.stringify(regionIds, null, 4));
logger.info(`Результат смотри в файле regions.json`);
