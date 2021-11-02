import express from 'express';
import cors from 'cors';
import Morgan from 'morgan' ;


import routes from './routes/users.routes';

const app: any = express();
const morgan = Morgan("dev");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan)

app.use(routes);

export default app;
