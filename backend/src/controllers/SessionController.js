const connection = require('../database/connection');

module.exports = {

    async session(req,res){
        const {id} = req.body;
        const result = connection('ongs').where('id', id).first()
        console.log(result.id);

        if(!result){
            return res.json({"status" : "error"})
        }
        
        return res.json({"status" : "success"})
    }
}