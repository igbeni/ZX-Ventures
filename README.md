# Back-end Challenge

Para rodar localmente é necessário installar [Docker](https://www.docker.com) e [Node.js](https://nodejs.org). Executar 
os comandos abaixo dentro da pasta raíz do projeto.

```
npm install
docker-compose up
```

O servidor será iniciado em [http://localhost:3000/](http://localhost:3000/).

### 1. Create PDV:

Faça uma requisição POST em [http://localhost:3000/graphql](http://localhost:3000/graphql) com os dados abaixo no body.
```json
{
    "query": "{ findAllPDVs { id } }"
}
```
Neste exemplo, o retorno será uma lista com todos os PDV armazenados no banco de dados.

### 2. Get PDV by id:

Faça uma requisição POST em [http://localhost:3000/graphql](http://localhost:3000/graphql) com os dados abaixo no body.
```json
{
    "query": "{ findPDVById( id: \"51\" ) { id } }"
}
```
Neste exemplo, o retorno será um PDV armazenado no banco de dados e localizado pelo \"id\". Caso não seja encontrado, o 
retorno será \"null\".

### 3. Search PDV:

Faça uma requisição POST em [http://localhost:3000/graphql](http://localhost:3000/graphql) com os dados abaixo no body.
```json
{
    "query": "{ searchPDV( lng: 0, lat: 0 ) {id} }"
}
```
Neste exemplo, o retorno será o PDV armazenado no banco de dados mais próximo da localização dada e que tenha a mesma 
dentro de sua área de cobertura. Caso não seja encontrado, o retorno será \"null\".
