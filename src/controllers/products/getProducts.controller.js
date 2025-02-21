import getProducts from '../../models/products/getProductsQuery.js';

const getProductsController = async (req, res, next) => {
    try {
        const products = await getProducts();

        if (products.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No se encontraron productos',
            });
        }

        res.status(200).json({
            status: 'success',
            data: products,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export default getProductsController;
