/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

let db;

/**
 * @return {Promise<IDBDatabase>}
 */
function openDB() {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
    } else {
      const req = indexedDB.open('logs', 1);
      req.onsuccess = () => {
        resolve((db = req.result));
      };
      req.onerror = () => reject(req.error);
      req.onupgradeneeded = () => {
        //   objectStoreNames;
        req.result.createObjectStore('recurring', { keyPath: 'key', autoIncrement: true });
        req.result.createObjectStore('unique');
      };
    }
  });
}

/**
 *
 * @param {*} key
 * @param {*} value
 * @return {Promise<void>}
 */
export async function addUniqueLogToIndexedDB(key, value) {
  db = await openDB().catch((error) => {
    if (process.env.NODE_ENV !== 'production') {
      // The reason to disable console rule here is, because this error is to show developer problem
      // with the code.
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
  return new Promise((resolve, reject) => {
    const txn = db.transaction('unique', 'readwrite');
    txn.onabort = () => reject(txn.error);
    txn.oncomplete = () => resolve(value);
    txn.objectStore('unique').put(value, key);
  });
}

/**
 *
 * @param {*} value
 * @return {Promise<void>}
 */
export async function addRecurringLogToIndexedDB(value) {
  db = await openDB().catch((error) => {
    if (process.env.NODE_ENV !== 'production') {
      // The reason to disable console rule here is, because this error is to show developer problem
      // with the code.
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
  return new Promise((resolve, reject) => {
    const txn = db.transaction('recurring', 'readwrite');
    txn.onabort = () => reject(txn.error);
    txn.oncomplete = () => resolve(value);
    txn.objectStore('recurring').add(value);
  });
}

/**
 * @param {string} key
 * @return {Promise<any>}
 */
export async function deleteRecurringLogs(lastLogKey) {
  db = await openDB();
  return new Promise((resolve, reject) => {
    const txn = db.transaction('recurring', 'readwrite');
    const req = txn.objectStore('recurring').delete(IDBKeyRange.upperBound(lastLogKey));
    txn.onabort = () => reject(txn.error);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.result);
  });
}

/**
 * @param {string} key
 * @return {Promise<any>}
 */
export async function getRecurringLogs() {
  db = await openDB();
  return new Promise((resolve, reject) => {
    const txn = db.transaction('recurring', 'readonly');
    const req = txn.objectStore('recurring').getAll();

    txn.onabort = () => reject(txn.error);
    req.onsuccess = () => resolve(req.result);
  });
}

/**
 * @param {string} key
 * @return {Promise<any>}
 */
export async function getUniqueLog(key) {
  db = await openDB();
  return new Promise((resolve, reject) => {
    const txn = db.transaction('unique', 'readonly');
    const req = txn.objectStore('unique').get(key);
    txn.onabort = () => reject(txn.error);
    req.onsuccess = () => resolve(req.result);
  });
}
