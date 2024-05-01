const db = require('../db')
const uuid = require('uuid');

class UsersController{
    async getUsers(req, res){
        const users = await db.query('SELECT * FROM users')
        res.json(users.rows)
}
    async changeName(req, res,next){
        try{
        const {name} = req.body;
        const id = req.user.id;

        if(!name){
            const fakename = 'user_'+ uuid.v1().split('-')[0];
            const user = await db.query('UPDATE users SET name = $1 WHERE id = $2 RETURNING *',[fakename, id])
            res.json(user.rows[0])
        }else{
            const user = await db.query('UPDATE users SET name = $1 WHERE id = $2 RETURNING *',[name, id])
            res.json(user.rows[0])
        }

        }catch(e){
            next(e)
        }  
    }


}

module.exports = new UsersController();