// const Pokedex = require('pokedex-promise-v2');
// const pokedex = new Pokedex();

// const getOnePokemonByName = async (name) => {
//   const singlePokemonData = await pokedex.getPokemonByName(name);
//   return singlePokemonData
// };

// const getAllPokemon = async (options) => {
// // library endpoint is broken
// // const allPokemonData = await pokedex.getPokemonsList(options)
// console.log('request!')
// const allPokemonData = await pokedex.resource('/api/v2/pokemon/');
// return allPokemonData;
// }

// export default {
//   getOnePokemonByName,
//   getAllPokemon,
// }

import https from 'https';
import config from '../config';

const options = {
  host: config.api.baseUrl,
  method: 'GET',
  headers: {
    Accept: 'application/json,text/plain',
  },
};

const consumirApi = (path) => {
  console.log(path);
  options.path = path;
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      let response = '';
      res.on('data', (responseData) => {
        response += responseData;
      });
      res.on('end', () => {
        const jsonResponse = JSON.parse(response);
        if (jsonResponse) {
          resolve(jsonResponse);
        } else {
          reject(jsonResponse);
        }
      });
    });
    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
};

const getOnePokemonByName = async (name) => {
  const data = await consumirApi(`/api/v2/pokemon/${name}`);
  return data;
};

const getAllPokemon = async (limit, offset) => {
  const data = await consumirApi(`/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  console.log('returning!')
  return data;
};

export default {
  getOnePokemonByName,
  getAllPokemon,
};
