var chalk = require('chalk') // 输出终端样式模块 https://www.npmjs.com/package/chalk
var semver = require('semver')// 判断版本号 https://www.npmjs.com/package/semver
var packageConfig = require('../package.json')

//传入要执行的命令
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),  // node版本 x.y.z
    versionRequirement: packageConfig.engines.node  // 版本要求
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),  // 执行命令，得到npm的版本
    versionRequirement: packageConfig.engines.npm
  }
]

module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    //在你版本的满足范围
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)  //退出程序出入的code
  }
}
