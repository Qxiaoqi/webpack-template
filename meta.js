const path = require('path')

const {
  sortDependencies,
  installDependencies,
  printMessage,
} = require('./utils')

module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Simple Webpack Template',
    },
    author: {
      type: 'string',
      message: 'Author',
    },
    htmlChoice: {
      type: 'list',
      message: 'Use pug ?',
      choices: [
        {
          name: 'Pug',
          value: 'pug',
          short: 'pug',
        },
        {
          name: 'HTML is enough',
          value: 'html',
          short: 'html',
        },
      ],
    },
    cssChoice: {
      type: 'list',
      message: 'Less or Scss ?',
      choices: [
        {
          name: 'Less',
          value: 'less',
          short: 'less',
        },
        {
          name: 'Scss',
          value: 'scss',
          short: 'scss',
        },
      ],
    },
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
  filters: {
    'src/views/index/index.pug': "data.htmlChoice === 'pug'",
    'src/views/about/about.pug': "data.htmlChoice === 'pug'",
    'src/components/**/*': "data.htmlChoice === 'pug'",

    'src/views/index/index.html': "data.htmlChoice === 'html'",
    'src/views/about/about.html': "data.htmlChoice === 'html'",

    'src/views/index/index.less': "data.cssChoice === 'less'",
    'src/views/about/about.less': "data.cssChoice === 'less'",
    'src/style/styles.less': "data.cssChoice === 'less'",
    'src/components/header/header.less': "data.htmlChoice === 'pug' && data.cssChoice === 'less'",

    'src/views/index/index.scss': "data.cssChoice === 'scss'",
    'src/views/about/about.scss': "data.cssChoice === 'scss'",
    'src/style/styles.scss': "data.cssChoice === 'scss'",
    'src/components/header/header.scss': "data.htmlChoice === 'pug' && data.cssChoice === 'scss'",
  },
  complete: function(data, { chalk }) {
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