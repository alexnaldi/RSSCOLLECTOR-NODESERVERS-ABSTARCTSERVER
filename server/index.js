'use strict'
const express = require('express');
const config = require('../config')
const winston = require('winston');

class AbstractServer{
	constructor() {
		if (new.target === AbstractServer) {
		  throw new TypeError("Cannot construct AbstractServer instances directly");
		}else{
			try{
				/*Initialize logger instance, from this property you can access to winston object*/
				var _loggerInstance =  new (winston.Logger)(config.logger.winston);
				this.getLoggerInstance = function() { return _loggerInstance; }

				/*Initialize server properties, these values must be unaccessible from external calls */
				/*var _propertyConfigMap = new WeakMap();
				_propertyConfigMap = initializePropertyConfigMap();
				this.getPropertyConfigMap = function() { return _propertyConfigMap; }*/

				/*Initialize server instance, from this property you can access to expressjs server object*/
				var _serverInstance = express();
				this.getServerInstance = function() { return _serverInstance; }


			}
			catch(e){

			}
		}
	}


}

module.exports = AbstractServer;
