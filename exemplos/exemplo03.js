
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.text())

const porta = 3000;

app.post('/', (req, res)=>{
    res.send('Funcionando')
});

var listaCompras = [];

app.post('/listaDeCompra', (req, res)=>{
    var item = req.body;
    listaCompras.push(item);
    res.status(201).send('insert');
});

app.get('/listaDeCompra', (req, res)=>{
    res.status(201).send(listaCompras);
});


app.listen(porta, ()=>{
    console.log('Rodando na porta '+porta);
});