import express from 'express';
import morgan from 'morgan';

import userRoutes from './routes/user.routes.js';
import indexRoutes from './routes/index.routes.js';
import productRoutes from './routes/product.routes.js';
import { errorHandler, notFound } from './services/manageError.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/', indexRoutes);
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});

export default app;
