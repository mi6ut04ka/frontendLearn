const bcrypt = require('bcryptjs')
const db = require('../db')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exeptions/api-error')

class authService {
    async registration(email, password, name){
        const candidate = await db.query('SELECT * FROM users WHERE email = $1', [email])
            if (candidate.rowCount) {
                throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует`)
            }
        const hashPassword = bcrypt.hashSync(password, 7);
        const activationLink = uuid.v4();
        
        name? null : name = 'user_'+ uuid.v1().split('-')[0];
        
        const user = await db.query(`INSERT INTO users (email, password, role, activationLink, name) values ($1,$2,'user',$3, $4) RETURNING *`,[email,hashPassword,activationLink,name])
        await mailService.sendActivatonMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user.rows[0]);
        
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async activate (activationLink) {
        const user = await db.query(`SELECT * FROM users WHERE activationlink = $1`,[activationLink])
        if(!user.rowCount){
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        await db.query(`UPDATE users SET isactivated = true WHERE activationLink = $1`,[activationLink])
    }

    async login (email, password) {

        const user = await db.query('SELECT * FROM users WHERE email = $1', [email])
        if (!user.rowCount) {
            throw ApiError.BadRequest(`Пользователь c почтой ${email} не найден`)
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password)

        if(!validPassword){
            throw ApiError.BadRequest('Введен неверный пароль')
        }

        const userDto = new UserDto(user.rows[0]);

        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken)  {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);

        if (!userData && !tokenService.findToken(refreshToken)){
            throw ApiError.UnauthorizedError();
        }
        const user = await db.query('SELECT * FROM users WHERE id = $1', [userData.id])
        const userDto = new UserDto(user.rows[0]);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id,tokens.refreshToken);
        return {...tokens, user: userDto}
    }
    async updatePassword(oldPassword, newPassword,id){
        const userData = await db.query('SELECT * FROM users WHERE id = $1', [id])
        const validPassword = await bcrypt.compare(oldPassword, userData.rows[0].password)

        if(!validPassword){
            throw ApiError.BadRequest('Введен неверный пароль')
        }
        const hashPassword = bcrypt.hashSync(newPassword, 7);
        const user = await db.query('UPDATE users SET password = $1 RETURNING *',[hashPassword])

        return(user.rows[0])
    }
}

module.exports = new authService();