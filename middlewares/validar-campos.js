const {response} = require("express");
const { validationResult } = require("express-validator");

//Next se llama si se está ejecutando correctamente el middleware
const validarCampos = (req, res = response, next) => {

    //Manejo de errores
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
}

module.exports = {
    validarCampos,
}


