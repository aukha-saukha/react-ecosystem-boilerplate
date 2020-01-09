const fs = require('fs');

class CreateRequiredDirectoriesPlugin {
  constructor(options) {
    if (!options || !options.dirs) {
      throw new Error('Please specify directories you want to create.');
    }

    this.dirs = options.dirs;
  }

  // eslint-disable-next-line class-methods-use-this
  createDirectory(directoryNameWithPath) {
    if (!fs.existsSync(directoryNameWithPath)) {
      fs.mkdirSync(directoryNameWithPath);
    }
  }

  apply(compiler) {
    compiler.hooks.beforeRun.tap('Create Required Directories Plugin', () => {
      this.dirs.forEach((directoryNameWithPath) => {
        this.createDirectory(directoryNameWithPath);
      });
    });
  }
}

module.exports = CreateRequiredDirectoriesPlugin;
