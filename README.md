# React ecosystem boilerplate

This production ready boilerplate has following feature:

- CSS, SASS with CSS modules support.
- Hot reloading using react hot loader and webpack dev server.
- Universal/isomorphic application.

## Usage

- Clone the repository on your machine.

  ```bash
  git clone https://github.com/aukha-saukha/react-ecosystem-boilerplate.git your-project-name
  ```

- Navigate into the your-project-name directory.

  ```bash
  cd your-project-name
  ```

- Run `yarn install` (recommended) or `npm install` to install project dependencies.

- Use the following commands to get started:

  - For development environment. This includes client as well as server side rendered application. The only differences between development and production environments are, the source files are uncompressed/unminified, and source maps are enabled in development environment.

    ```bash
    yarn run start:dev
    ```

  - For production environment. All the files are minified, and source maps are disabled by default. If you want to enable them, please add it to `tools/webpack/client.prod.config.js`.

    ```bash
    yarn run start:prod
    ```

  - Use it only while you're developing the application. It uses webpack-dev-server, and enables hot reloading by default.

    ```bash
    yarn run wds
    ```

- Below are the localhost URLs. To run these on different ports, edit `src/data/constants/app/config.js` file.
  - Development: <http://localhost:5005/>
  - Production: <http://localhost:5014/>
  - Webpack dev server: <http://localhost:5023/>

## Known issues

- You may see `Warning: Expected server HTML to contain a matching <div> in <div>` in developer tools. Please see an open issue https://github.com/facebook/react/issues/15405 for more details. Unfortunately, this is a limitation of a react app using an app shell architecture.

  This warning is not going to cause any performance/functional issue. If you still want to get rid of this warning, you can turn off offline support by removing the following code from `tools/workbox/service-worker.js` file:

  ```javascript
  const htmlCache = `html-cache-${Math.random()}`;

  precacheAndRoute([{ url: '/app-shell.html', revision: htmlCache }], {
    cleanUrls: false,
  });

  const handler = createHandlerBoundToURL('/app-shell.html');

  const navigationRoute = new NavigationRoute(handler);
  registerRoute(navigationRoute);
  ```

  Please note all other assets such as CSS, javaScript, images etc. will still cache successfully i.e. the assets will still go through the service worker.

- The error message from ErrorBoundary component is in English language only. We rely on useTranslator hook to determine user's language/locale. Unfortunately, hooks can't be used in class component, and there is no equivalent of `componentDidCatch` and `getSnapshotBeforeUpdate` for hooks right now. Please take a look at https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes for more details.
