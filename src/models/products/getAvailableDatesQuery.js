import { pool } from '../../db.js';
import moment from 'moment';

const getAvailableDatesForProduct = async (productId) => {
    console.log(`Consultando disponibilidad para el producto: ${productId}`);

    try {
        const [reservedDates] = await pool.query(
            'SELECT DISTINCT DATE(startTime) AS reservedDate FROM bookings WHERE productId = ?',
            [productId]
        );

        const reservedDatesArray = reservedDates.map(
            (row) => row.reservedDate.toISOString().split('T')[0]
        );

        const startDate = moment().startOf('day');
        const endDate = moment().add(3, 'months').endOf('day');
        let availableDates = [];

        let currentDate = startDate.clone();
        while (currentDate.isBefore(endDate)) {
            let formattedDate = currentDate.format('YYYY-MM-DD');
            if (!reservedDatesArray.includes(formattedDate)) {
                availableDates.push(formattedDate);
            }
            currentDate.add(1, 'day');
        }

        return {
            productId,
            availableDates,
        };
    } catch (error) {
        console.error('Error al obtener disponibilidad:', error);
        throw new Error('Error al obtener las fechas disponibles.');
    }
};

export default getAvailableDatesForProduct;
