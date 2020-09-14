
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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

app.get('/listaDeCompra', (req, res) => {
    res.send(listaCompras);
});

app.delete('/listaDeCompra/:item', (req, res) => {
    const item = req.params.item;
    if (listaCompras[item - 1]) {
        listaCompras.splice(item - 1, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send({ msg: 'Resource not found' });
    }
});

app.listen(porta, () => {
    console.log('Rodando na porta ' + porta);
});