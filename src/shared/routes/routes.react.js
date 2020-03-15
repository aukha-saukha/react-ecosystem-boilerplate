/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import loadable from '@loadable/component';
import React from 'react';

import { Loading } from '@views/loading';

import { ROUTES } from './routes.schema';

import type { RouteConfigType, RouteSchemaType } from './routes.type';

const routes: RouteConfigType[] = [];

ROUTES.forEach((route: RouteSchemaType) => {
  const { componentName, isExact, pathToMatch } = route;

  routes.push({
    component: loadable(() => import(`@views/${componentName}/index`), {
      fallback: <Loading />,
    }),
    exact: isExact,
    path: pathToMatch,
  });
});

export { routes };
