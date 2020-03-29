const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body; //Evita que usuário mande campo que não faz parte

        const id = crypto.randomBytes(4).toString('HEX');   //Cria Id randômica
       
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        //retorna um objeto
        return response.json({ id });
    }
};