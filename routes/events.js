/*
    Rutas de Usuarios / Auth
    host + /api/events
*/

const express = require('express');
const { validateJwt } = require('../middlewares/validateJwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { isDate } = require('../helpers/isDate');


const router = express.Router();
// Todas las rutas deben pasar por la validacion del token
router.use(validateJwt);


router.get('/', getEvents);

router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Debes agregar una fecha de inicio válida').custom(isDate),
        check('end', 'Debes agregar una fecha de finalización válida').custom(isDate),
        validateFields,
    ],
    createEvent
);

router.put(
    '/:id', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Debes agregar una fecha de inicio válida').custom(isDate),
        check('end', 'Debes agregar una fecha de finalización válida').custom(isDate),
        validateFields,
    ],
    updateEvent
);

router.delete('/:id', deleteEvent);




module.exports = router;
