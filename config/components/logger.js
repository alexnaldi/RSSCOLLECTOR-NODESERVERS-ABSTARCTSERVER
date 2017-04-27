'use strict'

const joi = require('joi')
const winston = require('winston')
const serverConstants = require('../../constants');

const envVarsSchema = joi.object({
  LOGGER_LEVEL: joi.string()
    .allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
    .default('info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true),
  TYPE_ENV: joi.string()
    .allow(['apiGateway', 'registration'])
    .required()	
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
	logger: {
		enabled: envVars.LOGGER_ENABLED,
		winston:{
			transports: [
			  new (winston.transports.Console)({ level: 'error' }),
			  new (winston.transports.File)({
				filename: serverConstants.general.LOG_PATH + envVars.TYPE_ENV,
				level: envVars.LOGGER_LEVEL
			  })
			]
		}
	}
}
winston.level = config.logger.level
if (!config.logger.enabled) {
  winston.remove(winston.transports.Console)
}

module.exports = config