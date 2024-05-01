const db = require('../db')
const fs = require('fs').promises;
const Uuid = require('uuid');
const ApiError = require('../exeptions/api-error')

class FileController{
    async uploadAvatar(req, res){
        try{
          const user = await db.query('SELECT * FROM users WHERE id = $1', [req.user.id]) 
          const file = req.files.file;
          const avatarName = Uuid.v4() + ".jpg"
          file.mv(process.env.STATICPATH + "\\" + avatarName)
          await db.query('UPDATE users SET avatar = $1 WHERE id = $2', [avatarName, req.user.id])
          return res.json(user)
          
        }catch(error){
          console.error('Ошибка в загрузке файла', error);
          return res.status(400).json({ error: 'Ошибка в загрузке файла' });
        }
      }

    async deleteAvatar(req, res){
        try{
          const user = await db.query('SELECT * FROM users WHERE id = $1', [req.user.id]) 
          fs.unlink(process.env.STATICPATH + "\\" + user.rows[0].avatar)
          await db.query('UPDATE users SET avatar = null WHERE id = $1', [req.user.id])


          return res.json(user.rows[0])
          
        }catch(error){
          console.error('Ошибка в загрузке файла', error);
          return res.status(400).json({ error: 'Ошибка в загрузке файла' });
        }
      }
}


module.exports = new FileController();