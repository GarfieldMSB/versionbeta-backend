const { Router } = require("express");
const { response } = require("express");
const bcrypt = require("bcrypt");
const { Usuario } = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  try {
    const usuario = new Usuario(req.body);

    await usuario.save();

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name)

    res.status(201).json({
      ok: true,
      msg: "Usuario creado",
      token
    });

  } catch (error) {
        console.error(error);
        res.status(500).json({
        ok: false,
        msg: 'Usuario ya existe',
        });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Email no existe",
      });
    }

    const validatePassword = bcrypt.compareSync(password, usuario.password);
    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.rut, usuario.name)

    res.status(201).json({
      ok: true,
      msg: "login",
      email: email,
      password: password,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "No se encuentra el usuario",
    });
  }
};

const revalidarToken = async(req, res = response) => {

    const {rut, name} = req;

    // generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(rut, name)

    res.json({
        ok: true,
        token
    });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
