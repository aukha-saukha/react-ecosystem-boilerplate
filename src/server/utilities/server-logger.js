// @flow strict

import { basename, resolve } from 'path';
import { addColors, createLogger, format, transports } from 'winston';

import { SERVER_LOG_ENABLED_IDS } from '../../data/constants/logs';
import date from '../../shared/utilities/date';

import type { LogIdType, LogLevelType, LogMessageType, LogSourceType } from './server-logger.type';

const { colorize, combine, label, prettyPrint, timestamp } = format;

// Logs directory
const logsDirectory = resolve(__dirname, '../../../../logs');

// Log levels
const logLevels = {
  colors: {
    debug: 'blue',
    error: 'red',
    info: 'green',
    warning: 'yellow',
  },
  names: {
    debug: 0,
    error: 1,
    info: 2,
    warning: 3,
  },
};

// Add colors for the custom levels
addColors(logLevels.colors);

// - This timestamp in console transport is not in UTC, but in the developer's time zone. The
//   timestamps in other transport logs are in UTC, but console logs are useful for developers
//   during debugging so making it use the developer's timezone.
// - Please don't change the format options sequence in combine.
// - Unfortunately, a helper function that creates a logger based on log level (to reduce duplicate
//   code) results in various issues, especially logs entries in multiple files. It's not ideal, but
//   having different createLogger is the way to go.

// Client debug logger
const clientDebugLogger = createLogger({
  level: 'debug',
  levels: logLevels.names,
  transports: [
    new transports.Console({
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
    }),

    new transports.File({
      filename: `${logsDirectory}/client/debug.log`,
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: date.getCurrentUtcTimestamp(),
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

// Client error logger
const clientErrorLogger = createLogger({
  level: 'error',
  levels: logLevels.names,
  transports: [
    new transports.Console({
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
    }),

    new transports.File({
      filename: `${logsDirectory}/client/error.log`,
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: date.getCurrentUtcTimestamp(),
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

// Client info logger
const clientInfoLogger = createLogger({
  level: 'info',
  levels: logLevels.names,
  transports: [
    new transports.Console({
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
    }),

    new transports.File({
      filename: `${logsDirectory}/client/info.log`,
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: date.getCurrentUtcTimestamp(),
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

// Client warning logger
const clientWarningLogger = createLogger({
  level: 'warning',
  levels: logLevels.names,
  transports: [
    new transports.Console({
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
    }),

    new transports.File({
      filename: `${logsDirectory}/client/warning.log`,
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: date.getCurrentUtcTimestamp(),
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

// Server debug logger
const serverDebugLogger = createLogger({
  level: 'debug',
  levels: logLevels.names,
  transports: [
    new transports.Console({
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
    }),

    new transports.File({
      filename: `${logsDirectory}/server/debug.log`,
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: date.getCurrentUtcTimestamp(),
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

// Server error logger
const serverErrorLogger = createLogger({
  level: 'error',
  levels: logLevels.names,
  transports: [
    new transports.Console({
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
    }),

    new transports.File({
      filename: `${logsDirectory}/server/error.log`,
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: date.getCurrentUtcTimestamp(),
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

serverErrorLogger.exceptions.handle(
  new transports.File({ filename: `${logsDirectory}/server/exceptions.log` })
);

// Server info logger
const serverInfoLogger = createLogger({
  level: 'info',
  levels: logLevels.names,
  transports: [
    new transports.Console({
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
    }),

    new transports.File({
      filename: `${logsDirectory}/server/info.log`,
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: date.getCurrentUtcTimestamp(),
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

// Server warning logger
const serverWarningLogger = createLogger({
  level: 'warning',
  levels: logLevels.names,
  transports: [
    new transports.Console({
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
    }),

    new transports.File({
      filename: `${logsDirectory}/server/warning.log`,
      format: combine(
        label({ label: basename(process.mainModule.filename) }),
        timestamp({
          format: date.getCurrentUtcTimestamp(),
        }),
        prettyPrint(),
        colorize({ all: true })
      ),
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

function logger(logLevel: LogLevelType, logMessage: LogMessageType, logSource: LogSourceType) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof logLevel !== 'string') {
      // The reason to disable console rule here is, because this error is to show developer problem
      // with the code.
      // eslint-disable-next-line no-console
      console.error('The logLevel field is required. It should be a string.');
    }

    if (Object.prototype.toString.call(logMessage) !== '[object Object]') {
      // The reason to disable console rule here is, because this error is to show developer problem
      // with the code.
      // eslint-disable-next-line no-console
      console.error('The logMessage field should be an object.');
    }

    if (typeof logMessage['li'] !== 'string') {
      // The reason to disable console rule here is, because this error is to show developer problem
      // with the code.
      // eslint-disable-next-line no-console
      console.error(
        'The logId field is required. It should be the first argument, and should be a string.'
      );
    }

    if (logSource === 'client' && typeof logMessage.ts === 'undefined') {
      // The reason to disable console rule here is, because this error is to show developer problem
      // with the code.
      // eslint-disable-next-line no-console
      console.error('Timestamp should be present in the client side logMessage object.');
    }

    if (typeof logSource !== 'string') {
      // The reason to disable console rule here is, because this error is to show developer problem
      // with the code.
      // eslint-disable-next-line no-console
      console.error('The logSource field is missing.');
    }
  }

  const logId: LogIdType = logMessage['li'];

  if (logSource === 'client') {
    switch (logLevel) {
      case 'debug':
        clientDebugLogger.log(logLevel, logMessage);

        break;

      case 'error':
        clientErrorLogger.log(logLevel, logMessage);
        break;

      case 'info':
        clientInfoLogger.log(logLevel, logMessage);
        break;

      case 'warning':
        clientWarningLogger.log(logLevel, logMessage);
        break;

      default:
        if (process.env.NODE_ENV !== 'production') {
          // The reason to disable `no-console` rule here is, because this error is to show developer
          // problem with the code.
          // eslint-disable-next-line no-console
          console.error('The logLevel value should be debug, error, info or warning.');
        }

        break;
    }

    // For server side logger, we'll show/save the log if value of enabled log id is either "all" or
    // equal to the provided logId. This way, we can limit logs anytime, which can be super helpful
    // during development/debugging.
  } else if (
    logSource === 'server' &&
    (SERVER_LOG_ENABLED_IDS[logLevel] === 'all' || SERVER_LOG_ENABLED_IDS[logLevel].includes(logId))
  ) {
    switch (logLevel) {
      case 'debug':
        serverDebugLogger.log(logLevel, logMessage);

        break;

      case 'error':
        serverErrorLogger.log(logLevel, logMessage);
        break;

      case 'info':
        serverInfoLogger.log(logLevel, logMessage);
        break;

      case 'warning':
        serverWarningLogger.log(logLevel, logMessage);
        break;

      default:
        if (process.env.NODE_ENV !== 'production') {
          // The reason to disable `no-console` rule here is, because this error is to show developer
          // problem with the code.
          // eslint-disable-next-line no-console
          console.error('The logLevel value should be debug, error, info or warning.');
        }

        break;
    }
  }
}

// The reason to disable 'import/prefer-default-export' because we're moving away from default
// export. We want to have named imports.
// eslint-disable-next-line import/prefer-default-export
export { logger };
