/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import { basename, resolve } from 'path';
import { addColors, createLogger, format, transports } from 'winston';

import { SERVER_LOG_ENABLED_IDS } from '@constants/logs';
import { getCurrentUtcTimestamp } from '@shared-utilities/date';

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

// - This timestamp in console transports are not in UTC, but in the developer's time zone. Since
//   console logs are useful for developers during debugging so making it use the developer's
//   timezone.
// - Please don't change the format options sequence in combine.
const consoleTransportBaseObject = {
  format: combine(
    label({ label: basename(process.mainModule.filename) }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    prettyPrint(),
    colorize({ all: true })
  ),
};

// - The timestamps in file transport logs are in UTC.
// - Please don't change the format options sequence in combine.
const fileTransportBaseObject = {
  format: combine(
    label({ label: basename(process.mainModule.filename) }),
    timestamp({
      format: getCurrentUtcTimestamp(),
    }),
    prettyPrint(),
    colorize({ all: true })
  ),
  maxsize: 5242880,
  maxFiles: 10,
};

// Add colors for the custom levels
addColors(logLevels.colors);

// Unfortunately, a helper function that creates a logger based on log level (to reduce duplicate
// code) results in various issues, especially logs entries in multiple files. It's not ideal, but
// having different createLogger is the way to go.

// Client debug logger
const clientDebugLogger = createLogger({
  level: 'debug',
  levels: logLevels.names,
  transports: [
    new transports.File({
      ...fileTransportBaseObject,
      filename: `${logsDirectory}/client/debug.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  clientDebugLogger.add(new transports.Console(consoleTransportBaseObject));
}

// Client error logger
const clientErrorLogger = createLogger({
  level: 'error',
  levels: logLevels.names,
  transports: [
    new transports.File({
      ...fileTransportBaseObject,
      filename: `${logsDirectory}/client/error.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  clientErrorLogger.add(new transports.Console(consoleTransportBaseObject));
}

// Client info logger
const clientInfoLogger = createLogger({
  level: 'info',
  levels: logLevels.names,
  transports: [
    new transports.File({
      ...fileTransportBaseObject,
      filename: `${logsDirectory}/client/info.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  clientInfoLogger.add(new transports.Console(consoleTransportBaseObject));
}

// Client warning logger
const clientWarningLogger = createLogger({
  level: 'warning',
  levels: logLevels.names,
  transports: [
    new transports.File({
      ...fileTransportBaseObject,
      filename: `${logsDirectory}/client/warning.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  clientWarningLogger.add(new transports.Console(consoleTransportBaseObject));
}

// Server debug logger
const serverDebugLogger = createLogger({
  level: 'debug',
  levels: logLevels.names,
  transports: [
    new transports.File({
      ...fileTransportBaseObject,
      filename: `${logsDirectory}/server/debug.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  serverDebugLogger.add(new transports.Console(consoleTransportBaseObject));
}

// Server error logger
const serverErrorLogger = createLogger({
  level: 'error',
  levels: logLevels.names,
  transports: [
    new transports.File({
      ...fileTransportBaseObject,
      filename: `${logsDirectory}/server/error.log`,
    }),
  ],
});

serverErrorLogger.exceptions.handle(
  new transports.File({ filename: `${logsDirectory}/server/exceptions.log` })
);

if (process.env.NODE_ENV !== 'production') {
  serverErrorLogger.add(new transports.Console(consoleTransportBaseObject));
}

// Server info logger
const serverInfoLogger = createLogger({
  level: 'info',
  levels: logLevels.names,
  transports: [
    new transports.File({
      ...fileTransportBaseObject,
      filename: `${logsDirectory}/server/info.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  serverInfoLogger.add(new transports.Console(consoleTransportBaseObject));
}

// Server warning logger
const serverWarningLogger = createLogger({
  level: 'warning',
  levels: logLevels.names,
  transports: [
    new transports.File({
      ...fileTransportBaseObject,
      filename: `${logsDirectory}/server/warning.log`,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  serverWarningLogger.add(new transports.Console(consoleTransportBaseObject));
}

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

export { logger };
