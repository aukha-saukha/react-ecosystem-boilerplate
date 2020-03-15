/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import * as React from 'react';

import loadingStyle from './loading.scss';

function Loading(): React.Element<'div'> {
  return (
    <div className={loadingStyle['loading']}>
      <div className={loadingStyle['rectangle']} />
      <div className={`${loadingStyle['rectangle']} ${loadingStyle['rectangle-2']}`} />
      <div className={`${loadingStyle['rectangle']} ${loadingStyle['rectangle-3']}`} />
      <div className={`${loadingStyle['rectangle']} ${loadingStyle['rectangle-4']}`} />
      <div className={`${loadingStyle['rectangle']} ${loadingStyle['rectangle-5']}`} />
    </div>
  );
}

export { Loading };
