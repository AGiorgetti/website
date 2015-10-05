import * as environment from '../config/environment';
import * as winston from 'winston';
export class factory {
    static winston: winston.LoggerInstance;

    static configure() {
        if (environment.isDevEnvironment) {
            this.coloredConsole();
        }
        else {
            this.file();
        }
    }

    static logger(): winston.LoggerInstance {
        return factory.winston;
    }

    private static file() {
        factory.winston = new winston.Logger({
            transports: [
                new winston.transports.File({
                    level: 'info',
                    filename: './public/logs/all-logs.log',
                    handleExceptions: true,
                    json: true,
                    maxsize: 5242880, //5MB
                    maxFiles: 5,
                    colorize: false
                })
            ],
            exitOnError: false
        });
    }

    private static coloredConsole() {
        factory.winston = new winston.Logger({
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    handleExceptions: false,
                    json: false,
                    colorize: true
                }),

            ],
            exitOnError: false
        });
    }
}
