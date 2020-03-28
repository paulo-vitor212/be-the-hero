const connection = require('../database/connection');

module.exports = {

    async session(req,res){
        const {id} = req.body;
        const result = await connection('ongs').where('id', id).first()
        if(!result){
            return res.json({"status" : "error"})
        }
        
        return res.json({"status" : "success", "name": result.name })
    }
}