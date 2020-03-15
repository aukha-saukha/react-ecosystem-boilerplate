/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import { CLIENT_LOGGER, LOG_LEVEL } from '@constants/logs';

import type { ClientUniqueLogMessageType } from '@views/app/app.type';

import {
  addUniqueLogToIndexedDB,
  addRecurringLogToIndexedDB,
  deleteRecurringLogs,
  getUniqueLog,
  getRecurringLogs,
} from './client-logger-store';
import { getProfileDataFromUserStore } from './user-store';

import type { ClientRecurringLogMessageType, PageErrorLogMessageType } from './client-logger.type';

async function sendLogsToTheServer(currentRecurringLogCountPlusOne) {
  // If node environment is 'dev server', then don't send anything.
  if (process.env.NODE_ENV === 'devServer') {
    return;
  }

  // Get the recurring logs
  const recurringLogs = await getRecurringLogs(CLIENT_LOGGER['batchSize']);

  // Get current user's (unique) "user id"
  const uid = await getProfileDataFromUserStore('uid');

  // Add current user's (unique) "user id" to each recurringLogs
  recurringLogs.forEach((logItem) => {
    // This reason to disable no-param-reassign is because we intentionally want to edit the
    // parameter i.e. add a new key "uid". We're adding user's unique identifer here, which is
    // slightly better than fetching it every time while writing log to the store.
    // eslint-disable-next-line no-param-reassign
    logItem['uid'] = uid;
  });

  // Logs to send
  const otherLogsToSend = [];

  // If log number #1 is part of this batch, then we should send unique logs that we captured when
  // the user landed for the first time.
  if (recurringLogs[0]['key'] === 1) {
    const userInfoLogs = await getUniqueLog('ui');
    userInfoLogs['uid'] = uid;
    otherLogsToSend.push(userInfoLogs);
  }

  // The reason to disable `no-underscore-dangle` rule here because we want to intentionally use a
  // different name for global variable (something we don't use usually).
  // eslint-disable-next-line no-underscore-dangle
  const pageErrorsArray = (window.__error && window.__error.a) || [];

  if (pageErrorsArray.length > 0) {
    pageErrorsArray.forEach((errorEntry) => {
      const pageError: PageErrorLogMessageType = {
        em: errorEntry.e.error.message,
        en: errorEntry.e.message,
        es: errorEntry.e.error.stack,
        li: 'pe',
        ll: LOG_LEVEL['error'],
        uid,
        ts: errorEntry.d,
      };
      otherLogsToSend.push(pageError);
    });
  }

  fetch(CLIENT_LOGGER.url, {
    body: JSON.stringify({
      // Client logs array
      cla: [...otherLogsToSend, ...recurringLogs],
    }),
    headers: {
      'Content-type': 'application/json',
    },
    method: 'post',
  })
    .then(async (response) => {
      if (response.status === 200) {
        // Remove the logs from indexedDB once they're successfully sent.
        const lastLog = recurringLogs[recurringLogs.length - 1];
        await deleteRecurringLogs(lastLog.key);

        // We're reusing the recurringLogCount from the previous transaction which could be stale,
        // (slight possibility), but that's okay, because the saved log will still go. Maybe, a bit
        // later. This way, we can save an additional query.
        let updatedRecurringLogCount;
        if (CLIENT_LOGGER['batchSize'] <= currentRecurringLogCountPlusOne) {
          updatedRecurringLogCount = currentRecurringLogCountPlusOne - CLIENT_LOGGER['batchSize'];
        } else {
          updatedRecurringLogCount = 0;
        }

        await addUniqueLogToIndexedDB('rlc', updatedRecurringLogCount);
      }
    })
    .catch((error) => {
      if (process.env.NODE_ENV !== 'production') {
        // The reason to disable console rule here is, because this error is to show developer problem
        // with the code.
        // eslint-disable-next-line no-console
        console.error(error);
      }
    });
}

async function addRecurringLog(logItem: ClientRecurringLogMessageType) {
  await addRecurringLogToIndexedDB(logItem);

  // Current recurring log count
  let currentRecurringLogCount = await getUniqueLog('rlc');

  // The value of currentRecurringLogCount can be undefined if the promise that sets its initial
  // value doesn't return in time.
  currentRecurringLogCount =
    typeof currentRecurringLogCount === 'undefined' ? 0 : currentRecurringLogCount;

  // Increase recurring log count by 1.
  await addUniqueLogToIndexedDB('rlc', currentRecurringLogCount + 1);

  // Using `currentRecurringLogCount + 1` in the condition because we want to add the current log
  // sent the count we received from the indexedDB store.
  if (CLIENT_LOGGER['batchSize'] <= currentRecurringLogCount + 1) {
    await sendLogsToTheServer(currentRecurringLogCount + 1)
      .then()
      .catch((error) => {
        if (process.env.NODE_ENV !== 'production') {
          // The reason to disable console rule here is, because this error is to show developer problem
          // with the code.
          // eslint-disable-next-line no-console
          console.error(error);
        }
      });
  }
}

async function addUniqueLog(uniqueLogs: ClientUniqueLogMessageType) {
  // Save "user info" into unique logs store
  await addUniqueLogToIndexedDB('ui', uniqueLogs);

  // Get the current recurring log count.
  const currentRecurringLogCount = await getUniqueLog('rlc');

  // If current recurring log count is undefined, then user came to the app for the firs time.
  // Set the value to 0.
  if (typeof currentRecurringLogCount === 'undefined') {
    // Set initial value of recurring log count to 0.
    await addUniqueLogToIndexedDB('rlc', 0);
  }
}

export { addUniqueLog, addRecurringLog };
