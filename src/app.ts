import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//Application route
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the API of 2nd Assignment',
  });
});

export default app;
