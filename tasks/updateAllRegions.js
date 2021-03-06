const axios = require('axios');

const redis = require('../lib/Redis');
const logger = require('../lib/logger');
const regionIds = require('../regions.json');

const apiUrl = 'https://postman-echo.com/get';
const waitFor = ms => new Promise(r => setTimeout(r, ms));

async function updateAllRegions() {
    for (let regionId of regionIds) {
        logger.info(`GET response for regionId:${regionId}`);
        const response = await axios.get(apiUrl, {
            params: { regionId },
        });

        logger.info(response.data, `REDIS set ${regionId}`);
        // пишем ответ api в кеш (в данном случае я не указываю время жизни кеша, чтобы он никогда не инвалидировался автоматически)
        redis.set(regionId, JSON.stringify(response.data));
        // пишем regionId и unixTime в очередь для обновления
        const unixTime = Date.now();
        logger.info(`REDIS lpush ${regionId}:${unixTime}`);
        redis.lpush('updateList', `${regionId}:${unixTime}`);

        // осталось запустить воркеры, которые будут выполнять BRPOP - блокирующая версия RPOP,
        // которая гарантируюет получение сообщения только 1 воркером (независимо от их количества),
        // или же можно использовать BRPOPLPUSH

        // чтобы не досить postman-echo.com, делаем запрос не чаще чем раз в секунду
        await waitFor(1000);
    }
}

module.exports = updateAllRegions;