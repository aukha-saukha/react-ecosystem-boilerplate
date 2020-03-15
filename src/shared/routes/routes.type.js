/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import { LoadableComponent } from '@loadable/component';
import * as React from 'react';

export type RouteConfigType = {|
  component: LoadableComponent<React.ComponentType<>>,
  exact: boolean,
  path: string,
|};

export type RouteSchemaType = {|
  componentName: string,
  componentPath: string,
  isExact: boolean,
  pathToMatch: string,
|};
