# React ecosystem boilerplate

This production ready boilerplate has following feature:

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
