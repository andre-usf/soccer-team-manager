const fs = require('fs/promises');

// async pois a leitura será assíncrona
async function apiCredentials(req, res, next) {
  // pega o token do cabeçalho, se houver
  const token = req.header('X-API-TOKEN');
  // lê o conteúdo do `./authdata.json` (relativo à raiz do projeto)
  const authdata = await fs.readFile('./authdata.json', { encoding: 'utf-8' });
  // o retorno do readFile é uma string, então está transformando em objeto
  const authorized = JSON.parse(authdata);

  if (token in authorized) {
    return next(); // pode continuar
  }
  return res.sendStatus(401); // não autorizado
}

module.exports = apiCredentials;
