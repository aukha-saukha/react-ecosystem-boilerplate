// Please keep react-hot-loader import before React (recommended by react-hot-loader team).
import { hot } from 'react-hot-loader/root';
import React from 'react';

const App = () => <div>Hello World!</div>;

const appToExport = module.hot ? hot(App) : App;

export default appToExport;
