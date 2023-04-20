import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(
  (info) => `${info.timestamp} ${info.level}: ${info.message}`,
);

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.splat(),
    format.simple(),
    customFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;
