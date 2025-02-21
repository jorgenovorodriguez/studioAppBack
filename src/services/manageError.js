export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMsg = (message, statusCode = 400) => {
    throw new AppError(message, statusCode);
};

export const notFound = (req, res, next) => {
    next(new AppError('Ruta no encontrada', 404));
};

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Error interno del servidor',
    });
};
