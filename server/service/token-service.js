const jwt = require('jsonwebtoken')
const db = require('../db')

class tokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'})
        
        return({
            accessToken,
            refreshToken
        })
    }

    validateAccessToken(token){
        try{
            const userData = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
            return userData
        }catch(e){
            return null;
        }
    }

    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token,process.env.JWT_REFRESH_SECRET);
            return userData
        }catch(e){
            return null;
        }
    }
    
    async saveToken (userId, refreshToken) {
        const tokenData = await db.query('SELECT * FROM token WHERE id_user = $1',[userId])
        if(tokenData.rowCount){
            await db.query('UPDATE token SET refreshtoken = $1 WHERE id_user = $2',[refreshToken,userId])
            return{
                userId,
                refreshToken
            }
        }

        await db.query('INSERT INTO token VALUES ($1, $2)', [userId,refreshToken]);

        return {
            userId,
            refreshToken
        }
    }

    async removeToken(refreshToken) {
        const token = await db.query('DELETE FROM token WHERE refreshToken = $1 RETURNING *',[refreshToken])
        return token.rows[0];
    }

    async findToken(refreshToken) {
        const token = await db.query('SELECT * FROM token WHERE refreshToken = $1',[refreshToken])
        
        return token.rowCount ? true : false; 
    }
}

module.exports = new tokenService();