const genericErrorMessage =
  'कुछ गलत हो गया है। कृप्या वेब्पेज को ताज़ा (लोड) कर पुनः प्रयत्न करे। यदि समस्या बनी रहती है, तो कृप्या हमसे संपर्क करने में संकोच न करें।';

// The reason to disable 'import/prefer-default-export' because we're moving away from default
// export. We want to have named imports.
// eslint-disable-next-line import/prefer-default-export
export { genericErrorMessage };
