import https from 'https';
import config from '../config';

const options = {
  host: config.api.baseUrl,
  method: 'GET',
  headers: {
    Accept: 'application/json,text/plain',
  },
};

const makeApiCall = (path) => {
  console.log(path);
  options.path = `/api/v2/pokemon${path}`;
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      res.setEncoding('utf8');
      let response = '';
      res.on('data', (responseData) => {
        response += responseData;
      });
      res.on('end', () => {
        if (response !== 'Not Found') {
          const jsonResponse = JSON.parse(response);
          resolve(jsonResponse);
        } else {
          reject(response);
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
  const data = await makeApiCall(`/${name}`);
  return data;
};

const getAllPokemon = async (limit, offset) => {
  const data = await makeApiCall(`?limit=${limit}&offset=${offset}`);
  return data;
};

export default {
  getOnePokemonByName,
  getAllPokemon,
};
