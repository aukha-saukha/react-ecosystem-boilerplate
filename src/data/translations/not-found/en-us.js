const notFoundErrorMessage = "This webpage doesn't exist. Sorry for the inconvenience.";

// The reason to disable 'import/prefer-default-export' because we're moving away from default
// export. We want to have named imports.
// eslint-disable-next-line import/prefer-default-export
export { notFoundErrorMessage };
