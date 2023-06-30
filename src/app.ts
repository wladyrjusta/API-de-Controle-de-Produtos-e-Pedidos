import express from 'express';

import loginRouter from './routers/login.router';
import productsRouter from './routers/products.router';
import ordersRouter from './routers/orders.router';

const app = express();

app.use(express.json());
app.use(loginRouter);
app.use(productsRouter);
app.use(ordersRouter);

export default app;
