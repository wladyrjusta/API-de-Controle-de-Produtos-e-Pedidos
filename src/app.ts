import express from 'express';

import loginRouter from './routers/login.router';
import productsRouter from './routers/products.router';

const app = express();

app.use(express.json());
app.use(loginRouter);
app.use(productsRouter);

export default app;
