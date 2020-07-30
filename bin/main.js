#!/usr/bin/env node
const program = require('commander')

program.version(require('../package').version).usage('<command> [options]')

program
  .command('create <name>')
  .description('create project')
  .action(require('../lib/create'))
program.parse(process.argv)
