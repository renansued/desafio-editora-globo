import requestIp from 'request-ip'
import { validationResult } from 'express-validator'

module.exports = {
  /**
   * Removes extension from file
   * @param {string} file - filename
   */
  removeExtensionFromFile(file) {
    return file
      .split('.')
      .slice(0, -1)
      .join('.')
      .toString()
  },
  
  /**
   * Gets IP from user
   * @param {*} req - request object
   */
  getIP(req) {
    return requestIp.getClientIp(req)
  },
  
  /**
   * Gets browser info from user
   * @param {*} req - request object
   */
  getBrowserInfo(req) {
    return req.headers['user-agent']
  },
  
  /**
   * Gets country from user using CloudFlare header 'cf-ipcountry'
   * @param {*} req - request object
   */
  getCountry(req) {
    return req.headers['cf-ipcountry'] ? req.headers['cf-ipcountry'] : 'XX'
  },
  
  /**
   * Handles error by printing to console in development env and builds and sends an error response
   * @param {Object} res - response object
   * @param {Object} err - error object
   */
  handleError(res, err, code) {
    // Prints error in console
    if (process.env.NODE_ENV === 'development') {
      console.log(err)
    }
    // Sends error to user
    res.status(code || err.code || 500).json({
      errors: {
        msg: err.message
      }
    })
  },
  
  /**
   * Builds error object
   * @param {number} code - error code
   * @param {string} message - error text
   */
  buildErrObject(code, message) {
    return {
      code,
      message
    }
  },
  
  /**
   * Builds error for validation files
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Object} next - next object
   */
  validationResult(req, res, next) {
    try {
      validationResult(req).throw()
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase()
      }
      return next()
    } catch (err) {
      return this.handleError(res, this.buildErrObject(422, err.array()))
    }
  },
  
  /**
   * Builds success object
   * @param {string} message - success text
   */
  buildSuccObject(message) {
    return {
      msg: message
    }
  },
  
  /**
   * Checks if given ID is good for MongoDB
   * @param {string} id - id to check
   */
  isIDGood: async function (id) {
    return new Promise((resolve, reject) => {
      const goodID = String(id).match(/^[0-9a-fA-F]{24}$/)
      return goodID
        ? resolve(id)
        : reject(this.buildErrObject(422, 'ID_MALFORMED'))
    })
  },
  
  /**
   * Item not found
   * @param {Object} err - error object
   * @param {Object} item - item result object
   * @param {Object} reject - reject object
   * @param {string} message - message
   */
  itemNotFound(err, item, reject, message) {
    if (err) {
      reject(this.buildErrObject(422, err.message))
    }
    if (!item) {
      reject(this.buildErrObject(404, message))
    }
  },
  
  /**
   * Item already exists
   * @param {Object} err - error object
   * @param {Object} item - item result object
   * @param {Object} reject - reject object
   * @param {string} message - message
   */
  itemAlreadyExists(err, item, reject, message) {
    if (err) {
      reject(this.buildErrObject(422, err.message))
    }
    if (item) {
      reject(this.buildErrObject(422, message))
    }
  }
}