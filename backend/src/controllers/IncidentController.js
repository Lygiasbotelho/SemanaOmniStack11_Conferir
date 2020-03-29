const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query; //Se não encontrar o parametro page, utiliza o padrão 1

        const [count] = await connection('incidents').count(); //[count], representa o vetor na posição 0
        console.log(count);

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)       //Limitando a 5 incidentes, ou seja, 5 resultados por página
            .offset((page - 1) * 5) //lógica de paginação
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']); //Dessa forma, cria um vetor apenas com os campos desejados
        //.select('*');Traria todos os campos

        response.header('X-Total-Count', count['count(*)']); //count [] é a variável, count(*) é a propriedade

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body; //Evita que usuário mande campo que não faz parte

        const ong_id = request.headers.authorization;

        //Desestruturando o vetor que só tem uma posição, esse será o valor do id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        //retorna um objeto
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' }); //Status de não autorizado
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //Retorna sucesso, sem exibir nenhum conteúdo
    },
};