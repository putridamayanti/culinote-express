'use strict';

const {LoginService, RegisterService} = require("../services/auth");

exports.Login = async (req, res) => {
    const { status, data } = await LoginService(req.body);

    return res.status(status).send({data: data});
}

exports.Register = async (req, res) => {
    const { status, data } = await RegisterService(req.body);

    return res.status(status).send({data: data});
}