
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

const porta = 3000;

app.post('/', (req, res)=>{
    res.send('Exemplo de inplementação do GET e POST retorna JSON')
});

var listaCompras = [];
listaCompras.push({nome: 'Pão'});
listaCompras.push({nome: 'Carne'});
listaCompras.push({nome: 'Salada'});
listaCompras.push({nome: 'Droga'});
listaCompras.push({nome: 'Salada'});
listaCompras.push({nome: 'Droga'});


app.post('/listaDeCompra', (req, res)=>{
    var item = req.body;
    listaCompras.push(item);
    res.status(201).send('post');
});

app.get('/listaDeCompra', (req, res)=>{
    res.status(201).send(listaCompras);
});

app.get('/listaDeCompra/:param', (req, res)=>{
    const param = req.params.param;
    listaCompras[param-1] ? res.send(listaCompras[param-1]) : res.status(404).send({msg: 'Resource not found'}); 
});

app.listen(porta, ()=>{
    console.log('Rodando na porta '+porta);
});