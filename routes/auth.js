/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');
const { validateJwt } = require('../middlewares/validateJwt');



router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({min: 8}),
        validateFields
    ],
    createUser
);

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
        validateFields
    ],
    loginUser
);

router.get('/renew', validateJwt, revalidateToken);



module.exports = router;