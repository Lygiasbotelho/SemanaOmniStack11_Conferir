/*Importar o módulo express pra dentro da variável express*/
const express = require('express');

const cors = require('cors');

//Importa variável do arquivo routers, a barra indica que é um arquivo, se não tivesse barra, indicaria um pacote.
const routes = require('./routes');

const app = express();  /*Variável que vai armazenar a aplicação, com as rotas */

/**
 * Quando estiver em produção, usa dessa forma
app.use(cors({
    origin: 'http://meuapp.com'
}));*/
app.use(cors());
app.use(express.json());
app.use(routes);    //Importante que seja abaixo dessa linha

app.listen(3333);

/**Alterado conteúdo para arquivo routers.js
 * Rota / Recurso
 */
/**
 * Métodos HTTP:
 * GET: Buscar/Listar uma informação do back-end
 * POST Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */
/**
 * Tipos de parâmetros
 *
 * Query Params:Parâmetros nomeados enviados na rota após o *?* (Filtros, paginação)
 *      Ex no Insomnia, Get: http://localhost:3333/users?name=Lygia&idade=25
 * Route Params: Parâmetros utilizados para identifica recursos
 *      Ex no Vscode: app.get('/users/:id', (request, response) => {...
 *          e no Insomnia, Get: http://localhost:3333/users/1
 * Rquest Body: Corpo da requisição, utilizado para criar ou alterar recursos (alterar só o nome por exemplo)
 *      Ex: No Insomnia, Post e trocar corpo para Json:
 *              {
	                "name": "Lygia Botelho"
	                "idade": 33
                }
 */
/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 *
 * Driver: SELECT * from users
 * Query Builder: table('users').select('*').where()
 */

/*
app.post('/users', (request, response) => {
    //return response.send('Hello World');

    /** Via query params, para exibir os parâmetros passados na requisição, trocar para:
    *    app.get('/users', (request, response) => {
    *        const params = request.query;
    *        console.log(params);
    */

/** Via rout params:
*  app.get('/users/:id', (request, response) => {
*      const params = request.params;
*      console.log(params);
*/

/** Via request body:
 * É preciso colocar no início do códido: app.use(express.json());
*   app.post('/users', (request, response) => {
*/
/*
 const body = request.body;
 console.log(body);

 //retorna um objeto
 return response.json({
     evento: 'Semana OmniStack 11.0',
     aluno: 'Lygia S Botelho'

 });
})*/

//Porta que o objeto ouvirá, poderia ser 80, foi escolhida para evitar problemas de conflito
//O Node é normalmente na porta 3333, o react, na porta 3000
//app.listen(3333);