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
      const req = indexedDB.open('user', 1);
      req.onerror = () => reject(req.error);
      req.onsuccess = () => {
        resolve((db = req.result));
      };
      req.onupgradeneeded = () => {
        req.result.createObjectStore('profile');
        req.result.createObjectStore('settings');
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
export async function addProfileDataToUserStore(key, value) {
  db = await openDB().catch((error) => {
    if (process.env.NODE_ENV !== 'production') {
      // The reason to disable console rule here is, because this error is to show developer problem
      // with the code.
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
  return new Promise((resolve, reject) => {
    const txn = db.transaction('profile', 'readwrite');
    txn.onabort = () => reject(txn.error);
    txn.objectStore('profile').add(value, key);
    txn.oncomplete = () => resolve(value);
  });
}

/**
 *
 * @param {*} key
 * @param {*} value
 * @return {Promise<void>}
 */
export async function addSettingToUserStore(key, value) {
  db = await openDB().catch((error) => {
    if (process.env.NODE_ENV !== 'production') {
      // The reason to disable console rule here is, because this error is to show developer problem
      // with the code.
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
  return new Promise((resolve, reject) => {
    const txn = db.transaction('settings', 'readwrite');
    txn.onabort = () => reject(txn.error);
    txn.objectStore('settings').add(value, key);
    txn.oncomplete = () => resolve(value);
  });
}

/**
 * @param {string} key
 * @return {Promise<any>}
 */
export async function deleteSettingFromUserStore(settingName) {
  db = await openDB();
  return new Promise((resolve, reject) => {
    const txn = db.transaction('settings', 'readwrite');
    const req = txn.objectStore('settings').delete(settingName);
    txn.onabort = () => reject(txn.error);
    req.onerror = () => reject(req.result);
    req.onsuccess = () => resolve(req.result);
  });
}

/**
 * @param {string} key
 * @return {Promise<any>}
 */
export async function getProfileDataFromUserStore(key) {
  db = await openDB();
  return new Promise((resolve, reject) => {
    const txn = db.transaction('profile', 'readonly');
    const req = txn.objectStore('profile').get(key);
    txn.onabort = () => reject(txn.error);
    req.onerror = () => reject(req.result);
    req.onsuccess = () => resolve(req.result);
  });
}

/**
 * @param {string} key
 * @return {Promise<any>}
 */
export async function getSettingFromUserStore(settingName) {
  db = await openDB();
  return new Promise((resolve, reject) => {
    const txn = db.transaction('settings', 'readonly');
    const req = txn.objectStore('settings').get(settingName);
    txn.onabort = () => reject(txn.error);
    req.onerror = () => reject(req.result);
    req.onsuccess = () => resolve(req.result);
  });
}

/**
 *
 * @param {*} key
 * @param {*} value
 * @return {Promise<void>}
 */
export async function updateSettingToUserStore(key, value) {
  db = await openDB().catch((error) => {
    if (process.env.NODE_ENV !== 'production') {
      // The reason to disable console rule here is, because this error is to show developer problem
      // with the code.
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });
  return new Promise((resolve, reject) => {
    const txn = db.transaction('settings', 'readwrite');
    txn.onabort = () => reject(txn.error);
    txn.objectStore('settings').put(value, key);
    txn.oncomplete = () => resolve(value);
  });
}
