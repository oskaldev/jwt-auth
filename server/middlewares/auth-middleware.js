const ApiError = require('../exception/api-error')
const tokenService = require('../service/token-service')

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.unauthorizedError())
    }
    const accessToken = authorizationHeader.split(' ')[ 1 ]
    if (!accessToken) {
      return next(ApiError.unauthorizedError())
    }
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }

    req.user = userData
    next()

  } catch (error) {
    return next(ApiError.unauthorizedError())
  }
}