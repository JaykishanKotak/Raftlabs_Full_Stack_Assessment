import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import http from 'http';
import { socketService } from './services/socket.service';

import config from './config';
import routes from './routes';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';

import { ApiResponse } from './utils/ApiResponse';
import { ApiError } from './utils/ApiError';

const app: Application = express();

connectDB();

app.use(helmet());
app.use(cors());
// app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

app.use('/api', routes);

app.get('/seed', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      throw new ApiError(403, 'Seeding is not allowed in production');
    }
    await import('./utils/seed').then((module) => module.seedDatabase());
    res
      .status(200)
      .json(new ApiResponse(200, null, 'Database seeded successfully'));
  } catch (error) {
    next(error);
  }
});

app.use((req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

app.use(errorHandler);

const server = http.createServer(app);

// Initialize Socket Service
socketService.init(server);

server.listen(config.port, () => {
  console.log(`HTTP + WS server running on http://localhost:${config.port}`);
});

export default app;
