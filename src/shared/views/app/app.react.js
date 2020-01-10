// Please keep react-hot-loader import before React (recommended by react-hot-loader team).
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import '../../../static/css/base.scss';
import appStyles from './app.scss';

import routes from '../../routes';

import Footer from '../footer';
import Header from '../header';
import NotFound from '../not-found';

const App = () => {
  return (
    <div className={appStyles['wrapper']}>
      <Header />
      <section className={`padding-all-15 ${appStyles['page-specific-content']}`}>
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
      </section>
      <Footer />
    </div>
  );
};

const appToExport = module.hot ? hot(App) : App;

export default appToExport;
