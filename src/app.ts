import express from 'express';

import loginRouter from './routers/login.router';

const app = express();

app.use(express.json());
app.use(loginRouter);

export default app;
