const connection = require('../database/connection');

module.exports = {
    async create(req,res){
        const {authorization} = req.headers;

        const result = await connection('ongs').where('id' , authorization).first();
        if(!result){
            return res.json({"status" : "error", "msg" : "precisa estar logado para cadastrar um caso"})
        }
        
        const {title,description,value} = req.body;

        const create = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id : authorization,
            created_at: new Date()
        });
        
        if(!create){
            return res.json({"status" : "error", "msg" : "Não foi possível cadastrar um caso"})
        }
        
        return res.json({"status" : "success"})
    },

    async edit(req,res){
        const {authorization} = req.headers;

        const result = await connection('ongs').where('id' , authorization).first();
        if(!result){
            return res.json({"status" : "error", "msg" : "precisa estar logado para cadastrar um caso"})
        }
        
        const {title,description,value} = req.body;

        const atualizado = await connection('incidents').where('id',req.params.id).update({
            title,
            description,
            value,
            ong_id : authorization,
            updated_at: new Date()
        });
        
        if(!atualizado){
            return res.json({"status" : "error", "msg" : "Não foi possível cadastrar um caso"})
        }
        
        return res.json({"status" : "success"})
    },

    async index(req,res){
        const {page = 1} = req.query;

        const [count] = await connection('incidents').count();
        
        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*','ongs.name', 'ongs.email', 'ongs.city', 'ongs.uf', 'ongs.whatsapp']);
        
        res.header('X-Total-Count', count['count(*)']);
        return res.json(incidents);
    },

    async indexOng(req,res){
        const {authorization} = req.headers;

        const result = await connection('ongs').where('id' , authorization).first();
        if(!result){
            return res.json({"status" : "error", "msg" : "precisa estar logado para cadastrar um caso"})
        }

        const {page = 1} = req.query;
        
        const incidents = await connection('incidents').where('ong_id', authorization)
        .limit(5)
        .offset((page - 1) * 5)
        .select('*');

        return res.json(incidents);
    },

    async show(req,res){
        const {authorization} = req.headers;

        const result = await connection('ongs').where('id' , authorization).first();
        if(!result){
            return res.json({"status" : "error", "msg" : "precisa estar logado para cadastrar um caso"})
        }
        
        const incidents = await connection('incidents').where('id', req.params.id).first();
        return res.json(incidents);
    },

    async delete(req,res){
        const {authorization} = req.headers;

        const result = await connection('ongs').where('id' , authorization).first();
        if(!result){
            return res.json({"status" : "error", "msg" : "precisa estar logado para cadastrar um caso"})
        }

        const ong_id = await connection('incidents').where('id', req.params.id).select('ong_id').first();

        if(ong_id.ong_id != authorization){
            return res.status(401).json({
                "status": "error"
            })
        }

        const incidents = await connection('incidents').where('id', req.params.id).first().del();

        if(!incidents){
            return res.json({"status" : "error"});
        }

        return res.json({"status" : "success"});
    }
}