const initializeRoutes = (app) => {
  app.use('/', (req, res) => res.send('Hello World!'));
};

export default { initializeRoutes };
