/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

function formatDate(dateInput) {
  const d = new Date(dateInput);
  const year = d.getUTCFullYear();

  let day = `${d.getUTCDate()}`;
  let hour = `${d.getUTCHours()}`;
  let minutes = `${d.getUTCMinutes()}`;
  let month = `${d.getUTCMonth() + 1}`;
  let seconds = `${d.getUTCSeconds()}`;

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  if (hour.length < 2) {
    hour = `0${hour}`;
  }

  if (minutes.length < 2) {
    minutes = `0${minutes}`;
  }

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (seconds.length < 2) {
    seconds = `0${seconds}`;
  }

  const date = [year, month, day].join('-');
  const time = [hour, minutes, seconds].join(':');

  return [date, time].join(' ');
}

function getCurrentUtcTimestamp() {
  return formatDate(Date.now());
}

export { getCurrentUtcTimestamp };
