const pino = require('pino');

const options = {
    prettyPrint: { colorize: true },
    messageKey: '_message',
    timestamp: () => `,"_time":"${new Date().toISOString()}"`,
    base: null,
    formatters: {
        level: label => {
            return { _level: label.toUpperCase() };
        }
    }
};

const logger = pino(options);

module.exports = logger;