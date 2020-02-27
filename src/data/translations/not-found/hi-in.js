const notFoundErrorMessage = 'यह वेब्पेज अस्तित्व मे नहीं है। आपकी असुविधा के लिए हमें खेद है।';

// The reason to disable 'import/prefer-default-export' because we're moving away from default
// export. We want to have named imports.
// eslint-disable-next-line import/prefer-default-export
export { notFoundErrorMessage };
