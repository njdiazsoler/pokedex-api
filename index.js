import express from 'express';
import cors from 'cors';
import Controllers from './controllers/index';

const app = express();
const port = 3000;

// Enable CORS
const corsOptions = {
  origin: '*',
  credentials: true,
  allowedHeaders: ['Accept', 'Authorization', 'Content-Type', 'Cookie'],
  exposedHeaders: ['Content-Disposition'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// remove Powered By
app.disable('x-powered-by');

// --- Response standardization
app.use((req, res, next) => {
  res.sendData = function sendData(data, total) {
    const response = {
      status: 200,
      meta: {
        count: 1,
      },
      data,
    };
    if (Array.isArray(data)) {
      response.meta.count = data.length;
      response.meta.total = total;
    }
    res.send(response);
  };
  next();
});

// --- Controllers / Routes
Controllers.initializeRoutes(app);

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
  const errorResponse = {
    status: err.status || 500,
    message: err.message,
    // No stacktraces leaked to user unless in development environment
    error: app.get('env') === 'development' ? err : {},
  };

  // log if internal error
  if (errorResponse.status === 500) {
    console.error('Error', err);
  }

  res.status(errorResponse.status).send(errorResponse);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))