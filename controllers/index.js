import PokeApiService from '../services/pokeApi';

const initializeRoutes = (app) => {
  app.get('/', (req, res) => res.send('Hello World!'));
  app.get('/pokemon', async (req, res, next) => {
    
    const { limit, offset } = req.params;
    const options = {
      limit: limit || 20,
      offset: offset || 0,
    }
    try{
      const pokemonData = await PokeApiService.getAllPokemon(options.limit, options.offset);
      return res.sendData(pokemonData);
    } catch(err){
      console.error('sale por error!');
      next(err);
    }
  });

  app.get('/pokemon/:name', async (req, res, next) => {
    const { name } = req.params;
    try{
      const pokemonData = await PokeApiService.getOnePokemonByName(name);
      res.sendData(pokemonData);
    }catch(err){
      console.error(err);
      next(err);
    }
  });
};

export default { initializeRoutes };
