import getAvailableDatesForProduct from '../../models/products/getAvailableDatesQuery.js';
import { errorMsg } from '../../services/manageError.js';

const getAvailability = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res
                .status(400)
                .json({ error: 'El productId es obligatorio' });
        }

        // Llamamos a la función que ahora devuelve los datos en lugar de enviarlos
        const availableDatesData = await getAvailableDatesForProduct(productId);

        res.json(availableDatesData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default getAvailability;
