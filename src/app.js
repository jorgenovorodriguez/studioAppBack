import express from 'express';
import morgan from 'morgan';

import userRoutes from './routes/user.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/', indexRoutes);
app.use('/api', userRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});

export default app;
