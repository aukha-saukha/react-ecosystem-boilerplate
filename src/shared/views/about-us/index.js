/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

import { AboutUs } from './about-us.react';

// The reason to disable import/no-default-export rule here is because @loadable/component doesn't
// support named exports right now. However, it should soon do.
// https://github.com/gregberge/loadable-components/pull/483
// eslint-disable-next-line import/no-default-export
export default AboutUs;
