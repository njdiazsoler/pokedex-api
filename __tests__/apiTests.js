import supertest from 'supertest';
import app from '../index';

const server = supertest(app);

// The assertion for a promise must be returned.  
describe('/pokemon endpoint tests', () => {
  test('works with promises', async (done) => {
      expect.assertions(1);
      const apiData = await server.get('/pokemon/').expect(200);
      const response = JSON.parse(apiData.text);
      await expect(response.data.results.length).toEqual(20);
      done();
  });
})