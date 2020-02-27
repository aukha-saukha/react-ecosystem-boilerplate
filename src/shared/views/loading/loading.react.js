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

export default Loading;
