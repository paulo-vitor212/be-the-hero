# OmniStack11_Backend
## Projeto em Node.js, utilizando express, axios entre outros. 

Passo a Passo da criação do projeto

    - npm init -y
    - npm install express
    - criar um index.js
    - instânciar o express para usar seus métodos
    - "node index.js" (dps usaremos o nodemon)

Príncipios para levantar o backend

    - npm install nodemon
        - criar script "npm start"
    - npm install knex (query builder)
    - npm install sqlite3 (bd)
    - npx knex init (criação do arquivo de config)
    - criar pasta src
        - incluir index.js
        - criar um routes.js
    - criar pasta database 
        - criar arquivo db.sqlite

Criando tabelas com knex

    - criar pasta migrations dentro de database
    - criar arquivo connection dentro de database
    - npx knex migrate:make create_ongs 
    - tabela ongs: 
        - id -> string
        - name
        - email
        - whatsapp
        - city
        - uf,2
    - npx knex migrate:make create_incidents 
    - tabela incidents: 
        - id -> increments
        - title
        - description
        - value
        - ong_id
        - table.foreign('ong_id').references('id).inTable('ongs')
    - npx knex migrate:latest

Separando funções das rotas

    - criar pasta controllers
        - criar arquivo OngController
        - criar arquivo IncidentsController

Criando funcionalidades

    ongs:
    - create ong
    - index ong (listar todas as ongs)
    - delete ong (deletar uma ong)
    - edit (editar informações de uma ong)

    incidentes:
    - show incident (buscar um caso específico)
    - create incident (criando um caso, obs: um caso pertence a uma ong)
    - index incidents (listando casos, junto com informações da sua ong)
    - edit incidents (editando um caso)
    - delete incident (deletando um caso)

    Login:
    - logar com o id da ong
    - logout será feito no frontEnd

Adicionando o cors para segurança

    - npm install cors
    - incluir "app.use(cors());" no meu index.js
    - através do cors eu posso estabelecer 
    que meu beckend só aceite requisições 
    feitas por um domínio específico

Realizando validações com celebrate
    - npm install celebrate



        

