import { pool } from '../../db.js';
import { errorMsg } from '../../services/manageError.js';

const getProducts = async () => {
    console.log('entro');

    try {
        const [products] = await pool.query('SELECT * FROM products');
        return products;
    } catch (err) {
        console.error('Error al obtener los productos:', err);
        throw new errorMsg('Error al obtener la lista de servicios', 500);
    }
};

export default getProducts;
