const ApiError = require('../exeptions/api-error')
const tokenService = require('../service/token-service')

module.exports = function (role) {
    return function(req, res, next){
        if(req.method === 'OPTIONS'){
            next()
        }
    
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return next(ApiError.UnauthorizedError())
            }
            const {role: userRoles} = tokenService.validateAccessToken(token);
            let hasRole = false
                if(userRoles==role){
                    hasRole = true
                }
            
            if(!hasRole){
                return next(ApiError.withouAccess('У вас нет доступа'))
            }
            next()
        } catch(e){
            return next(ApiError.UnauthorizedError())
        }
    }
}