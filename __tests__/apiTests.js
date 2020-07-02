import supertest from 'supertest';
import app from '../index';

const server = supertest(app);

// The assertion for a promise must be returned.  
describe('/pokemon endpoint tests', () => {
  test('works with promises', async (done) => {
      expect.assertions(1);
      const apiData = await server.get('/pokemon/');
      const response = JSON.parse(apiData.text);
      await expect(response.data.result.length).toEqual(20);
      done();
  });
})