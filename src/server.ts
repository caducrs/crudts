import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
