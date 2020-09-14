const fotoRepository = require('../repository/foto.repository');
const usuarioRepository = require('../repository/usuario.repository');

module.exports = {
    find: async (req, res) => {
        const usuarioResult = await usuarioRepository.getByUsername(req.username);

        fotoRepository.findByUsuario()
            .then((result) => {
                console.log('Usuario: ' + usuario);
                res.send(result.rows);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },
    findOne: (req, res) => {
        const id = req.params.id;

        fotoRepository.findOne(id)
            .then((result) => {

                if (result.rows.length > 0) {
                    res.send(result.rows[0]);
                } else {
                    res.status(404).send({ msg: 'Registro não encontrado' });
                }

            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },
    create: (req, res) => {
        const cidade = req.body;

        fotoRepository.create(cidade)
            .then((result) => {
                res.status(201).send(result.rows[0]);
            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },
    update: (req, res) => {
        //Pega o conteúdo do corpo da requisição
        const cidade = req.body;

        //Atribui o ID do item baseado no parametro da URL
        cidade.id = req.params.id;

        fotoRepository.update(cidade)
            .then((result) => {

                if (result.rows.length > 0) {
                    res.send(result.rows[0]);
                } else {
                    res.status(404).send({ msg: 'Registro não encontrado' });
                }

            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },
    delete: (req, res) => {

        //Pega o ID a ser excluído através da URL
        var id = req.params.id;

        cidadeRepository.delete(id)
            .then((result) => {

                if (result.rowCount > 0) {
                    res.status(204).send();
                } else {
                    res.status(404).send({ msg: 'Registro não encontrado' });
                }

            })
            .catch((error) => {
                res.status(500).send({ msg: error.message });
            });
    },
}