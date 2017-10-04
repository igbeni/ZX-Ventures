# Back-end Challenge

Para rodar localmente é necessário installar [Docker](https://www.docker.com) e [Node.js](https://nodejs.org). Executar 
os comandos abaixo dentro da pasta raíz do projeto.

```
npm install
docker-compose up
```

O servidor será iniciado em [http://localhost:3000/](http://localhost:3000/).

### 1. Create PDV:

```json
{
    "query": "{ findAllPDVs { id } }"
}
```

### 2. Get PDV by id:

```json
{
    "query": "{ findPDVById( id: \"51\" ) { id } }"
}
```

### 3. Search PDV:

```json
{
    "query": "{ searchPDV( lng: 0, lat: 0 ) {id} }"
}
```
