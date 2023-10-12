import log4js from 'log4js';
const logs = log4js.configure({
    appenders: {
        multi: {
            type: "multiFile",
            base: "logs/",
            property: "level",
            extension: ".log",
        }
    },
    categories: {
        default: {
            appenders: ['multi'], level: 'all'
        }
    }
})
export default logs;