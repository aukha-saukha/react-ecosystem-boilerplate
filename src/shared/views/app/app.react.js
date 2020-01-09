// Please keep react-hot-loader import before React (recommended by react-hot-loader team).
import { hot } from 'react-hot-loader/root';
import React from 'react';

import '../../../static/css/base.scss';
import appStyles from './app.scss';

const App = () => <div className={`font-size-14 ${appStyles['greeting']}`}>Hello World!</div>;

const appToExport = module.hot ? hot(App) : App;

export default appToExport;
