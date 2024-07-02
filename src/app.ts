import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';

const app: Application = express();

app.use(express.json());
app.use(cors({origin: 'https://imaginative-profiterole-69375f.netlify.app', credentials: true}));

app.use('/', router);

const getController = (req: Request, res: Response) => {
  res.send('This is Smartphone Management Dashboard project server!');
};

app.get('/', getController);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
