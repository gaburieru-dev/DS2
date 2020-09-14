const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.send('Funcionando')
});

app.get('/listaDeCompras', (req, res )=> {
var lista = '<ol>';
lista += '<li> Pão </li>';
lista += '<li> Cerveja </li>';
lista += '<li> Carne </li>';
lista += '<li> Drogas ilicitas </li>';
lista += '</ol>';
res.send(lista);
})

app.get('/listaDeCompras/:item', (req, res)=> {
    res.send('você está solicitando o item: ' +req,params.item)
})


app.listen(3000, ()=>{
    console.log('Rodando na porta 3000');
});