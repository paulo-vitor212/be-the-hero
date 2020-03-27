const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async create(req,res){
        const {name, email, whatsapp, city, uf} = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await connection('ongs').insert({
            id, name, email, whatsapp, city, uf, created_at : new Date()
        })
        return res.json({id});
    },

    async index(req,res){
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    },
    
    async delete(req,res){
        const {id} = req.body;
        const result = await connection('ongs').where('id',id).first();
        
        if(!result){
            return res.json({"status": "error", "msg" : "Ong Não encontrada"});
        }
        
        const deletado = await connection('ongs').where('id',id).first().del();
        
        if(!deletado){
            return res.json({"status": "error"});
        }
        
        return res.json({
            "status" : "success",
            "name": result.name
        });
    },

    async update(req,res){
        if(!req.body.id){
            return res.json({"status": "error", "msg" : "Id não informado"});
        }
        const result = await connection('ongs').where('id',req.body.id);
        
        if(!result){
            return res.json({"status": "error", "msg" : "Ong Não encontrada"});
        }
        
        const {id, name, email, whatsapp, city, uf} = req.body;

        const atualizado = await connection('ongs').where('id',req.body.id).update({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
            updated_at : new Date()
        })

        if(!atualizado){
            return res.json({"status" : "error" });
        }
        
        return res.json({"status" : "success"});
    },
}
