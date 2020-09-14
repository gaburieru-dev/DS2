
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

const porta = 3000;

app.post('/', (req, res) => {
    res.send('Exemplo de inplementação do GET e POST retorna JSON')
});

var listaCompras = [];
listaCompras.push({ nome: 'Pão' });
listaCompras.push({ nome: 'Carne' });
listaCompras.push({ nome: 'Salada' });
listaCompras.push({ nome: 'Droga' });
listaCompras.push({ nome: 'Cerveja' });


app.post('/listaDeCompra', (req, res) => {
    var item = req.body;
    listaCompras.push(item);
    res.status(201).send('post');
});

app.get('/listaDeCompra', (req, res) => {
    res.send(listaCompras);
});


app.put('/listaDeCompra/:item', (req, res) => {
    const item = req.params.item;
    if (listaCompras[item - 1]) {
        listaCompras[item - 1] = req.body
        res.send(req.body)
    }
    else {
        res.status(404).send({ msg: 'Resource not found' });
    }
});

app.listen(porta, () => {
    console.log('Rodando na porta ' + porta);
});