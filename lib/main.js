'use strict'

const execSync = require('child_process').execSync

function _chomp(value) {
  return value.replace(/\r?\n|\r/, '')
}

function _interpolate(envValue) {
  const matches = envValue.match(/\$\([^()]+\)/) || []

  return matches.reduce(function (newEnv, match) {
    // return original value if match not wrapped in $(..)
    if (!(match[0] === '$' && match[1] === '(' && match[match.length - 1] === ')')) {
      return newEnv
    }

    // get command
    const command = match.substring(2, match.length - 1)
    // execute command
    const value = _chomp(execSync(command).toString())
    // replace with command value
    return newEnv.replace(match, value)
  }, envValue)
}

function substitute (config) {
  // if ignoring process.env, use a blank object
  const environment = config.ignoreProcessEnv ? {} : process.env

  for (const configKey in config.parsed) {
    const value = Object.prototype.hasOwnProperty.call(environment, configKey) ? environment[configKey] : config.parsed[configKey]

    config.parsed[configKey] = _interpolate(value, environment, config)
  }

  for (const processKey in config.parsed) {
    environment[processKey] = config.parsed[processKey]
  }

  return config
}

module.exports.eval = substitute
