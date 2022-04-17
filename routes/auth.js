/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const {Router} = require('express');
const { check } = require('express-validator');
/* const router = express.Router; */
const router = Router();

const { loginUsuario, revalidarToken, crearUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new',
    crearUsuario
);

router.post(
    '/login',
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'Contraseña debe ser de 6 o más dígitos').isLength({ min:6 }),
        validarCampos

    ],
    loginUsuario
);

router.get('/renew', validarJWT, revalidarToken)



module.exports = router;