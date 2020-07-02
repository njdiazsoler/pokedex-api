import https from 'https';
import config from '../config';

const options = {
  host: config.api.baseUrl,
  method: 'GET',
  headers: {
    Accept: 'application/json,text/plain',
  },
};

let allPokemon = [];

const makeApiCall = (path) => {
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

const getPokemonByKeyword = async (keyword) => {
  const data = allPokemon.filter(poke => poke.name.match(keyword));
  const results = []
  for(let i=0;i<data.length;i++){
    const datum = data[i];
    const apiResponse = await makeApiCall(`/${datum.name}`);
    results.push(apiResponse);
  }
  return results;
}

const firstGetAllPokemon = async () => { 
  const completeList = await getAllPokemon(10000, 0);
  allPokemon = completeList.results
  if(allPokemon.length === 0){
    firstGetAllPokemon();
  }
}
// run first
firstGetAllPokemon();

export default {
  getOnePokemonByName,
  getPokemonByKeyword,
  getAllPokemon,
};
