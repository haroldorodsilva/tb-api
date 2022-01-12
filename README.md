# Api Vendas

Utilizado Express, PrismaJS e PostgreSQL

## Instalação

Instalar depêndencias

```sh
cd tb-api
npm i
```

Alterar variável de ambiente para a URL do banco de dados

```sh
DATABASE_URL="postgres://postgres:docker@localhost:5432/SEUBANCO?schema=public"
```

Criar build e Rodar as migrations

```sh
npm run build
```

Iniciar projeto

```sh
npm start
```

## Postman

Adicionado o arquivo API.postman_collection.json que contém as rotas de testes da API Criada.
