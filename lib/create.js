const chalk = require('chalk')
const clear = require('clear')
const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const validateProjectName = require('validate-npm-package-name')

const { clone } = require('./download')
const log = content => console.log(chalk(content))

const spawn = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}
module.exports = async projectName => {
  clear()

  const cwd = process.cwd()
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || '.')

  // 判断名称是否有效
  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors &&
      result.errors.forEach(err => {
        console.error(chalk.red.dim('Error: ' + err))
      })
    result.warnings &&
      result.warnings.forEach(warn => {
        console.error(chalk.red.dim('Warning: ' + warn))
      })
    exit(1)
  }
  if (fs.existsSync(targetDir)) {
    if (inCurrent) {
      const { ok } = await inquirer.prompt([
        {
          name: 'ok',
          type: 'confirm',
          message: `确定在当前目录${chalk.green(targetDir)}创建项目?`
        }
      ])
      if (!ok) {
        return
      }
    } else {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: `目录 ${chalk.green(targetDir)} 已存在，请选择处理方式：`,
          choices: [
            { name: '覆盖', value: 'overwrite' },
            { name: '合并', value: 'merge' },
            { name: '取消', value: false }
          ]
        }
      ])
      if (!action) {
        return
      } else if (action === 'overwrite') {
        console.log(`\nRemoving ${chalk.green(targetDir)}...`)
        await fs.remove(targetDir)
      }
    }
  }
  log(`🌞 Creating project in ${chalk.green(`${process.cwd()}/${name}`)}.`)
  log(`🖌  Initializing git repository...`)
  // 从github克隆隆项⽬目到指定⽂文件夹
  await clone('github:dongchaoge/vue-template', targetDir)
  log(`🖌  Installation dependencies...`)
  if(inCurrent){
    await spawn('yarn', ['install'], { cwd: `./` })
  }else{
    await spawn('yarn', ['install'], { cwd: `./${name}` })
  }
  log(`👏 Successfully created project ${chalk.green(`${name}`)}`)
}
