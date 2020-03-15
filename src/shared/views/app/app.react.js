/**
 * Copyright (c) 2020-present Aukha Saukha Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow strict

// Please keep react-hot-loader import before React (recommended by react-hot-loader team).
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import '@static/css/base.scss';

import { LanguageProvider } from '@hooks/language';

import { ErrorBoundary } from '@views/error-boundary';
import { Footer } from '@views/footer';
import { Header } from '@views/header';
import { NotFound } from '@views/not-found';

import { addRecurringLog, addUniqueLog } from '@client-utilities/client-logger';
import {
  addProfileDataToUserStore,
  getProfileDataFromUserStore,
} from '@client-utilities/user-store';
import { LOG_LEVEL } from '@constants/logs';
import { getCurrentUtcTimestamp } from '@shared-utilities/date';
import { routes } from '@routes';

import appStyles from './app.scss';

import type {
  ClientUniqueLogMessageType,
  ReactRouterInvalidPathLogMessageType,
  ReactRouterPathLogMessageType,
} from './app.type';

const App = () => {
  const location = useLocation();
  const pathName = location.pathname;

  React.useEffect(() => {
    async function setInitialUniqueLog() {
      // Set unique id for the user
      const uid = await getProfileDataFromUserStore('uid');
      if (typeof uid === 'undefined') {
        await addProfileDataToUserStore('uid', uuidv4());
      }

      // Unique logs
      const ul: ClientUniqueLogMessageType = {
        di: {
          // The reason to disable `eslint-disable-next-line` here is because we want to use global
          // screen variable to capture user's device info.
          // eslint-disable-next-line no-restricted-globals
          sd: `${screen.colorDepth}-bit`,

          // The reason to disable `eslint-disable-next-line` here is because we want to use global
          // screen variable to capture user's device info.
          // eslint-disable-next-line no-restricted-globals
          sr: `${screen.width}x${screen.height}`,

          // The reason to disable `eslint-disable-next-line` here is because we want to use global
          // screen variable to capture user's device info.
          // The reason to disable flow here is because flow-lib's Screen class doesn't seem to have
          // innerWidth and innerHeight properties.
          // flow-disable-line
          vp: `${innerWidth}x${innerHeight}`, // eslint-disable-line no-restricted-globals
        },
        li: 'ul',
        ll: LOG_LEVEL['info'],
        // This will also get us the info when the user landed on the app. Based on the timestamps
        // in "ReactRouterPathType" we should be able to determine how long the user session was.
        ts: getCurrentUtcTimestamp(),
        ui: {
          // The reason to disable flow here is because flow-lib's Navigator class doesn't seem to
          // have connection property.
          // flow-disable-line
          ct: navigator.connection.effectiveType,
          ul: navigator.language.toLowerCase(),
        },
      };

      await addUniqueLog(ul);
    }

    setInitialUniqueLog();
  }, []);

  React.useEffect(() => {
    async function logRoutes() {
      const checkIfPathIsValid = (route) => {
        if (route.exact === true && route.path === pathName) {
          return true;
        }

        if ((route.exact === false || route.exact === 'undefined') && route.path === pathName) {
          return true;
        }

        return false;
      };

      const isPathValid = routes.some(checkIfPathIsValid);

      if (isPathValid) {
        addRecurringLog(
          ({
            li: 'rrp',
            ll: LOG_LEVEL['info'],
            pv: pathName,
            ts: getCurrentUtcTimestamp(),
          }: ReactRouterPathLogMessageType)
        );
      } else {
        addRecurringLog(
          ({
            ec: 404,
            li: 'rrip',
            ll: LOG_LEVEL['error'],
            pv: pathName,
            ts: getCurrentUtcTimestamp(),
          }: ReactRouterInvalidPathLogMessageType)
        );
      }
    }

    logRoutes();
  }, [pathName]);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <LanguageProvider>
          <div className={appStyles['wrapper']}>
            <Header />
            <div className={`padding-all-15 ${appStyles['page-specific-content']}`}>
              <Switch>
                {routes.map(({ path, exact, component: C, ...rest }) => (
                  <Route
                    exact={exact}
                    key={path}
                    path={path}
                    // The reason to disable jsx-props-no-spreading rule here is, because we don't know
                    // beforehand what props we are going to have.
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    render={(props) => <C {...props} {...rest} />}
                  />
                ))}
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </LanguageProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// flow-disable-line
const appToExport = module.hot ? hot(App) : App;

export { appToExport };
