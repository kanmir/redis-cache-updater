const updateAll = require('../tasks/updateAllRegions');

module.exports = (req, res) => {
    req.log.info(req, 'GET /update/all/');

    updateAll(req);

    res.send({
        status: 'ok',
        message: 'Task updateAllRegions started',
    });
}
