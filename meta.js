const path = require('path')

const {
  sortDependencies,
  installDependencies,
  printMessage,
} = require('./utils')

module.exports = {
  prompts: {
    // name: {
    //   type: 'string',
    //   required: true,
    //   message: 'Project name',
    // },
    autoInstall: {
      type: 'list',
      message:
        'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  complete: function(data, { chalk }) {
    console.log('进入meta.js的complete')
    // data是metalsmith的全局变量（包含问答答案）
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  }
}