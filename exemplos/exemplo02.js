const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('Funcionando')
});

var listaCompras = [];
listaCompras.push('Pão');
listaCompras.push('Carne');
listaCompras.push('Café');
listaCompras.push('Chá');

app.get('/listaDeCompra', (req, res)=>{
    res.send(listaCompras);
});

app.get('/listaDeCompra/:item', (req, res)=>{
    var encontrado = listaCompras[req.params.item-1];
    encontrado ? res.send(listaCompras) : res.status(404).send('not found');
});

app.listen(3000, ()=>{
    console.log('Rodando na porta 3000');
});